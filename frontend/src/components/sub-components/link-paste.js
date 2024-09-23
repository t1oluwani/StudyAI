import React from 'react';
import axios from 'axios';

function LinkPaste({ setLink }) {
  const api_url = "http://127.0.0.1:8000/upload-from-youtube/"

  const extract_audio_from_link = async(link) => {
    try {
      axios.post(api_url, null, { params: { url: link } })

      console.log("Audio extraction from YouTube link successful");
    } catch (error) {
      console.error(error);
    }
  }

  const perform_main_link_operations = (link) => {
    extract_audio_from_link(link);
    // whisper model get transcription
    // script sent to ai model
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