"use client";

import { useEffect } from "react";
import { useAuth } from "@/utils/providers/auth";
import { Routes, navItems, navTitles } from "../routes";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Hero from "./Hero";
import Grid from "./Grid";
import Footer from "./Footer";

export default async function Home() {
  const router = useRouter();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(Routes.DASHBOARD);
    }
  }, [isAuthenticated]);

  if (typeof window === "undefined") return null;

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden">
      <div className="max-w-7xl w-full">
        <Navbar navItems={navItems} current={navTitles.Home} />
        <Hero />
        <Grid />
        <Footer />
      </div>
    </main>
  );
}
