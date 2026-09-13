import React, { useEffect, useRef } from "react";
import { User, Mail, Trophy, Sparkles, Coins, Flame } from "lucide-react";
import { useAuth } from "../context/Authcontext";
import { useXP } from "../context/XPContext";
import gsap from "gsap";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { totalXP, levelData, gold, streak, bestStreak } = useXP();

  const pageRef = useRef(null);
  const profileCardRef = useRef(null);
  const statsRef = useRef([]);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      )
        .fromTo(
          profileCardRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .fromTo(
          infoRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      gsap.fromTo(
        statsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 25,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pageRef}
      className="min-h-screen bg-slate-50 p-5 sm:p-8"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View your Life RPG account and progress.
          </p>
        </div>

        {/* Profile Card */}
        <div
          ref={profileCardRef}
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
              <User
                size={38}
                className="text-orange-600"
              />
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentUser?.name || currentUser?.userName || "User"}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                <Mail size={16} />
                <span>
                  {currentUser?.email || "No email available"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Account Information */}
        <div
          ref={infoRef}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Account Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Username
              </p>

              <p className="font-semibold text-slate-900 mt-1">
                {currentUser?.name ||
                  currentUser?.userName ||
                  "User"}
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Email
              </p>

              <p className="font-semibold text-slate-900 mt-1 break-all">
                {currentUser?.email || "No email available"}
              </p>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Level */}
          <div
            ref={(el) => (statsRef.current[0] = el)}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
              <Trophy
                size={22}
                className="text-orange-500"
              />
            </div>

            <p className="text-sm text-slate-500">
              Level
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {levelData?.level || currentUser?.level || 1}
            </h3>
          </div>

          {/* XP */}
          <div
            ref={(el) => (statsRef.current[1] = el)}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
              <Sparkles
                size={22}
                className="text-orange-500"
              />
            </div>

            <p className="text-sm text-slate-500">
              Total XP
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {totalXP ?? currentUser?.xp ?? 0}
            </h3>
          </div>

          {/* Gold */}
          <div
            ref={(el) => (statsRef.current[2] = el)}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center mb-4">
              <Coins
                size={22}
                className="text-yellow-500"
              />
            </div>

            <p className="text-sm text-slate-500">
              Gold
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {gold ?? currentUser?.gold ?? 0}
            </h3>
          </div>

          {/* Streak */}
          <div
            ref={(el) => (statsRef.current[3] = el)}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
              <Flame
                size={22}
                className="text-orange-500"
              />
            </div>

            <p className="text-sm text-slate-500">
              Current Streak
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {streak ?? currentUser?.streak ?? 0} Days
            </h3>
          </div>

        </div>

        {/* Best Streak */}
        <div className="mt-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Best Streak
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {bestStreak ?? 0} Days
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProfilePage;