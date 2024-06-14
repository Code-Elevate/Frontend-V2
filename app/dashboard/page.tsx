"use client";

import React, { useEffect, useState } from "react";
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
import { getUserDetails, UserDetails } from "@/utils/services/user";

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
    <MainPage activeNav={navTitles.Home}>
      <Heading>Dashboard</Heading>
      <UserAnalytics userDetails={userDetails} />
      <YourRunningContests yourRunningContests={contestsData?.users_running} />
      <RunningContests runningContests={contestsData?.running} />
      <UpcommingContests upcommingContests={contestsData?.upcoming} />
      <PastContests pastContests={contestsData?.past} />
      <Footer />
    </MainPage>
  );
};

export default Dashboard;
