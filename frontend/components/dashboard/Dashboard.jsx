import React from "react";
import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import DailyQuests from "./DailyQuests";

const Dashboard = () => {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <DashboardHeader />
      <StatsCard />
      <DailyQuests />
    </main>
  );
};

export default Dashboard;