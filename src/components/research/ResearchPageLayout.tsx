"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ── Types ── */
export interface ResearchSection {
  heading: string;
  paragraphs: string[];
  side: "left" | "right";
  mockup: "toggle" | "cards" | "circles";
}

export interface ResearchStep {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface ResearchStat {
  value: string;
  label: string;
}

export interface ResearchFaq {
  q: string;
  a: string;
}

export interface ResearchCapability {
  title: string;
  desc: string;
}

export interface ResearchPageProps {
  banner: { title: string; subtitle: string };
  factsHeading: string;
  factsDesc: string;
  sections: ResearchSection[];
  capabilities: ResearchCapability[];
  stepsHeading: string;
  stepsSubheading: string;
  steps: ResearchStep[];
  stats: ResearchStat[];
  faqs: ResearchFaq[];
}

/* ── Mockup Visuals ── */
function MockupToggle() {
  return (
    <div className="w-full h-full bg-[#d8dff0] rounded-2xl flex items-center justify-center p-8 min-h-[320px]">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-72">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-bold text-gray-900 text-lg">Quality Research</p>
            <p className="text-gray-400 text-sm">Explore Hidden Opinions...</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-6 bg-primary rounded-full relative flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full ml-auto" />
            </div>
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-xs">▶</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupCards() {
  return (
    <div className="w-full h-full bg-[#d8dff0] rounded-2xl flex items-center justify-center p-6 min-h-[320px]">
      <div className="relative w-72 h-64">
        {/* Back cards */}
        <div className="absolute left-0 top-4 w-52 h-52 bg-white/70 rounded-2xl shadow p-4 opacity-70">
          <p className="font-bold text-gray-700 text-base">Research ewrghtyujy</p>
          <p className="text-gray-400 text-xs mt-1">Analysis & Research....</p>
          <p className="text-primary text-xs font-semibold mt-1 underline">Results</p>
          <div className="mt-3 h-16 flex items-end gap-1">
            {[30, 50, 35, 65, 45, 70, 40].map((h, i) => (
              <div key={i} className="flex-1 bg-green-300/60 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-4 w-52 h-52 bg-white/70 rounded-2xl shadow p-4 opacity-70">
          <p className="font-bold text-gray-700 text-base">Research</p>
          <p className="text-gray-400 text-xs mt-1">Analysis & Research....</p>
          <p className="text-primary text-xs font-semibold mt-1 underline">Results</p>
        </div>
        {/* Front card */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-52 bg-white rounded-2xl shadow-xl p-4 z-10">
          <p className="font-bold text-gray-900 text-base">Research</p>
          <p className="text-gray-400 text-xs mt-1">Analysis & Research....</p>
          <p className="text-primary text-xs font-semibold mt-1 underline">Results</p>
          <div className="mt-3 h-20 flex items-end gap-1">
            {[40, 65, 30, 80, 50, 90, 45, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-green-400/70 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupCircles() {
  return (
    <div className="w-full h-full bg-[#d8dff0] rounded-2xl flex flex-col items-center justify-center p-6 min-h-[320px] gap-6">
      <div className="flex items-end justify-center gap-[-10px]">
        {[
          { label: "User\nBehaviour", offset: "mr-[-20px]" },
          { label: "Mindset",        offset: "z-10" },
          { label: "Influences",     offset: "ml-[-20px]" },
        ].map(({ label, offset }, i) => (
          <div key={i} className={`w-28 h-28 rounded-full border-4 border-dashed border-white/60 bg-[#c8d2e8] flex items-center justify-center ${offset}`}>
            <span className="text-primary font-bold text-sm text-center leading-tight whitespace-pre-line">{label}</span>
          </div>
        ))}
      </div>
      {/* Converging lines */}
      <div className="relative w-48 h-6">
        <svg viewBox="0 0 192 24" className="w-full h-full" fill="none">
          <path d="M32 0 Q96 24 96 24" stroke="white" strokeWidth="1.5" />
          <path d="M96 0 L96 24" stroke="white" strokeWidth="1.5" />
          <path d="M160 0 Q96 24 96 24" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="bg-primary text-white font-bold px-8 py-2.5 rounded-lg text-sm">Quality</div>
    </div>
  );
}

const mockupMap = { toggle: MockupToggle, cards: MockupCards, circles: MockupCircles };

/* ── Helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

function IconBox() {
  return (
    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shrink-0">
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="8" />
        <circle cx="24" cy="16" r="3" />
        <path d="M10 40 C10 31 38 31 38 40" />
        <circle cx="24" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

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

const resources = [
  { date: "24.03.2026", title: "From Clinical to Commercial: How Research Bridges Science and Market Reality",       gradient: "from-blue-400 to-indigo-500" },
  { date: "24.03.2026", title: "Why Your Market Research Needs Custom Survey Programming?",                          gradient: "from-gray-700 to-gray-900" },
  { date: "24.03.2026", title: "Measuring Customer Loyalty: Key Metrics to Track via Market Research",              gradient: "from-blue-200 to-blue-400" },
  { date: "24.03.2026", title: "How Panel Quality Affects Research Outcomes in B2B Studies",                        gradient: "from-teal-400 to-cyan-600" },
  { date: "24.03.2026", title: "Data Collection Best Practices for International Market Research Projects",          gradient: "from-violet-500 to-purple-700" },
];

/* ── Main Layout ── */
export default function ResearchPageLayout({
  banner, factsHeading, factsDesc, sections,
  capabilities, stepsHeading, stepsSubheading, steps, stats, faqs,
}: ResearchPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const statsRef = useRef(null);

  return (
    <main className="bg-white">

      {/* ════════ BANNER ════════ */}
      <section className="-mt-[76px] bg-primary py-16">
        <div className="site-container px-6 text-center pt-[76px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {banner.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/70 text-base max-w-xl mx-auto"
          >
            {banner.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ════════ FACTS HEADING ════════ */}
      <section className="bg-white pt-12">
        <div className="site-container px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-primary text-xl">●</span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-primary">{factsHeading}</h2>
            <span className="text-primary text-xl">●</span>
          </div>
          <p className="mt-4 text-gray-900 text-base max-w-3xl mx-auto leading-8 font-medium">{factsDesc}</p>
          <div className="mt-6 border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ FEATURE SECTIONS ════════ */}
      {sections.map((sec, i) => {
        const MockupComp = mockupMap[sec.mockup];
        const isLeft = sec.side === "left";
        return (
          <section key={i} className="bg-white py-16">
            <div className="site-container px-6">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${!isLeft ? "md:[direction:rtl]" : ""}`}>
                {/* Text */}
                <motion.div {...fadeUp(0)} className="[direction:ltr]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" /><circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none" /><path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{sec.heading}</h3>
                  </div>
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="text-gray-900 text-base leading-8 font-medium mb-4">{p}</p>
                  ))}
                </motion.div>
                {/* Mockup */}
                <motion.div {...fadeUp(0.15)} className="[direction:ltr]">
                  <MockupComp />
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ════════ CAPABILITIES ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <IconBox />
                <h3 className="text-base font-bold text-gray-900 mb-3">{cap.title}</h3>
                <p className="text-gray-900 text-base leading-8 font-medium">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PROJECT MANAGEMENT ════════ */}
      <section className="bg-primary py-16">
        <div className="site-container px-6 text-center">
          <motion.div {...fadeUp()}>
            <p className="text-primary font-bold uppercase text-sm tracking-widest mb-3">{stepsHeading}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12">{stepsSubheading}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp(0.12 * i)} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-5">
                  <span className="text-white text-2xl font-black">{step.num}</span>
                </div>
                <p className="text-white font-extrabold uppercase text-sm tracking-wider mb-1">{step.title}</p>
                <p className="text-primary text-sm font-semibold underline mb-3">{step.subtitle}</p>
                <p className="text-white/80 text-base leading-8 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section ref={statsRef} className="py-16 bg-highlight">
        <div className="site-container px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {stats.map((s, i) => {
              const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
              const suffix = s.value.replace(/[0-9.]/g, "");
              const decimals = s.value.includes(".") ? 1 : 0;
              return (
                <motion.div key={i} {...fadeUp(0.1 * i)}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={num} suffix={suffix} decimals={decimals} />
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ FAQs ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">FAQs</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="cursor-pointer w-full flex items-center justify-between px-6 py-5 text-left border border-gray-200 rounded-2xl bg-white hover:border-gray-300 transition-colors"
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-2 px-6 py-5 border border-gray-200 rounded-2xl bg-white text-gray-900 text-base leading-7"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ RESOURCES SLIDER ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">Explore Our Resources</h2>
          </motion.div>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="resources-swiper !pb-12"
          >
            {resources.map((r, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className={`h-48 bg-gradient-to-br ${r.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" /> {r.date}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug">{r.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

    </main>
  );
}
