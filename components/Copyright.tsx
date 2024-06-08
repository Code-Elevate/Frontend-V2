import { socialMedia } from "@/data";
import React from "react";

const Copyright = () => {
  return (
    <div className="flex mt-36 md:flex-row flex-col justify-between items-center gap-6">
      <p className="md:text-base text-sm md:font-normal font-light z-50">
        Copyright © 2024 CodeElevate
      </p>

      <div className="flex items-center md:gap-3 gap-6">
        {socialMedia.map((profile) => (
          <a
            href={profile.link}
            key={profile.id}
            className="w-10 h-10 cursor-pointer flex items-center justify-center backdrop-filter backdrop-blur-lg saturate-150 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
          >
            <profile.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Copyright;
