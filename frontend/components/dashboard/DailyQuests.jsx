import React, { useEffect, useState } from "react";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { apiFetch } from "../../utils/apifetch.js";

const DailyQuests = () => {
  const [quests, setQuests] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  const fetchQuests = async () => {
    try {
      const response = await apiFetch("https://life-rpg-6jie.onrender.com/api/quest");

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      const activeQuests = data.quests.filter((quest) => !quest.isCompleted);

      const completedQuests = data.quests.filter((quest) => quest.isCompleted);

      setQuests(activeQuests);
      setCompletedCount(completedQuests.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleCompleteQuest = async (quest) => {
    try {
      const response = await apiFetch(
        `https://life-rpg-6jie.onrender.com/api/quest/${quest._id}/complete`,
        {
          method: "PATCH",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      const savedUser = JSON.parse(localStorage.getItem("lifeRPGCurrentUser"));

      const updatedUser = {
        ...savedUser,
        level: data.user.level,
        xp: data.user.xp,
        gold: data.user.gold,
        streak: data.user.streak,
        attributes: data.user.attributes,
      };

      localStorage.setItem("lifeRPGCurrentUser", JSON.stringify(updatedUser));

      window.dispatchEvent(new Event("userUpdated"));

      fetchQuests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Daily Quests</h2>

          <p className="text-sm text-slate-500 mt-1">
            Complete your quests and earn rewards
          </p>
        </div>

        <span className="text-sm font-semibold text-orange-600">
          {completedCount} / {quests.length + completedCount} Completed
        </span>
      </div>

      <div className="space-y-3">
        {quests.length === 0 ?
          <div className="text-center py-8 text-slate-500">
            <p className="font-medium">No active quests</p>

            <p className="text-sm mt-1">Go to Quests and create a new quest.</p>
          </div>
        : quests.map((quest) => (
            <motion.div
              key={quest._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, borderColor: "#fed7aa" }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-slate-200 rounded-xl transition-shadow hover:shadow-sm">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleCompleteQuest(quest)}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-orange-50 hover:border-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition">
                  <Check size={19} className="text-slate-400" />
                </button>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {quest.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-medium capitalize">
                      {quest.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                <Zap size={16} />+{quest.xpReward} XP
              </div>
            </motion.div>
          ))
        }
      </div>
    </motion.section>
  );
};

export default DailyQuests;
