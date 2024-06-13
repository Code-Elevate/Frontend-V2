import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "../../components/ui/MagicButton";
import { Spotlight } from "../../components/ui/Spotlight";
import { TextGenerateEffect } from "../../components/ui/TextGenerate";
import Logo from "../../components/ui/Logo";
import { Routes } from "@/app/routes";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <Logo otherClasses="opacity-5 scale-[700%] md:scale-[1200%]" />
      </div>

      <div className="flex justify-center relative my-20 z-50">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            CODE, COMPETE, WIN
          </h2>

          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Elevate your coding skills with CodeElevate contests"
            index={4}
            delay={0.2}
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Join CodeElevate - Your Ultimate Coding Contest Platform
          </p>

          <MagicButton
            title="Login"
            icon={<FaLocationArrow />}
            position="right"
            linkTo={Routes.LOGIN}
            otherClasses="!bg-[#161A31]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
