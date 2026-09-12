import React from "react";
import {
  Dumbbell,
  Brain,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

const CharacterAttributes = () => {
  const attributes = [
    {
      name: "Strength",
      value: 72,
      icon: Dumbbell,
      description: "Physical power & fitness",
    },
    {
      name: "Intelligence",
      value: 65,
      icon: Brain,
      description: "Learning & knowledge",
    },
    {
      name: "Discipline",
      value: 80,
      icon: ShieldCheck,
      description: "Consistency & self-control",
    },
    {
      name: "Health",
      value: 70,
      icon: HeartPulse,
      description: "Energy & wellbeing",
    },
  ];

  return (
    <section className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Character Attributes
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Build your real-life character by completing quests.
        </p>
      </div>

      {/* Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {attributes.map((attribute) => {
          const Icon = attribute.icon;

          return (
            <div
              key={attribute.name}
              className="border border-slate-200 rounded-xl p-4 hover:border-orange-200 transition"
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <Icon size={20} className="text-orange-500" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {attribute.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {attribute.description}
                    </p>
                  </div>
                </div>

                <span className="text-lg font-bold text-orange-600">
                  {attribute.value}
                </span>

              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    style={{ width: `${attribute.value}%` }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default CharacterAttributes;