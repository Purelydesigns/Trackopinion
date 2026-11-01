"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, DollarSign, ShieldCheck, Star, Moon } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const features = [
  {
    Icon: BadgeCheck,
    title: "Quality-Focused Research",
    desc: "We prioritize relevant respondent profiles, reliable data, and appropriate quality checks to ensure research aligns with study objectives.",
  },
  {
    Icon: DollarSign,
    title: "Flexible and Transparent Engagement",
    desc: "We understand project requirements, agree on clear deliverables, and offer flexible solutions with transparency in scope and engagement terms.",
  },
  {
    Icon: ShieldCheck,
    title: "Responsible and Secure Data Handling",
    desc: "We prioritize privacy, confidentiality, and responsible data handling, following applicable requirements and agreed project protocols.",
  },
];

export default function WhyBusinesses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    /* overflow-hidden: both cards animate in from an x offset, so until the
       section scrolls into view the right-hand one hangs past the container
       and puts a few pixels of horizontal scroll on the page. */
    <section className="bg-section py-10 overflow-hidden">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 items-stretch" ref={ref}>

          {/* Left — features list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8"
          >

            <SectionHeader
              label=""
              heading={<>Why Businesses Turn to Track Opinion</>}
              description="Choosing the right research partner is key to obtaining reliable insights and making informed decisions. At Track Opinion, we focus on understanding client objectives, reaching relevant audiences, and delivering research solutions tailored to project needs."
              theme="light"
              align="left"
              className="!mb-0"
            />
            <h3 className="text-xl font-extrabold mb-5">
              Our approach is guided by three core principles:
            </h3>
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
                    <p className="text-gray-600 text-base leading-8 font-medium">{desc}</p>
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
