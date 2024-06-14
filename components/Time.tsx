import React from "react";
import Clock from "react-live-clock";

const Time = () => {
  return <Clock format={"DD MMMM YYYY dddd HH:mm:ss"} ticking={true} noSsr />;
};

export default Time;
