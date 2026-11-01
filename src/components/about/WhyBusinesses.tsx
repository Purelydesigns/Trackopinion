"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, DollarSign, ShieldCheck, Globe, Users, Handshake } from "lucide-react";
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

/** The dark card beside the feature list. */
const highlights = [
  {
    Icon: Globe,
    title: "Global Research Perspective",
    desc: "Supporting research requirements across different markets and audience segments, subject to project feasibility and availability.",
  },
  {
    Icon: Users,
    title: "Consumer, B2B and Healthcare Audiences",
    desc: "Research support designed around consumer opinions, professional perspectives, and healthcare-related audience requirements.",
  },
  {
    Icon: Handshake,
    title: "Client-Focused Approach",
    desc: "We work closely with clients to understand their objectives, plan suitable research approaches, and align deliverables with their expectations.",
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
            className="bg-primary rounded-2xl p-8 text-white flex flex-col min-h-[420px]"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug mb-8">
              Redefining Excellence in Market Research
            </h3>

            <div className="space-y-7">
              {highlights.map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold leading-snug text-base">{title}</p>
                    <p className="text-white/80 text-base leading-7 font-medium mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
