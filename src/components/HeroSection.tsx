"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="-mt-[76px] relative min-h-[600px] sm:min-h-[750px] lg:h-[900px] flex items-center overflow-hidden">

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
      <div className="absolute inset-0 bg-black/45" />

      {/* ── Content ── */}
      <div className="relative w-full site-container px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Pill label */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-white text-xs font-semibold uppercase tracking-widest">
              Global Market Research · Est. 2009
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.2] mb-6">
            Welcome to<br />
            <span className="font-normal">Track Opinion</span><br />
            Delivering Insights
          </h1>

          <p className="text-white/80 text-base sm:text-lg mb-10 leading-8">
            Bank on a Global panel of{" "}
            <strong className="text-white font-bold">4.5 Millions</strong>{" "}
            members. Get tailor-made online surveys and market research
            processes. Unlock user behaviour and market intelligence.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Explore More <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/50 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>

          {/* Trusted clients */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["CF", "MR", "GC", "+"].map((label, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: i === 3 ? "rgba(255,255,255,0.15)" : `hsl(${210 + i * 20}, 40%, 30%)` }}
                >
                  {label}
                </div>
              ))}
            </div>
            <p className="text-white/80 text-sm">
              <strong className="text-white font-bold">Trusted by 100+ clients</strong>
              {" "}— consulting firms, MR agencies,{" "}
              <br className="hidden sm:block" />
              global corporations &amp; SMBs worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
