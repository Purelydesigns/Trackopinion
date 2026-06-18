"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

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

/* ── Mockups ── */
function MockupBrandHealth() {
  return (
    <div className="w-full h-full bg-[#d8dff0] rounded-2xl flex items-center justify-center p-8 min-h-[320px]">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-72 space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-900 text-base">Brand Health Score</p>
          <span className="text-accent font-black text-xl">82%</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "Awareness", pct: 88 },
            { label: "Consideration", pct: 74 },
            { label: "Preference", pct: 61 },
            { label: "Loyalty", pct: 53 },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{row.label}</span><span>{row.pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-primary rounded-full" style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupWaveChart() {
  const points = [60, 55, 70, 65, 80, 72, 88, 76, 92, 85];
  const maxH = 100;
  const pts = points.map((v, i) => `${i * (256 / (points.length - 1))},${maxH - v}`).join(" ");
  const fillPts = `0,${maxH} ${pts} 256,${maxH}`;
  return (
    <div className="w-full h-full bg-[#d8dff0] rounded-2xl flex items-center justify-center p-8 min-h-[320px]">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-72">
        <p className="font-bold text-gray-900 text-base mb-1">Brand Tracker Trend</p>
        <p className="text-gray-400 text-xs mb-4">12-month awareness wave</p>
        <svg viewBox="0 0 256 100" className="w-full h-28" fill="none">
          <polygon points={fillPts} fill="rgba(26,26,78,0.08)" />
          <polyline points={pts} stroke="#1a1a4e" strokeWidth="2" fill="none" />
          {points.map((v, i) => (
            <circle key={i} cx={i * (256 / (points.length - 1))} cy={maxH - v} r="3.5" fill="#f97316" />
          ))}
        </svg>
        <div className="mt-3 flex justify-between text-xs text-gray-400">
          <span>Jan</span><span>Jun</span><span>Dec</span>
        </div>
      </div>
    </div>
  );
}

function MockupCompetitorMap() {
  const brands = [
    { label: "Your Brand", x: 55, y: 35, size: 48, color: "#1a1a4e" },
    { label: "Brand B",    x: 25, y: 55, size: 36, color: "#f97316" },
    { label: "Brand C",    x: 70, y: 65, size: 30, color: "#6b7280" },
    { label: "Brand D",    x: 40, y: 75, size: 24, color: "#94a3b8" },
  ];
  return (
    <div className="w-full h-full bg-[#d8dff0] rounded-2xl flex items-center justify-center p-8 min-h-[320px]">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-72">
        <p className="font-bold text-gray-900 text-base mb-4">Competitive Landscape</p>
        <div className="relative h-44 bg-gray-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-gray-200" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-px bg-gray-200" />
          </div>
          {brands.map((b) => (
            <div
              key={b.label}
              className="absolute flex items-center justify-center rounded-full text-white font-bold"
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.size, height: b.size, backgroundColor: b.color, transform: "translate(-50%,-50%)", fontSize: 9 }}
            >
              {b.label.split(" ")[0]}
            </div>
          ))}
          <span className="absolute bottom-1 left-2 text-xs text-gray-400">Awareness →</span>
          <span className="absolute top-1 left-2 text-xs text-gray-400" style={{ writingMode: "vertical-rl" }}>Preference ↑</span>
        </div>
      </div>
    </div>
  );
}

const mockupMap: Record<string, () => React.ReactElement> = {
  health: MockupBrandHealth,
  wave: MockupWaveChart,
  competitor: MockupCompetitorMap,
};

