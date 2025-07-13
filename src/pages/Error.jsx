import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaPlus, FaQuestionCircle, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Error() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center p-6 overflow-hidden">
        <div className="relative max-w-3xl w-full text-center bg-white border-2 border-teal-300 rounded-2xl shadow-xl p-10 transform hover:scale-102 transition duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-teal-300 opacity-75"></div>
          <h1 className="text-7xl font-extrabold text-teal-600 mb-4">404</h1>
          <h2 className="text-4xl font-serif text-gray-800 mb-6">Oops! The show must not go on...</h2>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-md mx-auto">
          It looks like the page you're looking for has gone offline. Don't worry, your friends are still waiting for you in the virtual cinema!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <Link
            to="/"
            className="flex items-center justify-center bg-teal-400 text-white py-4 px-8 rounded-lg font-semibold hover:bg-teal-500 transition duration-300 transform hover:-translate-y-2 shadow-md"
          >
            <FaHome className="w-6 h-6 mr-3" />
            Return to Home
          </Link>
          <Link
            to="/create-room"
            className="flex items-center justify-center bg-rose-400 text-white py-4 px-8 rounded-lg font-semibold hover:bg-rose-500 transition duration-300 transform hover:-translate-y-2 shadow-md"
          >
            <FaPlus className="w-6 h-6 mr-3" />
            Create a New Room
          </Link>
          <a
            href="/support"
            className="flex items-center justify-center bg-indigo-400 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-500 transition duration-300 transform hover:-translate-y-2 shadow-md"
          >
            <FaQuestionCircle className="w-6 h-6 mr-3" />
            Seek Assistance
          </a>
        </div>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-teal-400 text-white rounded-full font-bold hover:bg-teal-500 transition duration-300 shadow-lg transform hover:-translate-y-2"
        >
          <FaArrowLeft className="w-6 h-6 mr-3" />
          Back to Cinema
        </Link>
      </div>
    </div>
        <Footer />
        </>
  );
}

export default Error;