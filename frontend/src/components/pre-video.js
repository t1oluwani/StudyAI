import '../styling/pre-video.css';
import FileDrop from './sub-components/pre/file-drop';
import LinkPaste from './sub-components/pre/link-paste';

function PreVideo({ setLink, setFile, setTranscriptStatus, setLoadingState }) {
  return (
    <div className="pre-video">
      <FileDrop setFile={setFile} setTranscriptStatus={setTranscriptStatus} setLoadingState={setLoadingState}/>
      <LinkPaste setLink={setLink} setTranscriptStatus={setTranscriptStatus} setLoadingState={setLoadingState}/>
    </div>
  );
}

export default PreVideo;