import React from 'react';

const YouTubePlayer = ({ videoId }) => {
  return (
    <div>
      <div>
        <iframe width="985" height="570" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default YouTubePlayer;

