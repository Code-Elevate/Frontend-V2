import React from "react";
import { FaLocationArrow } from "react-icons/fa6";

import { Routes } from "@/app/routes";
import MainPage from "@/components/MainPageHOC";
import Logo from "@/components/ui/Logo";
import MagicButton from "@/components/ui/MagicButton";

const NotFound = () => {
  return (
    <MainPage className="h-screen pb-40">
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <Logo otherClasses="opacity-5 scale-[700%] md:scale-[1200%]" />
      </div>

      <div className="flex justify-center relative my-20 z-50">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h1 className="text-center font-bold leading-snug tracking-wide text-[40px] md:text-5xl lg:text-6xl text-purple py-6 mt-6">
            CodeElevate
          </h1>

          <h1 className="text-center font-bold leading-snug tracking-wide text-[40px] md:text-5xl lg:text-6xl py-6">
            404
          </h1>

          <p className="text-center mb-4 text-sm md:text-lg lg:text-2xl">
            The page you are looking for does not exist.
          </p>

          <MagicButton
            title="Go back to home"
            icon={<FaLocationArrow />}
            position="right"
            linkTo={Routes.HOME}
            otherClasses="!bg-[#161A31]"
          />
        </div>
      </div>
    </MainPage>
  );
};

export default NotFound;
