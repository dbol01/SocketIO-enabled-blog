import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <h2>Sign in to Notion (clone)</h2>
      <form onSubmit={handleLogin} className="loginForm">
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="login__cta">Log In</button>
      </form>
    </div>
  );
};

export default Login;
