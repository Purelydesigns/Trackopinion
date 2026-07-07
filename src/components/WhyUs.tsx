"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 3,   suffix: "k+", label: "Complete Project"    },
  { value: 500, suffix: "+",  label: "Team Worker"         },
  { value: 6,   suffix: "+",  label: "Years of Experience" },
  { value: 60,  suffix: "+",  label: "Language Spoken"     },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = `${count}${suffix}`;
  return <span ref={ref}>{display}</span>;
}

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-section py-10" ref={ref}>

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 px-6"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-2">
          Why Us?
        </h2>
        <p className="text-base text-gray-900 font-medium">Our Online Panel Stats</p>
      </motion.div>

      {/* ── Stats bar ── */}
      <div className="bg-primary py-12">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/90 text-base font-medium tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA button ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center mt-10 px-6"
      >
        <Link
          href="/about"
          className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-10 py-4 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5"
        >
          EXPLORE MORE
        </Link>
      </motion.div>

    </section>
  );
}
