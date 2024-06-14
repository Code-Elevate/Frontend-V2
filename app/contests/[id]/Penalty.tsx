import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContestResponse } from "@/utils/services/contest";

const Penalty = ({ contest }: { contest: ContestResponse }) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardHeader>
          <CardTitle>Penalty Details</CardTitle>
        </CardHeader>
        {contest.penalty.isOn ? (
          <CardContent className="prose">
            <p className="mb-4">
              The contest will have a penalty system in place to discourage
              incorrect submissions. For every incorrect submission, teams will
              receive a penalty that will be deducted from their final score.
              The penalty details are as follows:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Score Penalty:</strong> For every incorrect submission,
                teams will receive a score penalty of{" "}
                <strong>{contest.penalty.value}</strong>.
              </li>
            </ul>
            <p className="mt-4">
              Please keep these penalties in mind as you work on the challenges.
              Careful planning and testing will be key to maximizing your
              team&apos;s score.
            </p>
          </CardContent>
        ) : (
          <CardContent className="prose">
            <p>
              The contest does not have a penalty system in place. You will not
              be penalized for incorrect submissions. Good luck!
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Penalty;
