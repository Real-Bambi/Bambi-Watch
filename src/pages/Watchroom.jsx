import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { apiClient } from '../api/client';
import socket from '../api/socket';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Copy, Send, MessagesSquare } from 'lucide-react';

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-violet-300">Loading...</p>
    </div>
  </div>
);

function Watchroom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [usersWatching, setUsersWatching] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeRooms, setActiveRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const playerRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const isProcessingRemoteCommand = useRef(false);
  const inviteLink = `${window.location.origin}/watchroom/${id}`;

  useEffect(() => {
    const measureHeader = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    measureHeader();
    window.addEventListener('resize', measureHeader);
    return () => {
      window.removeEventListener('resize', measureHeader);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const init = async () => {
      if (loading) return;

      if (!user) {
        toast.error('Please log in to join a watchroom');
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
        navigate('/login');
        return;
      }

      try {
        const roomRes = await apiClient.get(`/rooms/${id}`);
        const messagesRes = await apiClient.get(`/rooms/${id}/messages`);
        if (isMounted) {
          setRoom(roomRes.data);
          setMessages(messagesRes.data);
          socket.auth = { token: localStorage.getItem('token') };
          if (!socket.connected) {
            socket.connect();
          }
          socket.emit('joinRoom', { roomId: id, username: user.username });
          socket.on('chat:message', handleMessage);
          socket.on('room:systemMessage', handleSystemMessage);
          socket.on('room:usersUpdate', ({ count }) => setUsersWatching(count));
          socket.on('video:play', handlePlay);
          socket.on('video:pause', handlePause);
          socket.on('video:seek', handleSeek);
        }
      } catch (err) {
        if (isMounted) {
          if (err.response?.status === 401) {
            toast.error('Session expired. Please log in again.');
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            navigate('/login');
          } else {
            toast.error('Failed to load room or messages.');
            console.error('Watchroom Init Error:', err);
            navigate('/error');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!loading) {
      init();
    }

    return () => {
      isMounted = false;
      socket.off('chat:message', handleMessage);
      socket.off('room:systemMessage', handleSystemMessage);
      socket.off('room:usersUpdate');
      socket.off('video:play', handlePlay);
      socket.off('video:pause', handlePause);
      socket.off('video:seek', handleSeek);
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [id, user, loading, navigate]);

  useEffect(() => {
    const fetchActiveRooms = async () => {
      try {
        const res = await apiClient.get('/rooms/active');
        setActiveRooms(res.data);
      } catch (err) {
        console.error('Failed to get active rooms:', err);
      }
    };
    fetchActiveRooms();
    const interval = setInterval(fetchActiveRooms, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSystemMessage = ({ message, timestamp }) => {
    setMessages((prev) => [...prev, { system: true, message, timestamp }]);
  };

  const handlePlay = ({ time }) => {
    if (playerRef.current) {
      isProcessingRemoteCommand.current = true;
      playerRef.current.seekTo(time, true);
      playerRef.current.playVideo();
      setTimeout(() => {
        isProcessingRemoteCommand.current = false;
      }, 200);
    }
  };

  const handlePause = ({ time }) => {
    if (playerRef.current) {
      isProcessingRemoteCommand.current = true;
      playerRef.current.seekTo(time, true);
      playerRef.current.pauseVideo();
      setTimeout(() => {
        isProcessingRemoteCommand.current = false;
      }, 200);
    }
  };

  const handleSeek = ({ time }) => {
    if (playerRef.current) {
      isProcessingRemoteCommand.current = true;
      playerRef.current.seekTo(time, true);
      setTimeout(() => {
        isProcessingRemoteCommand.current = false;
      }, 200);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!room || !room.videoId) {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      return;
    }

    const createOrUpdatePlayer = () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      playerRef.current = new window.YT.Player('player', {
        videoId: room.videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
        playerVars: {
          enablejsapi: 1,
          origin: window.location.origin,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          autoplay: 0
        },
      });
    };

    const onPlayerStateChange = (event) => {
      const player = playerRef.current;
      if (!player) return;

      if (isProcessingRemoteCommand.current) {
        return;
      }

      const time = player.getCurrentTime();
      if (event.data === window.YT.PlayerState.PLAYING) {
        socket.emit('video:play', { roomId: id, time });
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        socket.emit('video:pause', { roomId: id, time });
      }
    };

    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {
          createOrUpdatePlayer();
        };
      }
    } else {
      createOrUpdatePlayer();
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [room, id]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socket.emit('chat:message', {
      roomId: id,
      message: newMessage,
      userId: user.id,
      username: user.username,
    });
    setNewMessage('');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success('Room link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      toast.error('Copy Failed');
    }
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', { roomId: id, username: user.username });
    socket.disconnect();
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-violet-400 bg-gray-900">
        Authenticating...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400 bg-gray-900">
        Room is loading, please wait...
      </div>
    );
  }

  const videoId = room.videoId;
  const createdAt = new Date(room.createdAt).toLocaleString();

  return (
    <>
      {isLoading && <Loader />}
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6 text-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="mb-4" ref={headerRef}>
              <h1 className="text-2xl sm:text-3xl font-bold text-violet-400 mb-2">{room.name}</h1>
              <p className="text-sm text-gray-400 mb-1">
                Created by: <span className="font-semibold text-violet-300">{room.createdBy?.username || 'Unknown'}</span>
              </p>
              <p className="text-sm text-gray-400 mb-1">Created at: {createdAt}</p>
              <p className="text-sm text-violet-400 font-semibold mb-3">{usersWatching} watching</p>
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="text"
                  readOnly
                  value={inviteLink}
                  className="flex-1 border border-gray-700 rounded-lg px-3 py-1 text-sm bg-gray-800 text-gray-200"
                />
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1 px-3 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 text-sm"
                >
                  <Copy size={16} /> {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={leaveRoom}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Leave Room
                </button>
              </div>
            </div>
            {videoId ? (
              <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden">
                <div id="player" className="absolute top-0 left-0 w-full h-full"></div>
              </div>
            ) : (
              <p className="text-red-400 mt-4">Invalid video ID</p>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-1 flex flex-col"
            style={{ height: headerHeight ? `calc(100vh - ${headerHeight}px - 4rem)` : 'auto' }}
          >
            <h2 className="flex gap-2 items-center text-violet-400 font-bold mb-2">
              <MessagesSquare size={20} /> LIVE CHAT
            </h2>
            <div
              ref={messagesEndRef}
              className="flex-1 overflow-y-auto mb-3 p-2 border border-gray-700 rounded scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            >
              {messages.length > 0 ? (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-2 flex ${
                      msg.system
                        ? 'justify-center'
                        : msg.username === user?.username
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg max-w-[80%] text-sm relative ${
                        msg.system
                          ? 'bg-yellow-900 text-yellow-200 text-center font-semibold text-xs py-1 px-3 rounded-full'
                          : msg.username === user?.username
                          ? 'bg-violet-600 text-white rounded-br-none mr-2'
                          : 'bg-gray-700 text-gray-200 rounded-bl-none ml-2'
                      }`}
                    >
                      {msg.system ? (
                        <div className="text-sm italic">{msg.message}</div>
                      ) : (
                        <>
                          <div
                            className={`font-medium ${
                              msg.username === user?.username
                                ? 'text-violet-200'
                                : 'text-violet-300'
                            } ${msg.username === user?.username ? 'text-right' : 'text-left'} mb-0.5`}
                          >
                            {msg.username}
                          </div>
                          <div>{msg.message}</div>
                          <div className="text-[10px] text-gray-400 text-right mt-1 opacity-80">
                            {formatTime(msg.timestamp || msg.createdAt)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No messages yet...</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-3 py-2 border border-gray-700 rounded-lg text-sm bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          <div className="md:col-span-1 bg-gray-800 p-4 rounded-lg shadow-lg mt-6 md:mt-0">
            <h2 className="text-xl font-bold text-violet-400 mb-3">Other Active Rooms</h2>
            {activeRooms.rooms && activeRooms.rooms.length > 0 ? (
              activeRooms.rooms
                .filter(r => r.roomId !== id)
                .map(r => (
                  <div
                    key={r.roomId}
                    className="bg-gray-700 p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => navigate(`/watchroom/${r.roomId}`)}
                  >
                    <div className="font-semibold text-violet-300">{r.name}</div>
                    <div className="text-sm text-gray-400">{r.usersOnline} watching</div>
                  </div>
                ))
            ) : (
              <div className="text-gray-400 text-sm">No other rooms active.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Watchroom;