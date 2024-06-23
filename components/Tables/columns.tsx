import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContestData } from "@/types/contest";
import { formattedDateTime } from "@/utils/datetime";
import { CellContext, ColumnDef } from "@tanstack/react-table";

export const generateColumns = ({
  id = false,
  title = false,
  description = false,
  startTime = false,
  endTime = false,
  duration = false,
  organizers = false,
  status = false,
  actions,
}: {
  id?: boolean;
  title?: boolean;
  description?: boolean;
  startTime?: boolean;
  endTime?: boolean;
  duration?: boolean;
  organizers?: boolean;
  status?: boolean;
  actions?: ({ row }: CellContext<ContestData, unknown>) => React.JSX.Element;
}) => {
  const columns: ColumnDef<ContestData>[] = [];

  if (id) {
    columns.push({
      accessorKey: "id",
      header: "Contest ID",
      cell: ({ row }) => {
        const contest = row.original;
        return (
          <Link href={`/contests/${contest.id}`}>
            <Button variant="link" className="p-0">
              {contest.id}
            </Button>
          </Link>
        );
      },
    });
  }

  if (title) {
    columns.push({
      accessorKey: "title",
      header: "Title",
    });
  }

  if (description) {
    columns.push({
      accessorKey: "description",
      header: "Description",
    });
  }

  if (startTime) {
    columns.push({
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
    });
  }

  if (endTime) {
    columns.push({
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
    });
  }

  if (duration) {
    columns.push({
      accessorKey: "duration",
      header: "Duration",
    });
  }

  if (organizers) {
    columns.push({
      accessorKey: "organizers",
      header: "Organizers",
      cell: ({ row }) => {
        const organizers = row.getValue("organizers") as string[];
        return (
          <div className="flex flex-col gap-[2px] flex-shrink justify-start items-start">
            {organizers.map((organizer) => (
              <Link href={`/profile/${organizer}`} key={organizer}>
                <Button key={organizer} variant="link" className="p-0 h-auto">
                  {organizer}
                </Button>
              </Link>
            ))}
          </div>
        );
      },
    });
  }

  if (status) {
    columns.push({
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
              ${
                contest.status === "running"
                  ? "bg-green-900 text-green-100"
                  : ""
              }
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
    });
  }

  if (actions) {
    columns.push({
      id: "actions",
      cell: actions,
    });
  }

  return columns;
};
