import React from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Brain,
  ShieldCheck,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "../context/Authcontext";

const CharacterStats = () => {
  const { currentUser } = useAuth();

  const attributes = {
    Strength: currentUser?.attributes?.strength || 70,
    Intelligence: currentUser?.attributes?.intelligence || 65,
    Discipline: currentUser?.attributes?.discipline || 80,
    Health: currentUser?.attributes?.health || 70,
  };

  const attributeData = [
    {
      name: "Strength",
      icon: Dumbbell,
      description: "Your physical power, fitness and physical performance.",
      skills: ["Exercise", "Workout", "Physical Activity"],
    },
    {
      name: "Intelligence",
      icon: Brain,
      description:
        "Your knowledge, learning ability and problem-solving skills.",
      skills: ["Study", "Reading", "Learning"],
    },
    {
      name: "Discipline",
      icon: ShieldCheck,
      description: "Your consistency, focus and ability to follow your goals.",
      skills: ["Consistency", "Focus", "Time Management"],
    },
    {
      name: "Health",
      icon: HeartPulse,
      description: "Your overall energy, healthy habits and wellbeing.",
      skills: ["Sleep", "Nutrition", "Daily Activity"],
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <TrendingUp size={23} className="text-orange-500" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Character Stats
            </h1>

            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Track your growth and build a stronger version of yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Attributes */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        {attributeData.map((attribute) => {
          const Icon = attribute.icon;
          const value = attributes[attribute.name];

          return (
            <motion.div
              key={attribute.name}
              whileHover={{
                y: -3,
                boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
              }}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-colors hover:border-orange-200">
              {/* Title */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <Icon size={23} className="text-orange-500" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {attribute.name}
                    </h2>

                    <p className="text-xs text-slate-400">Attribute Level</p>
                  </div>
                </div>

                <span className="text-2xl font-bold text-orange-600">
                  {value}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 mt-5 leading-6">
                {attribute.description}
              </p>

              {/* Progress */}
              <div className="mt-5">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">
                    Progress
                  </span>

                  <span className="text-xs font-semibold text-orange-600">
                    {value} / 100
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(value, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  Related Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {attribute.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </motion.main>
  );
};

export default CharacterStats;
