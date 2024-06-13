// "use client";

import { ContestResponse, getContest } from "@/utils/services/contest";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckIcon, History, TrophyIcon, Users } from "lucide-react";
import { formattedDateTime } from "@/utils/datetime";
import Header from "./Header";
import { Navbar } from "@/components/Navbar";
import { navItems, navTitles } from "@/app/routes";
import Description from "./Description";
import Organizers from "./Organizers";
import Penalty from "./Penalty";
import Problems from "./Problems";
import Footer from "@/components/Footer";

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
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden pb-8 mt-8">
      <div className="max-w-7xl w-full">
        <Navbar navItems={navItems} current={navTitles.Contests} />
        <Header contest={contest} />
        <Description contest={contest} />
        <Organizers contest={contest} />
        <Penalty contest={contest} />
        <Problems contest={contest} />
        <Footer />
      </div>
    </main>
  );
};

export default ContestId;
