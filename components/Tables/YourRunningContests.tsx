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
  actions: ({ row }) => {
    const contest = row.original;

    return <TableDropdown contest={contest} showDescription showDetails />;
  },
});

const YourRunningContests = ({
  yourRunningContests,
}: {
  yourRunningContests: ContestData[] | undefined;
}) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between my-3">
          <CardTitle className="font-medium">
            Your registered running contests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {yourRunningContests ? (
            <DataTable
              columns={columns}
              data={yourRunningContests}
              hiddenColumns={["description", "endTime"]}
            />
          ) : (
            <DataTableLoading columnCount={6} rowCount={1} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default YourRunningContests;
