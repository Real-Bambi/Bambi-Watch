import { Link } from "react-router"; 
import { Play } from "lucide-react";


export default function Footer() {
    return (
        <footer className="bg-[#111827]">
           
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8">
               
                <div>
                    <div className="flex flex-row items-center gap-2 text-white font-bold italic tracking-wide py-4">
                        <div className="bg-[#9333EA] p-1.5 rounded animate-bounce">
                           <Play className="w-5 h-5 text-white "/>
                        </div>
                       
                        <h1 className="text-2xl md:text-3xl text-orange-400">BambiWatch</h1>
                    </div>
                    <p className="text-[#9C967F] font-medium text-lg leading-8 max-w-full">Bringing people together through synchronized entertainment experiences.</p>
                </div>

                <div className="leading-8">
                    <h1 className="text-lg font-bold text-white py-4">Product</h1>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">Features</p></Link>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">Pricing</p></Link>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">API</p></Link>
                </div>

                <div className="leading-8">
                    <h1 className="text-lg font-bold text-white py-4">Company</h1>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">About</p></Link>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">Blog</p></Link>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">Careers</p></Link>
                </div>

                <div className="leading-8">
                    <h1 className="text-lg font-bold text-white py-4">Support</h1>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">Help Center</p></Link>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">Contact Us</p></Link>
                    <Link to="#"><p className="text-[#9C967F] font-medium hover:text-white cursor-pointer">Privacy Policy</p></Link>
                </div>
            </div>
         
            <hr className="border-t border-gray-800 border-opacity-50 mx-4 sm:mx-10" /> 
            <p className="text-[#9C967F] flex justify-center py-6 sm:p-10 font-medium text-center">&copy; 2025 BambiWatch. All rights reserved.</p>
        </footer>
    );
}