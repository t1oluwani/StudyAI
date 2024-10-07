const Message = ({ role, message }) => {
    return (
        <div className={`message ${role}`}>
            {message}
        </div>
    );
};

export default Message;
