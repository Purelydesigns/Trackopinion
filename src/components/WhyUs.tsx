"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import SiteCard from "./ui/SiteCard";

const reasons = [
  {
    title: "Data Integrity & Quality Assurance",
    desc: "We uphold data integrity through rigorous respondent validation, technology-enabled fraud prevention, and structured quality checks at every stage of the research process, ensuring reliable and trustworthy data.",
  },
  {
    title: "Access to Hard-to-Reach Audiences",
    desc: "From niche consumer segments to specialized B2B decision-makers and healthcare professionals, we connect you with the audiences that matter.",
  },
  {
    title: "Integrated Research Expertise",
    desc: "Bring together quantitative, qualitative, CATI, expert networks, and advanced analytics through one experienced research partner.",
  },
  {
    title: "Research-Led Thinking",
    desc: "We go beyond execution to understand business challenges, identify the right research approach, and deliver insights that answer critical business questions.",
  },
];

const stats = [
  { value: 50,   suffix: "K+", label: "Projects per Year"    },
  { value: 150, suffix: "+",  label: "Team Members"         },
  { value: 17,   suffix: "+",  label: "Years of Experience" },
  { value: 50,  suffix: "+",  label: "Languages Supported"     },
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

      <SectionHeader
        label=""
        heading={<>Why Track Opinion?</>}
        description="Built on Experience. Driven by Integrity."
        theme="light"
        className="!mb-0"
      />

      {/* ── Stats bar ── */}
      <div className="bg-primary py-12">
        <div className="site-container px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
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

      {/* ── Reasons ── */}
      <div className="site-container px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="h-full"
            >
              <SiteCard className="h-full">
                <div className="p-7 flex flex-col h-full">
                  <h3 className="text-primary font-bold text-lg leading-snug mb-2">{reason.title}</h3>
                  <p className="text-gray-600 text-base leading-8 font-medium">{reason.desc}</p>
                </div>
              </SiteCard>
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
