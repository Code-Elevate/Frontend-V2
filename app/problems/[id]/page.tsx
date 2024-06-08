"use client";

import React from "react";

const ProblemId = ({ params }: { params: { id: string } }) => {
  return <div>Problem {params.id}</div>;
};

export default ProblemId;
