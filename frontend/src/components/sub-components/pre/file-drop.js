import React from 'react';

import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';

import { extractAudioFromFile } from '../../../services/audioExtractionService';
import { transcribeAndStoreAudioFromFile } from '../../../services/transcriptionService';

function FileDrop({ setFile, setTranscriptStatus, setLoadingState }) {
  const [fileName, setFileName] = useState('');
  
  const perform_main_operations = async (file) => {
    console.log("Performing main operations");

    setLoadingState("Extracting Audio from File...");
    const audio_title = await extractAudioFromFile(file); // Wait for extraction

    if (audio_title !== null) {
      setLoadingState("Transcribing and Storing Audio...");
      await transcribeAndStoreAudioFromFile(audio_title); // Wait for transcription and storage
      setTranscriptStatus(true);
    } else {
      alert("Main Operations Stopped Due to Audio Extraction Failure!");
    }
    setLoadingState("");
  }

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
    } else {
      alert('No File Selected!');
    }
  }

  // Handling drag-and-drop using react-dropzone
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!(file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
        alert('File is not a video or audio file. Please upload an MP4 or MP3 file.');
        handleFileClear();
        return;
      }
      setFileName(file.name);
      // Set the file input value to the dropped file
      const input = document.getElementById('file-input');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="file-drop-area" {...getRootProps()}>
        <input {...getInputProps()} id="file-input" className="file-input" />
        <p>
          {fileName ? (
            <>
              <FontAwesomeIcon icon={faFile} /> {fileName}
            </>
          ) : isDragActive ? (
            'Drop the file here...'
          ) : (
            'Drag and drop a file here, or click to select one'
          )}
        </p>
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