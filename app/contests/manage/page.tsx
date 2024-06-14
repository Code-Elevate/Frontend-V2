"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { navTitles } from "@/app/routes";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import MainPage from "@/components/MainPageHOC";
import ManageContestsTable from "@/components/ManageContests";
import { ContestData } from "@/types/contest";
import { getManageContests } from "@/utils/services/manageContests";

import CreateContest from "./CreateContest";

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
    <MainPage activeNav={navTitles.Contests}>
      <Heading>Manage Contests</Heading>
      <CreateContest />
      <ManageContestsTable yourContests={contestsData || []} />
      <Footer />
    </MainPage>
  );
};

export default ManageContests;
