import '../styling/post-video.css';
import EmbeddedVideo from './sub-components/embedded-video';
import VideoTranscipt from './sub-components/video-transcript';
import ChatScreen from './sub-components/chat-screen';

function PreVideo({ link }) {
  return (
    <div className="post-video">
      <div className="video-side">
        <EmbeddedVideo url={link} />
        <VideoTranscipt/>
      </div>
      <div className="chat-side">
        <ChatScreen/>
      </div>
    </div>
  );
}

export default PreVideo;