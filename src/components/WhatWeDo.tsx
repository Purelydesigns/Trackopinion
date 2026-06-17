"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const items = [
  {
    title: "Data Collection",
    content:
      "Get critical data captured from varied sources via phone, online forms, and interviews for market research. Your preferred method, we deliver.",
  },
  {
    title: "Survey Programming",
    content:
      "Professional survey programming services tailored to your research needs with advanced logic and skip patterns.",
  },
  {
    title: "Data Processing & Analytics",
    content:
      "Comprehensive data processing and analytics services to transform raw data into actionable insights.",
  },
  {
    title: "Translation Services",
    content:
      "Expert translation services across 60+ languages to help you reach global audiences effectively.",
  },
  {
    title: "Desk Research",
    content:
      "In-depth desk research leveraging secondary data sources to complement your primary research efforts.",
  },
  {
    title: "Project Managemnet",
    content:
      "End-to-end project management ensuring timely delivery and quality control across all research phases.",
  },
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
    <div className={`border-b last:border-b-0 border-gray-200 ${isOpen ? "bg-white" : "bg-white hover:bg-gray-50"} transition-colors duration-200`}>
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left group"
        onClick={onClick}
      >
        <span className={`font-bold text-lg transition-colors duration-200 ${isOpen ? "text-gray-900" : "text-gray-900 group-hover:text-primary"}`}>
          {item.title}
        </span>

        <span className="ml-4 shrink-0 text-gray-500 group-hover:text-gray-900 transition-colors duration-200">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {/* Animated content */}
      <div style={{ height }} className="overflow-hidden transition-[height] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div ref={contentRef}>
          <div className="px-6 pb-5 pt-0">
            <p className="text-gray-600 text-base leading-7">
              {item.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-section py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-2 uppercase">
          What We Do
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-10">
          Empowering Decision Making with Track Opinion
        </p>

        {/* Accordion card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
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
    </section>
  );
}
