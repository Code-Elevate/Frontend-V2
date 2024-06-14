"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { IoClose, IoMenu } from "react-icons/io5";

import { Routes } from "@/app/routes";
import { cn } from "@/utils/cn";

export const Navbar = ({
  navItems,
  className,
  current,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  current?: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // const isAuthenticated = useAuth((state) => state.isAuthenticated);
  // const user = useAuth((state) => state.user);

  const [cookies, setCookies, removeCookies] = useCookies(["token", "user"]);

  const isAuthenticated = cookies["token"] ? true : false;
  const user = (cookies["user"] as string) || "";

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < (isMobile ? 0.01 : 0.02)) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  if (!hydrated) {
    return null;
  }

  return isMobile ? (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-[50vw] fixed top-10 inset-x-0 mx-auto border bg-black-100 border-white/[0.2] rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-2 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <button
          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          className="flex justify-center items-center border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white flex-grow py-2 rounded-full"
        >
          {isMobileDropdownOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
        </button>

        <button className="flex justify-center items-center border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white flex-grow py-2 rounded-full">
          {isAuthenticated ? (
            <Link href={`${Routes.PROFILE}/${user}`}>{user}</Link>
          ) : (
            <Link href={Routes.LOGIN}>Login</Link>
          )}
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </motion.div>

      {isMobileDropdownOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isMobileDropdownOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex flex-col max-w-[50vw]  fixed top-24 inset-x-0 mx-auto border bg-black-100 border-white/[0.2] rounded-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-2 py-4 items-center justify-center space-y-4",
            className
          )}
        >
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block">{navItem.icon}</span>
              <span className="block text-sm">{navItem.name}</span>

              {navItem.name === current && (
                <span className="absolute w-3/4 mx-auto -bottom-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
              )}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  ) : (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border bg-black-100 border-white/[0.2] rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 flex items-center justify-center space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>

            {navItem.name === current && (
              <span className="absolute w-3/4 mx-auto -bottom-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            )}
          </Link>
        ))}
        <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          {isAuthenticated ? (
            <Link href={`${Routes.PROFILE}/${user}`}>{user}</Link>
          ) : (
            <Link href={Routes.LOGIN}>Login</Link>
          )}
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
