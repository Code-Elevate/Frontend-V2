import React from "react";

import { DataTable } from "@/components/DataTable/data-table";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContestData } from "@/types/contest";

import { generateColumns } from "./columns";
import { TableDropdown } from "./dropdownElements";

const columns = generateColumns({
  id: true,
  title: true,
  description: true,
  startTime: true,
  endTime: true,
  duration: true,
  organizers: true,
  status: true,
  actions: ({ row }) => {
    const contest = row.original;

    return (
      <TableDropdown
        contest={contest}
        showDescription
        showDetails={contest.status === "running" || contest.status === "past"}
        showLeaderboard={contest.status === "past"}
        editContest={contest.status === "upcoming"}
        deleteContest={contest.status === "upcoming"}
      />
    );
  },
});

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
            <DataTableLoading columnCount={7} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageContestsTable;
