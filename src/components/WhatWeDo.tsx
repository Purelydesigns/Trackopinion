"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Data Collection",
    content:
      "Critical data captured via phone, online surveys, CATI and in-person interviews. Your preferred method — we deliver, in 30+ markets with native-language support and real-time quota management.",
    link: "Explore Global Panel",
  },
  {
    title: "Survey Programming",
    content:
      "Professional survey programming with advanced logic, skip patterns, and multi-language support. Hosted on our platform or yours.",
    link: "Explore Survey Tools",
  },
  {
    title: "Data Processing & Analytics",
    content:
      "Comprehensive data processing, cleaning, weighting, and analytics to transform raw responses into decision-ready insights.",
    link: "Explore Analytics",
  },
  {
    title: "Translation Services",
    content:
      "Expert translation across 60+ languages by native speakers — surveys, reports, discussion guides, and more.",
    link: "Explore Languages",
  },
  {
    title: "Desk Research",
    content:
      "In-depth secondary research leveraging industry databases, reports, and public sources to complement your primary work.",
    link: "Explore Research",
  },
  {
    title: "Project Management",
    content:
      "End-to-end project management ensuring timely delivery, quality control, and seamless communication across all research phases.",
    link: "Explore Services",
  },
];

const tags = [
  { label: "Quantitative", filled: true },
  { label: "Qualitative",  filled: false },
  { label: "36 Countries", filled: true },
  { label: "Healthcare",   filled: false },
  { label: "B2B",          filled: false },
  { label: "Consumer",     filled: false },
  { label: "CATI",         filled: false },
  { label: "Online",       filled: false },
];

const stats = [
  { num: "15+",  label: "Years" },
  { num: "100+", label: "Clients" },
  { num: "20K+", label: "Projects" },
];

function AccordionItem({
  item,
  isOpen,
  onClick,
}: {
  item: (typeof items)[0];
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b last:border-b-0 border-gray-200">
      <button
        className="w-full flex justify-between items-center py-5 text-left group cursor-pointer"
        onClick={onClick}
      >
        <span className={`font-bold text-lg transition-colors duration-200 ${isOpen ? "text-primary" : "text-gray-900 group-hover:text-primary"}`}>
          {item.title}
        </span>
        <span className={`ml-4 shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${isOpen ? "bg-primary border-primary text-white" : "border-gray-300 text-gray-500"}`}>
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {isOpen
              ? <line x1="3" y1="8" x2="13" y2="8" />
              : <><line x1="8" y1="3" x2="8" y2="13" /><line x1="3" y1="8" x2="13" y2="8" /></>
            }
          </svg>
        </span>
      </button>

      <div style={{ height }} className="overflow-hidden transition-[height] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div ref={contentRef}>
          <div className="pb-5 pt-0">
            <p className="text-gray-600 text-base leading-8 font-medium mb-3">
              {item.content}
            </p>
            <a href="#" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all duration-200">
              {item.link} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  const [openIndex, setOpenIndex] = useState(0);
  const stickyRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-section py-10">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: heading + accordion ── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-primary text-xs font-bold uppercase tracking-widest">What We Do</p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Empowering Decision<br />
              Making with{" "}
              <span className="font-normal">Track Opinion</span>
            </h2>

            <p className="text-gray-600 text-base leading-8 font-medium mb-10">
              End-to-end custom research services delivered by experts — so you can focus on the decision, not the data.
            </p>

            <div className="divide-y divide-gray-200">
              {items.map((item, i) => (
                <AccordionItem
                  key={i}
                  item={item}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                />
              ))}
            </div>
          </div>

          {/* ── Right: sticky card ── */}
          <div ref={stickyRef} className="lg:sticky lg:top-28">
            <div>
                {/* Dark panel */}
                <div className="bg-primary rounded-2xl p-8 mb-4">
                  <p className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    Track Opinion · Research Engine
                  </p>

                  <div className="mb-6">
                    <p className="text-white font-extrabold leading-none" style={{ fontSize: "clamp(3rem,8vw,4.5rem)" }}>
                      4.5<span className="text-white/70 font-bold text-4xl ml-1">Mn</span>
                    </p>
                    <p className="text-white/70 text-sm font-medium mt-2">Active panelists worldwide</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t.label}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                          t.filled
                            ? "bg-white/20 border-white/30 text-white"
                            : "border-white/20 text-white/60"
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
                      <p className="text-2xl font-extrabold text-primary mb-1">{s.num}</p>
                      <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
