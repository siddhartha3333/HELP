import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000/chat'); // Connect to the chat namespace

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect(); // Cleanup on component unmount
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { text: newMessage, timestamp: new Date() };
      socket.emit('send_message', message); // Send the message
      setNewMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <span>{msg.timestamp}</span>: <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
