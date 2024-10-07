import '../styling/loading-overlay.css';

function LoadingOverlay({ loadingState }) {
  if (loadingState == "") return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p className="loading-text">{loadingState}</p>
    </div>
  );
}

export default LoadingOverlay;
