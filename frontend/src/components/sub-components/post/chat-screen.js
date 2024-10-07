import "../../../styling/chat-screen.css";
import { useState, useEffect } from "react";
import MessageList from "./sub-components/message-list";
import { getOpenAIResponse } from "../../../services/openAIService";

function ChatScreen({ transcript }) {
  const [messages, setMessages] = useState([
    { role: "chat", text: 'I’ve got your video ready. What would you like to know?' },
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