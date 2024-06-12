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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

const UpcommingContests = ({
  upcommingContests,
}: {
  upcommingContests: ContestData[] | undefined;
}) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between my-3">
          <CardTitle className="font-medium">Upcomming contests</CardTitle>
        </CardHeader>
        <CardContent>
          {upcommingContests ? (
            <DataTable columns={pastColumns} data={upcommingContests} />
          ) : (
            <DataTableLoading columnCount={6} rowCount={4} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcommingContests;
