"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function VisionMission() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-16">
      <div className="site-container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          {/* Our Vision */}
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-6 text-center">
              Our Vision
            </h2>
            <p className="text-gray-900 text-base leading-8 font-medium text-center">
              To become a global leader in innovative market research, offering
              the most effective strategic insights that are technology-driven,
              feasible, and reliable
            </p>
            {/* Vertical divider */}
            <div className="hidden md:block absolute top-0 right-0 h-full w-px bg-gray-200" />
          </div>

          {/* Our Mission */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-gray-900 text-base leading-8 font-medium text-center">
              To deliver timely services while ensuring quality through the
              usage of cutting-edge technology, allowing clients to make
              pertinent and informed decisions
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
