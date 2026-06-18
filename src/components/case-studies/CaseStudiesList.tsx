"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import ContactModal from "@/components/ContactModal";

const cases = [
  {
    id: 1,
    date: "24.03.2026",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution for the World",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    emoji: "🏥",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    date: "24.03.2026",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution for the World",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    emoji: "💊",
    bg: "bg-orange-50",
  },
  {
    id: 3,
    date: "24.03.2026",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution for the World",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    emoji: "🚀",
    bg: "bg-sky-50",
  },
  {
    id: 4,
    date: "24.03.2026",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution for the World",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    emoji: "📱",
    bg: "bg-indigo-50",
  },
  {
    id: 5,
    date: "24.03.2026",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution for the World",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    emoji: "📦",
    bg: "bg-teal-50",
  },
  {
    id: 6,
    date: "24.03.2026",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution for the World",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI–powered alert generation and resolution platform.",
    emoji: "🔬",
    bg: "bg-purple-50",
  },
];

export default function CaseStudiesList() {
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const filtered = cases.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-primary">

      {/* ── Dark navy header bar ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative flex items-center justify-center">

          {/* Centered title */}
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Case Studies
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

      {/* ── White card — full width, rounded top corners only ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-t-[2.5rem]"
      >
        <div className="max-w-7xl mx-auto px-6">

          {filtered.length === 0 ? (
            <div className="py-24 text-center text-gray-400 text-sm">
              No case studies found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.45 }}
                onClick={() => setModalOpen(true)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 py-10 cursor-pointer transition-all duration-300 ${
                  i < filtered.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Left — 3D flip card */}
                <div className="flex flex-col justify-center" style={{ perspective: "1000px" }}>

                  {/* Date + dot — stays outside the flip */}
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{item.date}</span>
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  </div>

                  {/* Flip wrapper */}
                  <div className="relative h-40" style={{ transformStyle: "preserve-3d" }}>
                    <motion.div
                      animate={{ rotateX: hoveredId === item.id ? 180 : 0 }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
                      className="relative"
                    >
                      {/* FRONT — Title + Excerpt */}
                      <div
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                        className="absolute inset-0 flex flex-col justify-start"
                      >
                        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-4">
                          {item.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-7 line-clamp-4">
                          {item.excerpt}
                        </p>
                      </div>

                      {/* BACK — Excerpt + Read More at bottom */}
                      <div
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateX(180deg)",
                        }}
                        className="absolute inset-0 flex flex-col justify-start"
                      >
                        <p className="text-gray-500 text-sm leading-7 line-clamp-4">
                          {item.excerpt}
                        </p>
                        <button
                          onClick={() => setModalOpen(true)}
                          className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-300 mt-3"
                        >
                          <span className="w-8 h-px bg-gray-500 inline-block shrink-0" />
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                </div>

                {/* Right — illustration with scale animation on hover */}
                <div className="hidden md:flex items-center justify-center overflow-hidden rounded-2xl">
                  <motion.div
                    animate={{
                      scale: hoveredId === item.id ? 1.04 : 1,
                      boxShadow:
                        hoveredId === item.id
                          ? "0 12px 32px rgba(0,0,0,0.12)"
                          : "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`w-full h-60 ${item.bg} rounded-2xl flex items-center justify-center`}
                  >
                    <motion.span
                      animate={{ scale: hoveredId === item.id ? 1.1 : 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="text-9xl inline-block"
                    >
                      {item.emoji}
                    </motion.span>
                  </motion.div>
                </div>
              </motion.article>
            ))
          )}

          {/* Pagination — inside white card */}
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

      {/* Contact Modal */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </div>
  );
}
