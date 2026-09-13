import React from "react";
import { Sword, Sparkles } from "lucide-react";
import { useAuth } from "../context/Authcontext";

const DashboardHeader = () => {
  const { currentUser } = useAuth();

  const currentLevel = currentUser?.level || 1;
  const currentXP = currentUser?.xp || 0;

  // Backend ke hisaab se
  const xpNeeded = currentLevel * 100;
  const progress = Math.min(
    (currentXP / xpNeeded) * 100,
    100
  );

  return (
    <section className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm">

      {/* Top Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

        <div className="flex items-start gap-3">

          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <Sword
              size={23}
              className="text-orange-500"
            />
          </div>

          <div>
            <p className="text-lg text-slate-500 font-medium">
              Welcome, {currentUser?.userName || "Hero"} 👋
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Ready to level up your life?
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Complete your quests and become a better version of yourself.
            </p>
          </div>

        </div>

        {/* Level */}
        <div className="flex items-center gap-2 self-start sm:self-center bg-slate-900 text-white px-4 py-2 rounded-xl">

          <Sparkles
            size={17}
            className="text-orange-400"
          />

          <span className="text-sm font-semibold">
            Level {currentLevel}
          </span>

        </div>

      </div>

      {/* XP Section */}
      <div className="mt-7">

        <div className="flex items-center justify-between mb-2">

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Experience Points
            </p>

            <p className="text-xs text-slate-500 mt-0.5">
              Keep completing quests to level up
            </p>
          </div>

          <span className="text-sm font-bold text-orange-600">
            {currentXP} / {xpNeeded} XP
          </span>

        </div>

        {/* XP Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">

          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

        </div>

        {/* XP Footer */}
        <div className="flex justify-between mt-2">

          <span className="text-xs text-slate-400">
            Level {currentLevel}
          </span>

          <span className="text-xs text-slate-400">
            {xpNeeded - currentXP} XP to next level
          </span>

          <span className="text-xs text-slate-400">
            Level {currentLevel + 1}
          </span>

        </div>

      </div>

    </section>
  );
};

export default DashboardHeader;