import React, { useEffect, useState, useContext, useRef } from 'react';
import { apiClient } from "../api/client";
import socket from "../api/socket";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams, useNavigate } from "react-router";
import { Video, Users, Share2, Copy, Facebook, Instagram, MessagesSquare, Send, Mail, Search } from "lucide-react";


const formatTime = (isoString) => {
  const date = new Date(isoString); 
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

import YouTubePlayer from "../components/YoutubePlayer";

const ChatSidebar = () => {
  return (
    <div className="p-4 flex flex-col h-full bg-[#2d3748] rounded-lg shadow-lg">
      <h2 className='flex items-center gap-2 text-white font-bold text-lg sm:text-xl mb-4'>
        <MessagesSquare className='size-6 sm:size-7 text-white' /> LIVE CHAT
      </h2>

      <div className='font-semibold text-gray-300 flex-1 overflow-y-auto mb-4 text-sm sm:text-base'>
        Chat messages will appear here...
      </div>

      <div className='flex gap-2 w-full'>
        <input
          type="text"
          placeholder="Type your message..."
          className='flex-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     text-sm sm:text-base'
        />
        <button
          className='p-2 rounded-full bg-blue-500 text-white outline-none border-0 
                     hover:bg-blue-600 transition-colors flex-shrink-0'
        >
          <Send className='size-6 sm:size-7' />
        </button>
      </div>
    </div>
  );
};


  
function WatchRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

 
  const [room, setRoom] = useState(null); 
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState("");
  const [usersWatching, setUsersWatching] = useState(0); 
  const [copied, setCopied] = useState(false); 

  
  const messagesEndRef = useRef(null); 
  const playerRef = useRef(null); 
  const inviteLink = `${window.location.origin}/watchroom/${id}`;

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    
    const measureHeader = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    measureHeader(); 
    window.addEventListener('resize', measureHeader);

    // Cleanup function: This runs when the component unmounts
    return () => {
      window.removeEventListener('resize', measureHeader);
    };
  }, []); 

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const roomRes = await apiClient.get(`/rooms/${id}`);
        const messagesRes = await apiClient.get(`/rooms/${id}/messages`);

        if (isMounted) {
          setRoom(roomRes.data);
          setMessages(messagesRes.data);

          socket.auth = { token: localStorage.getItem("token") };
          socket.connect();
          socket.emit("joinRoom", { roomId: id, username: user.username });

          socket.on("chat:message", handleMessage);
          socket.on("room:systemMessage", handleSystemMessage);
          socket.on("room:usersUpdate", ({ count }) => setUsersWatching(count));
          socket.on("video:play", handlePlay);
          socket.on("video:pause", handlePause);
          socket.on("video:seek", handleSeek);
        }
      } catch (err) {
        console.error(err);
      }
    };

    init(); 

    return () => {
      isMounted = false; 
      socket.off("chat:message", handleMessage);
      socket.off("room:systemMessage", handleSystemMessage);
      socket.off("room:usersUpdate");
      socket.off("video:play", handlePlay);
      socket.off("video:pause", handlePause);
      socket.off("video:seek", handleSeek);
      socket.disconnect();
    };
  }, [id, user.username]); 

  const handleMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSystemMessage = ({ message, timestamp }) => {
    setMessages((prev) => [...prev, { system: true, message, timestamp }]);
  };

  const handlePlay = ({ time }) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true); 
      playerRef.current.playVideo();
    }
  };

  const handlePause = ({ time }) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      playerRef.current.pauseVideo();
    }
  };

  const handleSeek = ({ time }) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!room) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        videoId: room.videoId, 
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const onPlayerStateChange = (event) => {
      const player = playerRef.current;
      if (!player) return;
      const time = player.getCurrentTime();
      if (event.data === window.YT.PlayerState.PLAYING) {
        socket.emit("video:play", { roomId: id, time });
      }
      if (event.data === window.YT.PlayerState.PLAYING) {
        socket.emit("video:play", { roomId: id, time });
      }
      if (event.data === window.YT.PlayerState.PAUSED) {
        socket.emit("video:pause", { roomId: id, time });
      }
      if (event.data === window.YT.PlayerState.BUFFERING && player.getCurrentTime() !== time) {
         socket.emit("video:seek", { roomId: id, time: player.getCurrentTime() });
      }
    };

    return () => {
      // Clear the global YouTube API ready function to prevent issues if component unmounts and remounts
      window.onYouTubeIframeAPIReady = null;
    };
  }, [room, id]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("chat:message", {
        roomId: id,
        message: newMessage,
        userId: user.id,
        username: user.username,
      });
      setNewMessage("");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true); 
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const leaveRoom = () => {
    socket.disconnect();
    navigate("/dashboard");
  };

  
return (
    <div className="flex flex-col min-h-screen bg-[#1F2937] text-white">
      <header className="flex justify-between items-center p-4 bg-[#111827] shadow-md">
        <div className="flex items-center gap-2">
          <Video className="text-[#6366F1] size-8 sm:size-10" />
          <h1 className="text-xl sm:text-3xl font-bold italic">WatchTogether</h1>
          <button className="bg-[#395563] text-white py-1 px-2 text-xs sm:text-[15px] ml-2 sm:ml-4 rounded-xl flex items-center gap-1 font-semibold">
            <Users className="text-green-500 size-3 sm:size-4" /> 0 Viewers
          </button>
        </div>
        <button
          onClick={openModal}
          className="bg-[#3b82f6] text-white py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-[#2563eb] transition-colors flex items-center text-sm sm:text-base"
        >
          <Share2 className="size-4 sm:size-5 mr-1 sm:mr-2" /> Invite Friends
        </button>
      </header>

      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <section className="flex-1 p-4 overflow-y-auto lg:w-3/4">
          <div className="bg-[#2D3748] aspect-video w-full rounded-lg overflow-hidden">
            <YouTubePlayer videoId={videoId} />
          </div>
        </section>

        <aside className="w-full lg:w-1/4 p-4 min-h-[400px] lg:min-h-0">
          <ChatSidebar />
        </aside>
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >

          <div
            className="bg-white text-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4">Invite Friends</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Copy link below
              </label>
              <div className="flex items-center space-x-2">
                <input type="text" readOnly value={roomLink} className="flex-1 border-gray-500 bg-blue-100 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={handleCopyLink} className="bg-blue-600 text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition-colors relative">  {isCopied ? (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">Copied!</span>  ) : null}
                  <Copy className="h-5 w-5" /> 
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Or share on social media</p>
              <div className="flex items-center space-x-4">
  
                <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="bg-blue-400 text-white rounded-full p-2 hover:bg-blue-500 transition-colors">
                 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 6l-7 7-7-7" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7-7-7" />
                  </svg>
                </button>
                <button className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchRoom;