"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="-mt-[76px] relative min-h-[500px] sm:min-h-[700px] lg:h-[840px] flex items-center overflow-hidden">

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
      <div className="relative w-full site-container px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Breadcrumb */}
          <p className="text-white/60 text-sm font-medium mb-6">
            Home / <span className="text-white">About Us</span>
          </p>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-6">
            Track Opinion:{" "} <br></br>
            Redefining Excellence{" "} <br></br>
            in Market Research —{" "} <br></br>
            Your Trusted Partner for Unparalleled Insights
          </h1>

          {/* Description */}
          <p className="text-white/80 text-base sm:text-lg leading-8 mb-10 max-w-2xl">
            Track Opinion® is a global market research and outsourcing firm
            headquartered in India. Established in 2009, we specialize in
            end-to-end custom research services for consulting firms, global
            corporations, and SMBs.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Get in Touch →
            </Link>
            <Link
              href="/solutions/research-services/quantitative"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/50 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Our Panel →
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
