from openai import OpenAI

client = OpenAI()

# Open your audio file
audio_file = open("path_to_your_audio_file.mp3", "rb")

# Use OpenAI Whisper to transcribe the audio file
transcription = openai.Audio.transcribe(
    model="whisper-1",         # Specify the Whisper model
    file=audio_file            # Pass the audio file to the API
)

# Print the transcription result
print(transcription['text'])