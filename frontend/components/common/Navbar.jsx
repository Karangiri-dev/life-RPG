import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { Menu, X, Sword, User } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const { isLoggedIn, logout, currentUser } = useAuth();

  // GSAP refs
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const rightSideRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Navbar entrance animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      navRef.current,
      {
        y: -30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    )
      .fromTo(
        logoRef.current,
        {
          x: -20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .fromTo(
        linksRef.current,
        {
          y: -15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .fromTo(
        rightSideRef.current,
        {
          x: 20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenu || !mobileMenuRef.current) return;

    gsap.fromTo(
      mobileMenuRef.current,
      {
        x: "100%",
      },
      {
        x: "0%",
        duration: 0.4,
        ease: "power3.out",
      }
    );
  }, [mobileMenu]);

  // Logout
  const handleLogout = () => {
    logout();
    setMobileMenu(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-sm shadow-orange-200">
              <Sword size={20} className="text-white" />
            </div>

            <span className="font-bold text-xl text-slate-900">
              LifeRPG
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">

            <NavLink
              ref={(el) => (linksRef.current[0] = el)}
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : "text-slate-600 hover:text-orange-500"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              ref={(el) => (linksRef.current[1] = el)}
              to="/quests"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : "text-slate-600 hover:text-orange-500"
                }`
              }
            >
              Quests & Tasks
            </NavLink>

            <NavLink
              ref={(el) => (linksRef.current[2] = el)}
              to="/character-stats"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : "text-slate-600 hover:text-orange-500"
                }`
              }
            >
              Character Stats
            </NavLink>

            <NavLink
              ref={(el) => (linksRef.current[3] = el)}
              to="/reward-shop"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : "text-slate-600 hover:text-orange-500"
                }`
              }
            >
              Reward Shop
            </NavLink>

            <NavLink
              ref={(el) => (linksRef.current[4] = el)}
              to="/streaks"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : "text-slate-600 hover:text-orange-500"
                }`
              }
            >
              Streaks & History
            </NavLink>
          </div>

          {/* Right Side */}
          <div
            ref={rightSideRef}
            className="flex items-center gap-3"
          >

            {/* Sign In / Sign Up */}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-orange-500 cursor-pointer transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="hidden sm:block bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Logout */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="hidden sm:block bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                Logout
              </button>
            )}

            {/* Level */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-xl">
              <span className="text-sm font-semibold">
                Lvl {currentUser?.level || 1}
              </span>
            </div>

            {/* User Icon */}
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center hover:bg-orange-100 transition cursor-pointer"
            >
              <User size={18} className="text-orange-500" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden p-2 text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <div className="fixed inset-0 z-50 bg-black/30">

            <motion.div
              ref={mobileMenuRef}
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 top-0 h-full w-[min(20rem,88vw)] bg-white p-5 shadow-xl"
            >

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileMenu(false)}
                  className="p-2 text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2 mt-6">

                <NavLink
                  to="/"
                  end
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `p-3 rounded-lg ${
                      isActive
                        ? "bg-orange-50 text-orange-500 font-semibold"
                        : "text-slate-700 hover:bg-orange-50"
                    }`
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/quests"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `p-3 rounded-lg ${
                      isActive
                        ? "bg-orange-50 text-orange-500 font-semibold"
                        : "text-slate-700 hover:bg-orange-50"
                    }`
                  }
                >
                  Quests & Tasks
                </NavLink>

                <NavLink
                  to="/character-stats"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `p-3 rounded-lg ${
                      isActive
                        ? "bg-orange-50 text-orange-500 font-semibold"
                        : "text-slate-700 hover:bg-orange-50"
                    }`
                  }
                >
                  Character Stats
                </NavLink>

                <NavLink
                  to="/reward-shop"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `p-3 rounded-lg ${
                      isActive
                        ? "bg-orange-50 text-orange-500 font-semibold"
                        : "text-slate-700 hover:bg-orange-50"
                    }`
                  }
                >
                  Reward Shop
                </NavLink>

                <NavLink
                  to="/streaks"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `p-3 rounded-lg ${
                      isActive
                        ? "bg-orange-50 text-orange-500 font-semibold"
                        : "text-slate-700 hover:bg-orange-50"
                    }`
                  }
                >
                  Streaks & History
                </NavLink>

                {/* Profile */}
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      navigate("/profile");
                    }}
                    className="p-3 rounded-lg text-slate-700 hover:bg-orange-50 text-left"
                  >
                    Profile
                  </button>
                )}

                {/* Mobile Auth */}
                <div className="border-t border-slate-200 mt-4 pt-4 flex flex-col gap-2">

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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;