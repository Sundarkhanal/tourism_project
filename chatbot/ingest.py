import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pypdf import PdfReader
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_KEY = os.getenv("QDRANT_API_KEY")

ai_client = genai.Client(api_key=GEMINI_KEY)
db_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY)

COLLECTION_NAME = "batosanjaal_srs"
DATA_FOLDER = "data"

print("Checking/Creating storage space in Qdrant...")
if not db_client.collection_exists(COLLECTION_NAME):
    db_client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=768, distance=Distance.COSINE),
    )
    print(f"Collection '{COLLECTION_NAME}' created successfully with 768 dimensions!")
else:
    print(f"Collection '{COLLECTION_NAME}' already exists.")

if not os.path.exists(DATA_FOLDER):
    print(f"⚠️ Folder '{DATA_FOLDER}' not found. Please create it and add your files.")
    exit()

all_chunks = []

for file_name in os.listdir(DATA_FOLDER):
    file_path = os.path.join(DATA_FOLDER, file_name)
    
    if file_name.endswith(".txt"):
        print(f"Processing TXT file: {file_name}")
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
            chunks = [p.strip() for p in text.split("\n\n") if p.strip()]
            for chunk in chunks:
                all_chunks.append({"text": chunk, "source": file_name})

    elif file_name.endswith(".pdf"):
        print(f"Processing PDF file: {file_name}")
        reader = PdfReader(file_path)
        pdf_text = ""
        for page in reader.pages:
            extracted_page_text = page.extract_text()
            if extracted_page_text:
                pdf_text += extracted_page_text + "\n"
        
        chunks = [p.strip() for p in pdf_text.split("\n\n") if p.strip()]
        for chunk in chunks:
            all_chunks.append({"text": chunk, "source": file_name})

print(f"Extracted a total of {len(all_chunks)} text chunks across all files.")

points = []
for index, item in enumerate(all_chunks):
    response = ai_client.models.embed_content(
        model="gemini-embedding-001",
        contents=item["text"],
        config=types.EmbedContentConfig(
            output_dimensionality=768
        )
    )
    
    vector = response.embeddings[0].values
    
    point = PointStruct(
        id=index,
        vector=vector,
        payload={
            "text": item["text"],
            "source": item["source"]
        }
    )
    points.append(point)

db_client.upsert(collection_name=COLLECTION_NAME, points=points)
print("Success! All document contents have been fully ingested into Qdrant.")