import React from 'react';
import axios from 'axios';

function LinkPaste({ setLink }) {
  const api_url = "http://127.0.0.1:8000/upload-from-youtube/"

  const extract_audio_from_link = async(link) => {
    const test_youtube_url = "https://www.youtube.com/watch?v=1O0yazhqaxs"

    try {
      axios.post(api_url, null, { params: { url: test_youtube_url } })
      console.log("Audio extraction from YouTube link successful");
    } catch (error) {
      console.error(error);
    }
    return
  }

  const perform_main_file_operations = (link) => {
    extract_audio_from_link(link);
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
        console.log(link);
        perform_main_file_operations(link);
        handleLinkClear();
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