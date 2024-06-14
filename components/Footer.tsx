"use client";

import React from "react";

import Time from "@/components/Time";
import Logo from "@/components/ui/Logo";
import { socialMedia } from "@/data";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center mt-36 mb-4 z-50">
      <div className="w-full flex md:flex-row flex-col items-center justify-around gap-6">
        <p className="w-1/3 md:text-base text-sm md:font-normal font-light text-white-100 text-center md:text-left">
          Copyright © 2024 CodeElevate
        </p>

        <div className="w-1/3">
          <Logo otherClasses="scale-[50%] p-0 m-0" color="#B95CF4" />
        </div>

        <div className="w-1/3 flex items-center md:gap-3 gap-6 justify-center md:justify-end">
          {socialMedia.map((profile) => (
            <a
              href={profile.link}
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex items-center justify-center backdrop-filter backdrop-blur-lg saturate-150 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 text-white-100"
            >
              <profile.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-white-100 mt-8 md:mt-0 md:text-base text-sm md:font-normal font-light">
        <p>Server time:</p>
        <Time />
      </div>
    </footer>
  );
};

export default Footer;
