import os
import ast  # For converting string representation of dictionary to dictionary
import traceback  # For debugging
from pathlib import Path
from openai import OpenAI

import firebase_admin
from firebase_admin import credentials, db

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

from pydantic import BaseModel  # For request body validation
from pydub import AudioSegment  # For audio processing
import yt_dlp  # For downloading audio from YouTube

app = FastAPI()  # Create FastAPI instance

# Load OpenAI API key from secret file
with open("./keys/secret_key.txt", "r") as f:
    api_key = f.read().strip()

client = OpenAI(api_key=api_key)  # Create OpenAI instance

# Initialize Firebase instance
cred = credentials.Certificate(
    "./keys/studyai-database-firebase-adminsdk-f63n0-883759a905.json"
)
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://studyai-database-default-rtdb.firebaseio.com"}
)

# Firebase Realtime Database
fb_db = firebase_admin.db.reference()

# Mock in-memory database
tempdb = []

# Models
class Timestamps(BaseModel):
    start: float
    end: float
    text: str


class Transcript(BaseModel):
  video_title: str
  transcript: str
  segments: list[Timestamps]


# CORS
allowed_origins = [
    "http://localhost:3000",  # The domain of our StudyAI React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Allow requests from our allowed origins (...our frontend)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Accesses uploads directory and creates it if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# ROUTES


# Upload video and audio file from local storage (specified by path)
@app.post("/upload-from-file/")
async def upload_audio_from_file(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not (file.filename.endswith(".mp3") or file.filename.endswith(".mp4")):
            return JSONResponse(
                status_code=400, content={"error": "Unsupported file type"}
            )

        file_path = (
            UPLOAD_DIR / file.filename
        )  # Path for videofile in uploads directory

        if os.path.exists(file_path):
            return {
                "audio_file": str(file.filename),
                "message": "Audio already exists in uploads directory.",
            }
        
        with open(file_path, "wb") as f:
            f.write(await file.read())

        if file.filename.endswith(".mp3"):
            return {
                "audio_file": str(file.filename),
                "message": "Audio uploaded successfully.",
            }

        elif file.filename.endswith(".mp4"):
            # Extract audio from video and save as mp3
            audio_file_name = file.filename
            audio_path = (
                UPLOAD_DIR / audio_file_name
            )  # Path for audio file in uploads directory

            try:
                audio = AudioSegment.from_file(file_path)
                audio.export(audio_path, format="mp3")
                print("Audio was loaded successfully!")
            except Exception as e:
                print(f"Error loading audio: {e}")
                return {
                    "audio_file": None,
                    "message": "Error loading audio from video.",
                }

            # file_path.unlink() # Delete the temp file

            return {
                "audio_file": str(audio_file_name),
                "message": "Audio extracted and saved successfully.",
            }

    except Exception as e:
        traceback_str = traceback.format_exc()
        print(traceback_str)  # Full stack trace for extensive debugging
        return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})


# Upload audio file from a YouTube URL (specified by link)
@app.post("/upload-from-youtube/")
async def upload_audio_from_link(url: str):
    try:
        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": str(UPLOAD_DIR / "%(title)s.%(ext)s"),
            "noplaylist": True,
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }
            ],  # Convert to mp3
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            video_name = info.get("title", None)

            # Check if audio file already exists before downloading
            if os.path.exists(f"uploads/{video_name}.mp3"):
                print("Audio already exists in uploads directory.")
                return {
                    "audio_file": f"{video_name}",
                    "message": "Audio already exists in uploads directory.",
                }
            else:
                print("Downloading audio...")
                ydl.download([url])

        return {
            "audio_file": f"{video_name}",
            "message": "Audio downloaded and saved successfully.",
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})


# Transcribe audio and store transcript in database
@app.post("/transcribe/")
async def transcribe_and_store_audio(title: str):
    print("Title: |" + title + "|")
    file_path = f"uploads/{title}"

    if os.path.exists(file_path):
        audio_file = open(f"{file_path}", "rb")
    else:
        print(file_path)
        print(Path(file_path).exists())
        print("File not found")
        return {"error": "File not found in uploads directory"}

    print("Transcribing audio...")
    try:
        transcription = client.audio.transcriptions.create(
            model="whisper-1", file=audio_file, response_format="verbose_json"
        )
    except Exception as e:
        return {"error": "Transcription failed"}

    transcript = {
        "video-title": title,
        "transcript": transcription.text,
        # "segments": transcription.segments,  # TODO: Extract relevant information from segments
    }  # Store the video title and transcript as a Transcript model

    print("Storing transcript in database...")
    fb_db.child(
        "transcripts"
    ).delete()  # Clear the database so only the latest transcript is stored
    fb_db.child("transcripts").push(str(transcript))

    return {"Transcription successful": title}


# Retrieve transcript from database
@app.get("/transcribe/")
async def get_transcripts():
    transcript = fb_db.child("transcripts").get()

    if transcript is None:
        return {"error": "No transcript found"}

    transcript_data = transcript.items()

    for key, value in transcript_data:
        data = ast.literal_eval(value)
        response = {
            "video_title": data["video-title"],
            "transcript": data["transcript"],
            # "segments": data["segments"],
        }

    return response
