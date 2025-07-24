import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaPlus, FaQuestionCircle, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Error() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 flex items-center justify-center p-6">
        <div className="relative max-w-3xl w-full text-center bg-white border border-purple-300 rounded-2xl shadow-2xl p-10 transition duration-500">
         
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-400 rounded-t-xl"></div>

          
          <h1 className="text-7xl font-extrabold text-purple-600 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-6">
            Oops! The show must not go on...
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-md mx-auto">
            It looks like the page you're looking for has gone offline. Don’t worry, your friends are still waiting for you in the virtual cinema.
          </p>

         
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-12">
            <Link
              to="/"
              className="flex items-center justify-center bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition transform hover:-translate-y-1 shadow-md"
            >
              <FaHome className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
            <Link
              to="/create-room"
              className="flex items-center justify-center bg-purple-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-500 transition transform hover:-translate-y-1 shadow-md"
            >
              <FaPlus className="w-5 h-5 mr-2" />
              Create New Room
            </Link>
            <a
              href="/support"
              className="flex items-center justify-center bg-slate-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition transform hover:-translate-y-1 shadow-md"
            >
              <FaQuestionCircle className="w-5 h-5 mr-2" />
              Get Help
            </a>
          </div>

         
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition shadow-lg transform hover:-translate-y-1"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Cinema
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Error;
