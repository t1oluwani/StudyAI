import Message from "./message";

const MessageList = () => {
    const messages = [
        { role: "user", text: 'Hello!'},
        { role: "chat", text: 'Hi there! How can I help you?'},
        { role: "user", text: 'What is your name?'},
        { role: "chat", text: 'I am a chat bot!'},
    ];

    return (
        <div className="messages" id="messages">
            {messages.map((msg, index) => (
                <Message key={index} role={msg.role} message={msg.text} />
            ))}
        </div>
    );
};

export default MessageList;
