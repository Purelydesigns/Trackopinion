"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stories = [
  {
    category: "Advertising",
    title: "How a Global Brand Doubled Campaign ROI with Concept Testing",
    excerpt:
      "By testing three creative directions with 1,200 target consumers across five markets, our client refined messaging before launch — saving 40% of media spend.",
  },
  {
    category: "FMCG",
    title: "Unlocking 3 New Market Opportunities for an FMCG Giant",
    excerpt:
      "A 12-market segmentation study identified three high-value consumer clusters — unlocking $200M in addressable revenue for our client.",
  },
  {
    category: "Automobile",
    title: "EV Purchase Intent Tracker Across 8 Key Markets",
    excerpt:
      "A quarterly tracking study monitoring EV consideration, barriers and brand preference among 4,800 auto-intenders across three consecutive waves.",
  },
];

export default function SuccessStories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-16">
      <div className="max-w-[1536px] mx-auto px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Compilation of Our Success Stories</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-primary">
            Research that moved the needle
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(13,27,62,0.12)" }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer flex flex-col"
            >
              {/* Thick navy top bar */}
              <div className="h-1.5 bg-primary rounded-t-2xl" />

              <div className="p-7 flex flex-col flex-1">
                {/* Category */}
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                  {story.category}
                </p>

                {/* Title */}
                <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-7 font-medium flex-1 mb-6">
                  {story.excerpt}
                </p>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-4">
                  <Link
                    href="/case-studies"
                    className="text-primary text-sm font-bold hover:gap-2 flex items-center gap-1 transition-all duration-200"
                  >
                    Read case study →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/case-studies"
            className="bg-primary text-white text-sm font-semibold px-10 py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 shadow hover:-translate-y-0.5"
          >
            VIEW ALL
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
