import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaBell, FaSearch, FaPlayCircle, FaDoorOpen } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import CreateRoomModal from '../components/CreateRoomModal';

function Dashboard() {
  const [userName] = useState('Sarah');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  const activeRooms = [
    {
      id: 1,
      name: 'Movie Night with Squad',
      status: 'Live',
      count: 477,
      image: 'https://via.placeholder.com/300x200?text=Movie+Night',
    },
    {
      id: 2,
      name: 'Study Break Series',
      status: 'Paused',
      count: null,
      image: 'https://via.placeholder.com/300x200?text=Study+Break',
    },
  ];

  const yourVideos = [
    { id: 1, title: 'My Vlog #1', image: 'https://via.placeholder.com/300x200?text=Vlog+1' },
    { id: 2, title: 'React Tutorial', image: 'https://via.placeholder.com/300x200?text=React+Tutorial' },
    { id: 3, title: 'Behind The Scenes', image: 'https://via.placeholder.com/300x200?text=Behind+Scenes' },
  ];

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
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-purple-500"
            />
          </div>
        </header>

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {userName}!</h1>
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
          <Link
            to="/join-room"
            className="flex flex-col items-center justify-center bg-indigo-600 text-white rounded-xl p-6 shadow-lg hover:scale-105 transition"
          >
            <FaDoorOpen className="w-12 h-12 mb-2" />
            <span className="font-semibold">Join a Room</span>
          </Link>
        </section>

        <section id="active-rooms" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Active Rooms</h2>
            <Link to="/all-rooms" className="text-purple-600 hover:text-purple-800">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${room.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{room.status}</span>
                    {room.count && <span className="text-sm text-gray-500">{room.count} viewers</span>}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{room.name}</h3>
                  <Link
                    to={`/room/${room.id}`}
                    className="block text-center mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                  >
                    Join Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {yourVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                <img src={video.image} alt={video.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CreateRoomModal isOpen={showCreateRoomModal} onClose={() => setShowCreateRoomModal(false)} />
      </div>
    </div>
  );
}

export default Dashboard;
