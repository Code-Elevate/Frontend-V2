"use client";

import React from "react";

const ContestId = ({ params }: { params: { id: string } }) => {
  return <div>Contest {params.id}</div>;
};

export default ContestId;
