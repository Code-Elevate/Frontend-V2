import { Routes } from "@/app/routes";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ContestResponse } from "@/utils/services/contest";
import Link from "next/link";
import React from "react";

const Organizers = ({ contest }: { contest: ContestResponse }) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardHeader>
          <CardTitle>Organizers</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {contest.organizers.map((organizer) => (
            <div className="flex items-center" key={organizer}>
              <Avatar />
              <Link href={`${Routes.PROFILE}/${organizer}`}>
                <Button variant="link" className="font-semibold">
                  {organizer}
                </Button>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Organizers;
