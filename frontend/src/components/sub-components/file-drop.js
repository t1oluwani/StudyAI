import React from 'react';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import { extractAudioFromFile } from '../../services/audioExtractionService';
import { transcribeAndStoreAudioFromFile } from '../../services/transcriptionService';

function FileDrop({ setFile, setTranscriptStatus }) {
  const [fileName, setFileName] = useState('');
  
  const perform_main_operations = async (file) => {
    console.log("Performing main operations");

    const audio_title = await extractAudioFromFile(file); // Wait for extraction
    if (audio_title !== null) {
      await transcribeAndStoreAudioFromFile(audio_title);
      setTranscriptStatus(true);
    } else {
      console.log("Main operations stopped due to audio extraction failure"); 
      return;
    }
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
      perform_main_operations(file);
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