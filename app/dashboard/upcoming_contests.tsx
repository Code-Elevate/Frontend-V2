import { pastColumns } from "@/components/DataTable/columns/past";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTableLoading } from "@/components/DataTable/data-table-skeleton";
import { ContestData } from "@/types/contest";
import React from "react";

const UpcommingContests = ({
  upcommingContests,
}: {
  upcommingContests: ContestData[] | undefined;
}) => {
  return (
    <div className="flex flex-col gap-8 my-4 relative">
      <div className="flex justify-start">
        <h1 className="heading items-start">Upcomming Contests</h1>
      </div>
      {upcommingContests ? (
        <DataTable columns={pastColumns} data={upcommingContests} />
      ) : (
        <DataTableLoading columnCount={6} rowCount={4} />
      )}
    </div>
  );
};

export default UpcommingContests;
