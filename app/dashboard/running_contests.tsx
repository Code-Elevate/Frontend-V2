import { pastColumns } from "@/components/DataTable/columns/past";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import { ContestData } from "@/types/contest";
import React from "react";

const RunningContests = ({
  runningContests,
}: {
  runningContests: ContestData[] | undefined;
}) => {
  return (
    <div className="flex flex-col gap-8 my-4 relative">
      <div className="flex justify-start">
        <h1 className="heading items-start">Running Contests</h1>
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
