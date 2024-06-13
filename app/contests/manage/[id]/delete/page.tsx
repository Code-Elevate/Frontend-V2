import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const DeleteContest = ({ params }: Props) => {
  return <div>DeleteContest {params.id}</div>;
};

export default DeleteContest;
