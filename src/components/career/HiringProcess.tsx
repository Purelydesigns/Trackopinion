"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, Phone, Monitor, CheckCircle, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    num: 1,
    label: "Apply",
    desc: "Submit your application below",
    icon: <FileText className="w-6 h-6" />,
    detail: {
      title: "Step 1 — Submit Your Application",
      body: "Apply directly through this page — fill in your details and upload your CV. You can also submit an open application if you don't see the exact role you want. We read everything.",
      badge: "You are here — apply below!",
    },
  },
  {
    num: 2,
    label: "HR Review",
    desc: "Our team reads every application personally",
    icon: <Search className="w-6 h-6" />,
    detail: {
      title: "Step 2 — HR Review (3–5 days)",
      body: "Our HR team personally reviews every application — no ATS filters, no automated rejections. If there's a strong match, you'll hear from us within 5 working days.",
      badge: "Tip: a clear LinkedIn profile helps!",
    },
  },
  {
    num: 3,
    label: "Intro Call",
    desc: "15-min conversation with HR",
    icon: <Phone className="w-6 h-6" />,
    detail: {
      title: "Step 3 — Intro Call (15 min)",
      body: "A short, relaxed conversation with our HR team to learn about your background, salary expectations, and what you're looking for. No technical questions — just a friendly chat.",
      badge: "Tip: be yourself, we value authentic conversations",
    },
  },
  {
    num: 4,
    label: "Interview",
    desc: "Skills discussion with the hiring manager",
    icon: <Monitor className="w-6 h-6" />,
    detail: {
      title: "Step 4 — Interview (60 min)",
      body: "A focused discussion with the hiring manager around your skills, past experience, and how you approach problems. Some roles include a short take-home task — always reasonable in scope.",
      badge: "Tip: bring examples of past work you're proud of",
    },
  },
  {
    num: 5,
    label: "Offer & Welcome",
    desc: "Fast decision, warm onboarding",
    icon: <CheckCircle className="w-6 h-6" />,
    detail: {
      title: "Step 5 — Offer & Welcome",
      body: "We move quickly. If it's a match, you'll receive a written offer within 48 hours of your final interview. Our onboarding team will then make sure your first day — and first month — set you up for success.",
      badge: "Welcome to the team!",
    },
  },
];

export default function HiringProcess() {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section className="bg-[#f3efe9] py-24">
      <div className="site-container px-6">

        <SectionHeader
          label="How We Hire"
          heading="Our hiring process, step by step"
          description="Transparent, fast, and respectful of your time. Here's exactly what to expect after you apply."
          theme="light"
        />

        {/* Timeline */}
        <div className="relative my-12">
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-[36px] left-[10%] right-[10%] h-px bg-gray-200 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 sm:gap-4 relative z-10">
            {steps.map((step, i) => {
              const isActive = active === i;
              const isPast   = i < active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-3 group outline-none"
                >
                  <motion.div
                    className="flex flex-col items-center gap-3"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {/* Circle */}
                    <div className="relative">
                      <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center z-10 transition-colors duration-200
                        ${isActive ? "bg-green-400" : isPast ? "bg-primary/30" : "bg-gray-400"}`}>
                        {step.num}
                      </span>
                      <div className={`w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${isActive
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                          : isPast
                          ? "bg-white border-primary/40 text-primary"
                          : "bg-white border-gray-200 text-gray-400 group-hover:border-primary/40 group-hover:text-primary"
                        }`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-center">
                      <p className={`text-md font-bold transition-colors duration-200 ${isActive ? "text-primary" : "text-primary group-hover:text-primary"}`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail card */}
        <div className="">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex gap-6"
            >
              {/* Icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-primary">
                {current.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base font-bold text-primary mb-2">{current.detail.title}</h3>
                <p className="text-gray-600 text-base leading-8 font-medium flex-1 mb-4">{current.detail.body}</p>
                {current.detail.badge && (
                  <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-2 rounded-full">
                    <Zap className="w-3.5 h-3.5" /> {current.detail.badge}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
