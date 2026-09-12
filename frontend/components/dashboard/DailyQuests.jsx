import React from "react";
import { Check, Clock, Zap } from "lucide-react";
import { useXP } from "../context/XPContext";

const DailyQuests = () => {
  const {
    quests,
    completeQuest,
    completedQuests,
  } = useXP();

  return (
    <section className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Daily Quests
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Complete your quests and earn XP
          </p>
        </div>

        <span className="text-sm font-semibold text-orange-600">
          {completedQuests.length} / {quests.length + completedQuests.length} Completed
        </span>
      </div>

      <div className="space-y-3">

        {quests.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p className="font-medium">
              No active quests
            </p>

            <p className="text-sm mt-1">
              Go to Quests and create a new quest.
            </p>
          </div>
        ) : (
          quests.map((quest) => (
            <div
              key={quest.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-slate-200 rounded-xl hover:border-orange-200 transition"
            >

              <div className="flex items-start gap-3">

                <button
                  onClick={() => completeQuest(quest)}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 transition"
                >
                  <Check
                    size={19}
                    className="text-slate-400"
                  />
                </button>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {quest.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2">

                    <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-medium">
                      {quest.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={13} />
                      {quest.time}
                    </span>

                  </div>
                </div>

              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-orange-600 ml-13 sm:ml-0">
                <Zap size={16} />
                +{quest.xp} XP
              </div>

            </div>
          ))
        )}

      </div>

    </section>
  );
};

export default DailyQuests;