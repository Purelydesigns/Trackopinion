"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

/* ── CountUp ── */
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── Design / Survey Builder Mockup ── */
function SurveyBuilderMockup() {
  return (
    <div className="relative w-full">
      {/* Auto-saved badge */}
      <div className="absolute -top-4 right-6 z-10 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2 border border-gray-100">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        <div>
          <p className="text-xs font-bold text-gray-900">Auto-saved</p>
          <p className="text-[10px] text-gray-400">Draft secure</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Browser chrome */}
        <div className="bg-primary px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-white/80 text-xs font-medium">Survey Builder — Customer Research Q4</span>
        </div>

        <div className="grid grid-cols-[160px_1fr]">
          {/* Left sidebar — question types */}
          <div className="border-r border-gray-100 p-4 bg-gray-50/50">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-3">Question Types</p>
            {[
              { label: "Multiple Choice", active: true, icon: <circle cx="8" cy="8" r="6" /> },
              { label: "Rating Scale",    active: false, icon: <><path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6L3 8h6z" strokeWidth="1.2"/></> },
              { label: "NPS Score",       active: false, icon: <><path d="M3 12h18M12 3l3 9-3 9-3-9z" /></> },
              { label: "Open Text",       active: false, icon: <><path d="M4 6h16M4 10h16M4 14h10" /></> },
              { label: "Matrix Grid",     active: false, icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></> },
            ].map((q, i) => (
              <div key={i} className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl mb-1.5 cursor-pointer text-xs font-semibold ${q.active ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}>
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {q.icon}
                </svg>
                {q.label}
              </div>
            ))}
            <button className="mt-4 w-full bg-primary text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1">
              + Add Question
            </button>

            {/* Theme selector at bottom */}
            <div className="mt-6">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Theme</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/40" />
                </div>
                <div className="w-5 h-5 rounded-full bg-purple-500" />
                <div className="w-5 h-5 rounded-full bg-red-500" />
              </div>
            </div>
          </div>

          {/* Right — survey preview */}
          <div className="p-5">
            <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-3 text-center">Customer Satisfaction Survey</p>
            <p className="text-sm font-semibold text-gray-900 mb-4 leading-snug">How would you rate your overall experience with our product?</p>
            {[
              { label: "Excellent — exceeded expectations", active: true },
              { label: "Good — met most expectations",     active: false },
              { label: "Fair — met some expectations",     active: false },
              { label: "Poor — did not meet expectations", active: false },
            ].map((opt, i) => (
              <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-2 border text-xs font-medium cursor-pointer transition-colors ${opt.active ? "border-primary bg-highlight text-primary" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${opt.active ? "border-primary" : "border-gray-300"}`}>
                  {opt.active && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                {opt.label}
              </div>
            ))}
            {/* Skip logic hint */}
            <div className="flex items-center gap-2 mt-3 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 4v4m0 2v.5"/></svg>
              <span className="text-[10px] text-amber-700 font-medium">Skip logic: if &quot;Poor&quot; → show follow-up Q6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Collect / Distribute Mockup ── */
function DistributeMockup() {
  return (
    <div className="relative w-full">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="bg-primary px-5 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-sm">Distribute Survey</span>
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Published ✓</span>
        </div>
        <div className="p-5 grid grid-cols-2 gap-3">
          {[
            { icon: "✉", label: "Email",       sub: "2,400 sent",    active: true,  color: "blue" },
            { icon: "⊡", label: "QR Code",     sub: "Print & display", active: false, color: "green" },
            { icon: "🔗", label: "Direct Link", sub: "Shareable URL", active: false, color: "amber" },
            { icon: "💬", label: "SMS / WhatsApp", sub: "Mobile reach", active: false, color: "purple" },
          ].map((m, i) => (
            <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer ${m.active ? "border-primary bg-highlight" : "border-gray-200 hover:border-gray-300"}`}>
              <span className="text-base">{m.icon}</span>
              <div>
                <p className={`text-xs font-bold ${m.active ? "text-primary" : "text-gray-900"}`}>{m.label}</p>
                <p className="text-[10px] text-gray-400">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 pb-5">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Shareable Link</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-500">scrip8.com/s/csat-q4-2025-xk9f</div>
            <button className="bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-lg">Copy</button>
          </div>
        </div>
      </div>
      {/* Floating badge */}
      <div className="absolute -bottom-5 right-6 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">↑ 89% Completion</p>
          <p className="text-[10px] text-gray-400">This survey</p>
        </div>
      </div>
    </div>
  );
}

/* ── Analyze / Analytics Dashboard Mockup ── */
function AnalyticsMockup() {
  return (
    <div className="relative w-full">
      {/* AI Summary floating badge */}
      <div className="absolute -top-5 left-4 z-10 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4a1 1 0 00-1-1H2a1 1 0 00-1 1v.5a1 1 0 001 1h20a1 1 0 001-1V4z"/><path d="M12 8v8m-4-4h8"/></svg>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">AI Summary Ready</p>
          <p className="text-[10px] text-gray-400">Generated in 3s</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 mt-4">
        {/* Header bar */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">Dashboard</span>
          <button className="flex items-center gap-1.5 text-primary text-xs font-semibold">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2v10M3 10l5 5 5-5"/><rect x="2" y="12" width="12" height="2" rx="1"/></svg>
            Export
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
          {[
            { value: "127",    label: "Responses" },
            { value: "91%",    label: "Completion" },
            { value: "2m 34s", label: "Avg. Time" },
          ].map((s, i) => (
            <div key={i} className="py-4 text-center">
              <p className="text-lg font-black text-primary">{s.value}</p>
              <p className="text-[10px] text-gray-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="p-5">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-4">Q2: Overall Satisfaction</p>
          {[
            { label: "Very Satisfied", pct: 42, color: "#1d4ed8" },
            { label: "Satisfied",      pct: 31, color: "#3b82f6" },
            { label: "Neutral",        pct: 18, color: "#93c5fd" },
            { label: "Dissatisfied",   pct:  9, color: "#fca5a5" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 mb-2.5">
              <span className="text-[10px] text-gray-500 w-24 shrink-0">{row.label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
              </div>
              <span className="text-[10px] font-bold text-gray-600 w-7 text-right">{row.pct}%</span>
            </div>
          ))}

          {/* AI Insight box */}
          <div className="mt-4 bg-highlight border border-primary/20 rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
              <span className="text-[9px] font-bold text-primary uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-[10px] text-primary leading-relaxed">73% of respondents are satisfied or above. Key driver: product reliability. Follow up on 9% dissatisfied — primarily new users aged 25–34.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stats ── */
const stats = [
  { value: "5",   suffix: "M+",   label: "Surveys Created" },
  { value: "1",   suffix: "M+",   label: "Monthly Responses" },
  { value: "500", suffix: "+",    label: "Brand Clients" },
  { value: "60",  suffix: "+",    label: "Countries Reached" },
  { value: "15",  suffix: " Yrs", label: "Research Expertise" },
];

const logos = ["facebook", "amazon", "Airtel", "Philips", "Google", "NETFLIX", "CEAT", "Unilever"];

/* ── Problem cards ── */
const problems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4"/><path d="M16 11v6m3-3h-6"/>
      </svg>
    ),
    title: "Low Response Rates",
    desc: "Desktop-first survey tools average 14% completion on mobile. Most respondents abandon before finishing, making your data incomplete and unreliable.",
    fix: "Scrip8 mobile-first design boosts completion by up to 42%",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Insights Take Too Long",
    desc: "Waiting days or weeks for analysis reports means decisions are made on stale data. In fast-moving markets, timing is everything.",
    fix: "AI analytics deliver real-time dashboards in seconds",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Overly Complex Tools",
    desc: "Enterprise survey platforms require weeks of training, IT support, and steep license fees — before you've even created your first survey.",
    fix: "Launch your first survey in under 5 minutes — no training needed",
  },
];

/* ── Feature steps ── */
const featureSteps = [
  {
    num: "1",
    label: "DESIGN",
    title: "Build beautiful surveys in minutes, not hours",
    desc: "Drag, drop, and configure. Scrip8's intuitive builder lets you create any survey type — from NPS to complex branching questionnaires — without writing a single line of code.",
    checks: [
      "100+ question types: rating, matrix, NPS, image choice",
      "Skip logic, branching & piping for smart flows",
      "Brand themes: logo, colors, fonts, custom CSS",
      "Multi-language support across 60+ languages",
    ],
    cta: "Start designing free",
    mockup: <SurveyBuilderMockup />,
    flip: false,
    bg: "bg-white",
  },
  {
    num: "2",
    label: "COLLECT",
    title: "Reach respondents wherever they are",
    desc: "Share your survey via email, SMS, QR code, website embed, or direct link — all from a single dashboard. Scrip8 optimizes every delivery method for maximum response rates.",
    checks: [
      "Email campaigns with smart follow-up reminders",
      "QR code generation for in-person & print distribution",
      "Website & app embed with zero-friction entry",
      "Tap into 4.8M global panelists for instant responses",
    ],
    cta: "Explore distribution",
    mockup: <DistributeMockup />,
    flip: true,
    bg: "bg-section",
  },
  {
    num: "3",
    label: "ANALYZE",
    title: "Turn responses into decisions — instantly",
    desc: "Real-time dashboards, AI-generated summaries, and visual reports make it easy to understand what your audience is really saying — and act on it fast.",
    checks: [
      "Live dashboards: charts update as responses arrive",
      "AI summaries: key themes extracted automatically",
      "Export to PDF, Excel, PowerPoint in one click",
      "Cross-tabulation, filters & segment comparisons",
    ],
    cta: "See analytics demo",
    mockup: <AnalyticsMockup />,
    flip: false,
    bg: "bg-white",
  },
];

/* ── AI features ── */
const aiFeatures = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M23 4a1 1 0 00-1-1H2a1 1 0 00-1 1v.5a1 1 0 001 1h20a1 1 0 001-1V4z"/><path d="M4 9l8 8 8-8"/>
      </svg>
    ),
    title: "AI Survey Generator",
    desc: "Describe your research goal in plain English and Scrip8 generates a complete, best-practice survey in seconds — with the right question types, order, and logic pre-configured.",
    tag: "New Feature",
    tagColor: "bg-green-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    title: "Semantic Response Analysis",
    desc: "Open-text responses are automatically clustered by theme, sentiment, and priority. No manual coding. No spreadsheet. Just clear, actionable categories ready for your report.",
    tag: "Core Feature",
    tagColor: "bg-green-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Predictive Drop-off Alerts",
    desc: "Scrip8's AI monitors response patterns in real time and flags questions causing drop-off. Get suggestions to rephrase, reorder, or simplify — before you lose more respondents.",
    tag: "Smart Alert",
    tagColor: "bg-green-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "One-Click Report Generation",
    desc: "Generate executive-ready reports with AI-written narrative, branded charts, and key findings — in PDF, PowerPoint, or interactive web format — in under 30 seconds.",
    tag: "Time Saver",
    tagColor: "bg-green-600",
  },
];

/* ── Main ── */
export default function Scrip8Page() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <main className="bg-white">

      {/* ════════ HERO ════════ */}
      <section className="-mt-[76px] bg-primary min-h-[600px] lg:min-h-[700px] flex items-center relative overflow-hidden pt-[76px]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-38 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 50%, #ffffff 100%)" }} />

        <div className="relative w-full max-w-[1536px] mx-auto px-6 pt-20 pb-38 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white text-xs font-semibold px-4 py-2.5 rounded-full backdrop-blur-sm">
                <span className="relative flex w-2.5 h-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-green-400" />
                </span>
                Powered by AI Analytics
              </span>
              <span className="inline-flex items-center gap-2.5 bg-transparent border border-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-full backdrop-blur-sm">
                <span className="flex gap-0.5 text-amber-400 leading-none">★★★★★</span>
                G2 Leader 2025
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              The Survey Platform<br />
              Built for <span className="text-white/70">Real Insights.</span>
            </h1>

            <p className="text-white/80 text-base leading-8 mb-8 max-w-md">
              Create, distribute and analyze surveys in minutes with Scrip8. Mobile-first, AI-powered, and trusted by 500+ research teams worldwide — from startups to Fortune 500s.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <Link href="/contact-us" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm">
                Start Free — No Card Needed →
              </Link>
              <button className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-7 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch 90-sec Demo
              </button>
            </div>

            <p className="text-white/50 text-xs mb-8">✓ 7-day free trial · ✓ Setup in 5 minutes · ✓ Cancel anytime</p>

            <div className="flex flex-wrap gap-2">
              {["GDPR Compliant", "ISO 27001", "SOC 2 Type II", "HIPAA Ready"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Check className="w-3 h-3 text-green-400" strokeWidth={3} /> {b}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="hidden lg:block">
            <SurveyBuilderMockup />
          </motion.div>
        </div>
      </section>

      {/* ════════ TRUSTED BY ════════ */}
      <section className="bg-white py-12 border-b border-gray-100">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by 500+ Research Teams Worldwide</p>
        <div className="overflow-hidden relative">
          <div className="flex gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap px-8">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="text-xl font-black text-gray-300 hover:text-gray-500 transition-colors cursor-pointer shrink-0">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section ref={statsRef} className="bg-white border-y border-gray-100">
        <div className="max-w-[1536px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className={`py-10 text-center px-6 ${i < stats.length - 1 ? "border-r border-gray-100" : ""}`}
            >
              <p className="text-4xl font-black text-accent mb-2 tracking-tight">
                <CountUp end={parseFloat(s.value)} />{s.suffix}
              </p>
              <p className="text-sm text-gray-500 font-medium tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ THE PROBLEM ════════ */}
      <section className="bg-section py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Traditional surveys are{" "}
              <span className="italic font-normal text-primary">holding you back</span>
            </h2>
            <p className="text-base leading-8 font-medium text-gray-900 max-w-xl mx-auto">
              Low response rates, slow results, and complex tools shouldn&apos;t be the norm. Scrip8 was built to fix all three — from the ground up.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(26,111,232,0.10)", borderColor: "rgba(26,111,232,0.4)" }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 cursor-pointer relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(26,111,232,0.07) 0%, rgba(221,228,240,0.10) 45%, rgba(255,255,255,0) 75%)" }} />

                {/* Icon — red by default, accent blue on hover */}
                <div className="relative w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-highlight transition-colors duration-300">
                  <span className="text-red-500 group-hover:text-accent transition-colors duration-300">
                    {p.icon}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-base leading-8 font-medium text-gray-900 mb-5">{p.desc}</p>

                {/* Divider + fix */}
                <div className="border-t border-gray-200 pt-4 flex items-start gap-2 text-accent text-sm font-semibold">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.5} />
                  {p.fix}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FEATURE STEPS ════════ */}
      {featureSteps.map((step, i) => (
        <section key={i} className={`${step.bg} py-20`}>
          <div className="max-w-[1536px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Mockup — always first in DOM (shows first on mobile), reordered on desktop for non-flip */}
              <motion.div {...fadeUp(0.15)} className={`pb-10 ${step.flip ? "" : "lg:order-last"}`}>
                {step.mockup}
              </motion.div>

              {/* Text — always second in DOM, reordered to first column on desktop for non-flip */}
              <motion.div {...fadeUp(0)} className={step.flip ? "" : "lg:order-first"}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full bg-accent text-white text-xs font-black flex items-center justify-center">{step.num}</span>
                  <span className="text-accent text-xs font-bold uppercase tracking-widest">{step.label}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">{step.title}</h2>
                <p className="text-base leading-8 font-medium text-gray-900 mb-6">{step.desc}</p>
                <ul className="space-y-3 mb-8">
                  {step.checks.map((c, j) => (
                    <li key={j} className="flex items-center gap-3 text-base font-medium text-gray-900">
                      <span className="w-6 h-6 rounded-md bg-highlight flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
                <Link href="/contact-us" className="text-accent font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
                  {step.cta} →
                </Link>
              </motion.div>

            </div>
          </div>
        </section>
      ))}

      {/* ════════ AI INTELLIGENCE ════════ */}
      <section className="bg-primary py-24 relative overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Powered by AI</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Intelligence built into every step</h2>
            <p className="text-white/70 text-base max-w-xl mx-auto leading-8 font-medium">
              Scrip8&apos;s AI layer doesn&apos;t just analyse data — it helps you design better surveys, predict drop-off, and surface insights you&apos;d otherwise miss entirely.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiFeatures.map((f, i) => (
              <motion.div key={i} {...fadeUp(0.1 * i)} whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.18)" }} transition={{ duration: 0.3 }} className="group bg-white/5 border border-white/10 rounded-2xl p-8 cursor-pointer relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(26,111,232,0.06) 40%, rgba(0,0,0,0) 70%)" }} />
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-white/70 text-base leading-8 font-medium mb-5">{f.desc}</p>
                <span className="inline-flex items-center gap-1.5 border border-green-500/60 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  {f.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ EVERYTHING INCLUDED ════════ */}
      <section className="bg-section py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Everything Included</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Mastering responses at{" "}
              <span className="italic font-normal text-primary">every scale</span>
            </h2>
            <p className="text-base leading-8 font-medium text-gray-900 max-w-xl mx-auto">
              Mere minutes to create your survey. Seconds to collect responses. Instant AI analysis. Here&apos;s what makes Scrip8 the platform teams keep choosing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
                title: "Quick Response Capture",
                desc: "Design quick, versatile surveys with emotions and Likert scales. Add skip logic, sections, and page breaks for smooth traversal. Share in one click and track responses live.",
                highlight: false,
              },
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round"/></svg>,
                title: "Mobile-First Design",
                desc: "Every survey is optimized for phones and tablets automatically. Your respondents can answer from any device, any time — without pinching, zooming, or frustration.",
                highlight: true,
              },
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
                title: "24 × 7 Expert Support",
                desc: "Get help from Scrip8's design and research experts anytime. Whether it's survey logic, methodology advice, or report interpretation — we're available round the clock.",
                highlight: false,
              },
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                title: "Full Brand Personalization",
                desc: "Apply your logo, brand colors, custom fonts, and domain to every survey. White-label the entire respondent experience — from invite email to thank-you page.",
                highlight: false,
              },
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: "Enterprise-Grade Security",
                desc: "GDPR, HIPAA, ISO 27001, and SOC 2 Type II compliant. All data is encrypted in transit and at rest. Role-based access, SSO, and audit logs for enterprise teams.",
                highlight: true,
              },
              {
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
                title: "Shareable Visual Reports",
                desc: "Generate branded reports as PDF, Excel, or interactive dashboards. Share a live link with stakeholders so they can filter and explore data — no login required.",
                highlight: false,
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(13,27,62,0.10)", borderColor: "rgba(13,27,62,0.15)" }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl p-7 relative overflow-hidden cursor-pointer bg-white shadow-sm border border-gray-100"
              >
                {/* Top border — animates left to right on hover */}
                <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full bg-accent transition-all duration-500 ease-out rounded-t-2xl" />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-blue-50 group-hover:bg-accent transition-colors duration-300">
                  <span className="text-accent group-hover:text-white transition-colors duration-300">
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-primary font-bold text-base mb-3">{f.title}</h3>
                <p className="text-base leading-8 font-medium text-gray-900">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CUSTOMER STORIES ════════ */}
      <section className="bg-white py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Customer Stories</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Real results from{" "}
                <span className="italic font-normal text-primary">real research teams</span>
              </h2>
            </div>
            <Link href="/case-studies" className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              View all case studies →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "FMCG · Product Research",
                watermark: "FMCG",
                company: "Hindustan Consumer Brands",
                context: "Needed faster consumer feedback loops for new product launches across 12 Indian cities",
                stats: [{ val: "42%", label: "Higher response rate vs. prior tool" }, { val: "3×", label: "Faster insight delivery" }],
                quote: '"Scrip8 let us go from brief to field in 4 hours instead of 4 days. The AI summary alone saved our team 12 hours per project."',
              },
              {
                tag: "Healthcare · Patient Experience",
                watermark: "HEALTH",
                company: "MedReach Diagnostics",
                context: "Tracking patient satisfaction across 40 clinic locations with inconsistent data collection methods",
                stats: [{ val: "89%", label: "Survey completion rate" }, { val: "67%", label: "Improvement in data quality" }],
                quote: '"We standardized feedback collection across 40 locations in a single week using Scrip8\'s templates. The compliance features gave our legal team full confidence."',
              },
              {
                tag: "SaaS · Product-Market Fit",
                watermark: "TECH",
                company: "Velo Technologies",
                context: "Early-stage startup needed fast, affordable PMF research without a dedicated research team",
                stats: [{ val: "50%", label: "Lower research cost vs. agency" }, { val: "8 hrs", label: "From survey to final report" }],
                quote: '"We ran 6 rounds of user research in 3 months entirely on Scrip8 — it would have cost us 5× more with an agency and taken 3× as long."',
              },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(0.1 * i)} whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(13,27,62,0.12)" }} transition={{ duration: 0.25 }} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col cursor-pointer">
                {/* Dark top with watermark */}
                <div className="bg-primary p-6 relative overflow-hidden">
                  {/* Watermark — bottom-right */}
                  <span className="absolute -bottom-3 -right-2 text-[56px] font-black text-white/[0.06] select-none leading-none pointer-events-none uppercase tracking-tight">
                    {s.watermark}
                  </span>
                  <span className="inline-block bg-white/15 text-white/90 text-[10px] font-semibold px-3 py-1.5 rounded-full mb-4">{s.tag}</span>
                  <h3 className="text-white font-black text-lg mb-2">{s.company}</h3>
                  <p className="text-white/60 text-sm leading-6">{s.context}</p>
                </div>
                {/* Light bottom */}
                <div className="bg-white p-6 flex flex-col flex-1">
                  {/* Stats row — centered with vertical divider */}
                  <div className="flex mb-6">
                    {s.stats.map((st, j) => (
                      <div key={j} className={`flex-1 flex flex-col items-center justify-center py-2 px-3 text-center ${j < s.stats.length - 1 ? "border-r border-gray-200" : ""}`}>
                        <p className="text-2xl font-black text-accent leading-none mb-1">{st.val}</p>
                        <p className="text-[11px] text-gray-400 leading-snug">{st.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-900 text-base italic leading-8 font-medium flex-1 mb-5">{s.quote}</p>
                  <Link href="/case-studies" className="text-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Read case study →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ COMPLIANCE STRIP ════════ */}
      <section className="bg-section py-8 border-y border-gray-100">
        <div className="max-w-[1536px] mx-auto px-6 flex flex-wrap items-center justify-center gap-4">
          <span className="text-gray-500 text-sm font-semibold mr-2">Certified &amp; Compliant:</span>
          {["GDPR", "ISO 27001", "SOC 2 Type II", "HIPAA Ready", "CCPA Compliant"].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 1l5 2.5V8c0 3.5-5 6-5 6S3 11.5 3 8V3.5L8 1z"/><polyline points="5 8 7 10 11 6"/></svg>
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ════════ PRICING ════════ */}
      <PricingSection />



      {/* ════════ FINAL CTA ════════ */}
      <CtaSection />

      <NewsletterSubscribe />

    </main>
  );
}

/* ── Final CTA ── */
function CtaSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden py-28" style={{ background: "linear-gradient(135deg, #0d1b3e 0%, #0f2d5e 50%, #0d3b6e 100%)" }}>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(30,80,160,0.35) 0%, transparent 70%)" }} />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-8">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-yellow-400" fill="currentColor"><path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z"/></svg>
          Start in under 5 minutes
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
          Start building surveys that<br />
          <span className="text-white/70">actually get answered.</span>
        </h2>

        <p className="text-white/60 text-base leading-8 mb-10 max-w-lg mx-auto">
          Join 500+ brands using Scrip8 to uncover the insights that drive real decisions. Your first 7 days are completely free.
        </p>

        {/* Email input */}
        <div className="flex items-center bg-white/10 border border-white/20 rounded-xl overflow-hidden max-w-xl mx-auto mb-4 backdrop-blur-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email address"
            className="flex-1 bg-transparent text-white placeholder-white/40 px-5 py-4 text-sm outline-none"
          />
          <button className="bg-primary hover:bg-primary-hover text-white font-bold text-sm px-7 py-4 transition-colors duration-200 whitespace-nowrap">
            Start Free Trial →
          </button>
        </div>

        <p className="text-white/40 text-xs mb-8">✓ No credit card · ✓ 7-day full access · ✓ Cancel anytime</p>

        <div className="flex items-center gap-4 max-w-xs mx-auto mb-8">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/40 text-xs">or</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        <button className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300">
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><polygon points="4 3 13 8 4 13"/></svg>
          Book a personalised demo with our team
        </button>
      </div>
    </section>
  );
}

/* ── Pricing toggle (needs useState, extracted to avoid hooks-in-loop) ── */
function PricingSection() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "BASIC",
      monthly: 6,
      desc: "For individuals and small teams just getting started with surveys.",
      features: ["Create unlimited surveys", "Up to 20 questions per survey", "100 responses / month", "Email distribution", "Basic analytics dashboard"],
      cta: "Start for free",
      highlight: false,
    },
    {
      name: "STANDARD",
      monthly: 14,
      desc: "For growing teams needing advanced logic, branding and analytics.",
      features: ["Everything in Basic", "Up to 50 questions per survey", "Unlimited responses", "Skip logic & branching", "AI summary reports", "Brand themes & white-label"],
      cta: "Start free trial",
      highlight: true,
    },
    {
      name: "PREMIUM",
      monthly: 29,
      desc: "For enterprises needing unlimited scale, AI features, and API access.",
      features: ["Everything in Standard", "Unlimited questions per survey", "AI survey generator & analysis", "API & webhook access", "SSO & role-based access", "Dedicated account manager"],
      cta: "Contact sales",
      highlight: false,
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1536px] mx-auto px-6">
        <motion.div {...fadeUp()} className="text-center mb-10">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Simple, transparent{" "}
            <span className="italic font-normal text-primary">pricing</span>
          </h2>
          <p className="text-base leading-8 font-medium text-gray-900 max-w-md mx-auto">
            Start free. Scale when you&apos;re ready. No hidden fees, no surprise overages.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-semibold ${!annual ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? "bg-primary" : "bg-primary"}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${annual ? "translate-x-6" : "translate-x-0"}`} />
          </button>
          <span className={`text-sm font-semibold ${annual ? "text-gray-900" : "text-gray-400"}`}>Annual</span>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Save 30%</span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const price = annual ? Math.round(plan.monthly * 0.7) : plan.monthly;
            return (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                whileHover={{ y: -8, boxShadow: plan.highlight ? "0 24px 50px rgba(13,27,62,0.35)" : "0 20px 40px rgba(13,27,62,0.12)" }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl cursor-pointer ${plan.highlight ? "bg-primary shadow-2xl" : "bg-white border border-gray-200 shadow-sm"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="text-white text-xs font-bold px-6 py-2 rounded-full block whitespace-nowrap shadow-lg" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1a6fe8 60%, #1558c0 100%)" }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`p-8 ${plan.highlight ? "pt-12" : "pt-8"}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.name}</p>
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-lg font-bold ${plan.highlight ? "text-white/80" : "text-gray-500"}`}>$</span>
                    <span className={`text-5xl font-black leading-none ${plan.highlight ? "text-white" : "text-gray-900"}`}>{price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>/month</span>
                  </div>
                  <p className={`leading-8 mb-6 pb-6 border-b ${plan.highlight ? "text-sm text-white/60 border-white/10" : "text-base font-medium text-gray-900 border-gray-100"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2.5 ${plan.highlight ? "text-sm text-white/80" : "text-base font-medium text-gray-900"}`}>
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-white/70" : "text-primary"}`} strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact-us"
                    className={`block text-center font-bold text-sm py-3.5 rounded-xl transition-all duration-300 ${plan.highlight ? "bg-white text-primary hover:bg-gray-100" : "bg-primary text-white hover:bg-primary-hover"}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
