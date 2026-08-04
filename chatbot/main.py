import os
import uuid
import traceback
from typing import Optional
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct  # ADDED: Required for Qdrant point upserts

load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_KEY = os.getenv("QDRANT_API_KEY")

ai_client = genai.Client(api_key=GEMINI_KEY)
db_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY)

app = FastAPI(title="BatoSanjaal Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COLLECTION_NAME = "batosanjaal_srs"

class ChatRequest(BaseModel):
    message: str

# ADDED: Pydantic model matching your MongoDB News Schema
class NewsIngestRequest(BaseModel):
    news_id: str
    title: str
    description: str
    location: str
    publisherName: Optional[str] = "Admin"


@app.post("/api/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    mime_type = file.content_type if file.content_type and "audio" in file.content_type else "audio/webm"
    
    try:
        audio_bytes = await file.read()

        if not audio_bytes:
            raise HTTPException(status_code=400, detail="Empty audio file submitted.")

        response = ai_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                "Transcribe this audio recording exactly as spoken into plain text. Do not summarize or add commentary.",
                types.Part.from_bytes(
                    data=audio_bytes,
                    mime_type=mime_type,
                )
            ]
        )

        return {"text": response.text.strip()}

    except Exception as e:
        print("\n=== TRANSCRIPTION ERROR ===")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chatbot/message")
async def chat_with_bot(request: ChatRequest):
    try:
        user_query = request.message

        embedding_response = ai_client.models.embed_content(
            model="gemini-embedding-001",
            contents=user_query,
            config=types.EmbedContentConfig(
                output_dimensionality=768
            )
        )
        query_vector = embedding_response.embeddings[0].values

        search_results = db_client.query_points(
            collection_name=COLLECTION_NAME,
            query=query_vector,
            limit=3
        )

        context_chunks = []
        for point in search_results.points:
            text = point.payload.get("text", "")
            source = point.payload.get("source", "Knowledge Base")
            if text:
                context_chunks.append(f"[Source: {source}]\n{text}")

        retrieved_context = "\n\n---\n\n".join(context_chunks) if context_chunks else "No specific document context found."

        system_instruction = (
            "You are the helpful AI Travel Assistant for the BatoSanjaal Tourism Platform in Nepal.\n"
            "Your job is to answer travel queries, explain features, provide security details, or outline travel itineraries.\n"
            "Use the provided context from BatoSanjaal documents to formulate your answer.\n"
            "If the answer isn't fully in the context, supplement it with general knowledge about Nepal tourism, "
            "maintaining a safe, helpful, and professional tone.\n\n"
            f"--- CONTEXT FROM BATOSANJAAL PORTAL ---\n{retrieved_context}"
        )

        chat_response = ai_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_query,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7
            )
        )

        return {"response": chat_response.text}

    except Exception as e:
        print("\n=== CHAT ERROR TRACEBACK ===")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# =====================================================================
# ADDED: REAL-TIME NEWS VECTOR INGESTION & DELETION ENDPOINTS
# =====================================================================

@app.post("/api/rag/ingest-news")
async def ingest_single_news(news: NewsIngestRequest):
    """Called automatically by Express Server whenever news is Created/Updated"""
    try:
        # Combine relevant fields for Gemini vector embedding
        combined_text = (
            f"News Title: {news.title}\n"
            f"Location: {news.location}\n"
            f"Publisher: {news.publisherName}\n"
            f"Details: {news.description}"
        )
        
        # 1. Generate Embedding using Gemini
        embedding_response = ai_client.models.embed_content(
            model="gemini-embedding-001",
            contents=combined_text,
            config=types.EmbedContentConfig(output_dimensionality=768)
        )
        vector = embedding_response.embeddings[0].values

        # 2. Derive persistent UUID from MongoDB news_id string
        point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, news.news_id))

        # 3. Upsert point into Qdrant
        point = PointStruct(
            id=point_id,
            vector=vector,
            payload={
                "text": combined_text,
                "title": news.title,
                "location": news.location,
                "source": f"Portal News ({news.location})",
                "news_id": news.news_id,
                "type": "news"
            }
        )

        db_client.upsert(collection_name=COLLECTION_NAME, points=[point])

        return {
            "status": "success",
            "message": f"News '{news.title}' processed and indexed in Qdrant successfully."
        }

    except Exception as e:
        print("\n=== REALTIME NEWS INGESTION ERROR ===")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/rag/delete-news/{news_id}")
async def delete_news_vector(news_id: str):
    """Called automatically by Express Server whenever news is Deleted"""
    try:
        point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, news_id))
        db_client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=[point_id]
        )
        return {"status": "success", "message": f"Vector for news_id {news_id} deleted from Qdrant."}
    except Exception as e:
        print("\n=== REALTIME NEWS DELETION ERROR ===")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def read_root():
    return {"status": "BatoSanjaal Chatbot Service is running smoothly!"}