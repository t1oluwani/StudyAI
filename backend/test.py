import requests

url1 = "http://127.0.0.1:8000/upload-from-file/"
url2 = "http://127.0.0.1:8000/upload-from-youtube/"

youtube_url = "https://www.youtube.com/watch?v=1O0yazhqaxs"
file_path = r"C:\Users\tifav\OneDrive - ualberta.ca\Desktop\Tioluwani\Anime\Anime Episodes\EP.1.v1.1080p.mp4"

with open(file_path, "rb") as file:
    files = {"file": (file_path, file)}
    response = requests.post(url1, files=files)

response = requests.post(url2, params={"url": youtube_url})

print(response.json())

