import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Home from "./components/Home";
import NotionPost from "./components/NotionPost";

const socket = io.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="/dashboard" element={<Home socket={socket} />} />
        <Route path="/post/create" element={<CreatePost socket={socket} />} />
        <Route path="/post/:id" element={<NotionPost socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
