import "../../../styling/chat-side.css";
import { useState, useEffect } from "react";
import MessageList from "./sub-components/message-list";
import { getOpenAIResponse } from "../../../services/openAIService";

function ChatScreen({ transcript }) {
  const [context, setContext] = useState(transcript);
  const [messages, setMessages] = useState([
    { role: "chat", text: 'I’ve got your video ready. What would you like to know?' }, // Initial message
  ]);

  function createMessage(role, text) {
    return { role: role, text: text };
  }

  async function sendMessage() {
    const userMessage = document.getElementById("userMessage").value;
    if (userMessage === "") { return; }

    const newUserMessage = createMessage("user", userMessage);
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    const message = " User: " + userMessage + "; ";
    const response = await getOpenAIResponse(context, message)

    if (response) {
      const newResponseMessage = createMessage("chat", response);
      setMessages(prevMessages => [...prevMessages, newResponseMessage]);
      setContext(context + message + "Response: " + response + ";");
    }

    document.getElementById("userMessage").value = ""; // Clear the input field
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const summarize = async () => {
    const response = await getOpenAIResponse(transcript, " Summarize this video for me.");
    if (response) {
      const newUserMessage = createMessage("user", "Summarize this video.");
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      const newResponseMessage = createMessage("chat", response);
      setMessages(prevMessages => [...prevMessages, newResponseMessage]);
    }
  }
  const quiz = async () => {
    const response = await getOpenAIResponse(transcript, " Give me a quiz on this video.");
    if (response) {
      const newUserMessage = createMessage("user", "Quiz me on this video.");
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      const newResponseMessage = createMessage("chat", response);
      setMessages(prevMessages => [...prevMessages, newResponseMessage]);
    }
  }
  const keyPoints = async () => {
    const response = await getOpenAIResponse(transcript, " Give me the key points of this video.");
    if (response) {
      const newUserMessage = createMessage("user", "Key points of this video.");
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      const newResponseMessage = createMessage("chat", response);
      setMessages(prevMessages => [...prevMessages, newResponseMessage]);
    }
  }

  return (
    <div className="chat-container">
      <MessageList messages={messages} />

      <div className="action-buttons">
        <button id="summarizeBtn" onClick={summarize}>Summarize</button>
        <button id="quizBtn" onClick={quiz}>Quiz Me</button>
        <button id="pointsBtn" onClick={keyPoints}>Key Points</button>
      </div>

      <div className="input-container">
        <input
          type="text"
          id="userMessage"
          onKeyDown={handleKeyDown}
          placeholder="Message StudyAI..." />
        <button
          id="submitBtn"
          onClick={sendMessage}
        >Send</button>
      </div>
    </div>
  );
}

export default ChatScreen;