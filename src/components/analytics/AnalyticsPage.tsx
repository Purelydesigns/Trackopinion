"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart2, ShieldCheck, AlignLeft, Layers, PieChart, Gauge, Database, Zap, DollarSign, Users, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ── Data ── */
const tabs = ["Data Cleansing", "Statistics", "Dashboards", "Visualization"];

const tabContent: Record<string, { features: { title: string; desc: string }[]; }> = {
  "Data Cleansing": {
    features: [
      { title: "Data Visualisation",   desc: "Identify and remove inconsistencies—typos, missing data, and mismatched formats. Merge diverse data sources." },
      { title: "Standardization",      desc: "Identify and remove inconsistencies—typos, missing data, and mismatched formats. Merge diverse data sources." },
      { title: "KPIs",                 desc: "Identify and remove inconsistencies—typos, missing data, and mismatched formats. Merge diverse data sources." },
      { title: "KPIs",                 desc: "Identify and remove inconsistencies—typos, missing data, and mismatched formats. Merge diverse data sources." },
    ],
  },
  Statistics: {
    features: [
      { title: "Descriptive Stats",    desc: "Summarize and describe your data with mean, median, variance, and standard deviation for clear insights." },
      { title: "Inferential Stats",    desc: "Draw conclusions from sample data and generalize findings to the broader population with confidence." },
      { title: "Regression Analysis",  desc: "Identify relationships between variables and forecast future trends with predictive modelling." },
      { title: "Hypothesis Testing",   desc: "Validate assumptions with statistical tests and confirm if your data results are significant." },
    ],
  },
  Dashboards: {
    features: [
      { title: "Real-time Dashboards", desc: "Generate high-quality dashboards to represent crucial metrics on one screen for better comparison and analysis." },
      { title: "Custom Reports",       desc: "Pull real-time data for a comprehensive understanding and share them with your stakeholders seamlessly." },
      { title: "KPI Tracking",         desc: "Monitor your key performance indicators at a glance with interactive, filterable dashboard panels." },
      { title: "Data Drill-down",      desc: "Explore specific data points deeper within your dashboard for granular insights and better decisions." },
    ],
  },
  Visualization: {
    features: [
      { title: "Heat Maps",            desc: "Make complex data easy to infer with our data analysis services and heat maps highlighting patterns." },
      { title: "Charts & Graphs",      desc: "Present sophisticated numbers through beautifully designed charts, graphs, and visual reports." },
      { title: "Trend Analysis",       desc: "Highlight patterns, trends, anomalies, and outliers across your datasets with visual storytelling." },
      { title: "Infographics",         desc: "Convert raw data into visually engaging infographics your stakeholders can understand at a glance." },
    ],
  },
};

/* ── Per-tab mockup config ── */
const tabMockup: Record<string, {
  accent: string;
  stats: [string, string][];
  chartPoints: string;
  chartPoints2: string;
  label: string;
  value: string;
  tags: string[];
  sourceColor: string[];
}> = {
  "Data Cleansing": {
    accent: "#22c55e",
    stats: [["Users", "132"], ["Page Views", "7192"]],
    chartPoints: "0,45 30,38 60,42 100,25 130,35 170,8 200,28 240,22",
    chartPoints2: "0,32 20,30 40,28 55,5 70,28 90,26 120,24",
    label: "Session Duration", value: "02:42",
    tags: ["Daily: 22", "Weekly: 80", "Monthly: 132"],
    sourceColor: ["#3b82f6","#a855f7","#ec4899","#f97316"],
  },
  Statistics: {
    accent: "#6366f1",
    stats: [["Responses", "4,821"], ["Completion", "87.3%"]],
    chartPoints: "0,40 30,35 60,20 100,30 130,15 170,25 200,10 240,18",
    chartPoints2: "0,28 20,22 40,15 55,25 70,10 90,20 120,15",
    label: "Avg. Score", value: "8.4/10",
    tags: ["Mean: 7.2", "Median: 8.1", "σ: 1.42"],
    sourceColor: ["#6366f1","#8b5cf6","#a78bfa","#c4b5fd"],
  },
  Dashboards: {
    accent: "#f59e0b",
    stats: [["KPIs Live", "24"], ["Alerts", "3"]],
    chartPoints: "0,30 30,28 60,35 100,20 130,25 170,12 200,18 240,10",
    chartPoints2: "0,22 20,25 40,18 55,30 70,15 90,22 120,18",
    label: "Active Users", value: "1,204",
    tags: ["Views: 9.2K", "Clicks: 3.4K", "CVR: 4.1%"],
    sourceColor: ["#f59e0b","#fbbf24","#fcd34d","#fde68a"],
  },
  Visualization: {
    accent: "#ef4444",
    stats: [["Charts Built", "142"], ["Exports", "58"]],
    chartPoints: "0,42 30,30 60,38 100,15 130,28 170,5 200,20 240,14",
    chartPoints2: "0,35 20,28 40,32 55,12 70,22 90,8 120,16",
    label: "Heat Maps", value: "37 active",
    tags: ["Maps: 37", "Graphs: 68", "Infographics: 37"],
    sourceColor: ["#ef4444","#f97316","#eab308","#22c55e"],
  },
};

