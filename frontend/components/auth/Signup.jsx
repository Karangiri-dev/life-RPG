
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Get all existing users
    const existingUsers =
      JSON.parse(localStorage.getItem("lifeRPGUsers")) || [];

    // Check existing user
    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    // Create user
    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    // Add new user to existing users
    existingUsers.push(user);

    // Save all users
    localStorage.setItem(
      "lifeRPGUsers",
      JSON.stringify(existingUsers)
    );

    // Go to Login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_-20%,_#ffe9d6_0%,_#fff7f0_45%,_#ffffff_100%)] px-4 py-8">

      {/* Brand Logo */}
      <div className="flex items-center gap-2 font-bold text-2xl text-slate-900 tracking-tight mb-8 cursor-pointer">
        <span className="text-orange-500 text-xl">&#10038;</span>
        <span>Life RPG</span>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-orange-500/5">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span>&#10022;</span>
            <span>Start Your Journey</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-2">
          Create Account
        </h1>

        <p className="text-sm text-slate-500 text-center mb-8">
          Create your Life RPG account and start leveling up your life.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Full Name
            </label>

            <div className="bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Email
            </label>

            <div className="bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Password
            </label>

            <div className="bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Confirm Password
            </label>

            <div className="bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center font-medium">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-slate-800 text-white font-semibold text-sm py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg mt-2"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-600 mt-8">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;
