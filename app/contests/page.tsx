import { Metadata } from "next";
import React from "react";
import { navItems, navTitles } from "../routes";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contests",
};

const Contests = () => {
  return (
    <div className="h-screen py-20 my-20">
      <Navbar navItems={navItems} current={navTitles.Contests} />
      <div>Contests</div>
    </div>
  );
};

export default Contests;
