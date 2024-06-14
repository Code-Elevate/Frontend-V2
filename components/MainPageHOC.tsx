import React from "react";

import { navItems } from "@/app/routes";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/utils/cn";

const MainPage = ({
  children,
  className,
  activeNav,
}: {
  children: React.ReactNode;
  className?: string;
  activeNav?: string;
}) => {
  return (
    <main
      className={cn(
        "relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden pt-32 pb-8",
        className
      )}
    >
      <div className="max-w-7xl w-full">
        {children}
        <Navbar navItems={navItems} current={activeNav} />
      </div>
    </main>
  );
};

export default MainPage;
