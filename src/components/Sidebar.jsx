import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  FaPlay,
  FaHome,
  FaHistory,
  FaQuestionCircle,
  FaVideo,
  FaBars,
  FaSignOutAlt,
  FaCog,
} from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
    
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-md shadow-lg md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FaBars className="w-6 h-6" />
      </button>

     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

     
      <aside
        className={`fixed top-0 left-0 h-full bg-white z-50 shadow-lg w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}
      >
        
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>

        
        <div className="flex items-center p-6 border-b">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
            <FaPlay className="w-6 h-6" />
          </div>
          <Link to="/" className="ml-3 text-2xl font-bold text-gray-800 hidden md:block">
            Bambi Watch
          </Link>
        </div>

        
        <nav className="p-4 space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center p-3 text-purple-800 bg-purple-200 rounded-lg hover:bg-purple-300"
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </Link>

          <a
            href="#active-rooms"
            className="flex items-center p-3 text-gray-700 hover:bg-purple-100 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <FaVideo className="w-5 h-5" />
            <span className="ml-3">My Rooms</span>
          </a>

          <Link
            to="/profile"
            className="flex items-center p-3 text-gray-700 hover:bg-purple-100 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <FaCog className="w-5 h-5" />
            <span className="ml-3">Settings</span>
          </Link>

          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center w-full p-3 text-gray-700 hover:bg-purple-100 rounded-lg"
          >
            <FaQuestionCircle className="w-5 h-5" />
            <span className="ml-3">Help</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-100 rounded-lg mt-4"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>

        
        <div className="p-4 border-t text-center text-xs text-gray-400 hidden md:block">
          © 2025 Bambi Watch. All rights reserved.
        </div>
      </aside>

      
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">How to Use Bambi Watch</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Create an account</li>
              <li>Log in to your account</li>
              <li>Click on "Create Room"</li>
              <li>Enter the room name</li>
              <li>Paste your YouTube URL</li>
              <li>Click "Create Room" to watch together</li>
            </ul>
            <Link
              to="/contact"
              className="block mt-4 bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700"
            >
              Contact Us
            </Link>
            <button
              onClick={() => setShowHelpModal(false)}
              className="mt-2 text-sm text-gray-600 hover:text-gray-800 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