const lifecycle = [
  { num: "1", title: "Data Collection",  desc: "Collect data from panel members via surveys, focus group meetings, and CATI." },
  { num: "2", title: "Data Cleansing",   desc: "Filter illegible, irrelevant, inconsistent, and incorrect data. Extract meaningful numbers." },
  { num: "3", title: "KPIs and Stats",   desc: "Derive key performance indicators, supporting statistical values, and other useful fields." },
  { num: "4", title: "Insights",         desc: "Generate insights from the data sources for analysis and decision-making." },
  { num: "5", title: "Presentation",     desc: "Visually display data and their correlations, depicting patterns with colors and formatting." },
  { num: "6", title: "Decision",         desc: "Distribute reports, dashboards, and crosstabs with stakeholders for making decisions." },
];

const featureCards = [
  { title: "Data Cleansing",  desc: "Cleanse the collected records. Fill in default values for missing data and create measures for summarized insights. Maintain historical records with proper archiving." },
  { title: "Statistics",      desc: "Tabulate data and make charts to mine the stats on the fly. Run simple calculations for quick and crisp insights without much fanfare." },
  { title: "Dashboards",      desc: "Generate high-quality dashboards to represent crucial metrics on one screen for better comparison and analysis. Pull real-time data for a comprehensive understanding." },
  { title: "Visualization",   desc: "Make complex data easy to infer with our data analysis services. Present sophisticated numbers through heat maps, charts, and graphs. Highlight patterns, trends, anomalies, and outliers." },
];

