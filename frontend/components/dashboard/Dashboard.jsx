import React from "react";
import { motion } from "framer-motion";
import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import DailyQuests from "./DailyQuests";

const Dashboard = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <DashboardHeader />
      <StatsCard />
      <DailyQuests />
    </motion.main>
  );
};

export default Dashboard;
