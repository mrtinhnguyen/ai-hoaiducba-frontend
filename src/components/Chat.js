import { useState } from "react";

function Chat() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        if (!message) return;

        const userMessage = { sender: "user", text: message };
        setChatHistory([...chatHistory, userMessage]);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        const botMessage = { sender: "bot", text: data.reply };

        setChatHistory([...chatHistory, userMessage, botMessage]);
        setMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {chatHistory.map((msg, index) => (
                    <p key={index} className={msg.sender}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage}>Gửi</button>
        </div>
    );
}

export default Chat;