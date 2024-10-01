import requests

api_url = "http://127.0.0.1:8000/upload-from-file/"
test_file_path = r"C:\Users\tifav\OneDrive - ualberta.ca\Desktop\Tioluwani\Anime\Anime Episodes\EP.1.v1.1080p.mp4"

print(f"Uploading file: {test_file_path}...")

with open(test_file_path, "rb") as file:
    files = {"file": (test_file_path, file)}
    response = requests.post(api_url, files=files)

print(response.json())