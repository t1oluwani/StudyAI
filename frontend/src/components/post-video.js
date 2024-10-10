import '../styling/post-video.css';
import { useEffect, useState } from 'react';

import EmbeddedVideo from './sub-components/post/embedded-video';
import VideoTranscipt from './sub-components/post/video-transcript';
import ChatScreen from './sub-components/post/chat-screen';

import { getTranscriptionResult } from '../services/transcriptionService';

function PostVideo({ link, file, setLink, setFile, transcriptStatus, setTranscriptStatus }) {
  const [transcript, setTranscript] = useState(null);
  const [verboseTranscript, setVerboseTranscript] = useState(null);

  useEffect(() => {
    if ((link || file) && transcriptStatus) {
      async function fetchTranscription() {
        const result = await getTranscriptionResult();
        setTranscript(result[0]);
        setVerboseTranscript(result[1]);

        // Reset the link, file and transciption storing status after fetching the transcript
        setLink('');
        setFile('');
        setTranscriptStatus(false);
      }
      fetchTranscription();
    }

  }, [link, file, setLink, setFile, transcriptStatus, setTranscriptStatus]);

  return (
    <div className="post-video">
      <div className="video-side">
        <EmbeddedVideo url={link} mp4={file} />
        <VideoTranscipt transcript={verboseTranscript} />
      </div>
      <div className="chat-side">
        <ChatScreen transcript={transcript} />
      </div>
    </div>
  );
}

export default PostVideo;