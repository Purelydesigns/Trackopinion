"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ListPageHeroProps {
  title: string;
  right?: ReactNode;          // search bar, filter, tabs — anything
  video?: string;
  minHeight?: string;
}

export default function ListPageHero({
  title,
  right,
  video = "/video/banner.mp4",
  minHeight = "min-h-[180px] sm:min-h-[220px]",
}: ListPageHeroProps) {
  return (
    <section className={`-mt-[76px] relative ${minHeight} flex items-end`}>

      {/* Video background — clipped independently so dropdowns can escape */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src={video}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,27,62,0.97) 0%, rgba(13,27,62,0.90) 40%, rgba(13,27,62,0.80) 70%, rgba(13,27,62,0.70) 100%)",
          }}
        />
      </div>

      {/* Content — pb-16 leaves room for the white card overlap below */}
      <div className="relative w-full site-container px-6 pt-[76px] pb-16">
        <div className="flex items-center justify-between gap-8">

          {/* Left — title */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white whitespace-nowrap"
          >
            {title}
          </motion.h1>

          {/* Right — slot for search / filter / tabs */}
          {right && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              {right}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
