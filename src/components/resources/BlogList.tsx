"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, SlidersHorizontal, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const posts = [
  {
    id: 1,
    date: "24.03.2026",
    category: "Healthcare",
    title: "How Qualitative Research Uncovers the Real Emotions Behind Patient Experiences",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    img: "https://picsum.photos/seed/healthcare/640/400",
  },
  {
    id: 2,
    date: "24.03.2026",
    category: "Pharma",
    title: "How Qualitative Research Uncovers the Real Emotions Behind Patient Experiences",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    img: "https://picsum.photos/seed/pharma/640/400",
  },
  {
    id: 3,
    date: "24.03.2026",
    category: "Technology",
    title: "How Qualitative Research Uncovers the Real Emotions Behind Patient Experiences",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    img: "https://picsum.photos/seed/tech/640/400",
  },
  {
    id: 4,
    date: "24.03.2026",
    category: "FMCG",
    title: "How Qualitative Research Uncovers the Real Emotions Behind Patient Experiences",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    img: "https://picsum.photos/seed/fmcg/640/400",
  },
  {
    id: 5,
    date: "24.03.2026",
    category: "Research",
    title: "How Qualitative Research Uncovers the Real Emotions Behind Patient Experiences",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    img: "https://picsum.photos/seed/research/640/400",
  },
];

export default function BlogList() {
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-primary">

      {/* ── Dark navy header ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative flex items-center justify-center">

          {/* Centered title */}
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Browse all Blog Posts
          </motion.h1>

          {/* Search + filter — absolute right */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute right-0 flex items-center gap-3"
          >
            <div className="flex items-center bg-white rounded-xl px-4 py-3 gap-3 w-52 shadow-sm">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
              />
            </div>
            <button className="w-11 h-11 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-white/80" />
            </button>
          </motion.div>

        </div>
      </div>

      {/* ── White card ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-t-[2.5rem]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {filtered.length === 0 ? (
            <div className="py-24 text-center text-gray-400 text-sm">
              No blog posts found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.45 }}
                className={`grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 py-10 group ${
                  i < filtered.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Left — content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{post.date}</span>
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-4 leading-snug group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-7 mb-6 line-clamp-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/resources/${post.id}`}
                    className="flex items-center gap-3 text-sm font-semibold text-gray-600 group-hover:text-accent transition-colors duration-300 w-fit"
                  >
                    <span className="w-8 h-px bg-gray-400 inline-block group-hover:bg-accent transition-colors duration-300" />
                    Read More
                  </Link>
                </div>

                {/* Right — image */}
                <div className="hidden md:block">
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </motion.article>
            ))
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2 py-10">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-300 ${
                  n === 1
                    ? "bg-primary text-white shadow"
                    : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-accent hover:text-white hover:border-accent"
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
