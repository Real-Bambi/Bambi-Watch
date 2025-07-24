import { Play, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="relative z-50">
      <nav className="flex items-center justify-between px-4 md:px-10 py-3 bg-gradient-to-l from-purple-700 to-white shadow-md fixed w-full top-0 left-0 right-0">
       
        <div className="flex items-center gap-2">
          <div className="bg-purple-700 p-1.5 rounded">
            <Play className="w-5 h-5 text-white" />
          </div>
          <Link to="/" className="text-xl md:text-2xl font-bold text-black hover:text-purple-700">
            BambiWatch
          </Link>
        </div>

       
        <ul className="hidden md:flex items-center gap-6 font-medium text-black">
          <li><Link to="/" className="hover:text-purple-700 transition">Home</Link></li>
          <li><Link to="#" className="hover:text-purple-700 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-purple-700 transition">Contact</Link></li>
        </ul>

        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-black hover:text-purple-700 transition">Sign In</Link>
          <Link to="/sign-up">
            <button className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-xl transition shadow">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)} className="text-black focus:outline-none">
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-md w-full px-6 py-5 space-y-4 absolute top-[64px] left-0 transition-all">
          <Link to="/" className="block text-black hover:text-purple-700" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="#" className="block text-black hover:text-purple-700" onClick={() => setMobileMenu(false)}>About</Link>
          <Link to="/contact" className="block text-black hover:text-purple-700" onClick={() => setMobileMenu(false)}>Contact</Link>
          <hr />
          <Link to="/login" className="block text-black hover:text-purple-700" onClick={() => setMobileMenu(false)}>Sign In</Link>
          <Link to="/sign-up" onClick={() => setMobileMenu(false)}>
            <button className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-xl transition">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
