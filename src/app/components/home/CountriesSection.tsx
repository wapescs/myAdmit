"use client";

import { motion } from "motion/react";
import { GraduationCap, Landmark, Users } from "lucide-react";

import WorldMap from "@/components/ui/world-map";

import { COUNTRIES, INDIA } from "@/constants/countries";

import { serif } from "@/styles/typography";

export function CountriesSection() {
  const dots = COUNTRIES.map((country) => ({
    start: INDIA,
    end: country.coordinates,
  }));

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#1F1208]">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-[#8B2626] text-sm font-semibold">
            Destinations
          </p>

          <h2
            className="mt-3 text-3xl lg:text-5xl font-bold text-[#333333] dark:text-[#F5EDE0]"
            style={serif}
          >
            Study in Your Dream Country
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-[#666666] dark:text-neutral-300">
            Explore world-class universities across the most popular
            international study destinations.
          </p>

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mt-16"
        >
          <WorldMap dots={dots} />
        </motion.div>

        <div className="mt-14 text-center">
          <h3
            className="text-xl lg:text-2xl font-bold text-[#333333] dark:text-[#F5EDE0]"
            style={serif}
          >
            {COUNTRIES.length} Countries, One Dream
          </h3>

          <p className="mt-2 text-sm text-[#666666] dark:text-neutral-300">
            Pick a destination to see student volume, fees, and top universities.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {COUNTRIES.map((country, index) => (

            <motion.div
              key={country.name}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -6,
              }}
              className="
              group
              rounded-[20px]
              border
              border-[#E8DDD0]
              dark:border-white/8
              bg-white
              dark:bg-[#241410]
              p-5
              hover:border-[#8B2626]/30
              hover:shadow-lg
              transition-all
              "
            >

              <div className="text-4xl text-center">
                {country.flag}
              </div>

              <h3
                className="mt-3 text-lg font-bold text-center text-[#333333] dark:text-[#F5EDE0]"
                style={serif}
              >
                {country.name}
              </h3>

              <div className="mt-5 space-y-2.5">

                <div className="flex items-center justify-between text-xs bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[#999]">
                    <Users size={13} /> Students
                  </span>

                  <span className="font-bold text-[#333333] dark:text-[#F5EDE0]">
                    {country.students}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[#999]">
                    <Landmark size={13} /> Avg Fees
                  </span>

                  <span className="font-bold text-[#333333] dark:text-[#F5EDE0]">
                    {country.avgFees}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[#999]">
                    <GraduationCap size={13} /> Universities
                  </span>

                  <span className="font-bold text-[#8B2626]">
                    {country.topUnis}
                  </span>
                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}