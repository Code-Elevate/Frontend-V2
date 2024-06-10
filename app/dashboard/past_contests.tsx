import { pastColumns } from "@/components/DataTable/columns/past";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import { ContestData } from "@/types/contest";
import React from "react";

const PastContests = ({
  pastContests,
}: {
  pastContests: ContestData[] | undefined;
}) => {
  return (
    <div className="flex flex-col gap-8 my-4 relative">
      <div className="flex justify-start">
        <h1 className="heading items-start">Past Contests</h1>
      </div>
      {pastContests ? (
        <DataTable columns={pastColumns} data={pastContests} />
      ) : (
        <DataTableLoading columnCount={6} />
      )}
    </div>
  );
};

export default PastContests;
