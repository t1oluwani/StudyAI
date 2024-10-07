import './App.css';
import { useState } from 'react';

import PreVideo from './components/pre-video';
import PostVideo from './components/post-video';
import LoadingOverlay from './components/loading';

function App() {
  const [URL, setURL] = useState('');
  const [MP4, setMP4] = useState('');
  const [isTranscriptStored, setIsTranscriptStored] = useState(false);
  const [loadingState, setLoadingState] = useState("");

  return (
    <div className="App">
      <LoadingOverlay loadingState={loadingState} />

      <PreVideo
        setLink={setURL}
        setFile={setMP4}
        setLoadingState={setLoadingState}
        setTranscriptStatus={setIsTranscriptStored} />
      <PostVideo
        link={URL}
        file={MP4}
        setLink={setURL}
        setFile={setMP4}
        transcriptStatus={isTranscriptStored}
        setTranscriptStatus={setIsTranscriptStored}/>
    </div>
  );
}

export default App;
