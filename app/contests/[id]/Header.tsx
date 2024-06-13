import { Button } from "@/components/ui/button";
import { formattedDateTime } from "@/utils/datetime";
import { ContestResponse } from "@/utils/services/contest";
import { Calendar, CheckIcon, History } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = ({ contest }: { contest: ContestResponse }) => {
  const { date: startDate, time: startTime } = formattedDateTime(
    contest.startTime
  );
  const { date: endDate, time: endTime } = formattedDateTime(contest.endTime);

  return (
    <div className="w-full pt-12 md:pt-24 lg:pt-32 my-4 mb-10">
      <div className="grid gap-4 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
            {contest.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            {contest.status === "running" && <Running />}
            {contest.status === "upcoming" && <Upcoming />}
            {contest.status === "past" && <Past />}
            <div className="text-sm text-gray-400">
              Starts: {startDate} {startTime} - Ends: {endDate} {endTime}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start md:justify-end space-y-4">
          {(contest.status === "running" || contest.status === "upcoming") && (
            <Link href={`/contests/${contest.id}/register`}>
              <Button>Register Now</Button>
            </Link>
          )}
          {contest.status === "past" && (
            <Link href={`/contests/${contest.id}/leaderboard`}>
              <Button>View Leaderboard</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Running = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-900 text-green-100">
    <CheckIcon className="w-4 h-4" />
    <span className="text-sm font-medium">Running</span>
  </div>
);

const Upcoming = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-900 text-yellow-100">
    <Calendar className="w-4 h-4" />
    <span className="text-sm font-medium">Upcoming</span>
  </div>
);

const Past = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-900 text-gray-100">
    <History className="w-4 h-4" />
    <span className="text-sm font-medium">Ended</span>
  </div>
);

export default Header;
