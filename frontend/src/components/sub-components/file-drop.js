import React from 'react';
import axios from 'axios';
// import fs from 'fs';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function FileDrop({ setFile }) {
  const [fileName, setFileName] = useState('');
  const upload_url = 'http://127.0.0.1:8000/upload-from-file/';
  const transcribe_url = "http://127.0.0.1:8000/transcribe/"


  const extract_audio_from_file = async (file) => {
    try {
      console.log("Extracting audio from:", file.name);
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(upload_url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })

      console.log("Audio extraction successful:", response.data.audio_file);
      return response.data.audio_file;
    } catch (error) {
      console.error(error);
    }
  }

  const trancribe_audio_from_video = async (audio_title) => {
    audio_title = audio_title + '.mp3'; // Add file extension
    try {
      console.log("Transcribing:", audio_title);
      await axios.post(transcribe_url, null, { params: { title: audio_title } })

      const response = await axios.get(transcribe_url, { params: { title: audio_title } })
      console.log("Transcript:", response.data[0].transcript);

      console.log("Transcription successful:", audio_title);
    } catch (error) {
      console.error(error);
    }
  }

  const perform_main_file_operations = async (file) => {
    console.log("Performing main file operations");
    console.log("File:", file);
    const audio_title = await extract_audio_from_file(file); // Wait for extraction
    console.log("Audio title:", audio_title);
    // await trancribe_audio_from_video(audio_title); // Wait for transcription
    // script sent to ai model
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // if (file.size > 52428800) {
      //   alert('File is too large. Max file size is 50MB.');
      //   handleFileClear();
      //   return;
      // }
      if (!(file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
        alert('File is not a video or audio file. Please upload an MP4 or MP3 file.');
        handleFileClear();
        return;
      }
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const handleFileClear = () => {
    setFileName('');
    document.getElementById('file-input').value = '';
  }

  const handleFileUpload = () => {
    const file = document.getElementById('file-input').files[0];
    if (file) {
      setFile(file);
      perform_main_file_operations(file);
      handleFileClear();

      // console.log(file);
    } else {
      console.error('No file selected');
    }
  }

  return (
    <>
      <div className="file-drop-area">
        <p>
          {fileName ? (<> <FontAwesomeIcon icon={faFile} /> {fileName} </>
          ) : (
            'Drop files here or Click to Upload'
          )}
        </p>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          id="file-input"
        />
      </div>

      <div className='buttons'>
        <button onClick={handleFileClear} className="file-clear">
          <i className="fa-regular fa-circle-xmark"></i>Clear
        </button>
        <button onClick={handleFileUpload} className="file-upload">
          <i className="fa-regular fa-circle-up"></i>Upload
        </button>
      </div>
    </>
  );
}

export default FileDrop;