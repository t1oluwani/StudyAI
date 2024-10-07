import '../styling/loading-overlay.css';

function LoadingOverlay({ loadingState }) {
  if (loadingState == "") return null;

  const spinnerCount = 7;
  const spinners = Array.from({ length: spinnerCount }, (_, index) => (
    <div className={`spinner spinner-${index + 1}`} key={index}></div>
  ));

  return (
    <div className="loading-overlay">
      <span className="spinner-container">
        {spinners}
      </span>
      <p className="loading-text">{loadingState}</p>
    </div>
  );
}

export default LoadingOverlay;
