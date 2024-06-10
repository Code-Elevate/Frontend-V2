"use client";

import Copyright from "@/components/Copyright";
import { useAuth } from "@/utils/providers/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Routes, navItems, navTitles } from "../routes";
import { getContests, ContestDataResponse } from "@/utils/services/dashboard";
import { Navbar } from "@/components/Navbar";
import { DataTable } from "@/components/DataTable/data-table";
import { pastColumns } from "@/components/DataTable/columns/past";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import PastContests from "./past_contests";
import YourRunningContests from "./your_running_contests";
import RunningContests from "./running_contests";
import UpcommingContests from "./upcoming_contests";

const Dashboard = () => {
  const router = useRouter();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const token = useAuth((state) => state.token);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(Routes.LOGIN);
    }
  }, [isAuthenticated]);

  const [contestsData, setContestsData] = useState<ContestDataResponse | null>(
    null
  );

  useEffect(() => {
    getContests(isAuthenticated, token).then((data) => {
      setContestsData(data);
    });
  }, []);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden pt-32">
      <div className="max-w-7xl w-full">
        <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.01] bg-grid-black/[0.1] flex items-center justify-center absolute top-0 left-0 z-0">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <Navbar navItems={navItems} current={navTitles.Home} />
        {isAuthenticated && (
          <YourRunningContests
            yourRunningContests={
              contestsData ? contestsData?.users_running! : undefined
            }
          />
        )}
        <RunningContests runningContests={contestsData?.running} />
        <UpcommingContests upcommingContests={contestsData?.upcoming} />
        <PastContests
          pastContests={contestsData ? contestsData?.past : undefined}
        />
        <Copyright />
      </div>
    </main>
  );
};

export default Dashboard;
