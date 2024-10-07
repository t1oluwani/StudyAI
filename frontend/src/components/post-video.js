import '../styling/post-video.css';
import { useEffect, useState } from 'react';

import EmbeddedVideo from './sub-components/embedded-video';
import VideoTranscipt from './sub-components/video-transcript';
import ChatScreen from './sub-components/chat-screen';

import { getTranscriptionResult } from '../services/transcriptionService';

function PostVideo({ link, file, setLink, setFile, transcriptStatus, setTranscriptStatus }) {
  const [transcript, setTranscript] = useState(null);

  useEffect(() => {
    if ((link || file) && transcriptStatus) {
      async function fetchTranscription() {
        const result = await getTranscriptionResult();
        setTranscript(result);

        // Reset the link, file and transciption storing status after fetching the transcript
        setLink('');
        setFile('');
        setTranscriptStatus(false);
      }
      fetchTranscription();
    }

  }, [link, file, setLink, setFile, transcriptStatus, setTranscriptStatus]);


  console.log("Post Video Link: ", link);
  console.log("Post Video File: ", file);
  console.log("Post Video Transcript: ", transcript);
  console.log("Post Video Transcript Status: ", transcriptStatus);

  return (
    <div className="post-video">
      <div className="video-side">
        <EmbeddedVideo url={link} mp4={file} />
        <VideoTranscipt transcript={transcript} />
      </div>
      <div className="chat-side">
        <ChatScreen transcript={transcript} />
      </div>
    </div>
  );
}

export default PostVideo;