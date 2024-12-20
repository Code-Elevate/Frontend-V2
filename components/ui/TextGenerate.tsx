"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  index,
  delay,
}: {
  words: string;
  className?: string;
  index: number;
  delay: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(delay),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={` ${
                idx > index ? "text-purple" : "dark:text-neutral-100 text-black"
              } opacity-0`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="leading-snug tracking-wide">{renderWords()}</div>
      </div>
    </div>
  );
};
