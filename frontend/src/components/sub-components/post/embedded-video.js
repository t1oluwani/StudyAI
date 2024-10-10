import "../../../styling/video-side.css";
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EmbeddedVideo({ url, mp4, time}) {
  const [vidUrl, setVidUrl] = useState(url); // Initialize with the original URL
  const [videoSrc, setVideoSrc] = useState('');
  const videoRef = useRef(null);
  const vidName = mp4.name;
  const vidPath = '/videos/' + vidName;
  console.log("Video Path:", vidPath)

  // Update the video URL when the time changes
  useEffect(() => {
    if (url) {
      setVidUrl(`${url}?start=${time}`);
    }
    const modifiedVidUrl = vidUrl.replace(/(start=)\d+/, `$1${time}`);
    setVidUrl(modifiedVidUrl);
  }, [time, url]);

  console.log("MP4:", mp4);
  // Update the video time when the time changes
  // useEffect(() => {
  //   if (videoRef.current && !isNaN(currTime)) {
  //     videoRef.current.currentTime = currTime;
  //   }
  // }, [currTime]);

 

  return (
    <div className="embedded-video">
      <h3>Embedded Video</h3>
      {/* {url ? ( */}
      {/* <iframe
        width="100%"
        height="100%"
        id="embeddedVideo"
        alt="Embedded YouTube Video"
        src={vidUrl}
        allowFullScreen>
      </iframe> */}
      {/* ) : mp4 ? ( */}
        <video width="100%" height="100%" controls ref={videoRef}>
          <source src={vidPath} type="video/mp4" />
        </video>
      {/* ) : (
        <p> No Video Available <i className="fas fa-face-frown"></i></p>
      )} */}
    </div>
  )
}

export default EmbeddedVideo;