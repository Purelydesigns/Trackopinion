"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Calendar, CheckCircle2, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ListPageHero from "@/components/ui/ListPageHero";

type Audience = "B2B" | "B2C";

interface CaseStudy {
  id: number;
  date: string;
  audience: Audience;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  bg: string;
  bullets: string[];
  stat: string;
  statLabel: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    date: "24.03.2026",
    audience: "B2B",
    tag: "Supply Chain",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI-powered alert generation and resolution platform.",
    image: "🤖",
    bg: "linear-gradient(135deg, #e8eef8 0%, #c8d8f0 100%)",
    bullets: [
      "Reduced manual intervention by 65% across all distribution centers",
      "Real-time visibility enabled across 40+ brewery-to-distribution nodes",
      "Average anomaly resolution time reduced from 8h to under 45 minutes",
    ],
    stat: "65%",
    statLabel: "efficiency\nOperational gain\nachieved",
  },
  {
    id: 2,
    date: "24.03.2026",
    audience: "B2B",
    tag: "Analytics",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI-powered alert generation and resolution platform.",
    image: "📊",
    bg: "linear-gradient(135deg, #f5f0e8 0%, #e8d8b0 100%)",
    bullets: [
      "Real-time dashboards cut reporting cycles from weeks to hours",
      "Predictive models reduced stockouts by 42% across key SKUs",
      "Executive decision speed improved by 3× with live insight feeds",
    ],
    stat: "42%",
    statLabel: "reduction\nStockout rate\ndecreased",
  },
  {
    id: 3,
    date: "24.03.2026",
    audience: "B2C",
    tag: "Consumer Insights",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI-powered alert generation and resolution platform.",
    image: "🎯",
    bg: "linear-gradient(135deg, #e8f5e8 0%, #b8ddb8 100%)",
    bullets: [
      "Consumer sentiment scores improved by 28% post-implementation",
      "Research-backed product changes drove a 19% revenue uplift",
      "NPS increased from 32 to 67 within two product cycles",
    ],
    stat: "28%",
    statLabel: "sentiment\nConsumer score\nimproved",
  },
  {
    id: 4,
    date: "24.03.2026",
    audience: "B2C",
    tag: "Healthcare",
    title: "Agentic AI Enabled Track and Trace Alert Monitoring for Faster Resolution",
    excerpt:
      "A leading global beverage brewing company sought to enhance their logistics reliability and operational efficiency across their supply chain. The goal was to reduce manual intervention, accelerate anomaly resolution, and enable real-time visibility across the brewery-to-distribution center network through an Agentic AI-powered alert generation and resolution platform.",
    image: "🏥",
    bg: "linear-gradient(135deg, #f0e8f5 0%, #d8b8e8 100%)",
    bullets: [
      "Patient satisfaction scores rose 34% following panel-driven changes",
      "Operational inefficiencies cut by 51% across 12 clinics",
      "Staff allocation improved, reducing overtime costs by 22%",
    ],
    stat: "34%",
    statLabel: "satisfaction\nPatient score\nincreased",
  },
];

