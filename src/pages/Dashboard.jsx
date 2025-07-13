import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaPlay, FaDoorOpen, FaUserPlus, FaSearch, FaBell } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [userName] = useState('Sarah'); // Example username, can be dynamic with auth
  const [searchQuery, setSearchQuery] = useState('');
  const activeRooms = [
    { id: 1, name: 'Movie Night with Squad', status: 'Live', count: 477, image: 'https://via.placeholder.com/300x200?text=Movie+Night' },
    { id: 2, name: 'Study Break Series', status: 'Paused', count: null, image: 'https://via.placeholder.com/300x200?text=Study+Break' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <FaBell className="w-6 h-6 text-gray-600 hover:text-gray-800 transition duration-200" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full border-2 border-purple-500" />
              <span className="text-sm font-medium text-gray-700">{userName}</span>
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Search and Create Room */}
        <div className="flex items-center mb-8 space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, shows, or create a room..."
              className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 shadow-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link
            to="/create-room"
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 shadow-md transform hover:scale-105"
          >
            <FaUserPlus className="w-5 h-5 mr-2" />
            Create Room
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {userName}!</h2>
          <p className="text-gray-600">Ready to watch something amazing with your friends?</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/create-room"
            className="bg-white text-gray-800 p-6 rounded-xl shadow-lg group hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center text-center"
          >
            <FaPlay className="w-8 h-8 mb-2 text-gray-800 group-hover:text-white transition duration-300" />
            <div>
              <h3 className="text-lg font-bold group-hover:text-white transition duration-300">Start Watching</h3>
              <p className="text-sm group-hover:text-white transition duration-300">Create a new room instantly</p>
            </div>
          </Link>
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg group hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center text-center">
            <FaDoorOpen className="w-8 h-8 mb-2 text-gray-800 group-hover:text-white transition duration-300" />
            <div>
              <h3 className="text-lg font-bold group-hover:text-white transition duration-300">Join Room</h3>
              <p className="text-sm group-hover:text-white transition duration-300">Enter a room code</p>
            </div>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg group hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center text-center">
            <FaUserPlus className="w-8 h-8 mb-2 text-gray-800 group-hover:text-white transition duration-300" />
            <div>
              <h3 className="text-lg font-bold group-hover:text-white transition duration-300">Invite Friends</h3>
              <p className="text-sm group-hover:text-white transition duration-300">Share the experience</p>
            </div>
          </div>
        </div>

        {/* Active Rooms */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Active Rooms</h2>
          <Link to="/all-rooms" className="text-purple-600 hover:text-purple-800 transition duration-200">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${room.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {room.status}
                  </span>
                  {room.count && (
                    <span className="text-sm text-gray-600">• {room.count}</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                <div className="flex justify-center mt-4">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200 transform hover:scale-105">
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;