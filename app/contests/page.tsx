"use client";

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { navTitles } from "@/app/routes";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import MainPage from "@/components/MainPageHOC";
import PastContests from "@/components/PastContests";
import RunningContests from "@/components/RunningContests";
import UpcommingContests from "@/components/UpcomingContests";
import YourRunningContests from "@/components/YourRunningContests";
import { ContestDataResponse, getContests } from "@/utils/services/dashboard";

import ManageContests from "./ManageContests";

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
    <MainPage activeNav={navTitles.Contests}>
      <Heading>Contests</Heading>
      <ManageContests />
      {cookies.token && (
        <YourRunningContests
          yourRunningContests={contestsData?.users_running}
        />
      )}
      <RunningContests runningContests={contestsData?.running} />
      <UpcommingContests upcommingContests={contestsData?.upcoming} />
      <PastContests pastContests={contestsData?.past} />
      <Footer />
    </MainPage>
  );
};

export default Contests;
