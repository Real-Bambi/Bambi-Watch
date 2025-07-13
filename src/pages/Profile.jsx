import { UsersIcon, FilmIcon, Clock } from "lucide-react";


import Navbar from "../components/Navbar";


export default function Profile() {
  return (

    <div>
      <Navbar />
      <div className="flex flex-row bg-gradient-to-r from-purple-600 to-cyan-500 justify-between items-center mt-10 rounded-xl p-6  w-[90%] mx-auto shadow-md ">
        <div className="flex items-center gap-6">
          <div >
           <img src="" alt="" />
             <div className="flex flex-row justify-between gap-5 p-2">
              <span className="flex flex-row ">
                <UsersIcon />
                <p>127 friends</p></span>
              <span className="flex flex-row">
                <FilmIcon />
                <p>89 Movies watched</p>
              </span>
              <span className="flex flex-row">
                <Clock />
                <p>342 Hours</p>
              </span>

            </div>
          </div>
          <div className="flex flex-col text-white p-6">
            <h2 className="p-2 text-lg">Alex Johnson</h2>
            <p className="">Movie enthusiast & binge watcher extraordinare</p>
           
          </div>
        </div>
        <div>
          <button className="bg-white px-6 py-2 m-4 rounded text-[#4F84E7]">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}



import { UsersIcon, FilmIcon, Clock } from 'lucide-react';
import Navbar from './Navbar';

export default function ProfileCard() {
  return (
    <div>
      <Navbar />

      <div className="flex justify-between items-center w-[90%] mx-auto mt-10 p-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md">
        
        {/* Profile Section */}
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
            {/* Optional camera icon overlay */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <input type="file" accept="image/*" className="opacity-0 absolute w-full h-full cursor-pointer" />
              <span className="text-xs text-black">📷</span>
            </div>
          </div>

          {/* Profile Info */}
          <div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-sm">Movie enthusiast & binge-watcher extraordinaire</p>
            <div className="flex gap-6 text-sm mt-2">
              <span className="flex items-center gap-1">
                <UsersIcon className="w-4 h-4" />
                127 Friends
              </span>
              <span className="flex items-center gap-1">
                <FilmIcon className="w-4 h-4" />
                89 Movies Watched
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                342 Hours
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button className="bg-white text-purple-700 font-medium px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
