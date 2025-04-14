import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: ''
  });


  const [error, setError] = useState("");
  // const [loading, setLoading] = React.useState(false);
  // const [username, setusername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setError(null);

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
      setError('Unable to connect to the server. Please try again later.');
      // setLoading(false);
      return;
    }

    if (!res.ok) {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      const errorData = await res.json().catch(() => ({ error: 'Invalid response' }));
      setError(errorData.error || 'Something went wrong');
      // setLoading(false);
      return;
    }

    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      // setLoading(false);
      return;
    }

    // setLoading(false);
    setError(null);
    navigate("/admin/dashboard")
    console.log(data);

    // if (username === "admin" && password === "admin") {
    //   navigate("/admin/dashboard");
    // } else {
    //   setErrorMessage("Invalid credentials");
    // }
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
              // value={username}
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
              // value={password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            // disabled={loading}
            type="submit"
            className="uppercase w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            {/* {loading ? 'Loading...' : 'Log In'} */}
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
  );
};

export default Login;
