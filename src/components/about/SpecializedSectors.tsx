"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const w = "2";
const s = { stroke: "white", strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

const sectors = [
  {
    label: "AUTOMOBILE",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="18" width="36" height="16" rx="4" {...s} />
        <path d="M10 18 L14 10 H34 L38 18" {...s} />
        <circle cx="14" cy="34" r="4" {...s} />
        <circle cx="34" cy="34" r="4" {...s} />
        <path d="M18 34 H30" {...s} />
        <path d="M6 24 H4 M42 24 H44" {...s} />
      </svg>
    ),
  },
  {
    label: "REAL ESTATE",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M6 42 V20 L24 8 L42 20 V42" {...s} />
        <rect x="18" y="28" width="12" height="14" rx="1" {...s} />
        <rect x="10" y="22" width="8" height="7" rx="1" {...s} />
        <rect x="30" y="22" width="8" height="7" rx="1" {...s} />
        <path d="M6 42 H42" {...s} />
      </svg>
    ),
  },
  {
    label: "FMCG",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M14 10 H34 L38 20 V40 H10 V20 Z" {...s} />
        <path d="M10 20 H38" {...s} />
        <rect x="18" y="26" width="12" height="8" rx="1" {...s} />
        <path d="M20 10 V8 Q24 4 28 8 V10" {...s} />
        <path d="M18 30 H30" {...s} />
      </svg>
    ),
  },
  {
    label: "BANKING &\nFINANCE",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M6 16 L24 6 L42 16" {...s} />
        <rect x="6" y="16" width="36" height="4" rx="1" {...s} />
        <path d="M6 40 H42" {...s} />
        <path d="M10 20 V38 M18 20 V38 M24 20 V38 M30 20 V38 M38 20 V38" {...s} />
      </svg>
    ),
  },
  {
    label: "HOSPITALITY",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M6 40 V20 Q6 12 14 12 H34 Q42 12 42 20 V40" {...s} />
        <path d="M6 40 H42" {...s} />
        <rect x="18" y="26" width="12" height="14" rx="1" {...s} />
        <rect x="10" y="20" width="7" height="7" rx="1" {...s} />
        <rect x="31" y="20" width="7" height="7" rx="1" {...s} />
        <path d="M20 8 Q24 4 28 8" {...s} />
      </svg>
    ),
  },
  {
    label: "BIO & PHARMA",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M18 6 V22 L10 38 Q8 42 12 42 H36 Q40 42 38 38 L30 22 V6" {...s} />
        <path d="M16 6 H32" {...s} />
        <path d="M12 32 H36" {...s} />
        <path d="M21 28 L24 22 L27 28" {...s} />
        <circle cx="24" cy="35" r="2" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "EDUCATION",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M24 10 L44 20 L24 30 L4 20 Z" {...s} />
        <path d="M36 26 V36 Q36 40 24 40 Q12 40 12 36 V26" {...s} />
        <path d="M44 20 V32" {...s} />
        <circle cx="44" cy="33" r="2" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "TECHNOLOGY",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="10" width="36" height="24" rx="3" {...s} />
        <path d="M16 42 H32" {...s} />
        <path d="M24 34 V42" {...s} />
        <path d="M16 20 L20 24 L16 28" {...s} />
        <path d="M24 28 H30" {...s} />
      </svg>
    ),
  },
  {
    label: "HEALTHCARE",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M24 40 C24 40 8 30 8 18 C8 12 12 8 18 8 C21 8 24 10 24 10 C24 10 27 8 30 8 C36 8 40 12 40 18 C40 30 24 40 24 40Z" {...s} />
        <path d="M24 18 V26 M20 22 H28" {...s} />
      </svg>
    ),
  },
  {
    label: "RETAIL",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M8 8 H12 L16 28 H36 L40 14 H16" {...s} />
        <circle cx="20" cy="34" r="3" {...s} />
        <circle cx="34" cy="34" r="3" {...s} />
      </svg>
    ),
  },
];

export default function SpecializedSectors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-10" ref={ref}>
      <div className="site-container px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
            Our Specialized Sectors
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="absolute top-10 left-0 right-0 border-t-2 border-dashed border-gray-300 z-0" />

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            slidesPerView={4}
            spaceBetween={0}
            breakpoints={{
              480:  { slidesPerView: 4 },
              768:  { slidesPerView: 6 },
              1024: { slidesPerView: 8 },
            }}
            className="relative z-10"
          >
            {sectors.map((sector, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.06 * i, duration: 0.5 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-300 border-4 border-section"
                  >
                    {sector.icon}
                  </motion.div>

                  <p className="text-xs sm:text-sm font-bold text-gray-700 text-center whitespace-pre-line leading-5 mt-1">
                    {sector.label}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
