function Subtitle({ timestamp, subtitle }) {

  return (
    <a className="subtitle-text" onClick={() => handleClick(parseFloat(timestamp))}>
      {subtitle}
    </a>
  );
}

export default Subtitle;
