"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export interface ProcessStep {
  /** Badge shown on the circle — 1, 2, 3… or "01", "02"… */
  num: string | number;
  label: string;
  desc: string;
  icon: React.ReactNode;
  detail: {
    title: string;
    body: string;
    badge?: string;
  };
}

/* Literal classes so Tailwind keeps them in the build */
const COLS: Record<number, string> = {
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

interface Props {
  steps: ProcessStep[];
  label: string;
  heading: React.ReactNode;
  description?: string;
  /** Section background + padding, e.g. "bg-white py-20" */
  sectionClassName?: string;
}

export default function ProcessSteps({
  steps,
  label,
  heading,
  description,
  sectionClassName = "bg-[#f3efe9] py-24",
}: Props) {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section className={sectionClassName}>
      <div className="site-container px-6">

        <SectionHeader
          label={label}
          heading={heading}
          description={description}
          theme="light"
        />

        {/* Timeline */}
        <div className="relative my-12">
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-[36px] left-[10%] right-[10%] h-px bg-gray-200 z-0" />

          <div className={`grid grid-cols-2 ${COLS[steps.length] ?? "sm:grid-cols-4"} gap-8 sm:gap-4 relative z-10`}>
            {steps.map((step, i) => {
              const isActive = active === i;
              const isPast   = i < active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-3 group outline-none"
                >
                  <motion.div
                    className="flex flex-col items-center gap-3"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {/* Circle */}
                    <div className="relative">
                      <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center z-10 transition-colors duration-200
                        ${isActive ? "bg-primary" : isPast ? "bg-primary/30" : "bg-gray-400"}`}>
                        {step.num}
                      </span>
                      <div className={`w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${isActive
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                          : isPast
                          ? "bg-white border-primary/40 text-primary"
                          : "bg-white border-gray-200 text-gray-400 group-hover:border-primary/40 group-hover:text-primary"
                        }`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-center">
                      <p className={`text-md font-bold transition-colors duration-200 ${isActive ? "text-primary" : "text-primary group-hover:text-primary"}`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail card */}
        <div className="">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex gap-6"
            >
              {/* Icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-primary">
                {current.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base font-bold text-primary mb-2">{current.detail.title}</h3>
                <p className="text-gray-600 text-base leading-8 font-medium flex-1 mb-4">{current.detail.body}</p>
                {current.detail.badge && (
                  <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-2 rounded-full">
                    <Zap className="w-3.5 h-3.5" /> {current.detail.badge}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
