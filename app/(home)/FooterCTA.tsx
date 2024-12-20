"use client";

import React from "react";
import { FaLocationArrow } from "react-icons/fa6";

import { Routes } from "@/app/routes";
import Footer from "@/components/Footer";
import Logo from "@/components/ui/Logo";
import MagicButton from "@/components/ui/MagicButton";

const FooterCTA = () => {
  return (
    <footer className="w-full pt-20 lg:mt-12 z-0" id="contact">
      <div className="w-full absolute left-0 bottom-0 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="footer"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <Logo otherClasses="mb-20 scale-[250%]" color="#B95CF4" />

        <h1 className="heading lg:max-w-[45vw]">
          Ready to take your<span className="text-purple"> coding skills </span>
          to the next level?
        </h1>
        <p className="md:mt-8 my-6 text-center text-sm md:text-lg lg:text-2xl">
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

      <Footer />
    </footer>
  );
};

export default FooterCTA;