function FlipCard({ study, divider }: { study: CaseStudy; divider: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      {/* Flip container — fixed height so both faces stay stable */}
      <div
        className="relative cursor-pointer"
        style={{ height: 340, perspective: 1200 }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        {/* ── FRONT ── white row */}
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 flex items-stretch gap-10 px-10"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Left — text */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs text-gray-500 font-medium">{study.date}</span>

              {/* Audience tag — B2B / B2C */}
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                  study.audience === "B2B"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {study.audience}
              </span>

              {/* Category tag */}
              <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
                {study.tag}
              </span>
            </div>
            <h2 className="text-xl font-extrabold leading-tight mb-4 text-primary">{study.title}</h2>
            <p className="text-base leading-7 font-medium text-gray-500 line-clamp-3">{study.excerpt}</p>
          </div>

          {/* Right — illustration */}
          <div
            className="w-[380px] shrink-0 rounded-2xl flex items-center justify-center text-7xl my-6"
            style={{ background: study.bg }}
          >
            {study.image}
          </div>
        </motion.div>

        {/* ── BACK ── dark navy */}
        <motion.div
          animate={{ rotateY: flipped ? 0 : -180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 rounded-none flex items-center gap-10 px-10"
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #0d1b3e 50%, #112254 100%)",
            backfaceVisibility: "hidden",
            transform: "rotateY(-180deg)",
          }}
        >
          {/* Left — content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">Case Study</span>
            </div>

            <h3 className="text-white font-bold text-lg leading-snug">{study.title}</h3>

            <ul className="flex flex-col gap-2">
              {study.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/80 text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <button
              className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-primary bg-white w-fit transition hover:bg-gray-100 group"
            >
              Read Full Case Study
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right — circular stat */}
          <div className="w-[200px] shrink-0 flex flex-col items-center justify-center gap-3">
            <div
              className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-4"
              style={{
                borderColor: "rgba(59,130,246,0.6)",
                background: "rgba(13,27,62,0.8)",
                boxShadow: "0 0 0 6px rgba(59,130,246,0.12)",
              }}
            >
              <span className="text-white font-extrabold text-2xl leading-none">{study.stat}</span>
              <span className="text-blue-300 text-xs font-semibold mt-0.5">
                {study.statLabel.split("\n")[0]}
              </span>
            </div>
            <div className="text-center">
              <p className="text-white/50 text-xs leading-5">
                {study.statLabel.split("\n").slice(1).join(" ")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {divider && <div className="border-t border-gray-200 mx-10" />}
    </>
  );
}

export default function CaseStudiesList() {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState<Audience | "">("");
  const [category, setCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const categories = Array.from(new Set(caseStudies.map((s) => s.tag)));
  const hasActiveFilter = Boolean(query || audience || category);

  const filtered = caseStudies.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) ||
      s.audience.toLowerCase().includes(q);
    const matchAud = !audience || s.audience === audience;
    const matchCat = !category || s.tag === category;
    return matchQ && matchAud && matchCat;
  });

  const clearAll = () => {
    setQuery("");
    setAudience("");
    setCategory("");
  };

  const searchSlot = (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center gap-3 rounded-full px-5 py-2.5 w-64"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Search className="w-4 h-4 text-white/50 shrink-0" />
        <input
          type="text"
          placeholder="Search case studies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none w-full"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-white/50 hover:text-white shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter button + dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowFilter((v) => !v)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition hover:opacity-80"
          style={{
            background:
              audience || category || showFilter ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <SlidersHorizontal className="w-4 h-4 text-white/70" />
        </button>

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-11 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 min-w-[200px] z-50"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Audience
              </p>
              <div className="flex gap-2 px-1 mb-3">
                {(["B2B", "B2C"] as Audience[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(audience === a ? "" : a)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-150 ${
                      audience === a
                        ? "bg-primary text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Category
              </p>
              <button
                onClick={() => {
                  setCategory("");
                  setShowFilter(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  !category ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setShowFilter(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    category === cat ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <main>
      <ListPageHero title="Case Studies" right={searchSlot} />

      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div
            className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10"
            style={{ marginTop: -40 }}
            onClick={() => showFilter && setShowFilter(false)}
          >
            {/* Active filters bar */}
            {hasActiveFilter && (
              <div className="flex items-center gap-3 px-10 pt-6 pb-1 flex-wrap">
                <span className="text-sm text-gray-400">Showing results for:</span>
                {query && (
                  <span className="inline-flex items-center gap-1.5 bg-highlight text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                    &ldquo;{query}&rdquo;
                    <button onClick={() => setQuery("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {audience && (
                  <span className="inline-flex items-center gap-1.5 bg-highlight text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                    {audience}
                    <button onClick={() => setAudience("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1.5 bg-highlight text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                    {category}
                    <button onClick={() => setCategory("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-400 underline hover:text-gray-600"
                >
                  Clear all
                </button>
              </div>
            )}

            <AnimatePresence>
              {filtered.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <FlipCard study={study} divider={i < filtered.length - 1} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-20 text-sm">
                No case studies match your search.{" "}
                <button onClick={clearAll} className="underline hover:text-gray-600">
                  Clear filters
                </button>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
