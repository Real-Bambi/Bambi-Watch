import { Play, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";



export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);



  return (
   <div className="flex flex-row justify-between items-center p-2">
    <div className="flex items-center gap-2">
     <div className="bg-[#9333EA] p-1.5 rounded">
       <Play className="w-5 h-5 text-white"/>
     </div>
      <h1 className=" text-lg md:text-2xl  font-bold">BambiWatch</h1>
    </div>
    {/* Desktop Menu */}
    <div className="hidden md:flex flex-row justify-between gap-6">
    <Link to={'#'}>Home</Link>
    <Link to={'#'}>About</Link>
    <Link to={'#'}>Reviews</Link>
    <Link to={'#'}>Contact</Link>
    </div>

    {/* Mobile Menu */}
    {mobileMenu && (
    <div className=" md:hidden flex flex-col bg-white justify-between gap-6 fixed top-12 right-0">
    <Link to={'#'}>Home</Link>
    <Link to={'#'}>About</Link>
    <Link to={'#'}>Reviews</Link>
    <Link to={'#'}>Contact</Link>
    </div>
    )}
    <div className="flex justify-between gap-2 items-center">
      <Link to={'#'}>Sign In</Link>
      <Link to={'#'}><button className="bg-[#9333EA] px-6 py-1.5  text-white rounded-xl">Get Started</button></Link>
    </div>

    {/* Menu Icon */}
    <div className="md:hidden" >
      <button className="md:hidden " onClick={() =>setMobileMenu(!mobileMenu)}> {mobileMenu ? <X /> : <Menu />}</button>
    </div>
   </div>
  );
}