import { Heart, MessageCircle, RefreshCw } from "lucide-react";
import { Users, CircleChevronRight } from "lucide-react";
import Hero from "../assets/herobg2.jpg"
import Wavy from "../assets/aboutpic4.jpg"
import Love from "../assets/aboutpic1.jpg"


export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center bg-no-repeat w-full h-[100vh]"
        style={{ backgroundImage: `url(${Hero})` }}>
        <div className="text-white w-[40%] flex flex-col space-y-6 p-12">
          <p className="text-6xl font-bold">Watch Movies Together,Even <br /> Apart</p>
          <p className="text-[#B3B2AC] text-lg">Connect with friends and family for synchronized movie nights.,<br />
            Share reactions, chat in real-time, and create unforgettable memories from anywhere in the world.</p>
          <div className="flex flex-row gap-10">
            <button className="bg-[#FF8259] hover:bg-[#e86f48] w-[30%] p-2"> Discover More</button>
            <CircleChevronRight className="text-[#FF8259] bg-white w-12 h-12 p-2 rounded-4xl" />
          </div>
        </div>

        <div></div>
      </section>

      {/* Second Section */}
      <section className="h-[70vh]">
        <div className="">
          <div className="flex flex-col justify-center items-center mb-10">
            <p className="text-4xl font-bold">Why Choose SyncWatch?</p>
            <p className="text-lg  mt-4 text-[#92918d]">Experience the magic of shared entertainment with features designed to bring people together</p>
          </div>
          <div className="grid grid-cols-3 gap-6 w-[80%] m-auto">
            <div className="w-full shadow-2xl rounded-2xl h-[45vh] p-6 hover:bg-purple-500 hover:text-white transition-all duration-300 hover:-translate-y-2 hover:translate-x-2">
              <RefreshCw className="text-white bg-purple-500  p-2 mb-10 w-12 h-12 rounded-xl" />
              <p className="text-2xl font-semibold">Perfect Synchronization</p>
              <p className="text-md text-[#92918d]">Everyone watches at exactly the same time. <br /> No more "wait, let me catch up" moments.</p>
            </div>
            <div className="w-full shadow-2xl rounded-2xl h-[45vh] p-6 hover:bg-purple-500 hover:text-white transition-all duration-300 hover:-translate-y-2 hover:translate-x-2">
              <MessageCircle className="text-white bg-purple-500  p-2 mb-10 w-12 h-12 rounded-xl" />
              <p className="text-2xl font-semibold ">Real-time Chat</p>
              <p className="text-md text-[#92918d]">Share reactions, jokes, and <br /> thoughts instantly with built-in chat functionality.</p>
            </div>
            <div className="w-full shadow-2xl rounded-2xl h-[45vh] p-6 hover:bg-purple-500 hover:text-white transition-all duration-300 hover:-translate-y-2 hover:translate-x-2 ">
              <Users className="text-white bg-purple-500  p-2 mb-10 w-12 h-12 rounded-xl" />
              <p className="text-2xl font-semibold">Easy Group Creation</p>
              <p className="text-md text-[#92918d]">Create private rooms and invite friends with just a simple link. No complicated setup required.</p>
            </div>

          </div>
        </div>

      </section>

      {/* Third Section */}
      <section className="h-screen flex bg-cover bg-center gap-10" style={{ backgroundImage: `url(${Wavy})` }}>
        <div className="w-[45%] m-10 ">
          <p className="text-5xl pb-4">About SyncWatch</p>
          <p className="text-[#4B5563] text-lg pb-4">Born from the simple desire to watch movies with friends during challenging times, SyncWatch has evolved into the premier platform for synchronized entertainment experiences.</p>
          <p className="text-[#4B5563] text-lg">Our mission is to eliminate the barriers of distance and bring people together through shared entertainment. Whether you're separated by miles or continents, SyncWatch ensures that every laugh, gasp, and tear is shared simultaneously.</p>

          <div className="grid grid-cols-2 mt-10 ">
            <div className="w-[70%] h-[20vh] flex flex-col justify-center items-center border border-[#B3B2AC] rounded-2xl hover:bg-white shadow-2xl mb-10">
              <p className="font-bold text-purple-500 text-2xl ">1M+</p>
              <p>Watch Parties</p>
            </div>
            <div className="w-[70%] h-[20vh] flex flex-col justify-center items-center border border-[#B3B2AC] rounded-2xl hover:bg-white shadow-2xl mb-10">
              <p className="font-bold text-purple-500 text-2xl ">50K+</p>
              <p>Active Users</p>
            </div>
            <div className="w-[70%] h-[20vh] flex flex-col justify-center items-center border border-[#B3B2AC] rounded-2xl hover:bg-white shadow-2xl">
              <p className="font-bold text-purple-500 text-2xl ">99.9%</p>
              <p>Uptime</p>
            </div>
            <div className="w-[70%] h-[20vh] flex flex-col justify-center items-center border border-[#B3B2AC] rounded-2xl hover:bg-white shadow-2xl">
              <p className="font-bold text-purple-500 text-2xl ">4.9★</p>
              <p>User Rating</p>
            </div>


          </div>

        </div>

        {/* Right Side */}
        <div className="w-[45%] flex justify-center items-center">
          <div className="relative">
            <img
              src={Love}
              alt="meeting image"
              className="w-[80%] rounded-xl shadow-lg"
            />
            <div className="absolute bottom-6 -left-10 flex items-center bg-white p-4 rounded-lg shadow-md gap-4">
              <Heart className="text-purple-500 w-12 h-12" />
              <div className="flex flex-col text-left">
                <p className="font-semibold text-gray-800">Built with Love</p>
                <p className="text-sm text-gray-500">For movie lovers everywhere</p>
              </div>
            </div>
          </div>
        </div>

      </section>


    </>
  );
}