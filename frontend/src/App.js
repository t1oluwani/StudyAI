import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import PreVideo from './components/pre-video';
import PostVideo from './components/post-video';
import LoadingOverlay from './components/loading';

function App() {
  const [URL, setURL] = useState('');
  const [MP4, setMP4] = useState('');
  const [isTranscriptStored, setIsTranscriptStored] = useState(false);
  const [loadingState, setLoadingState] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PreVideo
              setLink={setURL}
              setFile={setMP4}
              setLoadingState={setLoadingState}
              setTranscriptStatus={setIsTranscriptStored}
            />
          }
        />
        
        <Route
          path="/post-video"
          element={
            <PostVideo
              link={URL}
              file={MP4}
              setLink={setURL}
              setFile={setMP4}
              transcriptStatus={isTranscriptStored}
              setTranscriptStatus={setIsTranscriptStored}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
