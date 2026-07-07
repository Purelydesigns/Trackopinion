"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    label: "Honesty",
    icon: (
      /* All-seeing eye with rays — truth that shines in all directions */
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="24" cy="24" rx="17" ry="10" />
        <circle cx="24" cy="24" r="5" />
        <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
        <line x1="24" y1="6"  x2="24" y2="2"  />
        <line x1="24" y1="42" x2="24" y2="46" />
        <line x1="6"  y1="24" x2="2"  y2="24" />
        <line x1="42" y1="24" x2="46" y2="24" />
        <line x1="10" y1="10" x2="7"  y2="7"  />
        <line x1="38" y1="38" x2="41" y2="41" />
        <line x1="38" y1="10" x2="41" y2="7"  />
        <line x1="10" y1="38" x2="7"  y2="41" />
      </svg>
    ),
  },
  {
    label: "Customer Obsession",
    icon: (
      /* Heart with ECG pulse running through it — beating for the customer */
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 40 C24 40 6 28 6 17 C6 11 10.5 7 16 7 C19.5 7 22.5 9 24 11 C25.5 9 28.5 7 32 7 C37.5 7 42 11 42 17 C42 28 24 40 24 40Z" />
        <polyline points="10,24 15,24 18,18 21,30 25,20 28,26 31,24 38,24" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Think Young",
    icon: (
      /* Head silhouette with a constellation/star-map inside — curious, imaginative mind */
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 34 C10 30 8 25 8 20 C8 12 15 6 24 6 C33 6 40 12 40 20 C40 25 38 30 34 34 L34 42 L14 42 Z" />
        <circle cx="20" cy="18" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="28" cy="15" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="32" cy="23" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="22" cy="26" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="24" r="1.5" fill="currentColor" stroke="none" />
        <line x1="20" y1="18" x2="28" y2="15" strokeWidth="1" />
        <line x1="28" y1="15" x2="32" y2="23" strokeWidth="1" />
        <line x1="32" y1="23" x2="22" y2="26" strokeWidth="1" />
        <line x1="22" y1="26" x2="16" y2="24" strokeWidth="1" />
        <line x1="16" y1="24" x2="20" y2="18" strokeWidth="1" />
        <line x1="20" y1="18" x2="32" y2="23" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Ownership",
    icon: (
      /* Hand holding a flag planted on a circle/globe — claiming it, owning the outcome */
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 38 C10 38 10 30 16 26 L20 24 L20 14" />
        <path d="M20 14 L34 18 L20 22 Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M20 14 L34 18 L20 22" />
        <path d="M16 26 C18 24 22 23 26 24 C30 25 34 24 36 22" strokeDasharray="2 2" />
        <ellipse cx="26" cy="36" rx="12" ry="6" />
        <line x1="26" y1="24" x2="26" y2="30" />
        <path d="M20 38 C22 34 30 34 32 38" />
      </svg>
    ),
  },
  {
    label: "Perseverance",
    icon: (
      /* Seed cracking through stone and growing upward — unstoppable growth */
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="24" y1="42" x2="24" y2="20" />
        <path d="M24 20 C24 20 24 12 32 8 C32 16 26 18 24 20Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M24 20 C24 20 24 12 32 8 C32 16 26 18 24 20" />
        <path d="M24 28 C24 28 24 20 16 16 C16 24 22 26 24 28Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M24 28 C24 28 24 20 16 16 C16 24 22 26 24 28" />
        <path d="M10 42 L38 42" />
        <path d="M16 42 L12 38 M20 42 L18 38 M24 42 L22 38 M28 42 L28 38 M32 42 L34 38" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function OurValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-10">
      <div className="site-container px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Values</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
            What we stand for
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {values.map(({ label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(13,27,62,0.12)", scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-2xl shadow-sm p-5 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -6, 6, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4"
              >
                {icon}
              </motion.div>
              <p className="text-sm md:text-base font-semibold text-gray-800 text-center whitespace-nowrap">{label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
