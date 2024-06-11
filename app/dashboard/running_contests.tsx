import React from "react";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { ContestData } from "@/types/contest";
import { ColumnDef } from "@tanstack/react-table";
import { Routes } from "../routes";
import { formattedDateTime } from "@/utils/datetime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const routeToContest = (id: string) => {
  window.open(`${Routes.CONTESTS}/${id}`);
};

const routeToLeaderboard = (id: string) => {
  window.open(`${Routes.CONTESTS}/${id}/leaderboard`);
};

const pastColumns: ColumnDef<ContestData>[] = [
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => routeToContest(contest.id)}>
              Show details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => routeToLeaderboard(contest.id)}>
              Show Leaderboard
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
  runningContests: ContestData[] | undefined;
}) => {
  return (
    <div className="flex flex-col gap-8 my-4 relative">
      <div className="flex justify-start">
        <h1 className="heading items-start">Running contests</h1>
      </div>
      {runningContests ? (
        <DataTable columns={pastColumns} data={runningContests} />
      ) : (
        <DataTableLoading columnCount={6} rowCount={1} />
      )}
    </div>
  );
};

export default RunningContests;
