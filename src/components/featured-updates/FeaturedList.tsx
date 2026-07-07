"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const updates = [
  {
    slug: "david-solomon-europe-opportunity-to-seize",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "David Solomon, Goldman Sachs Chairman and CEO, on how Europe has an opportunity to seize",
    date: "24.03.2026",
  },
  {
    slug: "john-waldron-navigating-uncertain-time",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "How Goldman Sachs' John Waldron is navigating 'a more uncertain time'",
    date: "24.03.2026",
  },
  {
    slug: "goldman-sachs-bernstein-strategic-decisions-conference",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "Goldman Sachs to Speak at Bernstein's 41st Annual Strategic Decisions Conference",
    date: "24.03.2026",
  },
  {
    slug: "john-waldron-navigating-uncertain-time-2",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "How Goldman Sachs' John Waldron is navigating 'a more uncertain time'",
    date: "24.03.2026",
  },
  {
    slug: "first-quarter-2025-pillar-3-disclosures",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "First Quarter 2025 Pillar 3 Disclosures",
    date: "24.03.2026",
  },
  {
    slug: "first-quarter-2025-liquidity-coverage-ratio",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "First Quarter 2025 Liquidity Coverage Ratio Disclosure",
    date: "24.03.2026",
  },
  {
    slug: "first-quarter-2025-form-10-q",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    title: "First Quarter 2025 Form 10-Q",
    date: "24.03.2026",
  },
];

export default function FeaturedList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="-mt-[76px] bg-primary">

      {/* ── Dark navy header with heading + subheading ── */}
      <div className="site-container px-6 py-14 pt-[calc(76px+3.5rem)] text-center">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-white mb-3"
        >
          Featured Updates
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/60 text-base"
        >
          Insights, Breakthroughs, and Updates Shaping our Industry and Beyond
        </motion.p>
      </div>

      {/* ── White card ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-t-[2.5rem]"
      >
        <div className="site-container px-6">

          {updates.map((item, i) => (
            <motion.div
              key={item.slug}
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
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-md">
                    {item.tags[0]}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-md border border-gray-200">
                    {item.tags[1]}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h2>

                {/* Date + dot */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{item.date}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-50 shrink-0" />
                </div>
              </div>

              {/* Right — circle arrow button → navigates to detail page */}
              <Link
                href={`/featured-updates/${item.slug}`}
                className="shrink-0 w-12 h-12 rounded-full bg-primary hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
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
                    ? "bg-primary text-white shadow"
                    : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary"
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
