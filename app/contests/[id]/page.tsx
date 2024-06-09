import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: {
      absolute: `Contest ${params.id}`,
    },
  };
};

const ContestId = ({ params }: Props) => {
  return <div>Contest {params.id}</div>;
};

export default ContestId;
