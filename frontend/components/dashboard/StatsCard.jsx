import { Trophy, Sparkles, Coins, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/Authcontext";

const StatsCard = () => {
  const { currentUser } = useAuth();

  console.log("Current User:", currentUser);

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
        (currentUser?.streak || 0) > 0 ?
          "Keep it going!"
        : "Start your streak!",
      icon: Flame,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            whileHover={{
              y: -3,
              boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
            }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-colors hover:border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.title}</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </h3>

                <p className="text-xs text-slate-400 mt-1">{stat.subtitle}</p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Icon size={20} className="text-orange-600" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCard;
