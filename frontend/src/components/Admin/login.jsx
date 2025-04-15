import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import Logo from "./logo.png";
>>>>>>> a4bac4c (first commit)

const Login = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uname === "admin" && password === "admin") {
      navigate("/admin/dashboard");
    } else {
      setErrorMessage("Invalid credentials");
=======

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uname === "admin" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
>>>>>>> a4bac4c (first commit)
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#1e293b] shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/logo-nav.png" className="w-auto h-20 mb-4" alt="logo" />
          <p className="text-slate-400">Please log in to your account</p>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your username"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-400">
          <p>
            Forgot your password?{" "}
            <a
              href="/reset"
              className="text-blue-500 hover:underline"
            >
              Reset it here
            </a>
          </p>
          {/* <p className="mt-2">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </a>
          </p> */}
        </div>
      </div>
    </div>
=======
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
>>>>>>> a4bac4c (first commit)
  );
};

export default Login;
