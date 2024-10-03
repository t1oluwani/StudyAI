import ast
import requests

api_url = "http://127.0.0.1:8000/transcribe/"

print(f"Attempting to retrieve transcript from firebase database...")

response = requests.get(api_url)

data = response.json()
# Get the first key-value pair
for key, value in data.items():
    # Convert the string representation of the dictionary back to a dictionary
    transcript_data = ast.literal_eval(value)

    # Extract the video title
    video_title = transcript_data["video-title"]
    transcript = transcript_data["transcript"]
    # segments = transcript_data["segments"]

    print(f"Video Title: {video_title}")
    print(f"Transcript: {transcript}")
    # print(f"Segments: {segments}")

# print(response.json())
