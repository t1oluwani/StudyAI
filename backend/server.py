import os
import traceback  # For extensive debugging
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
        return JSONResponse(
          status_code=500, content={
          "audio_file": None,
          "message": "Error loading audio from video.",
        })

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


# HELPER FUNCTION that stores the data in the database
def store_in_database(data):
  fb_db.child("transcripts").delete()  # Clear the database so only the latest data(transcript) is stored
  fb_db.child("transcripts").push(data) # The line the error is coming from !!!
  print("Transcript stored successfully")

# Transcribe audio and store transcript in database
@app.post("/transcribe/")
async def transcribe_and_store_audio(title: str):
  print("Title: |" + title + "|")
  file_path = f"uploads/{title}"

  if os.path.exists(file_path):
    audio_file = open(f"{file_path}", "rb")
  else:
    # Debug start
    print(file_path)
    print(Path(file_path).exists())
    print("File not found")
    # Debug end
    return JSONResponse(status_code=404, content={"error": "File not found in uploads directory"})

  print("Transcribing audio...")
  try:
    transcription = client.audio.transcriptions.create(
      model="whisper-1", file=audio_file, response_format="verbose_json"
    )
  except Exception as e:
    return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})
    
  timestamps = []
  for segment in transcription.segments: # Extract relevant information from segments
    timestamps.append({
      "start": segment.start,
      "end": segment.end,
      "text": segment.text,
    })

  transcript = {
    "video-title": title,
    "transcript": transcription.text,
    "segments": timestamps,
  }

  print("Storing transcript in database...")
  try:
    store_in_database(transcript)
  except Exception as e:
    print("Error storing transcript:", e)
    return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})

  return {"Transcription successful": title}


# Retrieve transcript from database
@app.get("/transcribe/")
async def get_transcripts():
  transcript = fb_db.child("transcripts").get()

  if transcript is None:
    return JSONResponse(status_code=404, content={"error": "No transcript found"})

  transcript_data = transcript.items()

  for key, value in transcript_data:
    response = {
      "video_title": value["video-title"],
      "transcript" : value["transcript"],
      "segments"   : value["segments"],
    }
  return response

# Send a message to OpenAI's chat API
@app.post("/chat/")
async def chat(prevContext: str, currMessage: str):
  try:
    prompt = "Answer as a chatbot named StudyAI: Given this context: \"" + prevContext + "\", Respond to this \"" + currMessage + "\""
    refinedPrompt = prompt + "Please respond naturally and directly, without including any prefixes"
    print("Sending Message to AI...")
           
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[{
        "role": "user", 
        "content": refinedPrompt
      }],
    )
    
    print("AI " + completion.choices[0].message.content)
    return {completion.choices[0].message.content}
  except Exception as e:
    return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})
