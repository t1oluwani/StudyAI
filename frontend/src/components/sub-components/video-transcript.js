import { useEffect, useState } from 'react';

function VideoTranscript({ transcript }) {
  // const [displayedTranscript, setdisplayedTranscript] = useState("");
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTranscript = async () => {
  //     try {
  //       const loadedTranscript = await transcript;
  //       setdisplayedTranscript(loadedTranscript);

  //     } catch (error) {
  //       console.error("Error fetching transcript:", error);
  //       setdisplayedTranscript("Transcript not available");

  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTranscript();
  // }, [transcript]);

  // if (loading) {
  //   return <p>Loading transcript...</p>;
  // }

  const displayedTranscript = transcript || "No Transcript Provided"; // Direct assignment

  return (
    <div className="video-transcript">
      <h3>Video Transcript</h3>
      <p>{displayedTranscript || "No Transcript Provided"}</p>
    </div>
  );
}

export default VideoTranscript;
