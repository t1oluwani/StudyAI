import "../../../styling/video-side.css";
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EmbeddedVideo({ url, mp4, time }) {
  const [vidUrl, setVidUrl] = useState(url); // Initialize with the original URL
  const [vidSrc, setVidSrc] = useState(''); // Initialize with the path to the video file
  const videoRef = useRef(null);

  // Hold on to src for video
  useEffect(() => {
    if (mp4) {
      setVidSrc('/videos/' + mp4.name);
    }
  }, [mp4]);

  // Hold on to url for irame and update the video URL when the time changes
  useEffect(() => {
    if (url) {
      setVidUrl(`${url}?start=${time}`);
    }
    const modifiedVidUrl = vidUrl.replace(/(start=)\d+/, `$1${time}`);
    setVidUrl(modifiedVidUrl);
  }, [time, url]);

  useEffect(() => {
    if (videoRef.current && !isNaN(time)) {
      videoRef.current.currentTime = time;
    }
  }, [time]);

  console.log(vidSrc);

  return (
    <div className="embedded-video">
      <h3>Embedded Video</h3>
      {vidUrl ? (
      <iframe
        width="100%"
        height="100%"
        id="embeddedVideo"
        alt="Embedded YouTube Video"
        src={vidUrl}
        allowFullScreen>
      </iframe>
      ) : vidSrc ? (
      <video
        controls
        width="100%"
        height="100%"
        key={vidSrc}
        ref={videoRef}>
        <source src={vidSrc} type="video/mp4" />
      </video>
      ) : (
        <p> No Video Available <i className="fas fa-face-frown"></i></p>
      )}
    </div>
  )
}

export default EmbeddedVideo;