import React from 'react';
import YouTubePlayer from './YoutubePlayer'; 
import ChatSidebar from './ChatSidebar';     

const VideoChatLayout = ({ videoId }) => {
  return (
    <>
    <h1>BambiWatch</h1>
    <h2>ROOM NAME: JAZZ NIGHT❤️</h2>
    <div>
        <h3>2 watching</h3>
        <button>Copy Invite Link</button>
    </div>
    
    <div>
      <div>
        <YouTubePlayer videoId={videoId} />
      </div>
      <div>
        <ChatSidebar />
      </div>
    </div>
    </>
  );
};

export default VideoChatLayout;