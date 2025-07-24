import { Heart, MessageCircle, RefreshCw } from "lucide-react";
import { Users, CircleChevronRight } from "lucide-react";
import Hero from "../assets/herobg2.jpg";
import Heroimg1 from "../assets/himg1.jpg";
import Heroimg2 from "../assets/himg2.jpg";
import Heroimg3 from "../assets/himg4.jpg";
import Heroimg4 from "../assets/himg5.jpg";
import Wavy from "../assets/aboutpic4.jpg";
import Love from "../assets/aboutpic1.jpg";
import Face from "../assets/sec41.jpg";
import womanFace from "../assets/sec42.jpg";
import manFace from "../assets/sec43.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import headShot from "../assets/headshot.jpg";
import { Link } from "react-router";


export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-cover bg-center bg-no-repeat w-full h-screen flex items-center"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6">

          {/* Text */}
          <div className="text-white w-full md:w-[45%] p-6 md:p-12 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Watch Movies Together, <br className="hidden md:block" /> Even Apart
            </h1>
            <p className="text-[#D1D0CB] text-base md:text-lg leading-relaxed">
              Connect with friends and family for synchronized movie nights. <br className="hidden md:block" />
              Share reactions, chat in real-time, and create unforgettable memories from anywhere in the world.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <a href="#features">
                <button className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl">
                  Get Started
                </button>
              </a>
              <div className="bg-white rounded-full p-2 shadow-md">
                <Link to="/sign-up">
                  <CircleChevronRight className="text-purple-600 w-8 h-8 hover:text-purple-700 transition-all duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-[45%] mt-10 md:mt-0">
            <img src={Heroimg1} alt="" className="rounded-tl-4xl object-cover w-full h-auto" />
            <img src={Heroimg2} alt="" className="rounded-tr-4xl object-cover w-full h-auto" />
            <img src={Heroimg4} alt="" className="rounded-bl-4xl object-cover w-full h-auto" />
            <img src={Heroimg3} alt="" className="rounded-br-4xl object-cover w-full h-auto" />
          </div>

        </div>
      </section>


      {/* Second Section- About */}
      <section className="lg:h-[70vh] sm:h-[100vh] md:h-[100vh]" id="about">
        
          <div className="flex flex-col justify-center text-center mb-10">
            <p className="text-4xl font-bold">Why Choose Bambi Watch?</p>
            <p className="text-lg  mt-4 text-[#92918d]">Experience the magic of shared entertainment with features designed to bring people together</p>
          </div>
          <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] m-auto">
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
      

      </section>

      {/* Third Section */}
      <section
        className="flex flex-col justify-center bg-cover bg-center py-16 px-6 md:px-16"
        style={{ backgroundImage: `url(${Wavy})` }}
      >
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Content */}
          <div className="w-full lg:w-[50%] space-y-6">
            <p className="text-4xl md:text-5xl font-bold text-gray-800">About Bambi Watch</p>
            <p className="text-[#4B5563] text-lg">
              Born from the simple desire to watch movies with friends during challenging times, SyncWatch has evolved into the premier platform for synchronized entertainment experiences.
            </p>
            <p className="text-[#4B5563] text-lg">
              Our mission is to eliminate the barriers of distance and bring people together through shared entertainment. Whether you're separated by miles or continents, SyncWatch ensures that every laugh, gasp, and tear is shared simultaneously.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { value: "1M+", label: "Watch Parties" },
                { value: "50K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "4.9★", label: "User Rating" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center h-32 border border-[#B3B2AC] rounded-2xl hover:bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:translate-x-1"
                >
                  <p className="font-bold text-purple-500 text-2xl">{item.value}</p>
                  <p className="text-gray-700">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[50%] flex justify-center items-center">
            <div className="relative w-[90%] max-w-md">
              <img
                src={Love}
                alt="meeting image"
                className="w-full rounded-xl shadow-lg"
              />
              <div className="absolute bottom-6 -left-10 flex items-center bg-white p-4 rounded-lg shadow-md gap-4 transition-all duration-300 hover:-translate-y-2 hover:translate-x-2">
                <Heart className="text-purple-500 w-12 h-12" />
                <div className="flex flex-col text-left">
                  <p className="font-semibold text-gray-800">Built with Love</p>
                  <p className="text-sm text-gray-500">For movie lovers everywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section*/}
      <section className="lg:h-[70vh] sm:h-screen ">
        <div className="flex flex-col justify-center items-center my-10 mb-20">
          <p className="text-3xl font-medium">What Our  <span className="text-purple-500 italic">Users Say✦✦</span></p>
          <p className="text-lg text-gray-500"> <span className="text-purple-500 font-bold">—</span>Join thousands of happy users who've made SyncWatch their go-to platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
          <div className="h-[35vh] w-[90%] p-6 border border-gray-300 bg-[#f8f7f4] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <img src={womanFace} alt="face" className="rounded-2xl w-16 h-16 object-cover" />
              <div className="flex flex-col">
                <p className="font-bold text-lg">Sandra Blake</p>
                <p className="text-gray-500 text-sm">CEO, Digital Agency</p>
                <p className="text-purple-500 font-semibold text-base">★★★★★ 5.0</p>
              </div>
              <p className="ml-auto text-4xl text-purple-600">𖹭</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              "SyncWatch has been a game-changer for our family movie nights!
              <br /> My kids are in college now, but we still watch movies together every Friday. <br /> It feels like we're all in the same room."
            </p>
          </div>

          <div className="h-[35vh] w-[90%] p-6 border border-gray-300 bg-[#f8f7f4] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <img src={Face} alt="face" className="rounded-2xl w-16 h-16 object-cover" />
              <div className="flex flex-col">
                <p className="font-bold text-lg">Mike Chen</p>
                <p className="text-gray-500 text-sm">Software Engineer</p>
                <p className="text-purple-500 font-semibold text-base">★★★★★ 5.0</p>
              </div>
              <p className="ml-auto text-4xl text-purple-600">𖹭</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              "Perfect for long-distance relationships! <br />
              My girlfriend and I use SyncWatch every weekend. The chat feature <br />
              makes it feel like we're cuddling on the couch together."
            </p>
          </div>

          <div className="h-[35vh] w-[90%] p-6 border border-gray-300 bg-[#f8f7f4] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <img src={manFace} alt="face" className="rounded-2xl w-16 h-16 object-cover" />
              <div className="flex flex-col">
                <p className="font-bold text-lg">Emma Rodriguez</p>
                <p className="text-gray-500 text-sm">Marketing Manager</p>
                <p className="text-purple-500 font-semibold text-base">★★★★★ 5.0</p>
              </div>
              <p className="ml-auto text-4xl text-purple-600">𖹭</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              "Our friend group scattered across different cities after college, <br />
              but SyncWatch keeps us connected. <br />
              We have weekly movie nights that feel just like old times!"
            </p>
          </div>
        </div>
      </section>

      {/* Fifth session */}
      <section >
        <div className="relative h-[50vh] w-full overflow-hidden">
          {/* Background Images Row */}
          <div className="absolute inset-0 flex">
            <img
              src={headShot}
              alt="meeting"
              className="w-1/3 h-full object-cover"
            />
            <img
              src={headShot}
              alt="meeting"
              className="w-1/3 h-full object-cover"
            />
            <img
              src={headShot}
              alt="meeting"
              className="w-1/3 h-full object-cover"
            />
          </div>

          {/* Optional Overlay */}
          <div className="absolute inset-0 bg-[rgba(128,0,128,0.4)]" />

          {/* Text Content on top */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 text-white">
            <div className="mb-6">
              <p className="text-4xl md:text-5xl font-bold leading-snug">
                Ready to Start Your Movie Night?
              </p>
              <p className="mt-4 max-w-2xl text-lg md:text-xl">
                Join millions of users who've discovered the joy of synchronized entertainment
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Link to="/dashboard">
                <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition-all duration-300">
                  Create Your First Room
                </button>
              </Link>
              <a href="#about">
                <button className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-purple-700 font-semibold shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}