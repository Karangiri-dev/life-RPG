import React, { useEffect, useState } from "react";
import { Flame, Trophy, Clock, Zap, Coins } from "lucide-react";
import { apiFetch } from "../../utils/apifetch.js";
import { useAuth } from "../context/Authcontext.jsx";

const StreaksHistory = () => {
  const { currentUser } = useAuth();

  const [completedQuests, setCompletedQuests] = useState([]);

  const fetchCompletedQuests = async () => {
    try {
      const response = await apiFetch("http://localhost:3000/api/quest");

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      const completed = data.quests.filter((quest) => quest.isCompleted);

      setCompletedQuests(completed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompletedQuests();
  }, []);

  const streak = currentUser?.streak || 0;
  const bestStreak = currentUser?.streak || 0;

  return (
    <section className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Streaks & History
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track your progress and completed quests.
          </p>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {/* Current Streak */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Flame size={25} className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Current Streak</p>

                <h2 className="text-2xl font-bold text-slate-900">
                  {streak} Days
                </h2>
              </div>
            </div>
          </div>

          {/* Best Streak */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <Trophy size={25} className="text-yellow-500" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Best Streak</p>

                <h2 className="text-2xl font-bold text-slate-900">
                  {bestStreak} Days
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">Quest History</h2>

            <p className="text-sm text-slate-500 mt-1">Your completed quests</p>
          </div>

          {completedQuests.length === 0 ?
            <div className="text-center py-10 text-slate-500">
              <p className="font-medium">No completed quests yet.</p>

              <p className="text-sm mt-1">Complete a quest to see it here.</p>
            </div>
          : <div className="space-y-3">
              {completedQuests.map((quest) => (
                <div
                  key={quest._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-slate-200 rounded-xl">
                  {/* Quest Info */}
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {quest.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-medium capitalize">
                        {quest.difficulty}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={13} />
                        {new Date(quest.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                      <Zap size={16} />+{quest.xpReward} XP
                    </span>

                    <span className="flex items-center gap-1 text-sm font-semibold text-yellow-600">
                      <Coins size={16} />+{quest.goldReward} Gold
                    </span>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default StreaksHistory;
