import YouTubePlayer from "../components/YoutubePlayer";



function Watchroom() {
  const videoId = "dQw4w9WgXcQ"; // Replace with your own YouTube video ID

  return (
    <div>
      <h1>Watch Room: Movie Night</h1>
      <YouTubePlayer videoId={videoId} />
    </div>
  );
}

export default Watchroom;

