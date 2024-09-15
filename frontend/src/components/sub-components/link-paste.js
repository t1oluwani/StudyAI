function LinkPaste( {setLink} ) {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const link = event.target.value;
      setLink(link);
      handleLinkClear();
    }
  }

  const handleLinkClear = () => {
    document.getElementById('youtube-input').value = '';
  };

  return (
    <>
      <input
        type="text"
        placeholder="Insert YouTube link here"
        onKeyDown={handleKeyDown}
        className="youtube-input"
        id="youtube-input"
      />
    </>
  );
}

export default LinkPaste;