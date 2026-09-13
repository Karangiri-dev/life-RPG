import { useEffect, useRef } from "react";
import { Trophy, Sparkles, Coins, Flame } from "lucide-react";
import { useAuth } from "../context/Authcontext";
import gsap from "gsap";

const StatsCard = () => {
  const { currentUser } = useAuth();

  console.log("Current User:", currentUser);

  const cardsRef = useRef([]);

  const stats = [
    {
      title: "Level",
      value: currentUser?.level || 1,
      subtitle: "Current level",
      icon: Trophy,
    },
    {
      title: "Experience",
      value: `${currentUser?.xp || 0} XP`,
      subtitle: "Keep completing quests",
      icon: Sparkles,
    },
    {
      title: "Gold",
      value: currentUser?.gold || 0,
      subtitle: "Available coins",
      icon: Coins,
    },
    {
      title: "Streak",
      value: `${currentUser?.streak || 0} Days`,
      subtitle:
        (currentUser?.streak || 0) > 0
          ? "Keep it going!"
          : "Start your streak!",
      icon: Flame,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Hover animation
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const handleEnter = () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);

        card._handleEnter = handleEnter;
        card._handleLeave = handleLeave;
      });
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        card.removeEventListener(
          "mouseenter",
          card._handleEnter
        );

        card.removeEventListener(
          "mouseleave",
          card._handleLeave
        );
      });

      ctx.revert();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-colors hover:border-orange-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  {stat.subtitle}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Icon size={20} className="text-orange-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCard;