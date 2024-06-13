import Clock from "react-live-clock";
import React from "react";

const Time = () => {
  return <Clock format={"DD MMMM YYYY dddd HH:mm:ss"} ticking={true} noSsr />;
};

export default Time;
