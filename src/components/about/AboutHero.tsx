"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
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
      <div className="absolute inset-0 bg-black/50" />

      {/* ── Content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Track Opinion: Redefining Excellence in Market Research —{" "}
            Your Trusted Top Company for Unparalleled Insights
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-8">
            Track Opinion® is a global market research and outsourcing firm
            headquartered in India. Established in 2009, we specialize in
            end-to-end custom research services for our clients. Our clientele
            includes consulting firms, market research companies, global
            corporations, and SMBs.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
