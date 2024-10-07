import "../../../styling/video-side.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EmbeddedVideo({ url, mp4 }) {
  // console.log("Embedded Video URL: ", url, "Embedded Video MP4: ", mp4);

  return (
    <div className="embedded-video">
      <h3>Embedded Video</h3>
      {/* {url ? ( */}
        <iframe
          width="100%"
          height="100%"
          id="embeddedVideo"
          alt="Embedded YouTube Video"
          src={url}
          allowFullScreen>
        </iframe>
      {/* ) : mp4 ? (
        <video width="100%" height="100%" controls>
          <source src={mp4} type="video/mp4" />
        </video>
      ) : (
        <p> No Video Available <i className="fas fa-face-frown"></i></p>
      )} */}
    </div>
  )
}

export default EmbeddedVideo;