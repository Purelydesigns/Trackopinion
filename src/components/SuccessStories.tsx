"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stories = [
  {
    category: "Avertisisng",
    categoryColor: "bg-orange-100 text-orange-600",
    title: "Signs YourAPP Spying On You",
    excerpt:
      "Samsung is the second most popular manufacturer of smartphones in the world, with a market share of 28.19% compared to Apple's 28.43% as...",
  },
  {
    category: "FMCG",
    categoryColor: "bg-blue-100 text-blue-600",
    title: "Signs YourAPP Spying On You",
    excerpt:
      "Samsung is the second most popular manufacturer of smartphones in the world, with a market share of 28.19% compared to Apple's 28.43% as...",
  },
  {
    category: "Automobile",
    categoryColor: "bg-purple-100 text-purple-600",
    title: "Signs YourAPP Spying On You",
    excerpt:
      "Samsung is the second most popular manufacturer of smartphones in the world, with a market share of 28.19% compared to Apple's 28.43% as...",
  },
];

export default function SuccessStories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-16">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-primary">
            Compilation of Our Success Stories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
              className="bg-white rounded-2xl shadow-md p-8 cursor-pointer"
            >
              {/* Category */}
              <span className={`inline-block text-xs font-bold rounded-full px-3 py-1 mb-4 ${story.categoryColor}`}>
                {story.category}
              </span>

              {/* Title */}
              <h3 className="text-primary font-bold text-lg leading-snug mb-4">
                {story.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-500 text-base leading-7">
                {story.excerpt}
              </p>
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
