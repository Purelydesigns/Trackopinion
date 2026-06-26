"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, DollarSign, ShieldCheck, Star, Moon } from "lucide-react";

const features = [
  {
    Icon: BadgeCheck,
    title: "Proof of quality",
    desc: "Check any pro's work samples, client reviews, and identity verification.",
  },
  {
    Icon: DollarSign,
    title: "No cost until you hire",
    desc: "Interview potential fits for your job, negotiate rates, and only pay for work you approve.",
  },
  {
    Icon: ShieldCheck,
    title: "Safe and secure",
    desc: "Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it.",
  },
];

export default function WhyBusinesses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 items-stretch" ref={ref}>

          {/* Left — features list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-8 leading-snug">
              Why businesses turn to Track Opinion
            </h2>
            <div className="space-y-7">
              {features.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 * i + 0.3, duration: 0.5 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-base">{title}</p>
                    <p className="text-gray-900 text-base leading-8 font-medium">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — dark card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary rounded-2xl p-8 text-white flex flex-col justify-between min-h-[420px]"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              Redefine Excellence<br />in Market Research
            </h3>

            <div className="space-y-7 mt-auto">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold leading-tight">4.9/5</p>
                  <p className="text-white/80 text-base font-medium mt-1">Clients rate professionals on Upwork</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold leading-tight">Award winner</p>
                  <p className="text-white/80 text-base font-medium mt-1">2021 Best Software Awards</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
