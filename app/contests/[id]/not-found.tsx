import React from "react";
import { FaLocationArrow } from "react-icons/fa6";

import { Routes } from "@/app/routes";
import Logo from "@/components/ui/Logo";
import MagicButton from "@/components/ui/MagicButton";

const ContestNotFound = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden pb-8">
      <div className="max-w-7xl w-full">
        <div className="pb-20 pt-36">
          <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <Logo otherClasses="opacity-5 scale-[700%] md:scale-[1200%]" />
          </div>

          <div className="flex justify-center relative my-20 z-50">
            <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
              <h1 className="text-center font-bold leading-snug tracking-wide text-[40px] md:text-5xl lg:text-6xl text-purple py-6 mt-10">
                CodeElevate
              </h1>

              <h1 className="text-center font-bold leading-snug tracking-wide text-[30px] md:text-4xl lg:text-5xl py-6">
                Contest Not Found
              </h1>

              <p className="text-center mb-4 text-sm md:text-lg lg:text-xl">
                The contest you are looking for does not exist.
              </p>

              <MagicButton
                title="Go back to contests"
                icon={<FaLocationArrow />}
                position="right"
                linkTo={Routes.CONTESTS}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContestNotFound;
