// src/pages/ChatPage.js
import React, { useState } from 'react';
import NavBar from '../components/Global/NavBar';
import SideBar from '../components/Global/SideBar';
import '../styles/ChatPage.css'; // You can add your styles later

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Coach', content: 'Hello, how was your workout?' },
    { id: 2, sender: 'Athlete', content: 'It went great! I feel stronger.' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'Coach',  // Replace with dynamic sender in future
        content: message
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-page">
      <SideBar />
      <NavBar />
      <h1>Chat Page</h1>
      <div className="chat-window">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'Coach' ? 'sent' : 'received'}`}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="chat-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;