"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[700px] lg:h-[840px] flex items-center overflow-hidden">

      {/* ── Video background ── */}
      <video
        src="/video/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ── Content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Welcome to Track Opinion
            <br />
            Delivering Insights
          </h1>

          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 leading-8">
            Bank on a Global panel of{" "}
            <strong className="text-white font-bold">4.5 Millions</strong>{" "}
            members. Get tailor-made online surveys and market research
            processes. Unlock user behaviour and market intelligence.
          </p>

          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5"
          >
            Explore More »
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
