import '../styling/pre-video.css';
import FileDrop from './sub-components/pre/file-drop';
import LinkPaste from './sub-components/pre/link-paste';
import StudyAILogo from '../logos/StudyAI Logo (No Bg).png';

function PreVideo({ setLink, setFile, setTranscriptStatus, setLoadingState }) {
  return (
    <div className="pre-video">
      <div className="header-container">
        <img src={StudyAILogo} alt="StudyAI Logo" className="logo" />
        <h1> StudyAI </h1>
      </div>
      <FileDrop setFile={setFile} setTranscriptStatus={setTranscriptStatus} setLoadingState={setLoadingState} />
      <LinkPaste setLink={setLink} setTranscriptStatus={setTranscriptStatus} setLoadingState={setLoadingState} />
    </div>
  );
}

export default PreVideo;