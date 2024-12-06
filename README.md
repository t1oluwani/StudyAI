
# StudyAI

## Overview
StudyAI is an interactive study software designed to enhance your learning experience. Users can either upload a local video or submit a YouTube URL, which the application processes to provide various functionalities. The main features include:

- An embedded, interactive version of the video.
- An interactive transcript that allows users to click on phrases to navigate to specific moments in the video.
- A chatbot powered by OpenAI that comprehends the uploaded video in order to answers relevant questions and requests, providing specific details such as the timestamps for when concepts are mentioned.
- Interactive buttons to summarize content, highlight key points, and generate quizzes based on the video's information.

# Demo
Watch the demo video showcasing the use of StudyAI. In this video, I demonstrate how to upload a video, interact with the transcript, ask questions to the AI chatbot, and explore the application's key features:<br>
https://vimeo.com/1019093746?share=copy

## Installation

To get started with StudyAI, follow these steps:

1. Clone or fork the repository:
   ```bash
   git clone https://github.com/t1oluwani/StudyAI.git
   ```
   
  2. **Create and Activate Virtual Environment** (Optional, but Highly Recommended):
   - Navigate to the project directory:
     ```bash
     cd StudyAI
     ```
   - Create a virtual environment using `venv`:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On **Windows**:
       ```bash
       venv\Scripts\activate
       ```
     - On **macOS/Linux**:
       ```bash
       source venv/bin/activate
       ```
3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Generate your API and Firebase database keys, and place them in the appropriate locations:
   - `backend\keys\openai_key.txt`
   - `backend\keys\firebase_key.json`

5. Navigate to the `start.sh` file and run it:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

## Usage

I created StudyAI to be best utilized for studying purposes, particularly for students preparing for exams and need to cram tedious lectures. For instance, if your professor posts their lectures on YouTube or if they let you download the recordings, you can use StudyAI to help you study. The app allows you to:
- Find concepts in the transcript and click them to see where they were mentioned in the video.
- Quiz yourself based on the content.
- Use the chatbot for interactive learning.
(Works for both YouTube links and downloaded videos/audios)

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: FastAPI
- **Database**: Firebase Realtime Database
- **APIs**: OpenAI (Whisper for transcription and Chat model for Q&A)
- **Others**: 
  - Pydub for downloading YouTube videos
  - FFmpeg for audio processing

## API Documentation

API documentation is available at: [http://127.0.0.1:8000/docs#/](http://127.0.0.1:8000/docs#/)

The API includes:
- **POST /upload-from-file**: Extract and upload a audio from a local file.
- **POST /upload-from-link**: Extract and upload a video using a YouTube link.
- **POST /transcribe**: Generates transcript from audio and stores it in the database
- **GET /transcribe**: Retrieve the transcript from the database.
- **POST /chat**: Send messages to the OpenAI API and get responses.

## Testing

You can run the test files in the backend by executing:
```bash
python test/<test_file>
```

To clear downloaded MP3 files, run:
```bash
python cmd/clear.py
```

## Contributions and Contact

Feel free to contribute to the project! You can submit issues or pull requests directly through the repository.
For questions or support, please reach out through the links on my profile or on LinkedIn.

## License

This project is licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).

