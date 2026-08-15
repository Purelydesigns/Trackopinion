"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PageHero from "../ui/PageHero";
import SiteCard from "../ui/SiteCard";
import SectionHeader from "../ui/SectionHeader";
import LatestReadsSection from "../shared/LatestReadsSection";
import { ConceptScorecard, AdAttentionVisual } from "./ConceptVisuals";
import { faqs } from "./faqs";

/* ── Helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

function CountUp({ end, suffix = "", decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = end / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

/* ── Capability cards with relevant icons ── */
const capabilities = [
  {
    title: "Concept Testing",
    desc: "Test your product idea at an early stage in development. Avoid expensive setbacks by obtaining users' input before investing in marketing, ads, and sales.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6a12 12 0 0 1 8 20.8V30a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-3.2A12 12 0 0 1 24 6z" />
        <path d="M20 32v2a4 4 0 0 0 8 0v-2" />
        <line x1="24" y1="6" x2="24" y2="2" />
        <line x1="10" y1="12" x2="7" y2="9" />
        <line x1="38" y1="12" x2="41" y2="9" />
        <line x1="6" y1="24" x2="2" y2="24" />
        <line x1="42" y1="24" x2="46" y2="24" />
      </svg>
    ),
  },
  {
    title: "Ad Testing",
    desc: "Dodge expensive marketing failures. Test your advert design with a handful of sample users and tweak your ad before you actually launch it.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 16h6l18-8v32L14 32H8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" />
        <path d="M32 18c3 1.5 5 4 5 6s-2 4.5-5 6" />
        <path d="M14 32v8" />
      </svg>
    ),
  },
  {
    title: "Relaunch Testing",
    desc: "Planning to relaunch a product or service? Find a panel that suits your target audience, and test your remodeled product, design, idea, or packaging.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 24a16 16 0 1 1-3.5-10" />
        <polyline points="40 10 40 24 26 24" />
      </svg>
    ),
  },
  {
    title: "GTM Strategy",
    desc: "Define your go-to-market approach by testing the concept and ads. Learn what resonated with potential users and what needs tweaking before marketing.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 44 L24 20 L38 8 L38 32 Z" />
        <path d="M24 20 L10 14 L24 8" />
        <line x1="10" y1="14" x2="10" y2="38" />
        <line x1="10" y1="38" x2="24" y2="44" />
        <circle cx="24" cy="44" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Risk Mitigation",
    desc: "Testing your product at the early stages of ideation, designing, and development helps you curb potential risks and failure points and plan for mitigation.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L6 12v14c0 10 8 18 18 20 10-2 18-10 18-20V12Z" />
        <polyline points="16 24 21 29 32 18" />
      </svg>
    ),
  },
  {
    title: "Market Fit",
    desc: "Know what the industry needs to fill the existing gaps. Use the feedback from concept testing research and make your product more fit for the users.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="20" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="24" cy="24" r="4" />
        <line x1="24" y1="4" x2="24" y2="12" />
        <line x1="24" y1="36" x2="24" y2="44" />
        <line x1="4" y1="24" x2="12" y2="24" />
        <line x1="36" y1="24" x2="44" y2="24" />
      </svg>
    ),
  },
];

const contentSections = [
  {
    label: "Concept Testing",
    heading: "What's Product Concept Testing?",
    paragraphs: [
      "Toying with an idea to build something new or unique? Concept testing in new product development can help you achieve a viable product by assessing its potential for commercial success.",
      "You test your product at various stages. Descriptive writing, concept designs, and working prototypes are some artifacts you share with a selective audience and seek their input.",
    ],
    bullets: [
      "Descriptive writing, concept designs and working prototypes",
      "Feedback via surveys, focus group meetings and interviews",
      "Weeds out the superfluous before you invest at scale",
    ],
  },
  {
    label: "Ad Testing",
    heading: "Why Creative Ad Testing?",
    paragraphs: [
      "Developing a novel idea or relaunching an old product? Define a go-to-market strategy with us by testing your creative ads.",
      "Analyze with a panel how your fresh idea will be perceived. Or test your product's renewed packaging or enhancements in the aisles.",
    ],
    bullets: [
      "Well-executed ad surveys with eye tracking and facial recognition",
      "Test packaging and enhancements in the aisles",
      "Find target-market engagement before going full throttle",
    ],
  },
];

