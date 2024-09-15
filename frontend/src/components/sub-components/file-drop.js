import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FileDrop() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const handleFileClear = () => {
    setFileName('');
    document.getElementById('file-input').value = '';
  }

  return (
    <>
      <div className="file-drop-area">
        <p>
          {fileName ? (<> <FontAwesomeIcon icon="fa-solid fa-file"/> {fileName} </>
          ) : (
            'Drop files here or Click to Upload'
          )}
        </p>
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
    </>
  );
}

export default FileDrop;