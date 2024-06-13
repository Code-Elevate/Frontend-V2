"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { routeToProblem, routeToProblemSubmissions } from "@/utils/navigate";
import {
  ContestProblemResponse,
  ContestResponse,
} from "@/utils/services/contest";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/DataTable/data-table";

const problemsColumns: ColumnDef<ContestProblemResponse>[] = [
  {
    accessorKey: "id",
    header: "Problem ID",
    cell: ({ row }) => {
      const problem = row.original;
      return (
        <Button
          variant="link"
          className="p-0"
          onClick={() => routeToProblem(problem.id)}
        >
          {problem.id}
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex gap-[2px] flex-shrink justify-start items-start">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" color="gray">
              {tag}
            </Badge>
          ))}
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
            <DropdownMenuItem onClick={() => routeToProblem(contest.id)}>
              Solve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => routeToProblemSubmissions(contest.id)}
            >
              Show Submissions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Problems = ({ contest }: { contest: ContestResponse }) => {
  return (
    <div className="relative my-4">
      <Card>
        <CardHeader>
          <CardTitle>Problems</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          {contest.status === "upcoming" ? (
            <p>Problems will be available during the contest</p>
          ) : (
            <DataTable
              columns={problemsColumns}
              data={contest.problems || []}
              hiddenColumns={["tags"]}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Problems;
