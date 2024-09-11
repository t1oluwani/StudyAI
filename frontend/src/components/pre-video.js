import '../styling/pre-video.css';
import { useState } from 'react';

function PreVideo({ setLink }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const link = event.target.value;
      setLink(link);
      handleLinkClear();
    }
  }

  const handleFileClear = () => {
    setFileName('');
    document.getElementById('file-input').value = '';
  }
  const handleLinkClear = () => {
    document.getElementById('youtube-input').value = '';
  };

  return (
    <div className="pre-video">
      <div className="file-drop-area">
        <p>{fileName ? `Selected: ${fileName}` : 'Drop files here or Click to Upload'}</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          id="file-input"
        />
      </div>

      <div className='buttons'>
        <button onClick={handleFileClear} className="file-clear">
          <i class="fa-regular fa-circle-xmark"></i>Clear
        </button>
        <button className="file-upload">
          <i class="fa-regular fa-circle-up"></i>Upload
        </button>
      </div>

      <input
        type="text"
        placeholder="Insert YouTube link here"
        onKeyDown={handleKeyDown}
        className="youtube-input"
        id="youtube-input"
      />
    </div>
  );
}

export default PreVideo;