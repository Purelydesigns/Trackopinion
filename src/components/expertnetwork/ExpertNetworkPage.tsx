"use client";

;
import { motion } from "framer-motion";
import { CheckCircle2, Users, Building2, ArrowRight } from "lucide-react";
import SiteCard from "@/components/ui/SiteCard";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Testimonials from "@/components/Testimonials";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

/* ── Helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── Data ── */
const regions = [
  {
    name: "Americas",
    desc: "From Fortune 500 executives to frontier market specialists",
    items: ["United States & Canada", "Brazil & LATAM markets", "Emerging economies across the region"],
  },
  {
    name: "Europe / EMEA",
    desc: "From established financial hubs to high-growth frontier markets",
    items: ["UK, Germany, France & Nordics", "Gulf states & wider Middle East", "Sub-Saharan Africa & North Africa"],
  },
  {
    name: "Asia Pacific",
    desc: "Unmatched access across the world's fastest-growing region",
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

const audiences = [
  {
    title: "For Clients",
    desc: "Access the precise executive-level expertise your organisation needs to make faster, better-informed decisions.",
    icon: Building2,
    features: clientFeatures,
    cta: { label: "Request an Expert", href: "/contact-us" },
  },
  {
    title: "For Experts",
    desc: "Share your knowledge, shape important decisions, and earn competitive compensation on your own schedule.",
    icon: Users,
    features: expertFeatures,
    cta: { label: "Join the Network", href: "#enquiry" },
  },
];

const sectors = [
  { name: "Healthcare & Life Sciences", pct: 82 },
  { name: "Technology & Software", pct: 76 },
  { name: "Financial Services", pct: 71 },
  { name: "Consumer Goods", pct: 58 },
  { name: "Energy & Utilities", pct: 52 },
  { name: "Manufacturing & Industrial", pct: 44 },
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
  return (
    <main className="bg-white">

      <PageHero
        breadcrumb={[{ name: "Solutions" }, { name: "Expert Network" }]}
        badge="Expert Network · 5,500+ Subsectors"
        heading={
          <>
            Expert Network Services
          </>
        }
        description="Connecting leading organisations with pre-screened, executive-level experts across 5,500+ subsectors worldwide. Accelerate your research with real-world intelligence — on demand."
        primaryCta={{ label: "Connect With an Expert", href: "/contact-us" }}
        secondaryCta={{ label: "Join the Network", href: "#enquiry" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      {/* ════════ GLOBAL COVERAGE ════════ */}
      <section className="py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Global Coverage"
            heading={<>Go Deeper with Global Expert Insights</>}
            description="Our expert network spans every major market, giving you access to the precise specialist knowledge you need — wherever it resides."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((r, i) => (
              <motion.div key={r.name} {...fadeUp(0.1 * i)}>
                <SiteCard className="h-full group">
                  <div className="relative p-8 flex flex-col h-full">

                    {/* Ghost numeral */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-4 right-5 font-black leading-none select-none
                                 text-primary/[0.06] group-hover:text-primary/[0.12] transition-colors duration-300 tabular-nums"
                      style={{ fontSize: 110 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex flex-col flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50 mb-2">
                        Region {String(i + 1).padStart(2, "0")}
                      </p>

                      <h3 className="text-primary font-extrabold text-2xl leading-tight mb-3">
                        {r.name}
                      </h3>

                      <p className="text-gray-600 text-base leading-8 font-medium mb-6">
                        {r.desc}
                      </p>

                      <div className="border-t border-gray-100 pt-5 mt-auto">
                        <ul className="flex flex-col gap-3">
                          {r.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-[15px] text-gray-700 leading-7">
                              <CheckCircle2 className="w-[18px] h-[18px] text-primary shrink-0 mt-1" strokeWidth={2} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </SiteCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHO WE SERVE ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Who We Serve"
            heading={<>Our Platform Is Built Around Your Goals</>}
            description="Whether conducting primary research, validating a thesis, or sourcing regulatory intelligence, Track Opinion delivers the exact expertise you need — fast."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={a.title} {...fadeUp(0.1 * (i + 1))}>
                  <SiteCard className="h-full group">
                    <div className="p-8 flex flex-col h-full">

                      <span className="w-14 h-14 rounded-2xl bg-highlight text-primary flex items-center justify-center mb-6
                                       group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="w-7 h-7" strokeWidth={1.6} />
                      </span>

                      <h3 className="text-primary font-extrabold text-2xl leading-tight mb-3">
                        {a.title}
                      </h3>

                      <p className="text-gray-600 text-base leading-8 font-medium mb-6">
                        {a.desc}
                      </p>

                      <ul className="flex flex-col gap-3 mb-8 border-t border-gray-100 pt-6">
                        {a.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-[15px] text-gray-700 leading-7">
                            <CheckCircle2 className="w-[18px] h-[18px] text-primary shrink-0 mt-1" strokeWidth={2} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto">
                        <Button href={a.cta.href}>
                          {a.cta.label} <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>

                    </div>
                  </SiteCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ NETWORK AT A GLANCE ════════ */}
      <section className="py-24 relative overflow-hidden bg-primary">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />

        <div className="relative site-container px-6">
          <SectionHeader
            label="Our Scale"
            heading={<>Network at a Glance</>}
            description="Real-time performance metrics from our global expert network."
            theme="dark"
            align="center"
          />

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
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.35)" }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 cursor-pointer relative overflow-hidden group"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-white transition-all duration-500 ease-out rounded-t-2xl" />
                {/* Icon top-right */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    {s.icon}
                  </div>
                  <span className="text-green-400 text-[10px] font-bold bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">{s.trend}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-white mb-1">{s.value}</p>
                <p className="text-white/50 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts 2x2 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Growth Trend ── */}
            <motion.div {...fadeUp(0.1)} whileHover={{ borderColor: "rgba(255,255,255,0.28)", boxShadow: "0 0 40px rgba(255,255,255,0.06)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Growth Trend</p>
              <h3 className="text-white font-bold text-base mb-1">Expert Network Growth</h3>
              <p className="text-white/40 text-xs mb-5">Cumulative expert profiles — 2018 to 2024</p>
              <svg viewBox="0 0 500 220" className="w-full">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
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
                    fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </g>
                {/* Dots */}
                {getChartPts(500, 185).map((pt, i) => (
                  <motion.circle
                    key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#ffffff" stroke="#0d1b3e" strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.18 }}
                  />
                ))}
              </svg>
            </motion.div>

            {/* ── Sector Distribution ── */}
            <motion.div {...fadeUp(0.15)} whileHover={{ borderColor: "rgba(255,255,255,0.28)", boxShadow: "0 0 40px rgba(255,255,255,0.06)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7">
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
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Expert Members Donut ── */}
            <motion.div {...fadeUp(0.2)} whileHover={{ borderColor: "rgba(255,255,255,0.28)", boxShadow: "0 0 40px rgba(255,255,255,0.06)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7">
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
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#8ba3c6" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.22} ${2 * Math.PI * 46}`}
                      strokeDashoffset={`${-2 * Math.PI * 46 * 0.64}`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.22} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    />
                    {/* Expert Panels 64% */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#ffffff" strokeWidth="14"
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
                    { label: "Expert Panels", pct: "64%", color: "#ffffff" },
                    { label: "Industry Managers", pct: "22%", color: "#8ba3c6" },
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
            <motion.div {...fadeUp(0.25)} whileHover={{ borderColor: "rgba(255,255,255,0.28)", boxShadow: "0 0 40px rgba(255,255,255,0.06)" }} className="rounded-2xl border border-white/10 bg-white/5 p-7">
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
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#8ba3c6" strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 46 * 0.35} ${2 * Math.PI * 46}`}
                      strokeDashoffset={`${-2 * Math.PI * 46 * 0.38}`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${2 * Math.PI * 46}` }}
                      whileInView={{ strokeDasharray: `${2 * Math.PI * 46 * 0.35} ${2 * Math.PI * 46}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    />
                    {/* Europe/EMEA 38% */}
                    <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#ffffff" strokeWidth="14"
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
                    { label: "Europe / EMEA", pct: "38%", color: "#ffffff" },
                    { label: "Americas", pct: "35%", color: "#8ba3c6" },
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

      <SolutionEnquiryForm />

      {/* ════════ PANEL BOOK / TESTIMONIALS ════════ */}
      <Testimonials 
        label="What They Say"
        heading={<>Our HCP&apos;s Panel Book</>}
        description="Hear from the clients and experts who rely on Track Opinion's Expert Network every day."
        className="!mb-0"
      />

      

    </main>
  );
}
