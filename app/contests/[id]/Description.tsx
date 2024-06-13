import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContestResponse } from "@/utils/services/contest";
import React from "react";

const Description = ({ contest }: { contest: ContestResponse }) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardHeader>
          <CardTitle>Contest Description</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <div dangerouslySetInnerHTML={{ __html: contest.description }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Description;
