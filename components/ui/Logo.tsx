import React from "react";
import { IoIosCode } from "react-icons/io";

const Logo = ({
  otherClasses,
  color = "#FFFFFF",
}: {
  otherClasses?: string;
  color?: "#FFFFFF" | "#B95CF4";
}) => {
  return (
    <div className={`flex items-center justify-center z-50 ${otherClasses}`}>
      <IoIosCode
        className={`w-20 h-20`}
        style={{
          color: color,
        }}
      />
      <div
        className="h-20 absolute top-0"
        style={{
          transform: "translateY(calc(50% - 2px)) translateX(50%)",
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
