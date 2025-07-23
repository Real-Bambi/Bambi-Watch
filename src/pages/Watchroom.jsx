import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Copy, MessagesSquare, LogOut } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('https://bambi-watch-api.onrender.com');

function Watchroom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, loading } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!token) {
      toast.error('Please log in');
      navigate('/login');
    }
  }, [loading, token, navigate]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`https://bambi-watch-api.onrender.com/api/v1/rooms/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoom(res.data);

        const msgRes = await axios.get(
          `https://bambi-watch-api.onrender.com/api/v1/rooms/${id}/messages`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(msgRes.data);
      } catch (err) {
        toast.error('Failed to load room or messages');
        navigate('/error');
      }
    };

    if (token) fetchRoom();
  }, [id, token, navigate]);

  useEffect(() => {
    if (!room) return;

    socket.emit('joinRoom', room.id);

    socket.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chatMessage');
      socket.emit('leaveRoom', room.id);
    };
  }, [room]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      username: user?.username || 'Guest',
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    socket.emit('chatMessage', { roomId: room.id, ...newMsg });
    setMessage('');
  };

  if (loading || !token) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-purple-200 bg-[#1e0e2f]">
        Authenticating...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 bg-[#1e0e2f]">
        Room not found or something went wrong.
      </div>
    );
  }

  const videoId = room.videoId;
  const roomLink = `${window.location.origin}/watchroom/${room.id}`;

  return (
    <div className="min-h-screen bg-[#1e0e2f] text-white p-4">
      {/* Room Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-purple-300 mb-2">{room.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold  text-purple-300">Wanna Invite Friends? Just send them this link:</p>
            <span className="px-2 py-1 bg-gray-800 rounded text-blue-400 text-xs break-all max-w-xs overflow-hidden">
              {roomLink}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomLink);
                toast.success('Room link copied!');
              }}
              className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded"
            >
              Copy
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full shadow"
        >
          <LogOut size={16} /> Leave Room
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {/* Video Player */}
        <div className="md:col-span-3 bg-black rounded-lg overflow-hidden shadow">
          {videoId ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={room.name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-red-500 mt-4">Invalid video ID</p>
          )}
        </div>

        {/* Chat Sidebar */}
        <div className="bg-[#2b1e3e] p-3 rounded-lg flex flex-col h-[400px] sm:h-full">
          <h2 className="text-yellow-300 text-sm font-semibold mb-2 flex items-center gap-1">
            <MessagesSquare size={16} /> Live Chat 🌞🕶️🌙
          </h2>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#3d2f57] p-2 rounded-md space-y-2 text-sm">
            {messages.length > 0 ? (
              messages.map((msg, index) => {
                const isSystem = msg.username === 'system';
                const isOwn = msg.username === user?.username;
                return (
                  <div
                    key={index}
                    className={`flex ${isSystem ? 'justify-center' : isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-1 rounded-lg ${
                        isSystem
                          ? 'bg-yellow-500 text-black text-xs font-bold'
                          : isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      {!isSystem && (
                        <span className="block text-xs text-gray-300 font-medium">{msg.username}</span>
                      )}
                      <span>{msg.text}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="italic text-gray-400">No messages yet...</p>
            )}
          </div>

          {/* Message Input */}
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-3 py-2 rounded bg-[#4a3d63] text-white outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchroom;
