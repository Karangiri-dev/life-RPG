import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/Authcontext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // IMPORTANT
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      login(data.user);

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);

      setError("Something went wrong");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_-20%,#ffe9d6_0%,#fff7f0_45%,#ffffff_100%)] px-4 py-8">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 font-bold text-2xl text-slate-900 tracking-tight mb-8 cursor-pointer">
        <span className="text-orange-500 text-xl">&#10038;</span>
        <span>Life RPG</span>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="w-full max-w-md bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-orange-500/5">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span>&#10022;</span>
            <span>Welcome</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-2">
          Sign In to Account
        </h1>

        <p className="text-sm text-slate-500 text-center mb-8">
          Enter your credentials to access your Life RPG dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex items-center justify-between mb-2 ml-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>

              <button
                type="button"
                className="text-xs text-orange-600 hover:underline font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded">
                Forgot password?
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1 ml-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 accent-orange-500 rounded border-slate-300"
              />

              <span className="text-sm text-slate-600">
                Remember me for 30 days
              </span>
            </label>
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
            className="w-full bg-black hover:bg-slate-800 text-white font-semibold text-sm py-3.5 rounded-full cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
            Sign In
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm text-slate-600 mt-8">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-orange-600 font-semibold hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded">
            Start Free Trial
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
