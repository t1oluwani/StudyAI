import requests

api_url = "http://127.0.0.1:8000/transcribe/"

print(f"Attempting to retrieve transcript from firebase database...")

response = requests.get(api_url) 

print(response.json())
