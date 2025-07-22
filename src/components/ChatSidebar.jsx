import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessagesSquare, Send } from "lucide-react";

const ChatSidebar = ({ roomId, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch chat history when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`https://bambi-watch-api.onrender.com/api/v1/rooms/${roomId}/messages`);
        setMessages(res.data || []);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    if (roomId) fetchMessages();
  }, [roomId]);

  // Listen for new messages from socket
  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  // Send message to socket + API
  const handleSend = async () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      user: currentUser?.username || 'Anonymous',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      // Send via socket
      socket.emit('sendMessage', { roomId, ...messageData });

      // Save to backend
      await axios.post(`https://bambi-watch-api.onrender.com/api/v1/rooms/${roomId}/messages`, messageData);

      setMessages([...messages, messageData]);
      setNewMessage('');
    } catch (err) {
      console.error('Message send error:', err);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white p-4 rounded-lg h-full flex flex-col w-full sm:w-80">
      <h2 className="flex items-center gap-2 font-bold text-lg mb-3">
        <MessagesSquare className="size-6 text-[#2D3748]" />
        Live Chat
      </h2>

      <div className="flex-1 overflow-y-auto bg-[#2a2e35] p-3 rounded-lg mb-4 max-h-96 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold text-purple-400">{msg.user}: </span>
              <span>{msg.text}</span>
            </div>
          ))
        ) : (
          <p className="italic text-gray-400">No messages yet...</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-[#2a2e35] text-white outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-lg bg-[#2D3748] hover:bg-[#415468]"
        >
          <Send className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
