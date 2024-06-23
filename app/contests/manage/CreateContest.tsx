import Link from "next/link";

import { Routes } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const CreateContest = () => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-8 items-start justify-between md:items-center pt-6">
          <div className="flex flex-col gap-8 relative justify-center items-start mt-3 mb-1">
            <CardTitle className="font-medium ">Create new contest</CardTitle>
            <p className="text-sm md:text-base">
              Create your contest here. You can edit or delete your contests
              after creating them.
            </p>
          </div>
          <Link href={Routes.NEW_CONTEST}>
            <Button variant="secondary">Create contest</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContest;
