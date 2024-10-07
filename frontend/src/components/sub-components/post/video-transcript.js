function VideoTranscript({ transcript }) {
  const displayedTranscript = transcript || "No Transcript Provided";

  return (
    <div className="video-transcript">
      <h3>Video Transcript</h3>
      <p>{displayedTranscript}</p>
    </div>
  );
}

export default VideoTranscript;
