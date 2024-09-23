import React from 'react';
import axios from 'axios';
// import fs from 'fs';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function FileDrop({ setFile }) {
  const [fileName, setFileName] = useState('');
  const api_url = 'http://127.0.0.1:8000/upload-from-file/';

  const extract_audio_from_video = (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      axios.post(api_url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      
      console.log("Audio extraction from local file successful");
    } catch (error) {
      console.error(error);
    }
  }

  const perform_main_file_operations = (file) => {
    extract_audio_from_video(file);
    // whisper model get transcription
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
      if (!file.type.startsWith('video/')) {
        alert('File is not a video. Please upload a video file.');
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

      console.log(file);
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