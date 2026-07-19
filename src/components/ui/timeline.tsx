"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { serif } from "@/styles/typography";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  heading,
  subheading,
}: {
  data: TimelineEntry[];
  heading?: string;
  subheading?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      {(heading || subheading) && (
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-10">
          {heading && (
            <h2
              className="text-lg md:text-4xl mb-4 text-[#333333] dark:text-[#F5EDE0] max-w-4xl"
              style={serif}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[#666666] dark:text-neutral-300 text-sm md:text-base max-w-sm">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 w-12 absolute left-3 md:left-3 rounded-full bg-[#FAF6EE] dark:bg-[#1A0E0A] ring-4 ring-[#FAF6EE] dark:ring-[#1A0E0A] shadow-md flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#8B2626] to-[#D87D4A] shadow-[0_0_12px_rgba(139,38,38,0.5)]" />
              </div>
              <h3
                className="hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-bold text-[#333333]/60 dark:text-[#F5EDE0]/50"
                style={serif}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold text-[#333333] dark:text-[#F5EDE0]"
                style={serif}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-9 left-9 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#8B2626]/15 dark:via-white/10 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-[#8B2626] via-[#D87D4A] to-[#CFA56A] from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
