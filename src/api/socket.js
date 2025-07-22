import { io } from "socket.io-client";

const socket = io("https://bambi-watch-api.onrender.com", {
    transports: ["websocket"],
  autoConnect: false, // connect manually
});

export default socket;
