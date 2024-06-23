"use client";

import { MoreHorizontal } from "lucide-react";
import React from "react";

import { DataTable } from "@/components/DataTable/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContestProblemResponse,
  ContestResponse,
} from "@/utils/services/contest";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Routes } from "@/app/routes";

const problemsColumns: ColumnDef<ContestProblemResponse>[] = [
  {
    accessorKey: "id",
    header: "Problem ID",
    cell: ({ row }) => {
      const problem = row.original;
      return (
        <Link href={`${Routes.PROBLEMS}/${problem.id}`}>
          <Button variant="link" className="p-0">
            {problem.id}
          </Button>
        </Link>
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
            <DropdownMenuItem>
              <Link href={`${Routes.PROBLEMS}/${contest.id}`}>
                View Problem
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`${Routes.PROBLEMS}/${contest.id}/submissions`}>
                View Submissions
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Problems = ({ contest }: { contest: ContestResponse }) => {
  return (
    <div className="relative my-4 mb-10">
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
