"use client";

import Link from "next/link";
import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  linkTo,
  handleClick,
  otherClasses,
  otherMainClasses,
  rounded,
  disabled,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  linkTo?: string;
  handleClick?: () => void;
  otherClasses?: string;
  otherMainClasses?: string;
  rounded?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`relative inline-flex h-12 w-60 md:mt-10 overflow-hidden cursor-pointer p-[1px] focus:outline-none ${otherMainClasses} ${
        rounded || "rounded-xl"
      } disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      {linkTo ? (
        <Link
          href={linkTo}
          className={`group inline-flex h-full w-full items-center justify-center 
          bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses} ${
            rounded || "rounded-xl"
          }`}
        >
          {position === "left" && (
            <div
              className={
                disabled ? "" : "group-hover:-rotate-45 ease-in-out duration-75"
              }
            >
              {icon}
            </div>
          )}
          {title}
          {position === "right" && (
            <div
              className={
                disabled ? "" : "group-hover:rotate-45 ease-in-out duration-75"
              }
            >
              {icon}
            </div>
          )}
        </Link>
      ) : (
        <span
          className={`group inline-flex h-full w-full items-center justify-center 
          bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses} ${
            rounded || "rounded-xl"
          }`}
        >
          {position === "left" && (
            <div
              className={
                disabled ? "" : "group-hover:-rotate-45 ease-in-out duration-75"
              }
            >
              {icon}
            </div>
          )}
          {title}
          {position === "right" && (
            <div
              className={
                disabled ? "" : "group-hover:rotate-45 ease-in-out duration-75"
              }
            >
              {icon}
            </div>
          )}
        </span>
      )}
    </button>
  );
};

export default MagicButton;