const methods = [
  {
    num: "1",
    title: "Recognize Emotions",
    desc: "Analyze users' hidden emotions such as twitch of the lips, wide eyes, and furrowed brows using facial expression measurement.",
  },
  {
    num: "2",
    title: "Track Eye Movements",
    desc: "Track the gaze of users, movements of pupils, and their dilation, and learn their initial responses to your ads and new products.",
  },
  {
    num: "3",
    title: "Test Aisle Attraction",
    desc: "Place your product in a store and discover the responses for the packaging, its placement, pricing, and branding.",
  },
];

const stats = [
  { value: "15+",  label: "Years of Expertise" },
  { value: "100+", label: "Clients" },
  { value: "30+",  label: "Market Covered" },
  { value: "4.7M", label: "Active Panellists" },
  { value: "20K+", label: "Project Completed" },
];



export default function ConceptAdTestingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      <PageHero
          breadcrumb={[{ name: "Enterprise Solution" }, { name: "Product Concept & Ad Testing" }]}
          badge="Product Concept And Ad-Testing"
          heading={
            <>
              Product Concept &amp; Creative Ad Testing
            </>
          }
          description="Translate your message to connect better with your target audience before going to market. Validate ideas, ads, and packaging with real users — before you invest at scale."
          primaryCta={{ label: "Explore More", href: "/contact-us" }}
          secondaryCta={{ label: "See Capabilities", href: "#capabilities" }}
          minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
        />

      {/* ════════ CAPABILITIES ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">

          <SectionHeader
              label="Product Viability and Ad Testing"
              heading={<>Numbers that lead your idea to a product <br></br>with creative ad testing</>}
              description="Convert ideas into profitable products. Transform products into brand icons. Use our world-class product concept testing."
              theme="light"
              align="center"
            />

          {/* Editorial rows — no cards; number + title left, copy right */}
          <div className="mt-12 border-t border-gray-200">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.5, ease: "easeOut" }}
                className="group relative border-b border-gray-200"
              >
                {/* hover wash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, rgba(26,111,232,0.05), transparent 60%)" }}
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-[100px_minmax(0,300px)_1fr] gap-x-10 gap-y-5 py-12">
                  {/* Numeral */}
                  <div className="hidden lg:block">
                    <span
                      className="font-black leading-none text-primary/[0.07] group-hover:text-primary/[0.14] transition-colors duration-300 tabular-nums"
                      style={{ fontSize: 68 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title + icon */}
                  <div className="flex items-start gap-4">
                    <span className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                      {cap.icon}
                    </span>
                    <div>
                      <span className="lg:hidden block text-xs font-black text-primary/25 mb-1 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-primary font-extrabold text-2xl leading-tight">
                        {cap.title}
                      </h3>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-700 text-lg leading-9 font-medium">{cap.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS — alternating split, same rhythm as the Qualitative page */}
      {contentSections.map((sec, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={i} className={`py-20 ${flip ? "bg-section" : "bg-white"}`}>
            <div className="site-container px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, x: flip ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={flip ? "lg:order-2" : ""}
                >
                  {i === 0 ? <ConceptScorecard /> : <AdAttentionVisual />}
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: flip ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`flex flex-col gap-5 ${flip ? "lg:order-1" : ""}`}
                >
                  <SectionHeader
                    label={sec.label}
                    heading={<>{sec.heading}</>}
                    theme="light"
                    align="left"
                    className="!mb-0"
                  />

                  {sec.paragraphs.map((para, j) => (
                    <p key={j} className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">
                      {para}
                    </p>
                  ))}

                  <ul className="flex flex-col gap-3 mt-1">
                    {sec.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + j * 0.08, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 size={17} className="text-primary shrink-0" />
                        <span className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ════════ METHODS (bg-primary) ════════ */}
      <section className="py-20 bg-primary overflow-hidden">
        <div className="site-container px-6">

          <SectionHeader
            label="Our Methods"
            heading={
              <>
                Track Opinion offers technology-backed solutions for concept testing research and creative ad testing service in India
              </>
            }
            description="Unique Product Concept Testing and Creative Ad Testing Methods."
            theme="dark"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {methods.map((m, i) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col h-full rounded-2xl overflow-hidden text-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1.5px dashed rgba(255,255,255,0.15)",
                  }}
                >
                  {/* Blue top accent bar */}
                  <div className="h-1.5" style={{ background: "linear-gradient(90deg, #fff, #fff)" }} />

                  <div className="p-8 flex flex-col flex-1 items-center">
                    {/* Step number bubble */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary font-bold text-lg bg-white"
                    >
                      {m.num}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-lg leading-snug mb-3">
                      {m.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <LatestReadsSection />

    </main>
  );
}
