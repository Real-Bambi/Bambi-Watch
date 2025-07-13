import { UsersIcon, FilmIcon, Clock, Camera, History, Play, UserPlus, Star, Clapperboard } from "lucide-react";
import Navbar from "../components/Navbar";
import UserImage from '../assets/userid.jpg';
import Movie1Image from '../assets/movie1.jpg';
import Movie2Image from '../assets/movie2.jpg';
import Movie3Image from '../assets/movie3.jpg';
import Footer from "../components/Footer";




export default function Profile() {
  return (

    <div className="bg-[#0F172A]">
     <div className="text-white ">
       <Navbar  />
     </div>
      <div className="flex flex-row bg-gradient-to-r from-purple-600 to-cyan-500 justify-between items-center mt-10 rounded-xl p-6  w-[90%] mx-auto shadow-md ">
        <div className="flex items-center gap-6">
          <div className="relative" >
           <img src={UserImage} alt="User Id" className="w-20 h-20 rounded-full object-cover border border-white shadow-md" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <input type="file" accept="image/*" className="w-full h-full opacity-0 absolute cursor-pointer" name="" id="" />
            <span className="text-xs text-black"> <Camera /> </span>
            </div>
          </div>
          <div className="flex flex-col text-white ">
            <h2 className="font-bold text-lg">Alex Johnson</h2>
            <p className="">Movie enthusiast & binge watcher extraordinare</p>
            <div className="flex flex-row justify-between gap-5 p-2">
              <span className="flex flex-row ">
                <UsersIcon />
                <p>127 friends</p></span>
              <span className="flex flex-row">
                <FilmIcon  />
                <p>89 Movies watched</p>
              </span>
              <span className="flex flex-row">
                <Clock />
                <p>342 Hours</p>
              </span>

            </div>
          </div>
        </div>
        <div>
          <button className="bg-white px-6 py-2 m-4 rounded text-[#4F84E7] hover:text-blue-950">Edit Profile</button>
        </div>
      </div>
      <section className="bg-[#1E293B] flex flex-col justify-between gap-5 w-[90%] mx-auto mt-10 rounded p-4">
        <div className="flex items-center gap-2 p-2">
          <History className="text-[#9333EA]" />
          <h1 className="text-white text-2xl">Recent Activity</h1>
        </div>
        <div className="bg-[#0F172A] w-[90%] mx-auto flex items-center gap-2 p-2 rounded">
        <div className="bg-[#9333EA] p-1.5 rounded">
            <Play  className="w-5 h-5 "/>
        </div>
        <div className="text-white">
          <h2>Watched "Faults in Our Stars" </h2>
          <p>2 Hours</p>
        </div>
        </div>
        <div className="bg-[#0F172A] w-[90%] mx-auto flex items-center gap-2 p-2 rounded">
         <div className="bg-[#0D364C] p-1.5 rounded">
           <UserPlus className="w-5 h-5 "/>
         </div>
        <div className="text-white">
          <h2>Added Emma to friend list </h2>
          <p>1 day ago</p>
        </div>
        </div>
        <div className="bg-[#0F172A] w-[90%] mx-auto flex items-center gap-2 p-2 rounded">
       <div className="bg-[#9333EA] p-1.5  rounded">
           <Star  className="w-5 h-5 "/>
       </div>
        <div className="text-white">
          <h2>Rated 'Now You See Me' 5 stars </h2>
          <p>3 days ago</p>
        </div>
        </div>
      </section>
      <section className="bg-[#1E293B] p-4 w-[90%] mx-auto mt-8">
    <div className="flex items-center gap-2 text-white p-2">
      <Clapperboard className= "text-[#9333EA] " />
      <h2 className="font-bold text-xl ">Recently watched</h2>
    </div>
    <div className="flex items-center justify-center pt-6 gap-10 w-[90%] mx-auto text-white">
      <div className="w-64 rounded-lg overflow-hidden shadow-md">
        <img src={Movie1Image} alt="" className="w-full h-96 object-cover" />
      <div className="p-4">
          <h2 className=" font-bold text-lg text-white ">Faults in Our Stars</h2>
        <p className="text-sm text-gray-600">Romance . 2014</p>
      </div>
      </div>
      <div className="w-64 rounded-lg overflow-hidden shadow-md ">
        <img src={Movie2Image} alt="" className="w-64 object-cover h-96" />
     <div className="p-4">
         <h2 className="font-bold text-lg text-white">Kpop Demon Hunter</h2>
        <p className="text-sm text-gray-600">Animation . 2025</p>
     </div>
      </div>
      <div className="w-64 rounded-lg overflow-hidden shadow-md ">
        <img src={Movie3Image} alt="" className="w-full object-cover h-96" />
        <div className="p-4">
          <h2 className="font-bold text-lg text-white">Now You See Me</h2>
        <p className="text-sm text-gray-600">Thriller . 2013</p>
        </div>
      </div>
    </div>
      </section>
      <Footer />
    </div>
  );
}



// import { UsersIcon, FilmIcon, Clock } from 'lucide-react';
// import Navbar from './Navbar';

// export default function ProfileCard() {
//   return (
//     <div>
//       <Navbar />

//       <div className="flex justify-between items-center w-[90%] mx-auto mt-10 p-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md">
        
//         {/* Profile Section */}
//         <div className="flex items-center gap-6">
//           {/* Profile Image */}
//           <div className="relative">
//             <img
//               src="https://randomuser.me/api/portraits/men/75.jpg"
//               alt="Profile"
//               className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
//             />
//             {/* Optional camera icon overlay */}
//             <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
//               <input type="file" accept="image/*" className="opacity-0 absolute w-full h-full cursor-pointer" />
//               <span className="text-xs text-black">📷</span>
//             </div>
//           </div>

//           {/* Profile Info */}
//           <div>
//             <h2 className="text-xl font-bold">Alex Johnson</h2>
//             <p className="text-sm">Movie enthusiast & binge-watcher extraordinaire</p>
//             <div className="flex gap-6 text-sm mt-2">
//               <span className="flex items-center gap-1">
//                 <UsersIcon className="w-4 h-4" />
//                 127 Friends
//               </span>
//               <span className="flex items-center gap-1">
//                 <FilmIcon className="w-4 h-4" />
//                 89 Movies Watched
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 342 Hours
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Edit Button */}
//         <button className="bg-white text-purple-700 font-medium px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// }
