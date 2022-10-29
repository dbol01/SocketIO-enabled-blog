import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // fetches the initial posts from the server on first render
  useEffect(() => {
    function fetchPosts() {
      fetch("http://localhost:4000/api")
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setPosts(data);
        })
        .catch((err) => console.error(err));
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    // listens for the updatePost event from the server (which is fired after new posts are made)
    socket.on("updatePosts", (posts) => setPosts(posts));
  }, [socket]);

  const createPostBtn = () => navigate("/post/create");
  const readMoreBtn = (postID) => {
    socket.emit("findPost", postID);

    navigate(`/post/${postID}`);
  };

  return (
    <div className="home">
      <nav className="home__navbar">
        <h2>HackNotion</h2>
        <div className="home__buttons">
          <button className="home__createBtn" onClick={createPostBtn}>
            CREATE POST
          </button>
          <button className="home__notifyBtn">NOTIFY</button>
        </div>
      </nav>

      <div className="posts__container">
        {posts?.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.title}</h3>
            <button className="post__cta" onClick={() => readMoreBtn(post.id)}>
              READ MORE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
