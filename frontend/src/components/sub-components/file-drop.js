import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function FileDrop( { setFile } ) {
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

  const handleFileUpload = () => {
    const file = document.getElementById('file-input').files[0];
    setFile(file);
    handleFileClear();

    console.log(file);
  }

  return (
    <>
      <div className="file-drop-area">
        <p>
          {fileName ? (<> <FontAwesomeIcon icon={faFile}/> {fileName} </>
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
          <i className="fa-regular fa-circle-xmark"></i>Clear
        </button>
        <button onClick={handleFileUpload} className="file-upload">
          <i className="fa-regular fa-circle-up"></i>Upload
        </button>
      </div>
    </>
  );
}

export default FileDrop;