const benefits = [
  { icon: <Users className="w-6 h-6" />,      title: "Expertise",          desc: "Get expert research consultants and data specialists to handle your project and data analysis." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Data Security",      desc: "With our data analysis services, never worry about regional or global data regulatory policies." },
  { icon: <AlignLeft className="w-6 h-6" />,   title: "Text Analysis",      desc: "Analyze long texts from open-ended questions and voice inputs, including slang and emoticons." },
  { icon: <Layers className="w-6 h-6" />,      title: "Insight Management", desc: "Change filters in the reports and dashboards to synthesize data from various facets and analyze from diverse perspectives." },
  { icon: <PieChart className="w-6 h-6" />,    title: "Crosstab Analysis",  desc: "Plot data into tabular format at the lowest dimensions to understand the inputs across all demographics." },
  { icon: <Gauge className="w-6 h-6" />,       title: "Full-Service",       desc: "Collect data, cleanse it for clarity and meaningful values, create visualizations, and make faster decisions." },
  { icon: <Clock className="w-6 h-6" />,       title: "Quick Turnaround",   desc: "Save time to arrive at better business plans with skilled consultants and easy reporting and distribution." },
  { icon: <DollarSign className="w-6 h-6" />,  title: "Competitive Pricing",desc: "Use budget-friendly solutions with the guidance of highly skilled research consultants and data experts in one team." },
];

const techStack = [
  {
    title: "Survey Programming tools",
    icon: <Database className="w-7 h-7 text-primary" />,
    tools: ["Scrip8", "Decipher", "SurveyMonkey"],
  },
  {
    title: "Data Processing & Analysis",
    icon: <BarChart2 className="w-7 h-7 text-primary" />,
    tools: ["SAS", "SPSS", "Tableau", "Manuscript Excel", "Zoho", "Quantum", "Pandas", "MySQL"],
  },
  {
    title: "Data Reporting and Visualization",
    icon: <Zap className="w-7 h-7 text-primary" />,
    tools: ["Tableau", "Power BI", "Google Analytics"],
  },
];

const stats = [
  { end: 15,   decimals: 0, suffix: "+",  label: "Years of Expertise"  },
  { end: 100,  decimals: 0, suffix: "+",  label: "Clients"             },
  { end: 30,   decimals: 0, suffix: "+",  label: "Market Covered"      },
  { end: 4.7,  decimals: 1, suffix: "M",  label: "Active Panellists"   },
  { end: 20,   decimals: 0, suffix: "K+", label: "Project Completed"   },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── CountUp ── */
function CountUp({ end, decimals, suffix, inView }: { end: number; decimals: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const steps = 60;
    const increment = end / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, interval);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <>{count.toFixed(decimals)}{suffix}</>;
}

/* ── Icon box ── */
function IconBox() {
  return (
    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 shrink-0">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v2m0 0a5 5 0 015 5H7a5 5 0 015-5z" />
        <path d="M18 8.5a2 2 0 110-4 2 2 0 010 4M6 8.5a2 2 0 110-4 2 2 0 010 4" strokeDasharray="2 2" />
        <circle cx="12" cy="8" r="4" strokeDasharray="none" />
        <path d="M21 12.5a1 1 0 11-2 0 1 1 0 012 0" />
      </svg>
    </div>
  );
}

/* ── Main ── */
export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Data Cleansing");
  const statsRef   = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const content = tabContent[activeTab];

  return (
    <main className="bg-white">

      {/* ════════ BANNER ════════ */}
      <section className="-mt-[76px] bg-primary py-8">
        <div className="max-w-7xl mx-auto px-6 text-center pt-[76px]">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Analytics and Reporting</h1>
          <p className="text-white/90 text-base font-medium">From Opinions to Decisions with Clarity</p>
        </div>
      </section>

      {/* ════════ NUMBERS THAT LEAD — Tabbed ════════ */}
      <section className="bg-white pt-16 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div {...fadeUp()} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-primary text-xl">●</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-primary">Numbers that Lead to Strategies</h2>
              <span className="text-primary text-xl">●</span>
            </div>
            <p className="text-gray-900 text-base max-w-2xl mx-auto leading-8 font-medium">
              Learn your audience&apos;s opinions in depth through complex and elaborate methods like focus group interviews, diary studies, and online surveys with open-ended questions.
            </p>
          </motion.div>

          {/* Tab container */}
          <div className="rounded-2xl overflow-hidden bg-highlight">
            {/* Tab bar */}
            <div className="flex justify-center pt-8 pb-6 px-6">
              <div className="inline-flex bg-white rounded-full p-1 gap-1 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 pb-0 items-start">
              {/* Left — feature list */}
              <div className="space-y-6 py-4 pb-10">
                {content.features.map((f, i) => (
                  <motion.div
                    key={`${activeTab}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="flex gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="9" r="3.5" />
                        <path d="M18 20c0-3.314-2.686-6-6-6s-6 2.686-6 6" />
                        <path d="M17 7a2 2 0 110-4 2 2 0 010 4M7 7a2 2 0 110-4 2 2 0 010 4" strokeDasharray="2 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base mb-1">{f.title}</h3>
                      <p className="text-gray-900 text-base leading-8 font-medium">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right — dashboard mockup (updates per tab, flush bottom) */}
              <div className="flex items-end justify-center h-full">
                {(() => {
                  const m = tabMockup[activeTab];
                  return (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full"
                    >
                      {/* Main dashboard panel */}
                      <div className="w-full rounded-t-2xl overflow-hidden shadow-xl border border-gray-200 border-b-0 bg-white">
                        <div className="flex">
                          {/* Sidebar */}
                          <div className="w-28 shrink-0 bg-gray-50 border-r border-gray-100 p-3 flex flex-col gap-2 pt-4">
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-3 px-1">
                              <div className="w-3 h-3 rounded-sm bg-primary/20" />
                              <span className="font-semibold text-gray-500">Crest</span>
                            </div>
                            {["Open command", "Analytics", "Users"].map((item, idx) => (
                              <div key={item} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] ${idx === 1 ? "bg-primary/10 text-primary font-semibold" : "text-gray-400"}`}>
                                <div className={`w-2 h-2 rounded-sm ${idx === 1 ? "bg-primary" : "bg-gray-300"}`} />
                                {item}
                              </div>
                            ))}
                          </div>
                          {/* Main content */}
                          <div className="flex-1 p-3">
                            <div className="flex justify-end mb-3">
                              <div className="border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-500 flex items-center gap-1">
                                30 Days <span className="text-gray-300">▾</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {m.stats.map(([label, val]) => (
                                <div key={label} className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                                  <p className="text-[9px] text-gray-400 mb-0.5">{label}</p>
                                  <p className="text-lg font-bold text-gray-900">{val}</p>
                                </div>
                              ))}
                            </div>
                            <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 mb-2">
                              <svg viewBox="0 0 240 50" className="w-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id={`g1-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={m.accent} stopOpacity="0.25" />
                                    <stop offset="100%" stopColor={m.accent} stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <polygon points={`${m.chartPoints} 240,50 0,50`} fill={`url(#g1-${activeTab})`} />
                                <polyline points={m.chartPoints} fill="none" stroke={m.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="flex gap-1 text-[8px] text-gray-400">
                              {m.tags.map(s => (
                                <span key={s} className="bg-gray-50 border border-gray-100 rounded px-1.5 py-0.5 flex-1 text-center">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Bottom panel */}
                        <div className="border-t border-gray-100 flex">
                          <div className="w-28 shrink-0 border-r border-gray-100" />
                          <div className="flex-1 p-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                                <p className="text-[9px] text-gray-400 mb-0.5">{m.label}</p>
                                <p className="text-base font-bold text-gray-900">{m.value}</p>
                                <svg viewBox="0 0 120 36" className="w-full mt-1" xmlns="http://www.w3.org/2000/svg">
                                  <defs>
                                    <linearGradient id={`g2-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor={m.accent} stopOpacity="0.2" />
                                      <stop offset="100%" stopColor={m.accent} stopOpacity="0" />
                                    </linearGradient>
                                  </defs>
                                  <polygon points={`${m.chartPoints2} 120,36 0,36`} fill={`url(#g2-${activeTab})`} />
                                  <polyline points={m.chartPoints2} fill="none" stroke={m.accent} strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                                <p className="text-[9px] text-gray-400 mb-1">Sources</p>
                                <p className="text-sm font-bold text-gray-800">ray.st</p>
                                <div className="flex gap-1 mt-1.5">
                                  {m.sourceColor.map(c => (
                                    <div key={c} className="h-2 flex-1 rounded-sm" style={{ background: c }} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Floating AI panel */}
                      <div className="absolute top-8 right-0 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-10">
                        <input readOnly placeholder="Search or Jump to..." className="w-full text-[9px] border border-gray-100 rounded-lg px-2 py-1.5 text-gray-400 bg-gray-50 outline-none mb-2" />
                        <p className="text-[8px] text-gray-400 mb-1.5 px-1">Ask</p>
                        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 rounded-lg mb-1">
                          <div className="w-2 h-2 rounded-full bg-primary/40" />
                          <span className="text-[9px] font-semibold text-gray-700">Ask Crest AI</span>
                        </div>
                        {m.tags.concat(["User Stickiness: 16.67%"]).map(s => (
                          <div key={s} className="flex items-center gap-1.5 px-2 py-1 text-[8px] text-gray-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LIFECYCLE ════════ */}
      <section className="bg-primary py-16 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3">
              Lifecycle of an Analytics Project
            </h2>
            <p className="text-white/60 text-base">From raw data to helpful ideas</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {lifecycle.map((step, i) => (
              <motion.div key={i} {...fadeUp(0.08 * i)} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center mx-auto mb-5">
                  <span className="text-white text-2xl font-black">{step.num}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/80 text-base leading-8 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FEATURE CARDS (2×2) ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <IconBox />
                <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-900 text-base leading-8 font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BENEFITS ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-3">
              Benefits of Track Opinion&apos;s Analytics and Reporting Services
            </h2>
            <p className="text-gray-900 text-base font-medium">Track Opinion&apos;s reporting and analytics service in India and the global market has manifold benefits</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.slice(0, 6).map((b, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="bg-primary rounded-2xl p-8 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 text-primary">
                  {b.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-3">{b.title}</h3>
                <p className="text-white/80 text-base leading-8 font-medium">{b.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Last 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {benefits.slice(6).map((b, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="bg-primary rounded-2xl p-8 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 text-primary">
                  {b.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-3">{b.title}</h3>
                <p className="text-white/80 text-base leading-8 font-medium">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TECH STACK ════════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
              Tech-Stack We Use for Analytics and Reporting
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((stack, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">{stack.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-5">{stack.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.tools.map((tool) => (
                    <span key={tool} className="text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STATS BAR ════════ */}
      <section ref={statsRef} className="py-16 bg-highlight">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} inView={statsInView} />
                </div>
                <div className="text-gray-600 text-sm font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ RESOURCES / BLOG SLIDER ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
              Explore Our Resources
            </h2>
          </motion.div>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640:  { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="resources-swiper !pb-12"
          >
            {[
              { color: "from-blue-100 to-blue-300",    bg: "#e0eaff", title: "From Clinical to Commercial: How Research Bridges Science and Market Reality" },
              { color: "from-violet-400 to-gray-800",  bg: "#6d7cad", title: "Why Your Market Research Needs Custom Survey Programming?" },
              { color: "from-blue-200 to-blue-400",  bg: "#f4c8b0", title: "Measuring Customer Loyalty: Key Metrics to Track via Market Research" },
              { color: "from-teal-300 to-cyan-600",    bg: "#81d4e0", title: "How Online Surveys Are Reshaping Consumer Insights in 2026" },
              { color: "from-blue-100 to-blue-200", bg: "#f9d8a0", title: "Understanding Panellist Fatigue and How to Overcome It" },
            ].map((post, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className={`h-52 bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                    <div className="w-20 h-20 rounded-2xl bg-white/30 backdrop-blur-sm" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>24.03.2026</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug">{post.title}</h3>
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
