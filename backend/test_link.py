import requests

api_url = "http://127.0.0.1:8000/upload-from-youtube/"
test_youtube_url = "https://www.youtube.com/watch?v=1O0yazhqaxs"

response = requests.post(api_url, params={"url": test_youtube_url})

print(response.json())