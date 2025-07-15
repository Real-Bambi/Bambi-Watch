import { Play, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";



export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);



  return (
  <div className="relative">
     <div className="flex flex-row justify-between items-center p-2 bg-white shadow-md">
    <div className="flex items-center gap-2">
     <div className="bg-[#9333EA] p-1.5 rounded ">
       <Play className="w-5 h-5 text-white "/>
     </div>
      <h1 className=" text-lg md:text-2xl  font-bold hover:text-[#9333EA]">BambiWatch</h1>
    </div>


    {/* Desktop Menu */}
    <div className="hidden md:flex text-black flex-row z-50 justify-between gap-6">
    <Link to={'#'} className="hover:text-[#9333EA]">Home</Link>
    <Link to={'#'} className="hover:text-[#9333EA]">About</Link>
    <Link to={'#'} className="hover:text-[#9333EA]">Reviews</Link>
    <Link to={'#'} className="hover:text-[#9333EA]">Contact</Link>
    </div>
 
    {/* Mobile Menu */}
    {mobileMenu && (
    <div className=" md:hidden absolute flex flex-col  justify-between gap-4 px-6 py-4 text-black shadow-md z-50  top-full left-0 w-full bg-white">
    <Link to={'#'} className="hover:text-[#9333EA]">Home</Link>
    <Link to={'#'} className="hover:text-[#9333EA]">About</Link>
    <Link to={'#'}className="hover:text-[#9333EA]">Reviews</Link>
    <Link to={'#'} className="hover:text-[#9333EA]">Contact</Link>
    </div>
    )}
    <div className="flex justify-between gap-2  text-black items-center">
      <Link to={'#'} className="hover:text-[#9333EA]">Sign In</Link>
      <Link to={'#'}><button className="bg-[#9333EA] hover:bg-purple-500 px-6 py-1.5  text-white rounded-xl cursor-pointer">Get Started</button></Link>
    </div>

    {/* Menu Icon */}
    <div className="md:hidden" >
      <button className="md:hidden " onClick={() =>setMobileMenu(!mobileMenu)}> {mobileMenu ? <X className="text-black" /> : <Menu className="text-black" />}</button>
    </div>
   </div>
  </div>
  );
}


