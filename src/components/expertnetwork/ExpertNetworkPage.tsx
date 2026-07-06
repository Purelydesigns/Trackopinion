"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, Users, Building2, Globe, ShieldCheck, Clock, Star, TrendingUp, Award } from "lucide-react";

/* ── Helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

function FieldError({ msg }: { msg: string }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

type FormFields = {
  name: string; company: string; location: string; email: string;
  jobTitle: string; projectType: string; description: string;
};
type FormErrors = Partial<Record<keyof FormFields, string>>;

/* ── Data ── */
const regions = [
  {
    name: "Americas",
    desc: "From Fortune 500 executives to frontier market specialists",
    emoji: "🌎",
    items: ["United States & Canada", "Brazil & LATAM markets", "Emerging economies across the region"],
  },
  {
    name: "Europe / EMEA",
    desc: "From established financial hubs to high-growth frontier markets",
    emoji: "🌍",
    items: ["UK, Germany, France & Nordics", "Gulf states & wider Middle East", "Sub-Saharan Africa & North Africa"],
  },
  {
    name: "Asia Pacific",
    desc: "Unmatched access across the world's fastest-growing region",
    emoji: "🌏",
    items: ["India, China & Japan", "Southeast Asia (ASEAN markets)", "Australia, New Zealand & Pacific"],
  },
];

const clientFeatures = [
  "Enhanced research through real-world practitioner evidence",
  "Bespoke matching of pre-screened specialists within hours",
  "Rigorous compliance and user validation protocols",
  "Flexible engagement formats: phone, video, written surveys",
  "Rapid turnaround — first expert match typically within 4 hours",
];

const expertFeatures = [
  "Real-world impact through structured advisory engagements",
  "Global reach — connect with firms across all industries",
  "Self-determined compensation rates, paid promptly",
  "Flexible scheduling — engage when it suits you",
  "Full confidentiality and compliance safeguards",
];

const stats = [
  { value: "< 4 hrs", label: "Average Response Time" },
  { value: "96%", label: "Client Satisfaction Score" },
  { value: "88%", label: "Repeat Client Rate" },
  { value: "50K+", label: "Engagements Delivered" },
];

const sectors = [
  { name: "Healthcare & Life Sciences", pct: 82 },
  { name: "Technology & Software", pct: 76 },
  { name: "Financial Services", pct: 71 },
  { name: "Consumer Goods", pct: 58 },
  { name: "Energy & Utilities", pct: 52 },
  { name: "Manufacturing & Industrial", pct: 44 },
];

