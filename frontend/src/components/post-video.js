import '../styling/post-video.css';
import EmbeddedVideo from './sub-components/embedded-video';
import VideoTranscipt from './sub-components/video-transcript';
import ChatScreen from './sub-components/chat-screen';

import { getTranscriptionResult } from '../services/transcriptionService';

function PostVideo({ link, file }) {

  const transcript = getTranscriptionResult();

  return (
    <div className="post-video">  
      <div className="video-side">
        <EmbeddedVideo url={link} mp4={file} />
        <VideoTranscipt transcript={transcript}/>
      </div>
      <div className="chat-side">
        <ChatScreen transcript={transcript}/>
      </div>
    </div>
  );
}

export default PostVideo;