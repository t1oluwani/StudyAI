import '../styling/pre-video.css';

import FileDrop from './sub-components/file-drop';
import LinkPaste from './sub-components/link-paste';

function PreVideo({ setLink, setFile }) {
  return (
    <div className="pre-video">
      <FileDrop setFile={setFile}/>
      <LinkPaste setLink={setLink}/>
    </div>
  );
}

export default PreVideo;