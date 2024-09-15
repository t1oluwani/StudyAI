import '../styling/pre-video.css';

import FileDrop from './sub-components/file-drop';
import LinkPaste from './sub-components/link-paste';

function PreVideo({ setLink }) {
  return (
    <div className="pre-video">
      <FileDrop/>
      <LinkPaste setLink={setLink}/>
    </div>
  );
}

export default PreVideo;