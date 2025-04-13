import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();

    // Simulate password reset request
    console.log("Password reset link sent to:", email);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#1e293b] shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/logo-nav.png" className="w-auto h-20 mb-4" alt="logo" />
          <h2 className="text-xl font-semibold text-white mb-1">Reset Password</h2>
          <p className="text-slate-400 text-center">
            Enter your email to receive a password reset link.
          </p>
        </div>
        {success ? (
          <div className="text-center text-green-400">
            A reset link has been sent to your email.
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
              Send Reset Link
            </button>
          </form>
        )}
        <div className="mt-6 text-center text-sm text-slate-400">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
