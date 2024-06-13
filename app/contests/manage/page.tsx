"use client";

import { navItems, navTitles } from "@/app/routes";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import PastContests from "@/components/PastContests";
import RunningContests from "@/components/RunningContests";
import UpcommingContests from "@/components/UpcomingContests";
import ManageContestsTable from "@/components/ManageContests";
import {
  ManageContestDataResponse,
  getManageContests,
} from "@/utils/services/manageContests";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CreateContest from "./CreateContest";
import { ContestData } from "@/types/contest";

const ManageContests = () => {
  const [contestsData, setContestsData] = useState<ContestData[] | null>(null);

  useEffect(() => {
    const fetchContests = async () => {
      const data = await getManageContests();
      if (data) {
        let { upcoming, running, past } = data;
        upcoming = upcoming.map((contest) => ({
          ...contest,
          status: "upcoming",
        }));
        running = running.map((contest) => ({ ...contest, status: "running" }));
        past = past.map((contest) => ({ ...contest, status: "past" }));

        setContestsData([...running, ...upcoming, ...past]);
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
        <CreateContest />
        <ManageContestsTable yourContests={contestsData || []} />
        <Footer />
      </div>
    </main>
  );
};

export default ManageContests;
