import { UsersIcon, FilmIcon, Clock, Camera, History, Play, UserPlus, Star, Clapperboard } from "lucide-react";
import Navbar from "../components/Navbar";
import UserImage from '../assets/userid.avif';
import Movie1Image from '../assets/movie1.jpg';
import Movie2Image from '../assets/movie2.jpg';
import Movie3Image from '../assets/movie3.jpg';
import Footer from "../components/Footer";




export default function Profile() {
  return (

    <div className="bg-[#0F172A]">
     
       <Navbar   />
     
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-purple-600 to-cyan-500 justify-between items-center mt-10 rounded-xl p-6  w-[90%] mx-auto shadow-md ">
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
            <div className="flex flex-col md:flex-row  gap-2 p-2">
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
    <div className="flex flex-col md:flex-row items-center justify-center pt-6 gap-10 w-[90%] mx-auto text-white">
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



// {isModalOpen && (
//         <div
//           className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4"
//           onClick={closeModal}
//         >

//           <div
//             className="bg-white text-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
            
//             <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             <h2 className="text-2xl font-bold mb-4">Invite Friends</h2>
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">
//                 Copy link below
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input type="text" readOnly value={roomLink} className="flex-1 border-gray-500 bg-blue-100 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 <button onClick={handleCopyLink} className="bg-blue-600 text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition-colors relative">  {isCopied ? (
//                     <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">Copied!</span>  ) : null}
//                   <Copy className="h-5 w-5" /> 
//                 </button>
//               </div>
//             </div>

//             <div>
//               <p className="text-sm font-medium mb-2">Or share on social media</p>
//               <div className="flex items-center space-x-4">
  
//                 <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
//                   <Facebook className="h-5 w-5" />
//                 </button>
//                 <button className="bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600 transition-colors">
//                   <Instagram className="h-5 w-5" />
//                 </button>
//                 <button className="bg-blue-400 text-white rounded-full p-2 hover:bg-blue-500 transition-colors">
                 
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 6l-7 7-7-7" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7-7-7" />
//                   </svg>
//                 </button>
//                 <button className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-colors">
//                   <Mail className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}