const capabilities = [
  {
    title: "Expert Matching Engine",
    desc: "Our proprietary algorithm screens 150K+ profiles against your brief — delivering pre-qualified candidates within hours, not days.",
    icon: <Users className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Global Network Access",
    desc: "5,500+ subsectors covered across 60+ countries. From Silicon Valley CTOs to frontier-market regulators — whoever you need, we find them.",
    icon: <Globe className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Compliance & Vetting",
    desc: "Every expert goes through rigorous background checks, NDA protocols, and conflict-of-interest reviews before any engagement begins.",
    icon: <ShieldCheck className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Speed of Delivery",
    desc: "First match in under 4 hours. Full project scoping and kickoff within 24h. We run on your timeline, not ours.",
    icon: <Clock className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Quality Assurance",
    desc: "96% client satisfaction backed by post-engagement reviews, call recordings, and structured quality scorecards on every project.",
    icon: <Star className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Engagement Formats",
    desc: "Phone interviews, video calls, written surveys, and bespoke advisory panels — designed around what your research actually needs.",
    icon: <Award className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
];

const ticker = [
  "50K+ Engagements Delivered",
  "60+ Countries",
  "Healthcare · Technology · Finance",
  "5,500+ Subsectors",
  "Pre-screened Executive Experts",
  "First Match in Under 4 Hours",
  "96% Client Satisfaction",
  "Rigorous Compliance Framework",
];

/* ── Line chart points (growth trend) ── */
const chartPoints = [
  { year: "2018", val: 8 },
  { year: "2019", val: 18 },
  { year: "2020", val: 32 },
  { year: "2021", val: 55 },
  { year: "2022", val: 80 },
  { year: "2023", val: 115 },
  { year: "2024", val: 150 },
];

function getChartPts(w: number, h: number) {
  const maxVal = 150;
  const chartH = h - 45;
  return chartPoints.map((p, i) => ({
    x: 40 + (i / (chartPoints.length - 1)) * (w - 60),
    y: h - 30 - (p.val / maxVal) * chartH,
  }));
}

function smoothCurvePath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 5;
    const cp1y = p1.y + (p2.y - p0.y) / 5;
    const cp2x = p2.x - (p3.x - p1.x) / 5;
    const cp2y = p2.y - (p3.y - p1.y) / 5;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/* ── Main Component ── */
export default function ExpertNetworkPage() {
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState<FormFields>({
    name: "", company: "", location: "", email: "",
    jobTitle: "", projectType: "", description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function set(field: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!fields.name.trim())    e.name    = "Your name is required.";
    if (!fields.company.trim()) e.company = "Company name is required.";
    if (!fields.email.trim())   e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const inputClass = (field?: keyof FormErrors) =>
    `w-full rounded-xl ${field && errors[field] ? "border-red-400" : "border-white/10"} border bg-white/8 px-4 py-3 text-sm placeholder:text-white/30 outline-none focus:border-accent transition-colors text-white`;

  return (
    <main className="bg-white">

      {/* ════════ HERO ════════ */}
      <section className="-mt-[76px] pt-[76px] relative overflow-hidden min-h-[600px] flex items-center">
        <video src="/video/banner.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,62,0.95) 0%, rgba(26,47,94,0.80) 20%, rgba(26,82,118,0.55) 40%, rgba(174,214,241,0.25) 70%, rgba(255,255,255,0.05) 100%)" }} />
        <div className="relative w-full max-w-[1536px] mx-auto px-6 pt-16 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                Expert Network · 5,500+ Subsectors
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              Expert Network<br />
              <span className="italic font-normal text-highlight">Services</span>
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-8 mb-10 max-w-xl">
              Connecting leading organisations with pre-screened, executive-level experts across 5,500+ subsectors worldwide. Accelerate your research with real-world intelligence — on demand.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-accent text-white font-bold px-7 py-3.5 rounded-lg text-sm flex items-center gap-2 shadow-lg"
              >
                Connect With an Expert →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/30 text-white font-semibold px-7 py-3.5 rounded-lg text-sm hover:bg-white/10 transition-colors duration-200"
              >
                Join the Network
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ TICKER ════════ */}
      <div className="bg-primary border-b border-white/10 overflow-hidden py-3">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-widest mx-6">
              <span className="text-accent">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ════════ GLOBAL COVERAGE ════════ */}
      <section className="py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-accent block" />
              <p className="text-accent text-xs font-bold uppercase tracking-widest">Global Coverage</p>
              <span className="h-px w-8 bg-accent block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4">
              Go Deeper with{" "}
              <span className="italic font-normal">Global Expert<br />Insights</span>
            </h2>
            <p className="text-gray-900 text-base max-w-xl mx-auto leading-8 font-medium">
              Our expert network spans every major market, giving you access to the precise specialist knowledge you need — wherever it resides.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((r, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(13,27,62,0.20)" }}
                className="rounded-2xl overflow-hidden cursor-pointer border border-gray-200"
              >
                {/* Dark top */}
                <div className="px-6 pt-7 pb-10" style={{ background: "linear-gradient(160deg, #1e4080 0%, #163270 40%, #0f2558 100%)" }}>
                  <div className="mb-6 text-5xl leading-none">
                    {r.emoji}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{r.name}</h3>
                  <p className="text-white/60 text-md leading-6">{r.desc}</p>
                </div>
                {/* White bottom */}
                <div className="bg-white px-6 py-6">
                  <ul className="space-y-4">
                    {r.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(26,111,232,0.12)" }}>
                          <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHO WE SERVE ════════ */}
      <section className="bg-section py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-accent block" />
              <p className="text-accent text-xs font-bold uppercase tracking-widest">Who We Serve</p>
              <span className="h-px w-8 bg-accent block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4">
              Our Platform Is Built Around<br />
              <span className="italic font-normal">Your Goals</span>
            </h2>
            <p className="text-gray-900 text-base max-w-2xl mx-auto leading-8 font-medium">
              Whether conducting primary research, validating a thesis, or sourcing regulatory intelligence, Track Opinion delivers the exact expertise you need — fast.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Clients */}
            <motion.div
              {...fadeUp(0.1)}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(13,27,62,0.08)" }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-8 cursor-pointer relative overflow-hidden"
            >
              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-accent transition-all duration-500 ease-out rounded-b-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-primary font-bold text-xl mb-3">For Clients</h3>
              <p className="text-gray-900 text-base leading-8 font-medium mb-6">
                Access the precise executive-level expertise your organisation needs to make faster, better-informed decisions.
              </p>
              <ul className="space-y-3 mb-8">
                {clientFeatures.map((f, i) => (
                  <li key={i} className="group/item flex items-center gap-3 bg-section hover:bg-highlight rounded-xl px-4 py-3 text-sm text-gray-700 font-medium transition-colors duration-200 cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-primary group-hover/item:bg-accent shrink-0 transition-colors duration-200" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02, background: "linear-gradient(135deg, #3b82f6 0%, #1a6fe8 60%, #1558c0 100%)", boxShadow: "0 8px 24px rgba(26,111,232,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #0d2147 0%, #0d1b3e 100%)" }}
              >
                Request an Expert →
              </motion.button>
            </motion.div>

            {/* For Experts */}
            <motion.div
              {...fadeUp(0.2)}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(13,27,62,0.08)" }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-8 cursor-pointer relative overflow-hidden"
            >
              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-accent transition-all duration-500 ease-out rounded-b-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-primary font-bold text-xl mb-3">For Experts</h3>
              <p className="text-gray-900 text-base leading-8 font-medium mb-6">
                Share your knowledge, shape important decisions, and earn competitive compensation on your own schedule.
              </p>
              <ul className="space-y-3 mb-8">
                {expertFeatures.map((f, i) => (
                  <li key={i} className="group/item flex items-center gap-3 bg-section hover:bg-highlight rounded-xl px-4 py-3 text-sm text-gray-700 font-medium transition-colors duration-200 cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-primary group-hover/item:bg-accent shrink-0 transition-colors duration-200" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02, background: "linear-gradient(135deg, #3b82f6 0%, #1a6fe8 60%, #1558c0 100%)", boxShadow: "0 8px 24px rgba(26,111,232,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #0d2147 0%, #0d1b3e 100%)" }}
              >
                Join the Network →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ NETWORK AT A GLANCE ════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #0a1530 0%, #0d2147 50%, #091228 100%)" }}>
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(26,111,232,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(26,111,232,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-accent block" />
              <p className="text-accent text-xs font-bold uppercase tracking-widest">Our Scale</p>
              <span className="h-px w-8 bg-accent block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Network at a{" "}
              <span className="italic font-normal text-highlight">Glance</span>
            </h2>
            <p className="text-white/60 text-base max-w-xl mx-auto leading-8 font-medium">
              Real-time performance metrics from our global expert network.
            </p>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { value: "< 4 hrs", label: "Average Response Time", trend: "↑ 18% faster YoY", icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
              { value: "96%", label: "Client Satisfaction Score", trend: "↑ 4pts vs last year", icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
              { value: "88%", label: "Repeat Client Rate", trend: "↑ 6pts vs last year", icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
              { value: "50K+", label: "Engagements Delivered", trend: "Across 60+ countries", icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
            ].map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(26,111,232,0.15)", borderColor: "rgba(26,111,232,0.5)" }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 cursor-pointer relative overflow-hidden group"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-accent transition-all duration-500 ease-out rounded-t-2xl" />
                {/* Icon top-right */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                    {s.icon}
                  </div>
                  <span className="text-green-400 text-[10px] font-bold bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">{s.trend}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-accent mb-1">{s.value}</p>
                <p className="text-white/50 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts 2x2 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Growth Trend ── */}
            <motion.div {...fadeUp(0.1)} whileHover={{ borderColor: "rgba(26,111,232,0.35)", boxShadow: "0 0 40px rgba(26,111,232,0.08)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,111,232,0.06) 0%, transparent 70%)" }} />
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Growth Trend</p>
              <h3 className="text-white font-bold text-base mb-1">Expert Network Growth</h3>
              <p className="text-white/40 text-xs mb-5">Cumulative expert profiles — 2018 to 2024</p>
              <svg viewBox="0 0 500 220" className="w-full">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a6fe8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#1a6fe8" stopOpacity="0.02" />
                  </linearGradient>
                  <clipPath id="chartClip">
                    <motion.rect
                      x="38" y="0" height="185" width="0"
                      initial={{ width: 0 }}
                      whileInView={{ width: 460 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    />
                  </clipPath>
                </defs>
                {/* Grid lines + Y labels */}
                {[0, 30, 60, 90, 120, 150].map((v, i) => {
                  const yPos = 175 - (v / 150) * 140;
                  return (
                    <g key={i}>
                      <line x1="40" y1={yPos} x2="490" y2={yPos} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <text x="32" y={yPos + 4} fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="end">{v === 0 ? "0K" : `${v}K`}</text>
                    </g>
                  );
                })}
                {/* X-axis labels */}
                {getChartPts(500, 185).map((pt, i) => (
                  <text key={i} x={pt.x} y="210" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">{chartPoints[i].year}</text>
                ))}
                {/* Area fill */}
                <g clipPath="url(#chartClip)">
                  <path
                    d={`${smoothCurvePath(getChartPts(500, 185))} L ${getChartPts(500, 185)[chartPoints.length - 1].x},175 L 40,175 Z`}
                    fill="url(#areaGrad)"
                  />
                  {/* Smooth curve line */}
                  <path
                    d={smoothCurvePath(getChartPts(500, 185))}
                    fill="none" stroke="#1a6fe8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </g>
                {/* Dots */}
                {getChartPts(500, 185).map((pt, i) => (
                  <motion.circle
                    key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#1a6fe8" stroke="#0d1b3e" strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.18 }}
                  />
                ))}
              </svg>
            </motion.div>

            {/* ── Sector Distribution ── */}
            <motion.div {...fadeUp(0.15)} whileHover={{ borderColor: "rgba(26,111,232,0.35)", boxShadow: "0 0 40px rgba(26,111,232,0.08)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Sector Distribution</p>
              <h3 className="text-white font-bold text-base mb-1">Experts by Industry Sector</h3>
              <p className="text-white/40 text-xs mb-6">Percentage share across top sectors</p>
              <div className="space-y-3">
                {[...sectors, { name: "Real Estate", pct: 38 }].map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/70 text-xs font-medium">{s.name}</span>
                      <span className="text-white font-bold text-xs">{s.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Expert Members Donut ── */}
            <motion.div {...fadeUp(0.2)} whileHover={{ borderColor: "rgba(26,111,232,0.35)", boxShadow: "0 0 40px rgba(26,111,232,0.08)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Composition</p>
              <h3 className="text-white font-bold text-base mb-1">Expert Members</h3>
              <p className="text-white/40 text-xs mb-6">Distribution by membership category</p>
              <div className="flex items-center gap-10">
                {/* Donut SVG */}
                <div className="relative shrink-0 w-36 h-36">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    {/* Track */}
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
                    {/* Academia 14% — outermost segment */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.14} ${2 * Math.PI * 46}`}
                      strokeDashoffset={`${-2 * Math.PI * 46 * (0.64 + 0.22)}`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.14} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    />
                    {/* Industry Managers 22% */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#3b82f6" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.22} ${2 * Math.PI * 46}`}
                      strokeDashoffset={`${-2 * Math.PI * 46 * 0.64}`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.22} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    />
                    {/* Expert Panels 64% */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#1a6fe8" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.64} ${2 * Math.PI * 46}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.64} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-2xl leading-none">64%</span>
                    <span className="text-white/40 text-[9px] font-semibold uppercase tracking-wide mt-0.5 text-center leading-tight">Expert<br/>Panels</span>
                  </div>
                </div>
                {/* Legend */}
                <div className="space-y-3">
                  {[
                    { label: "Expert Panels", pct: "64%", color: "#1a6fe8" },
                    { label: "Industry Managers", pct: "22%", color: "#3b82f6" },
                    { label: "Academia", pct: "14%", color: "rgba(255,255,255,0.25)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: item.color }} />
                      <span className="text-white/70 text-xs">{item.label}</span>
                      <span className="text-white font-bold text-xs ml-auto pl-4">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Engagements by Region Donut ── */}
            <motion.div {...fadeUp(0.25)} whileHover={{ borderColor: "rgba(26,111,232,0.35)", boxShadow: "0 0 40px rgba(26,111,232,0.08)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Regional Split</p>
              <h3 className="text-white font-bold text-base mb-1">Engagements by Region</h3>
              <p className="text-white/40 text-xs mb-6">% of annual advisory hours</p>
              <div className="flex items-center gap-10">
                {/* Donut SVG */}
                <div className="relative shrink-0 w-36 h-36">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
                    {/* Asia Pacific 27% */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.27} ${2 * Math.PI * 46}`}
                      strokeDashoffset={`${-2 * Math.PI * 46 * (0.38 + 0.35)}`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.27} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    />
                    {/* Americas 35% */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#3b82f6" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.35} ${2 * Math.PI * 46}`}
                      strokeDashoffset={`${-2 * Math.PI * 46 * 0.38}`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.35} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    />
                    {/* Europe/EMEA 38% */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#1a6fe8" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.38} ${2 * Math.PI * 46}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.38} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-2xl leading-none">38%</span>
                    <span className="text-white/40 text-[9px] font-semibold uppercase tracking-wide mt-0.5 text-center leading-tight">Europe<br/>/ EMEA</span>
                  </div>
                </div>
                {/* Legend */}
                <div className="space-y-3">
                  {[
                    { label: "Europe / EMEA", pct: "38%", color: "#1a6fe8" },
                    { label: "Americas", pct: "35%", color: "#3b82f6" },
                    { label: "Asia Pacific", pct: "27%", color: "rgba(255,255,255,0.25)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: item.color }} />
                      <span className="text-white/70 text-xs">{item.label}</span>
                      <span className="text-white font-bold text-xs ml-auto pl-4">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════ PANEL BOOK / TESTIMONIALS ════════ */}
      <section className="bg-section py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-accent block" />
              <p className="text-accent text-xs font-bold uppercase tracking-widest">What They Say</p>
              <span className="h-px w-8 bg-accent block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4">
              Our HCP&apos;s{" "}
              <span className="italic font-normal">Panel Book</span>
            </h2>
            <p className="text-gray-900 text-base max-w-xl mx-auto leading-8 font-medium">
              Hear from the clients and experts who rely on Track Opinion&apos;s Expert Network every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                stars: 5,
                quote: "Track Opinion matched us with a former pharma CMO within three hours of our brief. The insight quality was exceptional and directly influenced our market entry decision.",
                initials: "DS",
                name: "Dr. Sarah M.",
                role: "Head of Strategy, Global Pharma Firm",
              },
              {
                stars: 5,
                quote: "The compliance process gave our team complete confidence. We've run over 40 engagements through Track Opinion and every one has been handled with total professionalism.",
                initials: "JT",
                name: "James T.",
                role: "Senior Analyst, Investment Management",
              },
              {
                stars: 5,
                quote: "As an expert, I appreciate that Track Opinion respects my time, pays promptly, and handles all the compliance paperwork. I can focus purely on sharing my expertise.",
                initials: "PK",
                name: "Priya K.",
                role: "Former CFO, Technology Sector",
              },
              {
                stars: 5,
                quote: "The depth of sector coverage is unmatched. We needed a specialist in Nigerian downstream energy — Track Opinion delivered two qualified candidates within 24 hours.",
                initials: "MA",
                name: "Michael A.",
                role: "Principal, Management Consulting",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(13,27,62,0.08)" }}
                className="bg-white rounded-2xl border border-gray-100 p-8 relative cursor-pointer"
              >
                {/* Large quote watermark */}
                <span className="absolute top-4 right-6 text-7xl font-black text-gray-200 select-none leading-none">&ldquo;</span>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} viewBox="0 0 16 16" className="w-4 h-4 text-yellow-400" fill="currentColor"><path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z" /></svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-900 text-base italic leading-8 font-medium mb-7 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0" style={{ background: "linear-gradient(135deg, #0d2147 0%, #1a6fe8 100%)" }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-primary font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ REGISTER AS AN EXPERT ════════ */}
      <section className="py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* ── LEFT — heading + feature rows ── */}
            <motion.div {...fadeUp(0)}>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-accent block" />
                <p className="text-accent text-xs font-bold uppercase tracking-widest">Join Us</p>
                <span className="h-px w-8 bg-accent block" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-primary leading-[1.1] mb-5">
                Ready to Join? Register as an{" "}
                <span className="italic font-normal">Expert Now.</span>
              </h2>
              <p className="text-gray-500 text-base leading-8 mb-10 max-w-lg">
                Leave your details below and a member of our Expert Relations team will be in touch shortly with next steps.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    title: "Quick Response Time",
                    desc: "Our Expert Relations team responds within 2 business days to complete your onboarding",
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                    title: "Compliance Assured",
                    desc: "Full compliance screening and safeguards managed by our dedicated team",
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
                    title: "Competitive Compensation",
                    desc: "Self-determined rates paid promptly upon engagement completion",
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
                    title: "Global Reach",
                    desc: "Connect with leading organisations across 60+ countries and every major industry",
                  },
                ].map((f, i) => (
                  <motion.div key={i} {...fadeUp(0.08 * i)} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-accent mt-0.5" style={{ background: "rgba(26,111,232,0.10)" }}>
                      {f.icon}
                    </span>
                    <div>
                      <p className="text-primary font-bold text-sm mb-1">{f.title}</p>
                      <p className="text-gray-500 text-xs leading-5">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT — white form card ── */}
            <motion.div {...fadeUp(0.15)} className="lg:sticky lg:top-24 self-start bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
              <h3 className="text-primary font-black text-2xl mb-1">Register as an Expert</h3>
              <p className="text-gray-500 text-sm mb-7">Complete the form — our team will be in touch within 48 hours</p>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle className="w-14 h-14 text-green-500" />
                  <h3 className="text-lg font-bold text-primary">Registration Submitted!</h3>
                  <p className="text-gray-500 text-sm max-w-xs">Our Expert Relations team will reach out within 48 hours to complete your onboarding.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFields({ name: "", company: "", location: "", email: "", jobTitle: "", projectType: "", description: "" }); setCaptcha(false); }}
                    className="cursor-pointer mt-2 px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Full Name" value={fields.name} onChange={(e) => set("name", e.target.value)}
                        className={`w-full rounded-xl border ${errors.name ? "border-red-400" : "border-gray-200"} bg-gray-50 px-4 py-3 text-sm text-primary placeholder:text-gray-400 outline-none focus:border-accent focus:bg-white transition-all`} />
                      <FieldError msg={errors.name ?? ""} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Company Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Current / Most Recent Employer" value={fields.company} onChange={(e) => set("company", e.target.value)}
                        className={`w-full rounded-xl border ${errors.company ? "border-red-400" : "border-gray-200"} bg-gray-50 px-4 py-3 text-sm text-primary placeholder:text-gray-400 outline-none focus:border-accent focus:bg-white transition-all`} />
                      <FieldError msg={errors.company ?? ""} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Designation</label>
                      <input type="text" placeholder="Your Job Title / Role" value={fields.jobTitle} onChange={(e) => set("jobTitle", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-primary placeholder:text-gray-400 outline-none focus:border-accent focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email ID <span className="text-red-500">*</span></label>
                      <input type="email" placeholder="your@email.com" value={fields.email} onChange={(e) => set("email", e.target.value)}
                        className={`w-full rounded-xl border ${errors.email ? "border-red-400" : "border-gray-200"} bg-gray-50 px-4 py-3 text-sm text-primary placeholder:text-gray-400 outline-none focus:border-accent focus:bg-white transition-all`} />
                      <FieldError msg={errors.email ?? ""} />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
                    <div
                      onClick={() => setCaptcha((c) => !c)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${captcha ? "bg-accent border-accent" : "border-gray-300 bg-white"}`}
                    >
                      {captcha && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-gray-500 text-xs leading-5">
                      I&apos;m not a robot and agree to Track Opinion&apos;s{" "}
                      <a href="/terms" className="underline text-primary hover:text-accent transition-colors">Terms</a>
                      {" "}&amp;{" "}
                      <a href="/privacy" className="underline text-primary hover:text-accent transition-colors">Privacy Policy</a>
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(26,111,232,0.35)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1a6fe8 60%, #1558c0 100%)" }}
                  >
                    Submit →
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
