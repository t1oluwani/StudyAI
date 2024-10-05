import ast
import requests

api_url = "http://127.0.0.1:8000/transcribe/"

print(f"Attempting to post transcript to firebase database...")

response = requests.post(api_url, params={"title": "BLEACH 20th Anime Anniversary Official Trailer ｜ BLEACH ｜ VIZ.mp3"})

print(response.json())