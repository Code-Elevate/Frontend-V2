import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContestResponse } from "@/utils/services/contest";
import { TextEditor } from "@/components/TextEditor/Editor";
import { TextReader } from "@/components/TextEditor/Reader";

const Description = ({ contest }: { contest: ContestResponse }) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardContent className="prose m-0 p-0">
          <TextReader value={JSON.parse(contest.longDescription)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Description;
