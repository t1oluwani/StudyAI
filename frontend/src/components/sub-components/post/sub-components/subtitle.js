function Subtitle({ timestamp, subtitle, handleClick }) {

  return (
    <a className="subtitle-text" onClick={() => handleClick(timestamp)}>
      {subtitle}
    </a>
  );
}

export default Subtitle;
