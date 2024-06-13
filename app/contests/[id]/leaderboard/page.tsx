import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ContestLeaderboard = ({ params }: Props) => {
  return <div>ContestLeaderboard {params.id}</div>;
};

export default ContestLeaderboard;
