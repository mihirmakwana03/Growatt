import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Logo from "./logo.png";

const Login = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uname === "admin" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>

      {/* Login Form */}
      <form className="login-form" onSubmit={handleSubmit}>
        <a href="/">
          <img src={Logo} className="logo" alt="logo" />
        </a>
        <h3>Login Here</h3>

        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="email"
            placeholder="Email or Phone"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Log In</button>
      </form>
    </>
  );
};

export default Login;
