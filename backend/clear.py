from pathlib import Path

upload_path = Path("uploads")

def clear_uploads_dir():
  for file in upload_path.iterdir():
    file.unlink()

clear_uploads_dir()