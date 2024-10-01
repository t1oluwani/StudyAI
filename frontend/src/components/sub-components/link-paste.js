import React from 'react';
import axios from 'axios';
import { useState } from 'react';


function LinkPaste({ setLink }) {
  const upload_url = "http://127.0.0.1:8000/upload-from-youtube/"
  const transcribe_url = "http://127.0.0.1:8000/transcribe/"

  const extract_audio_from_link = async(link) => {
    try {
      console.log("Extracting audio from:", link);
      const response = await axios.post(upload_url, null, { params: { url: link } }) 

      console.log("Audio extraction successful:", response.data.audio_file);
      return response.data.audio_file;
    } catch (error) {
      console.error(error);
    }
  }

  const transcribe_audio_from_link = async (audio_title) => {
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

  const perform_main_link_operations = async (link) => {
    console.log("Performing main file operations");
    const audio_title = await extract_audio_from_link(link); // Wait for extraction
    await transcribe_audio_from_link(audio_title); // Wait for transcription
    // script sent to AI model
}

  const convertToEmbedLink = (link) => {
    if (link) {
      const vidId = link.split('v=')[1]?.split('&')[0];

      if (vidId) {
        return `https://www.youtube.com/embed/${vidId}`;
      } else {
        console.error('Invalid YouTube URL');
        return '';
      }
    } else {
      return '';
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const link = event.target.value;
      const embedLink = convertToEmbedLink(link);

      if (embedLink) {
        // setLink(embedLink);
        perform_main_link_operations(link);
        handleLinkClear();

        // console.log(link);
      } else {
        console.error('NO YouTube URL Provided');
      }
    }
  }

  const handleLinkClear = () => {
    document.getElementById('youtube-input').value = '';
  };

  return (
    <>
      <input
        type="text"
        placeholder="Insert YouTube link here"
        onKeyDown={handleKeyDown}
        className="youtube-input"
        id="youtube-input"
      />
    </>
  );
}

export default LinkPaste;