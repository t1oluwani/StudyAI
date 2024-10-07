import './App.css';
import { useState } from 'react';

import PreVideo from './components/pre-video';
import PostVideo from './components/post-video';

function App() {
  const [URL, setURL] = useState('');
  const [MP4, setMP4] = useState('');
  const [isTranscriptStored, setIsTranscriptStored] = useState(false);

  return (
    <div className="App">
      <PreVideo setLink={setURL} setFile={setMP4} setTranscriptStatus={setIsTranscriptStored}/>
      <PostVideo link={URL} file={MP4} transcriptStatus={isTranscriptStored} setTranscriptStatus={setIsTranscriptStored}/>
    </div>
  );
}

export default App;
