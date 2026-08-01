import os
import traceback
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
from qdrant_client import QdrantClient

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


@app.get("/")
def read_root():
    return {"status": "BatoSanjaal Chatbot Service is running smoothly!"}