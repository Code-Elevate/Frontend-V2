import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { navTitles } from "@/app/routes";
import Footer from "@/components/Footer";
import MainPage from "@/components/MainPageHOC";
import { getContest } from "@/utils/services/contest";

import Description from "./Description";
import Header from "./Header";
import Organizers from "./Organizers";
import Penalty from "./Penalty";
import Problems from "./Problems";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: {
      absolute: `Contest ${params.id}`,
    },
  };
};

const ContestId = async ({ params }: Props) => {
  const contest = await getContest(params.id);
  if (!contest) return notFound();

  return (
    <MainPage activeNav={navTitles.Contests}>
      <Header contest={contest} />
      <Description contest={contest} />
      <Organizers contest={contest} />
      <Penalty contest={contest} />
      <Problems contest={contest} />
      <Footer />
    </MainPage>
  );
};

export default ContestId;
