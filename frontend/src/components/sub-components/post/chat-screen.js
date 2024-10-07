import "../../../styling/chat-screen.css";
import MessageList from "./sub-components/message-list";

function ChatScreen({ transcript }) {
  const messages = [
    { role: "user", text: 'Hello!' },
    { role: "chat", text: 'Hi there! How can I help you?' },
    { role: "user", text: 'What is your name?' },
    { role: "chat", text: 'I am a chat bot!' },
  ];

  function createMessage(role, text) {
    return { role: role, text: text };
  }

  return (
    <div className="chat-container">
      <MessageList messages={messages} />

      <div className="action-buttons">
        <button id="summarizeBtn">Summarize</button>
        <button id="quizBtn">Quiz Me</button>
        <button id="pointsBtn">Key Points</button>
      </div>
      
      <div className="input-container">
        <input type="text" id="userMessage" placeholder="Message StudyAI..." />
        <button id="submitBtn">Send</button>
      </div>
    </div>
  );
}

export default ChatScreen;