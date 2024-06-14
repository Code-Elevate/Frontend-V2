import React from "react";

import NavPath from "@/components/NavPath";
import { cn } from "@/utils/cn";

const Heading = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <NavPath />
      <h1
        className={cn(
          "font-bold leading-snug tracking-normal text-3xl md:text-4xl lg:text-5xl relative mt-4 py-4",
          className
        )}
      >
        {children}
      </h1>
    </>
  );
};

export default Heading;
