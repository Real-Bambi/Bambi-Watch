import { Link } from "react-router";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-[#9C967F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        <div>
          <div className="flex items-center gap-2 text-white font-bold italic tracking-wide mb-4">
            <div className="bg-[#9333EA] p-1.5 rounded">
              <Play className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl text-[#9333EA]">BambiWatch</h1>
          </div>
          <p className="text-sm leading-6">
            Bringing people together through synchronized entertainment experiences.
          </p>
        </div>

       
        <div>
          <h2 className="text-white text-lg font-bold mb-4">Product</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/features" className="hover:text-white">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/api" className="hover:text-white">API</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-lg font-bold mb-4">Company</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
          </ul>
        </div>

     
        <div>
          <h2 className="text-white text-lg font-bold mb-4">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-gray-700 border-opacity-50 mt-6">
        <p className="text-center text-xs sm:text-sm py-6 sm:py-8 px-4">
          &copy; 2025 <span className="text-[#9333EA] font-semibold">BambiWatch</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
