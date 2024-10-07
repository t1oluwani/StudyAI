

function ChatScreen( {transcript} ) {
  return (
    <div className="chat_container">
        <MessageList />

        <div class="input">
            <input type="text" id="userMessage" placeholder="Message StudyAI..." />
            <button id="submitBtn">Send</button>
        </div>

        <div class="action-buttons">
            <button id="summarizeBtn">Summarize</button>
            <button id="quizBtn">Quiz Me</button>
            <button id="pointsBtn">Key Points</button>
        </div>
    </div>
  );
}

export default ChatScreen;