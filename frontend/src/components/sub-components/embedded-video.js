function EmbeddedVideo({url}) {
  return (
      <div className="embedded-video">
          <h3>Embedded YouTube Video</h3>
          <iframe width="100%" height="100%" id="embeddedVideo" alt="Refresh Browser" src={url} allowFullScreen></iframe>
      </div>
  )
}

export default EmbeddedVideo;