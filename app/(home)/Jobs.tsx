import { companies } from "@/data";
import React from "react";

const Jobs = () => {
  return (
    <div className="py-20" id="testimonials">
      <h1 className="heading">
        Get hired by <span className="text-purple">Top Companies</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 mt-20">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex flex-col md:max-w-60 max-w-32 gap-2.5 items-center justify-center"
          >
            <company.icon className="w-10 h-10 opacity-90" />
            <p className="text-center text-sm md:text-lg lg:text-2xl font-thin text-white-100">
              <strong>{company.name}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
