import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaPlay, FaHome, FaHistory, FaQuestionCircle, FaVideo, FaBars } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      <aside className={`h-screen bg-white shadow-lg flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 focus:outline-none border-b border-gray-200 flex justify-end"
        >
          <FaBars className="w-6 h-6 text-gray-600" />
        </button>

        {/* Logo and Company Name */}
        <div className={`flex items-center ${isOpen ? 'p-6' : 'p-4'} border-b border-gray-200`}>        
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
            <FaPlay className="w-6 h-6" />
          </div>
          {isOpen && (
            <Link to="/" className="ml-3 text-2xl font-bold text-gray-800 leading-tight">
              Bambi Watch
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center p-3 text-purple-800 bg-purple-200 rounded-lg transition duration-200 hover:bg-purple-300">
            <FaHome className="w-5 h-5" />
            {isOpen && <span className="ml-3">Dashboard</span>}
          </Link>
          <a href="#active-rooms" className="flex items-center p-3 text-gray-700 hover:bg-purple-100 rounded-lg transition duration-200 hover:text-purple-800">
            <FaVideo className="w-5 h-5" />
            {isOpen && <span className="ml-3">My Rooms</span>}
          </a>
          <Link to="/profile" className="flex items-center p-3 text-gray-700 hover:bg-purple-100 rounded-lg transition duration-200 hover:text-purple-800">
            <FaHistory className="w-5 h-5" />
            {isOpen && <span className="ml-3">Watch History</span>}
          </Link>
          <button onClick={() => setShowHelpModal(true)} className="flex items-center w-full p-3 text-gray-700 hover:bg-purple-100 rounded-lg transition duration-200 hover:text-purple-800">
            <FaQuestionCircle className="w-5 h-5" />
            {isOpen && <span className="ml-3">Help</span>}
          </button>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
            © 2025 Bambi Watch. All rights reserved.
          </div>
        )}
      </aside>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">How to Use Bambi Watch</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Create an account</li>
              <li>Log in to your account</li>
              <li>Click on "Create Room"</li>
              <li>Enter the name of your room</li>
              <li>Paste your YouTube URL</li>
              <li>Click on "Create Room" to start watching</li>
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
