import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import SearchBox from '../../components/common/SearchBox'; // Importing the SearchBox component
import './ChatPage.css';

/**
 * ChatPage component - Displays a chat interface where users can search, select, and chat with contacts.
 */
const ChatPage = () => {
  const dummyChats = [
    {
      id: 1, 
      name: 'John Doe', 
      messages: [
        'This is my chat page.', 
        'No there is no API for storing conversations.', 
        'No this isn\'t functional at all.', 
        'Was I being lazy?', 
        'Perhaps', 
        'But it ain\'t in the criteriaaa', 
        'And I still gave you a pretty, albeit static, page', 
        'The message box is functional so feel free to chat to yourself.'
      ]
    },
    {
      id: 2, 
      name: 'Jane Smith', 
      messages: [
        'When is the next session?', 
        'You have a calendar for a reason, are you dumb?'
      ]
    },
    {
      id: 3, 
      name: 'Chris Evans', 
      messages: [
        'Can we reschedule?', 
        'Why, did you decide to have a big night out?', 
        'No, it\'s just awkward since we broke up yesterday...', 
        'Ohhh, why don\'t you just run to your new boyfriend?', 
        'Fine', 'Fine', 'Bye', 'Cry harder'
      ]
    }
  ];

  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);  // Default selected chat
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);  // Ref to scroll to the bottom of messages

  // Scroll to bottom whenever a new message is sent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat.messages]);

  // Filter chats based on the search query
  const filteredChats = dummyChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Handle sending a new message
   * @param {Object} e - The event object from the form submission
   */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== '') {
      const updatedMessages = [...selectedChat.messages, messageInput];
      setSelectedChat({ ...selectedChat, messages: updatedMessages });
      setMessageInput(''); // Clear the input after sending
    }
  };

  return (
    <div className="chat-page">
      <SideBar />
      <NavBar />

      <div className="chat-container">
        {/* Chat Sidebar */}
        <div className="chat-sidebar">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search user"
          />
          <div className="chat-list">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${chat.id === selectedChat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                {chat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-header">
            <h3>{selectedChat.name}</h3>
          </div>
          <div className="chat-messages">
            {selectedChat.messages.map((message, index) => (
              <div key={index} className={`chat-message ${index % 2 === 0 ? 'received' : 'sent'}`}>
                {message}
              </div>
            ))}
            <div ref={messagesEndRef} />  {/* Ensures auto-scroll to bottom */}
          </div>
          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
