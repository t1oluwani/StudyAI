import '../styling/pre-video.css';

import FileDrop from './sub-components/pre/file-drop';
import LinkPaste from './sub-components/pre/link-paste';

function PreVideo({ setLink, setFile, setTranscriptStatus }) {
  return (
    <div className="pre-video">
      <FileDrop setFile={setFile} setTranscriptStatus={setTranscriptStatus}/>
      <LinkPaste setLink={setLink} setTranscriptStatus={setTranscriptStatus}/>
    </div>
  );
}

export default PreVideo;