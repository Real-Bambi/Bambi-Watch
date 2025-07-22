import React, { useState } from 'react';
import { MessagesSquare, Send } from "lucide-react";

const ChatSidebar = () => {
  return (
    <div>
      <h2 className='flex gap-2 text-white font-bold'><MessagesSquare className='size-7 font-bold text-[#2D3748]'/> LIVE CHAT</h2>

      <p className='font-semibold mt-1'>Chat messages will appear here...</p>
      <div className='flex gap-2 mt-109'>
        <input type="text" placeholder="Type your message..." className='flex-1 p-2 rounded-lg bg-[#2a2e35] text-white' />
      <button className='p-2 rounded-lg bg-[#2D3748] outline-0 border-0 hover:bg-[#415468]'><Send className='size-8' /></button>
      </div>
      
    </div>
  );
};

export default ChatSidebar;
