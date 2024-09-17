import os
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path
from pydub import AudioSegment
import yt_dlp

app = FastAPI()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.post("/upload-from-file/")
async def upload_audio(file: UploadFile = File(...)):
    try:
        file_path = UPLOAD_DIR / file.filename
        audio_file_name = file.filename.rsplit(".", 1)[0] + ".mp3"
                
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        audio_path = UPLOAD_DIR / audio_file_name
        audio = AudioSegment.from_file(file_path)
        audio.export(audio_path, format="mp3")
        
        # file_path.unlink() # Delete the temp file

        return {"audio_file": str(audio_path), "message": "Audio extracted and saved successfully."}
      
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})

@app.post("/upload-from-youtube/")
async def upload_audio(url: str):
    try:
        ydl_opts = {
            'format': 'bestaudio/best', 
            'outtmpl': str(UPLOAD_DIR / '%(title)s.%(ext)s'), 
            'noplaylist': True, 
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        return {"filename": f"{yt_dlp.utils.get_filename(ydl_opts)}", "message": "Audio downloaded and saved successfully."}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})
