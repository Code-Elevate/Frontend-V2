"use client";

import { useEffect } from "react";
import { useAuth } from "@/utils/providers/auth";
import { navItems, navTitles } from "../routes";
import { Navbar } from "@/components/Navbar";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

export default async function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (typeof window === "undefined") return null;

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden">
      <div className="max-w-7xl w-full">
        <Navbar navItems={navItems} current={navTitles.Home} />
        {isAuthenticated ? <Dashboard /> : <Landing />}
      </div>
    </main>
  );
}
