import '../styling/post-video.css';
import { useEffect, useState } from 'react';

import EmbeddedVideo from './sub-components/post/embedded-video';
import VideoTranscipt from './sub-components/post/video-transcript';
import ChatScreen from './sub-components/post/chat-screen';

import { getTranscriptionResult } from '../services/transcriptionService';

function PostVideo({ link, file, setLink, setFile, transcriptStatus, setTranscriptStatus }) {
  const [currTime, setCurrTime] = useState(0); // Current time of the video in seconds
  const [plainTranscript, setPlainTranscript] = useState(null);
  const [verboseTranscript, setVerboseTranscript] = useState(null);

  useEffect(() => {
    if ((link || file) && transcriptStatus) {
      async function fetchTranscription() {
        const result = await getTranscriptionResult();
        setPlainTranscript(result[0]);
        setVerboseTranscript(result[1]);

        // Reset the link, file and transciption storing status after fetching the transcript
        setLink('');
        setFile('');
        setTranscriptStatus(false);
      }
      fetchTranscription();
    }
  }, [link, file, setLink, setFile, transcriptStatus, setTranscriptStatus]);

  function toDictionary(array) { // Convert the transcript array to a dictionary
    return array.reduce((dictionary, { start, text }) => {
      dictionary[start] = text;
      return dictionary;
    }, {});
  }
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds; // Leading Zero
    return `${minutes}:${formattedSeconds}`;
  }

  let stringTranscript = ''; // Convert the verbose transcript to a string for OpenAI API
  let transcriptDict = {}; // Convert the verbose transcript to a dictionary for interactive subtitles
  if (verboseTranscript && Array.isArray(verboseTranscript)) {
    transcriptDict = toDictionary(verboseTranscript);
    stringTranscript = (verboseTranscript.map(item => `${formatTime(item.start)}: ${item.text}`)).join(', ');
  }

  console.log("String Transcript:", stringTranscript)

  return (
    <div className="post-video">
      <div className="video-side">
        <EmbeddedVideo url={link} mp4={file} time={currTime}/>
        <VideoTranscipt transcript={transcriptDict} setTime={setCurrTime} />
      </div>
      <div className="chat-side">
        <ChatScreen transcript={stringTranscript} />
      </div>
    </div>
  );
}

export default PostVideo;