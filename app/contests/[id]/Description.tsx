import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContestResponse } from "@/utils/services/contest";
import { TextEditor } from "@/components/TextEditor/Editor";
import { TextReader } from "@/components/TextEditor/Reader";

const Description = ({ contest }: { contest: ContestResponse }) => {
  return (
    <div className="relative p-0 m-0 mb-10">
      <TextReader value={JSON.parse(contest.longDescription)} />
    </div>
  );
};

export default Description;
