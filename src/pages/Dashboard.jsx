import React, { useState } from 'react';
import { Link } from 'react-router';
import useSWR from 'swr';
import { FaBell, FaSearch, FaPlayCircle, FaDoorOpen } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import CreateRoomModal from '../components/CreateRoomModal';
import { apiClient } from '../../api/client';
import { toast } from 'react-toastify';
import UserImage from '../assets/User.png';

const fetcher = (url) =>
  apiClient
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => res.data);

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const { data: userData } = useSWR('/users/me', fetcher);
  const { data, error, isLoading } = useSWR('/rooms/active', fetcher);

  const activeRooms = data?.rooms || [];

  const username = userData?.username || 'Guest';
  const profileImg = userData?.avatarUrl || UserImage;

  const yourVideos = [
    { id: 1, title: 'Reason to start coding', image: 'https://www.youtube.com/shorts/yETfkVksrxA' },
    { id: 2, title: 'AniRoll', image: 'https://www.youtube.com/watch?v=n4K1xMdRRWY' },
    { id: 3, title: 'Become a full-stack developer', image: 'https://www.youtube.com/shorts/nnG-DHWvTWM' },
  ];

  const handleJoinRoom = () => {
    if (!inviteLink.trim()) {
      toast.error('Please enter a valid invite link');
      return;
    }
    window.open(inviteLink, '_blank');
    setInviteLink('');
    setShowJoinModal(false);
    toast.success('Opening room...');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rooms, movies..."
              className="p-2 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <FaBell className="w-6 h-6 text-gray-600" />
            <img
              src={profileImg}
              alt="User Avatar"
              className="w-15 h-15 rounded-full border-2 border-purple-500"
            />
          </div>
        </header>

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {username}!</h1>
          <p className="text-gray-600">Discover or create your next watch room now.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <button
            onClick={() => setShowCreateRoomModal(true)}
            className="flex flex-col items-center justify-center bg-purple-600 text-white rounded-xl p-6 shadow-lg hover:scale-105 transition"
          >
            <FaPlayCircle className="w-12 h-12 mb-2" />
            <span className="font-semibold">Start a Room</span>
          </button>
          <button
            onClick={() => setShowJoinModal(true)}
            className="flex flex-col items-center justify-center bg-indigo-600 text-white rounded-xl p-6 shadow-lg hover:scale-105 transition"
          >
            <FaDoorOpen className="w-12 h-12 mb-2" />
            <span className="font-semibold">Join a Room</span>
          </button>
        </section>

        <section id="active-rooms" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Active Rooms</h2>
            <Link to="#all-rooms" className="text-purple-600 hover:text-purple-800">
              View All
            </Link>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Loading active rooms...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load rooms</p>
          ) : activeRooms.length === 0 ? (
            <p className="text-gray-400">No active rooms available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeRooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  <img
                    src={room.thumbnail}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          room.status === 'Live'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {room.status || 'Active'}
                      </span>
                      {room.participantCount && (
                        <span className="text-sm text-gray-500">{room.participantCount} viewers</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">{room.name}</h3>
                    <Link
                      to={-1}
                      className="block text-center mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                      Join Room
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {yourVideos.map((video) => {
              const videoId = getYouTubeVideoId(video.image);
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
              return (
                <a
                  key={video.id}
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:scale-105"
                >
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{video.title}</h3>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Join Room Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Join a Room</h2>
              <input
                type="text"
                placeholder="Enter your invite link"
                value={inviteLink}
                onChange={(e) => setInviteLink(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleJoinRoom}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                Join Room
              </button>
              <button
                onClick={() => setShowJoinModal(false)}
                className="mt-2 text-sm text-gray-500 hover:underline w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <CreateRoomModal
          isOpen={showCreateRoomModal}
          onClose={() => setShowCreateRoomModal(false)}
        />
      </div>
    </div>
  );
}

export default Dashboard;