/* ── Capability cards with relevant icons ── */
const capabilities = [
  {
    title: "Brand Awareness Tracking",
    desc: "Monitor prompted and unprompted brand recall across geographies and audience segments. Understand how your advertising and PR investments translate into top-of-mind awareness.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="24" cy="24" rx="20" ry="12" />
        <circle cx="24" cy="24" r="5" />
        <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Brand Perception Study",
    desc: "Map consumer perceptions of your brand on key attributes — quality, trust, innovation, value — and compare against competitors to identify positioning strengths and gaps.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 36c0-8 4-14 12-16 8 2 12 8 12 16" />
        <line x1="24" y1="20" x2="24" y2="10" />
        <circle cx="24" cy="8" r="3" />
        <line x1="12" y1="36" x2="36" y2="36" />
        <path d="M18 36v-4a6 6 0 0 1 12 0v4" />
      </svg>
    ),
  },
  {
    title: "Campaign Effectiveness",
    desc: "Measure the before-and-after impact of marketing campaigns on awareness, message recall, and purchase intent. Prove ROI and optimize spend allocation for future waves.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 34 16 22 24 28 34 14 42 18" />
        <polyline points="34 14 42 14 42 22" />
        <line x1="6" y1="42" x2="42" y2="42" />
      </svg>
    ),
  },
  {
    title: "Customer Loyalty Index",
    desc: "Gauge loyalty and advocacy levels through NPS, repurchase intent, and brand love metrics. Identify at-risk segments before churn impacts revenue.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 40 C12 32 6 24 6 16a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 8-6 16-18 24z" />
      </svg>
    ),
  },
  {
    title: "Audience Segmentation",
    desc: "Dissect tracker results by demographics, psychographics, and purchase behavior to uncover which audiences are most and least engaged with your brand.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="18" r="6" />
        <circle cx="32" cy="18" r="6" />
        <path d="M6 40c0-6 4-10 10-10h4" />
        <path d="M28 30h4c6 0 10 4 10 10" />
        <line x1="22" y1="30" x2="26" y2="30" />
      </svg>
    ),
  },
  {
    title: "Competitor Share of Voice",
    desc: "Track competitor brand recall and sentiment alongside your own data. Spot category shifts early and respond faster than the market expects.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8 L8 40 L40 40" />
        <rect x="12" y="28" width="6" height="12" rx="1" />
        <rect x="22" y="18" width="6" height="22" rx="1" />
        <rect x="32" y="10" width="6" height="30" rx="1" />
      </svg>
    ),
  },
];

const sections = [
  {
    heading: "What is Brand Tracking?",
    side: "left" as const,
    mockup: "health",
    paragraphs: [
      "Brand tracking is the continuous monitoring of your brand's health metrics — awareness, consideration, preference, usage, and loyalty — over time. It tells you not just where you stand today, but how your brand equity is evolving.",
      "At Track Opinion, we run regular survey waves across your target audience to deliver a real-time pulse of your brand's standing versus competitors, so you can act before small perception shifts become large market-share losses.",
    ],
  },
  {
    heading: "Measure What Matters Most",
    side: "right" as const,
    mockup: "wave",
    paragraphs: [
      "A brand tracker study goes beyond a one-time snapshot. We capture longitudinal data — wave after wave — to reveal seasonal trends, the impact of campaigns, and competitive movements that a single research study would miss entirely.",
      "Our validated panel of 4.7 million active members ensures each wave reflects your true target audience, giving your leadership team statistically reliable data to act on with confidence.",
    ],
  },
  {
    heading: "Competitive Benchmarking",
    side: "left" as const,
    mockup: "competitor",
    paragraphs: [
      "Brand strength is relative. Knowing your awareness score means little without knowing how your key competitors score on the same metrics. Our brand tracker maps your entire competitive set on a single dashboard.",
      "Track Opinion's competitive benchmarking modules reveal where you lead, where you lag, and which audience segments represent the highest opportunity to close the gap — informing media strategy, messaging, and product positioning.",
    ],
  },
];

const steps = [
  {
    num: "1",
    title: "Tracker Design",
    subtitle: "You speak, we listen.",
    desc: "We collaborate with your team to define KPIs, select the right metrics, build the questionnaire, and establish baseline wave timing aligned to your campaign calendar.",
  },
  {
    num: "2",
    title: "Continuous Fielding",
    subtitle: "You ask, we provide.",
    desc: "Our panel team fields each wave on schedule — weekly, monthly, or quarterly — delivering consistent sample composition so wave-on-wave comparisons are statistically valid.",
  },
  {
    num: "3",
    title: "Insight Delivery",
    subtitle: "You want, we serve.",
    desc: "You receive interactive dashboards and executive summary reports after every wave, with trend overlays, competitor benchmarks, and recommended actions for your marketing team.",
  },
];

const stats = [
  { value: "15+",  label: "Years of Expertise" },
  { value: "100+", label: "Clients" },
  { value: "30+",  label: "Market Covered" },
  { value: "4.7M", label: "Active Panellists" },
  { value: "20K+", label: "Project Completed" },
];

const faqs = [
  {
    q: "What is a brand tracker study and how does it work?",
    a: "A brand tracker study is an ongoing research programme that measures your brand's health metrics — awareness, consideration, preference, and loyalty — at regular intervals (weekly, monthly, or quarterly). Each measurement is called a 'wave.' By comparing waves over time, you can see whether your brand equity is growing, declining, or stable — and link those movements to your marketing activity.",
  },
  {
    q: "How often should brand tracking be conducted?",
    a: "Frequency depends on your category velocity and media spend. High-spend FMCG brands typically track monthly or weekly to capture campaign impact quickly. B2B or slower-moving categories often track quarterly or bi-annually. Track Opinion will recommend a cadence based on your category dynamics, budget, and decision-making cycle.",
  },
  {
    q: "What metrics does a brand tracker measure?",
    a: "Core brand tracker metrics include: Spontaneous (unprompted) and prompted brand awareness, brand consideration, brand preference, purchase intent, brand imagery / attribute associations, Net Promoter Score (NPS), and competitive share of mind. We can customise the metric set to align with your marketing objectives and the KPIs your leadership team tracks.",
  },
  {
    q: "How is brand tracker data different from a one-time survey?",
    a: "A one-time survey gives you a snapshot of where your brand stands today. A brand tracker gives you a trend line — showing direction, velocity, and the causes of change. This longitudinal view is essential for measuring campaign ROI, anticipating competitive threats, and making long-term brand investment decisions with confidence.",
  },
];

