import "../../../styling/video-side.css";
import Subtitle from "./sub-components/subtitle";

function VideoTranscript({ transcript }) {

  const toDictionary = (array) => { // Convert the transcript array to a dictionary
    if (!(Array.isArray(array))) {
      return {};
    }

    return array.reduce((dictionary, { start, text }) => {
      dictionary[start] = text;
      return dictionary;
    }, {});
  }

  const transcriptDict = toDictionary(transcript);

  return (
    <div className="video-transcript">
      <h3>Video Transcript</h3>
      <div className="subtitles">
        {Object.entries(transcriptDict).map(([start, text]) => (
          <Subtitle timestamp={start} subtitle={text}/>
        ))}
      </div>
    </div>
  );
}

export default VideoTranscript;
