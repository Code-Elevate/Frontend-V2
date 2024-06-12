import React from "react";

import { steps } from "@/data";
import { Button } from "@/components/ui/MovingBorder";

const Steps = () => {
  return (
    <div className="py-20" id="testimonials">
      <h1 className="heading">
        4 Step <span className="text-purple">Elevation</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {steps.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            className="flex-1 text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.title}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h2 className="uppercase tracking-widest text-xs text-start text-white-200">
                  Step {card.id}
                </h2>
                <h1 className="text-start text-xl md:text-2xl font-bold mt-2">
                  {card.title}
                </h1>
                <p className="text-start text-white-100 mt-2 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Steps;
