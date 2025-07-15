import React from 'react';
import { Link } from 'react-router';
import { FaPlay, FaHome, FaHistory, FaCog } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center text-white mr-2">
          <FaPlay className="w-6 h-6" />
        </div>
       <Link to="/"><h1 className="text-2xl font-bold text-gray-800">Bambi Watch</h1></Link>
      </div>
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center p-2 text-purple-800 bg-purple-200 rounded-lg transition duration-200"
        >
          <FaHome className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-lg transition duration-200 hover:text-purple-800"
        >
          <FaHistory className="w-5 h-5 mr-3" />
          Watch History
        </Link>
        <Link
          to="/profile"
          className="flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-lg transition duration-200 hover:text-purple-800"
        >
          <FaCog className="w-5 h-5 mr-3" />
          Settings
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;