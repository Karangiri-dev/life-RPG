
import React, { useEffect, useRef, useState } from "react";
import { Check, Zap, Clock } from "lucide-react";
import { apiFetch } from "../../utils/apifetch.js";
import { motion } from "framer-motion";
import gsap from "gsap";

const DailyQuests = () => {
  const [quests, setQuests] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  const sectionRef = useRef(null);
  const questRefs = useRef([]);

  const fetchQuests = async () => {
    try {
      const response = await apiFetch("/api/quest");

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      const activeQuests = data.quests.filter(
        (quest) => !quest.isCompleted
      );

      const completedQuests = data.quests.filter(
        (quest) => quest.isCompleted
      );

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
        `/api/quest/${quest._id}/complete`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      const savedUser = JSON.parse(
        localStorage.getItem("lifeRPGCurrentUser")
      );

      const updatedUser = {
        ...savedUser,
        level: data.user.level,
        xp: data.user.xp,
        gold: data.user.gold,
        streak: data.user.streak,
        attributes: data.user.attributes,
      };

      localStorage.setItem(
        "lifeRPGCurrentUser",
        JSON.stringify(updatedUser)
      );

      window.dispatchEvent(new Event("userUpdated"));

      fetchQuests();
    } catch (error) {
      console.log(error);
    }
  };

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );

      // Quest cards entrance
      if (questRefs.current.length > 0) {
        gsap.fromTo(
          questRefs.current.filter(Boolean),
          {
            opacity: 0,
            x: -25,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          }
        );

        // Hover animation
        questRefs.current.forEach((questCard) => {
          if (!questCard) return;

          const handleEnter = () => {
            gsap.to(questCard, {
              x: 5,
              scale: 1.01,
              duration: 0.2,
              ease: "power2.out",
            });
          };

          const handleLeave = () => {
            gsap.to(questCard, {
              x: 0,
              scale: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          };

          questCard.addEventListener("mouseenter", handleEnter);
          questCard.addEventListener("mouseleave", handleLeave);

          questCard._handleEnter = handleEnter;
          questCard._handleLeave = handleLeave;
        });
      }
    }, sectionRef);

    return () => {
      questRefs.current.forEach((questCard) => {
        if (!questCard) return;

        questCard.removeEventListener(
          "mouseenter",
          questCard._handleEnter
        );

        questCard.removeEventListener(
          "mouseleave",
          questCard._handleLeave
        );
      });

      ctx.revert();
    };
  }, [quests]);

  return (
    <motion.section
      ref={sectionRef}
      initial={false}
      className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Daily Quests
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Complete your quests and earn rewards
          </p>
        </div>

        <span className="text-sm font-semibold text-orange-600">
          {completedCount} / {quests.length + completedCount} Completed
        </span>
      </div>

      <div className="space-y-3">
        {quests.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p className="font-medium">No active quests</p>
            <p className="text-sm mt-1">
              Go to Quests and create a new quest.
            </p>
          </div>
        ) : (
          quests.map((quest, index) => (
            <div
              key={quest._id}
              ref={(el) => (questRefs.current[index] = el)}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-slate-200 rounded-xl hover:border-orange-200 transition"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleCompleteQuest(quest)}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-orange-50 hover:border-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition"
                >
                  <Check size={19} className="text-slate-400" />
                </button>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {quest.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-medium capitalize">
                      {quest.difficulty || quest.category}
                    </span>

                    {quest.time && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={13} />
                        {quest.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                <Zap size={16} />
                +{quest.xpReward} XP
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
};

export default DailyQuests;

