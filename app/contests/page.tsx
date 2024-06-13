"use client";

import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import { navItems, navTitles } from "../routes";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import PastContests from "@/components/PastContests";
import RunningContests from "@/components/RunningContests";
import UpcommingContests from "@/components/UpcomingContests";
import YourRunningContests from "@/components/YourRunningContests";
import { ContestDataResponse, getContests } from "@/utils/services/dashboard";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const Contests = () => {
  const [cookies] = useCookies(["token"]);

  const [contestsData, setContestsData] = useState<ContestDataResponse | null>(
    null
  );

  useEffect(() => {
    const fetchContests = async () => {
      const data = await getContests();
      if (data) {
        setContestsData(data);
      } else {
        toast.error("Failed to fetch contests");
      }
    };

    fetchContests();
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

        <Navbar navItems={navItems} current={navTitles.Contests} />
        {cookies.token && (
          <YourRunningContests
            yourRunningContests={contestsData?.users_running}
          />
        )}
        <RunningContests runningContests={contestsData?.running} />
        <UpcommingContests upcommingContests={contestsData?.upcoming} />
        <PastContests pastContests={contestsData?.past} />
        <Footer />
      </div>
    </main>
  );
};

export default Contests;
