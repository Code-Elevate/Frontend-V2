import React from "react";
import { IoIosCode } from "react-icons/io";

const Logo = ({
  otherClasses,
  color = "#FFFFFF",
}: {
  otherClasses?: string;
  color?: "#FFFFFF" | "#CBACF9";
}) => {
  return (
    <div className={`relative z-50 ${otherClasses}`}>
      <IoIosCode
        className={`w-20 h-20`}
        style={{
          color: color,
        }}
      />
      <div
        className="h-20 absolute top-0 right-4"
        style={{
          transform: "translateY(calc(50% - 2px))",
        }}
      >
        <div
          className={`w-5 h-1 rounded-full relative`}
          style={{
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Logo;
