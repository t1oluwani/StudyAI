import "../../../styling/video-side.css";
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EmbeddedVideo({ url, mp4, currTime = 0 }) {
  const [vidUrl, setVidUrl] = useState(url); // Initialize with the original URL
  const videoRef = useRef(null);

  console.log("URL:", url);
  console.log("vidUrl:", vidUrl);

  // Update the current time of the video when currTime changes
  // useEffect(() => {
  //   if (videoRef.current && !isNaN(currTime)) {
  //     videoRef.current.currentTime = currTime;
  //   }
  // }, [currTime]);

  useEffect(() => {
    if (url) {
      setVidUrl(`${url}?start=${currTime}`);
    }
  }, [currTime, url]);

  return (
    <div className="embedded-video">
      <h3>Embedded Video</h3>
      {/* {url ? ( */}
      <iframe
        width="100%"
        height="100%"
        id="embeddedVideo"
        alt="Embedded YouTube Video"
        src={vidUrl}
        allowFullScreen>
      </iframe>
      {/* ) : mp4 ? (
        <video width="100%" height="100%" controls ref={videoRef}>
          <source src={mp4} type="video/mp4" />
        </video>
      ) : (
        <p> No Video Available <i className="fas fa-face-frown"></i></p>
      )} */}
    </div>
  )
}

export default EmbeddedVideo;