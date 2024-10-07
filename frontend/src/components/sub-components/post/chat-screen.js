import { useState } from "react";
import "../../../styling/chat-screen.css";
import MessageList from "./sub-components/message-list";
import { getOpenAIResponse } from "../../../services/openAIService";

function ChatScreen({ transcript }) {
  const [messages, setMessages] = useState([
    { role: "user", text: 'Hello!' },
    { role: "chat", text: 'Hi there! How can I help you?' },
    { role: "user", text: 'What is your name?' },
    { role: "chat", text: 'I am a chat bot!' },
  ]);

  // const [context, setContext] = useState(transcript);
  const [context, setContext] = useState("User: Hello!; Response: Hi there! How can I help you?\nUser: What is your name?; Response: I am a chat bot!\n");

  function createMessage(role, text) {
    return { role: role, text: text };
  }

  async function sendMessage() {
    const userMessage = document.getElementById("userMessage").value;
    if (userMessage === "") { return;}

    const newMessage = createMessage("user", userMessage);
    setMessages([...messages, newMessage]);
    console.log("User:", userMessage);

    const message = "User: " + userMessage + "; ";

    const response = await getOpenAIResponse(context, message)

    console.log("1");
    if (response) {
      const newMessage = createMessage("chat", response);
      setMessages([...messages, newMessage]);
      console.log("Response:", response);
      setContext(context + userMessage + "Response: " + response + ";");
      console.log("Context:", context);
    }
    console.log("2");
    
    document.getElementById("userMessage").value = ""; // Clear the input field
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
        <button id="submitBtn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatScreen;