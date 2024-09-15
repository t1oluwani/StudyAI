import '../styling/post-video.css';
import EmbeddedVideo from './sub-components/embedded-video';
import VideoTranscipt from './sub-components/video-transcript';
import ChatScreen from './sub-components/chat-screen';

function PostVideo({ link, file }) {

  return (
    <div className="post-video">
      <div className="video-side">
        <EmbeddedVideo url={link} mp4={file} />
        <VideoTranscipt/>
      </div>
      <div className="chat-side">
        <ChatScreen/>
      </div>
    </div>
  );
}

export default PostVideo;