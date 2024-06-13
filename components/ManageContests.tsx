import React from "react";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { ContestData } from "@/types/contest";
import { ColumnDef } from "@tanstack/react-table";
import { formattedDateTime } from "@/utils/datetime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  routeToContest,
  routeToProfile,
  routeToLeaderboard,
  routeToEditContest,
  routeToDeleteContest,
} from "../utils/navigate";
import { Badge } from "./ui/badge";

const columns: ColumnDef<ContestData>[] = [
  {
    accessorKey: "id",
    header: "Contest ID",
    cell: ({ row }) => {
      const contest = row.original;
      return (
        <Button
          variant="link"
          className="p-0"
          onClick={() => routeToContest(contest.id)}
        >
          {contest.id}
        </Button>
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
    accessorKey: "organizers",
    header: "Organizers",
    cell: ({ row }) => {
      const organizers = row.getValue("organizers") as string[];
      return (
        <div className="flex flex-col gap-[2px] flex-shrink justify-start items-start">
          {organizers.map((organizer) => (
            <Button
              key={organizer}
              variant="link"
              className="p-0 h-auto"
              onClick={() => routeToProfile(organizer)}
            >
              {organizer}
            </Button>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const contest = row.original;
      return (
        <div className="flex items-center justify-center">
          <Badge
            variant="default"
            className={`
            ${contest.status === "running" ? "bg-green-900 text-green-100" : ""}
            ${
              contest.status === "upcoming"
                ? "bg-yellow-900 text-yellow-100"
                : ""
            }
            ${
              contest.status === "past" ? "bg-gray-900 text-gray-100" : ""
            } hover:bg-white hover:text-gray-900
            `}
          >
            {contest.status}
          </Badge>
        </div>
      );
    },
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
            {(contest.status === "running" || contest.status === "past") && (
              <DropdownMenuItem onClick={() => routeToContest(contest.id)}>
                Show Details
              </DropdownMenuItem>
            )}
            {contest.status === "past" && (
              <DropdownMenuItem onClick={() => routeToLeaderboard(contest.id)}>
                Show Leaderboard
              </DropdownMenuItem>
            )}
            {contest.status === "upcoming" && (
              <DropdownMenuItem onClick={() => routeToEditContest(contest.id)}>
                Edit Contest
              </DropdownMenuItem>
            )}
            {contest.status === "upcoming" && (
              <DropdownMenuItem
                onClick={() => routeToDeleteContest(contest.id)}
              >
                Delete Contest
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ManageContestsTable = ({
  yourContests,
}: {
  yourContests: ContestData[] | undefined;
}) => {
  return (
    <div className="relative my-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between my-3">
          <CardTitle className="font-medium">Your contests</CardTitle>
        </CardHeader>
        <CardContent>
          {yourContests ? (
            <DataTable
              columns={columns}
              data={yourContests}
              hiddenColumns={["description", "endTime"]}
            />
          ) : (
            <DataTableLoading columnCount={6} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageContestsTable;
