import "../../../styling/video-side.css";
import Subtitle from "./sub-components/subtitle.js";

function VideoTranscript({ transcript, handleClick }) {

  return (
    <div className="video-transcript">
      <h3>Video Transcript</h3>
      <div className="subtitles">
        {Object.entries(transcript).map(([start, text]) => (
          <Subtitle key={start} timestamp={start} subtitle={text} handleClick={handleClick}/>
        ))}
      </div>
    </div>
  );
}

export default VideoTranscript;
