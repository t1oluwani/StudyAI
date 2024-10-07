import "../../../styling/chat-screen.css";
import { useState, useEffect } from "react";
import MessageList from "./sub-components/message-list";
import { getOpenAIResponse } from "../../../services/openAIService";

function ChatScreen({ transcript }) {
  const [messages, setMessages] = useState([
    { role: "user", text: 'Hello!' },
    { role: "chat", text: 'Hi there! How can I help you?' },
    { role: "user", text: 'What is your name?' },
    { role: "chat", text: 'I am a chat bot!' },
  ]);
  console.log(messages)

  const [context, setContext] = useState("");

  useEffect(() => { // Update context when transcript changes
    if (!context) { 
      if (transcript) { 
        setContext(transcript); 
      } else { 
        setContext("Hi! I am a chat bot!"); 
      }
      return;
    }
  }, [transcript]);

  function createMessage(role, text) {
    return { role: role, text: text };
  }

  async function sendMessage() {
    const userMessage = document.getElementById("userMessage").value;
    if (userMessage === "") { return;}

    const newMessage = createMessage("user", userMessage);
    setMessages([...messages, newMessage]);

    const message = " User: " + userMessage + "; ";
    const response = await getOpenAIResponse(context, message)

    if (response) {
      const newResponse = createMessage("chat", response);
      setMessages([...messages, newResponse]);
      setContext(context + message + "Response: " + response + ";");
    }
    
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