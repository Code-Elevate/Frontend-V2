import { MoreHorizontal } from "lucide-react";
import React from "react";

import { Routes } from "@/app/routes";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContestData } from "@/types/contest";
import { formattedDateTime } from "@/utils/datetime";
import { routeToParticipate } from "@/utils/navigate";
import { ColumnDef } from "@tanstack/react-table";

const routeToContest = (id: string) => {
  window.open(`${Routes.CONTESTS}/${id}`);
};

const routeToLeaderboard = (id: string) => {
  window.open(`${Routes.CONTESTS}/${id}/leaderboard`);
};

const columns: ColumnDef<ContestData>[] = [
  {
    accessorKey: "id",
    header: "Contest ID",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       ID
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => {
      const contest = row.original;
      return (
        <div className="text-left">
          <Button
            variant="link"
            className="p-0"
            onClick={() => routeToContest(contest.id)}
          >
            {contest.id}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const { date, time } = formattedDateTime(row.getValue("startTime"));
      return (
        <div>
          {date} <span className="text-gray-400">{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      const { date, time } = formattedDateTime(row.getValue("endTime"));
      return (
        <div>
          {date} <span className="text-gray-400">{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contest = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Description</DropdownMenuLabel>
            <p className="relative flex px-2 py-1.5 text-sm items-start">
              {contest.description}
            </p>
            <DropdownMenuSeparator className="h-[2px]" />
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => routeToContest(contest.id)}>
              Show details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => routeToParticipate(contest.id)}>
              Participate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const RunningContests = ({
  runningContests,
}: {
  runningContests: ContestData[] | undefined | null;
}) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between my-3">
          <CardTitle className="font-medium">Running contests</CardTitle>
        </CardHeader>
        <CardContent>
          {runningContests ? (
            <DataTable columns={columns} data={runningContests} />
          ) : (
            <DataTableLoading columnCount={6} rowCount={1} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RunningContests;
