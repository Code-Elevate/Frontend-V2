import React from "react";
import { IoIosCode } from "react-icons/io";

const Logo = ({ otherClasses }: { otherClasses?: string }) => {
  return (
    <div className={`relative ${otherClasses}`}>
      <IoIosCode className="w-20 h-20" />
      <div
        className="h-20 absolute top-0 right-4"
        style={{
          transform: "translateY(calc(50% - 2px))",
        }}
      >
        <div className="w-5 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Logo;
