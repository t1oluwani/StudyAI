import '../styling/post-video.css';
import EmbeddedVideo from './sub-components/embedded-video';
import VideoTranscipt from './sub-components/video-transcript';
import ChatScreen from './sub-components/chat-screen';

function PreVideo({ link }) {

  function convertToEmbedLink(link) {
    const vidId = link.split('v=')[1]?.split('&')[0];

    if (vidId) {
      return `https://www.youtube.com/embed/${vidId}`;
    } else {
      console.error('Invalid YouTube URL');
      return '';
    }
  }

  return (
    <div className="post-video">
      <div className="video-side">
        <EmbeddedVideo url={convertToEmbedLink(link)} />
        <VideoTranscipt/>
      </div>
      <div className="chat-side">
        <ChatScreen/>
      </div>
    </div>
  );
}

export default PreVideo;