
import React, { useEffect, useRef, useState } from "react";
import { Flame, Trophy, Clock, Zap, Coins } from "lucide-react";
import { apiFetch } from "../../utils/apifetch.js";
import { useAuth } from "../context/Authcontext.jsx";
import gsap from "gsap";

const StreaksHistory = () => {
  const { currentUser } = useAuth();

  const [completedQuests, setCompletedQuests] = useState([]);

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const statCardsRef = useRef([]);
  const historyRef = useRef(null);
  const questRefs = useRef([]);
  const emptyStateRef = useRef(null);

  const fetchCompletedQuests = async () => {
    try {
      const response = await apiFetch("/api/quest");

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      const completed = data.quests.filter(
        (quest) => quest.isCompleted
      );

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

  // Page animations
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
          headerRef.current,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .fromTo(
          statCardsRef.current.filter(Boolean),
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
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .fromTo(
          historyRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );

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
            delay: 0.5,
            ease: "power2.out",
          }
        );
      }

      if (emptyStateRef.current) {
        gsap.fromTo(
          emptyStateRef.current,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.4,
            ease: "power2.out",
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [completedQuests]);

  return (
    <section
      ref={pageRef}
      className="min-h-screen bg-slate-50 px-4 py-6 sm:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-8">
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
          <div
            ref={(el) => (statCardsRef.current[0] = el)}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Flame size={25} className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Current Streak
                </p>

                <h2 className="text-2xl font-bold text-slate-900">
                  {streak} Days
                </h2>
              </div>
            </div>
          </div>

          {/* Best Streak */}
          <div
            ref={(el) => (statCardsRef.current[1] = el)}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <Trophy size={25} className="text-yellow-500" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Best Streak
                </p>

                <h2 className="text-2xl font-bold text-slate-900">
                  {bestStreak} Days
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div
          ref={historyRef}
          className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Quest History
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Your completed quests
            </p>
          </div>

          {completedQuests.length === 0 ? (
            <div
              ref={emptyStateRef}
              className="text-center py-10 text-slate-500"
            >
              <p className="font-medium">
                No completed quests yet.
              </p>

              <p className="text-sm mt-1">
                Complete a quest to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedQuests.map((quest, index) => (
                <div
                  key={quest._id}
                  ref={(el) => (questRefs.current[index] = el)}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-slate-200 rounded-xl transition-shadow hover:shadow-sm hover:border-orange-200"
                >
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
                        {new Date(
                          quest.updatedAt
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                      <Zap size={16} />
                      +{quest.xpReward} XP
                    </span>

                    <span className="flex items-center gap-1 text-sm font-semibold text-yellow-600">
                      <Coins size={16} />
                      +{quest.goldReward} Gold
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StreaksHistory;

