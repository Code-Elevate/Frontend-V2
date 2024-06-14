import Link from "next/link";
import React from "react";

import { Routes } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const ManageContests = () => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardContent className="flex justify-between items-center pt-6">
          <div className="flex flex-col gap-8 relative justify-center items-start mt-3 mb-1">
            <CardTitle className="font-medium ">Manage contests</CardTitle>
            <p>
              Manage your contests here. You can create, edit, delete and view
              all your contests here.
            </p>
          </div>
          <Link href={Routes.MANAGE_CONTESTS}>
            <Button variant="default">Manage contest</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageContests;
