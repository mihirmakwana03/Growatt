import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../../redux/admin/adminSlice";

const Login = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: ''
  });

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      let res;
      try {
        res = await fetch('http://localhost:5000/admin/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } catch (networkError) {
        console.error('Network error:', networkError);
        dispatch(signInFailure('Unable to connect to the server. Please try again later.'));
        return;
      }

      if (!res.ok) {
        console.error(`Error: ${res.status} - ${res.statusText}`);
        const errorData = await res.json().catch(() => ({ error: 'Invalid response' }));
        dispatch(signInFailure(errorData.error || 'Something went wrong'));
        return;
      }

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/admin/dashboard");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#1e293b] shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/logo-nav.png" className="w-auto h-20 mb-4" alt="logo" />
          <p className="text-slate-400">Please log in to your account</p>
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
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
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
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
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="uppercase w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
