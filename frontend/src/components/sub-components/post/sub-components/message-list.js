import Message from "./message";

const MessageList = ( {messages} ) => {
    return (
        <div className="messages" id="messages">
            {messages.map((msg, index) => (
                <Message key={index} role={msg.role} message={msg.text} />
            ))}
        </div>
    );
};

export default MessageList;
