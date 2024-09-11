import './App.css';
import { useState } from 'react';

import PreVideo from './components/pre-video';
import PostVideo from './components/post-video';

function App() {
  const [URL, setURL] = useState('');

  console.log(URL);

  return (
    <div className="App">
      <PreVideo setLink={setURL}/>
      <PostVideo link={URL}/>
    </div>
  );
}

export default App;
