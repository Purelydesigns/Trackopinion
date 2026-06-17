"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const updates = [
  {
    id: 1,
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "David Solomon, Goldman Sachs Chairman and CEO, on how Europe has an opportunity to seize",
    date: "24.03.2026",
  },
  {
    id: 2,
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "How Goldman Sachs' John Waldron is navigating 'a more uncertain time'",
    date: "24.03.2026",
  },
  {
    id: 3,
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "Goldman Sachs to Speak at Bernstein's 41st Annual Strategic Decisions Conference",
    date: "24.03.2026",
  },
  {
    id: 4,
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "How Goldman Sachs' John Waldron is navigating 'a more uncertain time'",
    date: "24.03.2026",
  },
  {
    id: 5,
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "First Quarter 2025 Pillar 3 Disclosures",
    date: "24.03.2026",
  },
  {
    id: 6,
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "First Quarter 2025 Liquidity Coverage Ratio Disclosure",
    date: "24.03.2026",
  },
  {
    id: 7,
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "First Quarter 2025 Form 10-Q",
    date: "24.03.2026",
  },
];

export default function FeaturedList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="bg-[#111827]">

      {/* ── Dark navy header ── */}
      <div className="bg-[#0d1b3e]">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Featured Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-white/60 text-sm tracking-wide"
          >
            Insights, Breakthroughs, and Updates Shaping our Industry and Beyond
          </motion.p>
        </div>
      </div>

      {/* ── White card — full width, rounded top only ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">

          {updates.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.07 * i, duration: 0.4 }}
              className={`flex items-center justify-between gap-6 py-8 group ${
                i < updates.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {/* Left — tags + title + date */}
              <div className="flex-1 min-w-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-[#0d1b3e] text-white text-xs font-semibold px-3 py-1 rounded-md">
                    {item.tags[0]}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-md border border-gray-200">
                    {item.tags[1]}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-300">
                  {item.title}
                </h2>

                {/* Date + dot */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{item.date}</span>
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                </div>
              </div>

              {/* Right — circle arrow button → navigates to detail page */}
              <Link
                href={`/featured-updates/${item.id}`}
                className="shrink-0 w-12 h-12 rounded-full bg-[#0d1b3e] hover:bg-orange-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </motion.div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 py-10">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-300 ${
                  n === 1
                    ? "bg-[#0d1b3e] text-white shadow"
                    : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

        </div>
      </motion.div>

    </div>
  );
}
