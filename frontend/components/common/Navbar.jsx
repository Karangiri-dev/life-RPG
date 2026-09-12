
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

import {
  Menu,
  X,
  Sword,
  User,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

const { isLoggedIn, logout } = useAuth();

  // Logout
const handleLogout = () => {
  logout();
  setMobileMenu(false);
 navigate("/login", { replace: true }); 
};

  return (
    <nav className="w-full bg-white border-b border-slate-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
              <Sword size={20} className="text-white" />
            </div>

            <span className="font-bold text-xl text-slate-900">
              LifeRPG
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-orange-500"
            >
              Dashboard
            </Link>

            <Link
              to="/quests"
              className="text-sm font-medium text-slate-600 hover:text-orange-500"
            >
              Quests & Tasks
            </Link>

            <Link
              to="/character-stats"
              className="text-sm font-medium text-slate-600 hover:text-orange-500"
            >
              Character Stats
            </Link>

            <Link
              to="/reward-shop"
              className="text-sm font-medium text-slate-600 hover:text-orange-500"
            >
              Reward Shop
            </Link>

            <Link
              to="/streaks"
              className="text-sm font-medium text-slate-600 hover:text-orange-500"
            >
              Streaks & History
            </Link>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Sign In / Sign Up */}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-orange-500"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="hidden sm:block bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Logout */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="hidden sm:block bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            )}

            {/* Level */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-xl">
              <span className="text-sm font-semibold">
                Lvl 1
              </span>
            </div>

            {/* User Icon */}
            <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center">
              <User size={18} className="text-orange-500" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden p-2 text-slate-700"
            >
              <Menu size={24} />
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/30">

          <div className="absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-xl">

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setMobileMenu(false)}
                className="p-2 text-slate-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-2 mt-6">

              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="p-3 rounded-lg text-slate-700 hover:bg-orange-50"
              >
                Dashboard
              </Link>

              <Link
                to="/quests"
                onClick={() => setMobileMenu(false)}
                className="p-3 rounded-lg text-slate-700 hover:bg-orange-50"
              >
                Quests & Tasks
              </Link>

              <Link
                to="/character-stats"
                onClick={() => setMobileMenu(false)}
                className="p-3 rounded-lg text-slate-700 hover:bg-orange-50"
              >
                Character Stats
              </Link>

              <Link
                to="/reward-shop"
                onClick={() => setMobileMenu(false)}
                className="p-3 rounded-lg text-slate-700 hover:bg-orange-50"
              >
                Reward Shop
              </Link>

              <Link
                to="/streaks"
                onClick={() => setMobileMenu(false)}
                className="p-3 rounded-lg text-slate-700 hover:bg-orange-50"
              >
                Streaks & History
              </Link>

              {/* Mobile Auth */}
              <div className="border-t border-slate-200 mt-4 pt-4 flex flex-col gap-2">

                {/* Not Logged In */}
                {!isLoggedIn && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenu(false)}
                      className="p-3 rounded-lg text-slate-700 font-semibold hover:bg-orange-50"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() => setMobileMenu(false)}
                      className="p-3 rounded-lg bg-slate-900 text-white font-semibold text-center hover:bg-slate-800"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {/* Logged In */}
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-center"
                  >
                    Logout
                  </button>
                )}

              </div>

            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;

