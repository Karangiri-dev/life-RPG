import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import DailyQuests from "./DailyQuests";

const Dashboard = () => {
  const dashboardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        dashboardRef.current,
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
    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={dashboardRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <DashboardHeader />
      <StatsCard />
      <DailyQuests />
    </main>
  );
};

export default Dashboard;