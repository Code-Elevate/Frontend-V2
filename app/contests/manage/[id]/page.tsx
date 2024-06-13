import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EditContest = ({ params }: Props) => {
  return <div>EditContest {params.id}</div>;
};

export default EditContest;