const resources = [
  { date: "24.03.2026", title: "From Clinical to Commercial: How Research Bridges Science and Market Reality", gradient: "from-blue-400 to-indigo-500" },
  { date: "24.03.2026", title: "Why Your Market Research Needs Custom Survey Programming?", gradient: "from-gray-700 to-gray-900" },
  { date: "24.03.2026", title: "Measuring Customer Loyalty: Key Metrics to Track via Market Research", gradient: "from-orange-300 to-rose-400" },
  { date: "24.03.2026", title: "How Panel Quality Affects Research Outcomes in B2B Studies", gradient: "from-teal-400 to-cyan-600" },
  { date: "24.03.2026", title: "Data Collection Best Practices for International Market Research Projects", gradient: "from-violet-500 to-purple-700" },
];

export default function BrandTrackerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      {/* ════════ BANNER — video, same as About Us ════════ */}
      <section className="relative min-h-[500px] sm:min-h-[700px] lg:h-[840px] flex items-center overflow-hidden">
        <video
          src="/video/banner.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Brand Image Study
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 leading-8">
              Monitor your brand equity continuously — awareness, consideration, preference, and loyalty — wave after wave, across every market that matters.
            </p>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Explore More »
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ FACTS HEADING ════════ */}
      <section className="bg-white pt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-accent text-xl">●</span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-primary">Track Your Brand&#39;s Pulse in Real Time</h2>
            <span className="text-accent text-xl">●</span>
          </div>
          <p className="mt-4 text-gray-900 text-base max-w-3xl mx-auto leading-8 font-medium">
            Brand equity is not built overnight — and it doesn&#39;t erode overnight either. But when it does shift, you need to know immediately. Track Opinion&#39;s Brand Image Study delivers consistent, wave-based measurement so your decisions are always anchored in current reality, not last year&#39;s data.
          </p>
          <div className="mt-6 border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ FEATURE SECTIONS ════════ */}
      {sections.map((sec, i) => {
        const MockupComp = mockupMap[sec.mockup];
        const isLeft = sec.side === "left";
        return (
          <section key={i} className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${!isLeft ? "md:[direction:rtl]" : ""}`}>
                <motion.div {...fadeUp(0)} className="[direction:ltr]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" /><circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none" /><path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{sec.heading}</h3>
                  </div>
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="text-gray-900 text-base leading-8 mb-4 font-medium">{p}</p>
                  ))}
                </motion.div>
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
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-primary">What We Measure</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5 shrink-0">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{cap.title}</h3>
                <p className="text-gray-700 text-base leading-7 font-medium">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PROJECT MANAGEMENT ════════ */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()}>
            <p className="text-accent font-bold uppercase text-sm tracking-widest mb-3">Project Management</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12">A dedicated team available around the clock</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp(0.12 * i)} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-5">
                  <span className="text-white text-2xl font-black">{step.num}</span>
                </div>
                <p className="text-white font-extrabold uppercase text-sm tracking-wider mb-1">{step.title}</p>
                <p className="text-accent text-sm font-semibold underline mb-3">{step.subtitle}</p>
                <p className="text-white/80 text-base leading-8 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-16 bg-highlight">
        <div className="max-w-7xl mx-auto px-6">
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

      {/* ════════ FAQs — dark content, privacy style ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
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
                  <span className="text-base font-bold text-gray-900 pr-4">{faq.q}</span>
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
                    className="mt-2 px-6 py-5 border border-gray-200 rounded-2xl bg-white"
                  >
                    <p className="text-gray-900 text-base leading-8 font-medium">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ RESOURCES SLIDER ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
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

      {/* ════════ CTA ════════ */}
      <section className="py-14 bg-highlight">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeUp()}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Start tracking your brand&#39;s health today — before your competitors do
              </h3>
              <p className="text-gray-500 text-base leading-8">
                Talk to Track Opinion about designing a brand tracker that fits your category, your budget, and your decision-making cadence. Our team will define the right KPIs, build the questionnaire, and have your first wave in field within weeks.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact-us"
                className="bg-primary hover:bg-accent text-white text-base font-bold px-10 py-5 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
