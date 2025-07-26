from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import httpx
import asyncio


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Suno AI Configuration
SUNO_API_KEY = os.environ.get('SUNO_API_KEY')
SUNO_BASE_URL = "https://studio-api.suno.ai/api/external"
SUNO_HEADERS = {
    "Authorization": f"Bearer {SUNO_API_KEY}",
    "Content-Type": "application/json"
}

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Music Generation Models
class MusicRequest(BaseModel):
    prompt: str
    title: Optional[str] = None
    tags: Optional[str] = None
    make_instrumental: bool = False
    user_id: str

class MusicResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    prompt: str
    title: Optional[str] = None
    tags: Optional[str] = None
    make_instrumental: bool = False
    status: str = "processing"  # processing, completed, failed
    suno_ids: Optional[List[str]] = []
    audio_urls: Optional[List[str]] = []
    video_urls: Optional[List[str]] = []
    image_urls: Optional[List[str]] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Music Generation Endpoints
@api_router.post("/music/generate", response_model=MusicResponse)
async def generate_music(request: MusicRequest):
    """Generate music using Suno AI"""
    try:
        # Create music entry in database
        music_entry = MusicResponse(
            user_id=request.user_id,
            prompt=request.prompt,
            title=request.title,
            tags=request.tags,
            make_instrumental=request.make_instrumental
        )
        
        # Insert into database
        result = await db.music.insert_one(music_entry.dict())
        music_entry.id = str(result.inserted_id)
        
        # Prepare Suno API request
        suno_payload = {
            "prompt": request.prompt,
            "make_instrumental": request.make_instrumental,
            "wait_audio": False
        }
        
        if request.title:
            suno_payload["title"] = request.title
        if request.tags:
            suno_payload["tags"] = request.tags
        
        # Call Suno API
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{SUNO_BASE_URL}/generate",
                headers=SUNO_HEADERS,
                json=suno_payload
            )
            
            if response.status_code != 200:
                logger.error(f"Suno API error: {response.status_code} - {response.text}")
                # Update status to failed
                await db.music.update_one(
                    {"_id": result.inserted_id},
                    {"$set": {"status": "failed", "updated_at": datetime.utcnow()}}
                )
                raise HTTPException(status_code=500, detail="Music generation failed")
            
            suno_response = response.json()
            suno_ids = [clip["id"] for clip in suno_response if "id" in clip]
            
            # Update database with Suno IDs
            await db.music.update_one(
                {"_id": result.inserted_id},
                {"$set": {
                    "suno_ids": suno_ids,
                    "status": "processing",
                    "updated_at": datetime.utcnow()
                }}
            )
            
            music_entry.suno_ids = suno_ids
            return music_entry
            
    except Exception as e:
        logger.error(f"Error generating music: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/music/status/{music_id}")
async def get_music_status(music_id: str):
    """Check the status of a music generation request"""
    try:
        # Get music entry from database
        try:
            music_entry = await db.music.find_one({"_id": ObjectId(music_id)})
        except:
            # If music_id is not a valid ObjectId, try as string
            music_entry = await db.music.find_one({"id": music_id})
        
        if not music_entry:
            raise HTTPException(status_code=404, detail="Music entry not found")
        
        # If already completed, return the entry
        if music_entry["status"] == "completed":
            return music_entry
        
        # Check status with Suno API
        if music_entry.get("suno_ids"):
            audio_urls = []
            video_urls = []
            image_urls = []
            all_completed = True
            
            for suno_id in music_entry["suno_ids"]:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    response = await client.get(
                        f"{SUNO_BASE_URL}/clip/{suno_id}",
                        headers=SUNO_HEADERS
                    )
                    
                    if response.status_code == 200:
                        clip_data = response.json()
                        if clip_data.get("status") == "complete":
                            if clip_data.get("audio_url"):
                                audio_urls.append(clip_data["audio_url"])
                            if clip_data.get("video_url"):
                                video_urls.append(clip_data["video_url"])
                            if clip_data.get("image_url"):
                                image_urls.append(clip_data["image_url"])
                        else:
                            all_completed = False
            
            # Update database if all clips are completed
            if all_completed and audio_urls:
                await db.music.update_one(
                    {"_id": music_id},
                    {"$set": {
                        "status": "completed",
                        "audio_urls": audio_urls,
                        "video_urls": video_urls,
                        "image_urls": image_urls,
                        "updated_at": datetime.utcnow()
                    }}
                )
                music_entry["status"] = "completed"
                music_entry["audio_urls"] = audio_urls
                music_entry["video_urls"] = video_urls
                music_entry["image_urls"] = image_urls
        
        return music_entry
        
    except Exception as e:
        logger.error(f"Error checking music status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/music/user/{user_id}", response_model=List[MusicResponse])
async def get_user_music(user_id: str):
    """Get all music generated by a user"""
    try:
        music_entries = await db.music.find({"user_id": user_id}).sort("created_at", -1).to_list(100)
        return [MusicResponse(**entry) for entry in music_entries]
    except Exception as e:
        logger.error(f"Error fetching user music: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
