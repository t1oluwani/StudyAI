import React from 'react';

import { extractAudioFromLink } from '../../../services/audioExtractionService';
import { transcribeAndStoreAudioFromLink } from '../../../services/transcriptionService';

function LinkPaste({ setLink, setTranscriptStatus }) {
  

  const perform_main_operations = async (link) => {
    console.log("Performing main operations");

    const audio_title = await extractAudioFromLink(link); // Wait for extraction
    if (audio_title !== null) {
      await transcribeAndStoreAudioFromLink(audio_title);
      setTranscriptStatus(true);
    } else {
      alert("Main Operations Stopped Due to Audio Extraction Failure!");
      return;
    }
    // script sent to AI model
}

  const convertToEmbedLink = (link) => {
    if (link) {
      const vidId = link.split('v=')[1]?.split('&')[0];

      if (vidId) {
        return `https://www.youtube.com/embed/${vidId}`;
      } else {
        alert('Invalid YouTube URL!');
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
        setLink(embedLink);
        perform_main_operations(link);
        handleLinkClear();
      } else {
        alert('No YouTube URL Provided!');
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