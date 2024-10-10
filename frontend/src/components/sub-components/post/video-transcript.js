import "../../../styling/video-side.css";

function VideoTranscript({ transcript }) {

  console.log("Transcript:", transcript);

  const toDictionary = (array) => { // Convert the transcript array to a dictionary
    if (!(Array.isArray(array))) {
      return {};
    }
    
    return array.reduce((dictionary, { start, text }) => {
      dictionary[start] = text;
      return dictionary;
    }, {});
  }

  const displayTranscript = (transcriptArray) => { // Display the transcript in a readable format
    if (!transcriptArray) {
      return;
    }

    console.log("Array:", transcriptArray);
    const transcriptDict = toDictionary(transcriptArray);
    console.log("Dictionary:", transcriptDict);

    return;
  };

  const displayedTranscript = displayTranscript(transcript)

  return (
    <div className="video-transcript">
      <h3>Video Transcript</h3>
      <p>{displayedTranscript || "No Transcript Provided"}</p>
    </div>
  );
}

export default VideoTranscript;
