
import React from "react";
import {
  Dumbbell,
  Brain,
  ShieldCheck,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

import { useXP } from "../context/XPContext";

const CharacterStats = () => {
  const { attributes } = useXP();

  const attributeData = [
    {
      name: "Strength",
      icon: Dumbbell,
      description:
        "Your physical power, fitness and physical performance.",
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
      description:
        "Your consistency, focus and ability to follow your goals.",
      skills: ["Consistency", "Focus", "Time Management"],
    },
    {
      name: "Health",
      icon: HeartPulse,
      description:
        "Your overall energy, healthy habits and wellbeing.",
      skills: ["Sleep", "Nutrition", "Daily Activity"],
    },
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">

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
            <div
              key={attribute.name}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
            >

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

                    <p className="text-xs text-slate-400">
                      Attribute Level
                    </p>
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
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${value}%`,
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
                      className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

            </div>
          );
        })}

      </section>

    </main>
  );
};

export default CharacterStats;

