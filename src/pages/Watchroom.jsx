import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Copy, Send, MessagesSquare } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('https://bambi-watch-api.onrender.com');

function Watchroom() {
  const { id } = useParams(); // roomId
  const navigate = useNavigate();
  const { user, token, loading } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const playerRef = useRef(null);
  const chatRef = useRef(null);

  // Handle auth
  useEffect(() => {
    if (loading) return;
    if (!token) {
      toast.error('Please log in');
      navigate('/login');
    }
  }, [loading, token, navigate]);

  // Fetch room + messages
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`https://bambi-watch-api.onrender.com/api/v1/rooms/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoom(res.data);

        const msgRes = await axios.get(
          `https://bambi-watch-api.onrender.com/api/v1/rooms/${id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(msgRes.data);
      } catch (err) {
        toast.error('Failed to load room or messages');
        navigate('/error');
      }
    };

    if (token) fetchRoom();
  }, [id, token, navigate]);

  // Handle socket events
  useEffect(() => {
    if (!room) return;

    socket.emit('joinRoom', room.id);

    socket.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Video sync handlers
    socket.on('videoControl', ({ type, time }) => {
      if (!playerRef.current) return;
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: type,
          args: type === 'seekTo' ? [time, true] : [],
        }),
        '*'
      );
    });

    return () => {
      socket.off('chatMessage');
      socket.off('videoControl');
      socket.emit('leaveRoom', room.id);
    };
  }, [room]);

  

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

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

  const sendVideoCommand = (type, time = 0) => {
    socket.emit('videoControl', { roomId: room.id, type, time });
  };

  const handleYouTubeReady = () => {
    window.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.event === 'onStateChange') {
        if (data.info === 1) {
          // Play
          sendVideoCommand('playVideo');
        } else if (data.info === 2) {
          // Pause
          sendVideoCommand('pauseVideo');
        }
      }
    });
  };

  if (loading || !token) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-purple-700">
        Authenticating...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Room not found or something went wrong.
      </div>
    );
  }

  const videoId = room.videoId;
  const createdAt = new Date(room.createdAt).toLocaleString();
  const roomLink = `${window.location.origin}/watchroom/${room.id}`;

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-4 sm:p-6 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Video and Room Info */}
        <div className="md:col-span-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2">{room.name}</h1>
          <p className="text-sm text-gray-600 mb-1">
            Created by: <span className="font-semibold">{room.createdBy?.username || 'Unknown'}</span>
          </p>
          <p className="text-sm text-gray-600 mb-3">Created at: {createdAt}</p>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              readOnly
              value={roomLink}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomLink);
                toast.success('Room link copied!');
              }}
              className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              <Copy size={16} /> Copy
            </button>
          </div>

          {videoId ? (
            <div className="relative w-full aspect-video rounded-lg shadow overflow-hidden">
              <iframe
                ref={playerRef}
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`}
                title={room.name}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                onLoad={handleYouTubeReady}
              ></iframe>
            </div>
          ) : (
            <p className="text-red-500 mt-4">Invalid video ID</p>
          )}
        </div>

        {/* Chat Sidebar */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="flex gap-2 items-center text-purple-700 font-bold mb-2">
            <MessagesSquare size={20} /> LIVE CHAT
          </h2>
          <div
            ref={chatRef}
            className="h-64 overflow-y-auto mb-3 p-2 border border-gray-200 rounded"
          >
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <div key={i} className="mb-2 text-sm">
                  <span className="font-semibold text-purple-700">{msg.username}: </span>
                  <span>{msg.text}</span>
                  <span className="text-gray-400 text-xs ml-2">{msg.time}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No messages yet...</p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchroom;
