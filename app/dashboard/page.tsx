"use client";

import React, { useEffect, useState } from "react";
import { navItems, navTitles } from "../routes";
import { getContests, ContestDataResponse } from "@/utils/services/dashboard";
import { Navbar } from "@/components/Navbar";
import PastContests from "../../components/PastContests";
import YourRunningContests from "../../components/YourRunningContests";
import RunningContests from "../../components/RunningContests";
import UpcommingContests from "../../components/UpcomingContests";
import { UserDetails, getUserDetails } from "@/utils/services/user";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import UserAnalytics from "./UserAnalytics";

const Dashboard = () => {
  const [contestsData, setContestsData] = useState<ContestDataResponse | null>(
    null
  );
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchContests = async () => {
      const data = await getContests();
      if (data) {
        setContestsData(data);
      } else {
        toast.error("Failed to fetch contests");
      }
    };

    const fetchUserDetails = async () => {
      const data = await getUserDetails();
      if (data) {
        setUserDetails(data);
      } else {
        toast.error("Failed to fetch user analytics");
      }
    };

    Promise.all([fetchUserDetails(), fetchContests()]);
  }, []);

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden pt-32 pb-8">
      <div className="max-w-7xl w-full">
        <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.01] bg-grid-black/[0.1] flex items-center justify-center absolute top-0 left-0 z-0">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <Navbar navItems={navItems} current={navTitles.Home} />
        <UserAnalytics userDetails={userDetails} />
        <YourRunningContests
          yourRunningContests={contestsData?.users_running}
        />
        <RunningContests runningContests={contestsData?.running} />
        <UpcommingContests upcommingContests={contestsData?.upcoming} />
        <PastContests pastContests={contestsData?.past} />
        <Footer />
      </div>
    </main>
  );
};

export default Dashboard;
