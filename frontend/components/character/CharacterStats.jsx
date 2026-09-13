import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Brain,
  ShieldCheck,
  HeartPulse,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/Authcontext";
import gsap from "gsap";

const CharacterStats = () => {
  const { currentUser } = useAuth();

  const attributes = {
    Strength: currentUser?.attributes?.strength || 70,
    Intelligence: currentUser?.attributes?.intelligence || 65,
    Discipline: currentUser?.attributes?.discipline || 80,
    Health: currentUser?.attributes?.health || 70,
  };

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const progressRefs = useRef([]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page entrance
      gsap.fromTo(
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
      );

      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      // Attribute cards animation
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          delay: 0.3,
          ease: "power3.out",
        }
      );

      // Progress bars animation
      progressRefs.current.forEach((bar, index) => {
        if (!bar) return;

        const value = attributes[attributeData[index].name];

        gsap.fromTo(
          bar,
          {
            width: "0%",
          },
          {
            width: `${Math.min(value, 100)}%`,
            duration: 1,
            delay: 0.7 + index * 0.12,
            ease: "power2.out",
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [attributes]);

  return (
    <main
      ref={pageRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      {/* Page Header */}
      <section
        ref={headerRef}
        className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm"
      >
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
        {attributeData.map((attribute, index) => {
          const Icon = attribute.icon;
          const value = attributes[attribute.name];

          return (
            <motion.div
              key={attribute.name}
              ref={(el) => (cardsRef.current[index] = el)}
              whileHover={{
                y: -3,
                boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
              }}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-colors hover:border-orange-200"
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
                    ref={(el) => (progressRefs.current[index] = el)}
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: "0%",
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
            </motion.div>
          );
        })}
      </section>
    </main>
  );
};

export default CharacterStats;