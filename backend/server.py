import os
import traceback
from pathlib import Path
from openai import OpenAI

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

from pydantic import BaseModel  # For request body validation
from pydub import AudioSegment  # For audio processing
import yt_dlp  # For downloading audio from YouTube

app = FastAPI()

# Load OpenAI API key from secret file
with open("./key/secret_key.txt", "r") as f:
    api_key = f.read().strip()

client = OpenAI(api_key=api_key)

# Mock in-memory database
db = []


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

            try: # TODO: Currently only works for mp4 files, struggle with mp3 files
                # audio = AudioSegment.from_file(file_path)
                # audio.export(audio_path, format="mp3")
                print("Audio was loaded successfully!")
            except Exception as e:
                print(f"Error loading audio: {e}")
                return

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
            # ydl.download([url])
            info = ydl.extract_info(url, download=True)
            video_name = info.get("title", None)

        return {
            "audio_file": f"{video_name}",
            "message": "Audio downloaded and saved successfully.",
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})


# Transcribe audio and store transcript in database
@app.post("/transcribe/")
async def transcribe_audio(title: str):
    file_path = f"uploads/{title}"

    if not os.path.exists(file_path):
        return {"error": "File not found"}
    else:
        audio_file = open(f"uploads/{title}", "rb")

    try:
        transcription = client.audio.transcriptions.create(
            model="whisper-1", file=audio_file, response_format="verbose_json"
        )
    except Exception as e:
        return {"error": "Transcription failed"}

    transcript = {
        "video-title": title,
        "transcript": transcription.text,
        "segments": transcription.segments,  # TODO: Extract relevant information from segments
    }  # Store the video title and transcript as a Transcript model

    db.clear()  # Clear the database so only the latest transcript is stored
    db.append(transcript)

    return {"Transcription successful": title}


# Retrieve transcript from database
@app.get("/transcribe/")
async def get_transcripts():
    return db
