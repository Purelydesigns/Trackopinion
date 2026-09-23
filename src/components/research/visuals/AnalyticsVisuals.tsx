"use client";

import { motion } from "framer-motion";

/**
 * Page-specific artwork for /solutions/research-services/analytics.
 *
 * The shared radar and floating stat cards say nothing about analytics in
 * particular — these two say what the page is actually about: the reports the
 * service produces, and the pipeline that produces them.
 */

const NAVY = "#0d1b3e";
const BLUE = "#3a5d92";

/* ═══════════════ 1. Report mock-up ═══════════════ */

const bars = [
  { label: "Q1", value: 0.52 },
  { label: "Q2", value: 0.68 },
  { label: "Q3", value: 0.81 },
  { label: "Q4", value: 0.95 },
];

const spark = [28, 34, 30, 42, 39, 52, 48, 61, 58, 70, 74, 82];

/** Donut arc for a value between 0 and 1, drawn clockwise from 12 o'clock. */
function donutArc(value: number, r: number, cx: number, cy: number) {
  const end = value * 2 * Math.PI - Math.PI / 2;
  const x = cx + r * Math.cos(end);
  const y = cy + r * Math.sin(end);
  return `M ${cx} ${cy - r} A ${r} ${r} 0 ${value > 0.5 ? 1 : 0} 1 ${x} ${y}`;
}

export function AnalyticsDashboard() {
  const sparkPts = spark
    .map((v, i) => `${20 + (i * 200) / (spark.length - 1)},${70 - (v / 100) * 46}`)
    .join(" ");

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-lg">
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Wave 4 · Reporting
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {[
          { k: "Completes", v: "4,812" },
          { k: "Clean rate", v: "96%" },
          { k: "Fielding", v: "9 days" },
        ].map((t) => (
          <div key={t.k} className="rounded-xl bg-gray-50 px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t.k}</p>
            <p className="text-base font-black text-primary tabular-nums">{t.v}</p>
          </div>
        ))}
      </div>

      {/* Bars + donut */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-3 mb-4">
        <div className="rounded-xl border border-gray-100 p-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-3">
            Awareness by quarter
          </p>
          {/* Bars and labels are separate rows so each bar's percentage height
              resolves against a parent that actually has one. Drawn statically:
              a nested scaleY reveal did not reliably fire its in-view trigger
              inside this card, leaving the bars invisible. The card as a whole
              still animates in. */}
          <div className="h-20 flex items-end justify-between gap-2">
            {bars.map((b, i) => (
              <div
                key={b.label}
                className="flex-1 rounded-t"
                style={{
                  height: `${b.value * 100}%`,
                  background: i === bars.length - 1 ? NAVY : "#c7d6ea",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between gap-2 mt-1.5">
            {bars.map((b) => (
              <span key={b.label} className="flex-1 text-center text-[8px] font-semibold text-gray-400">
                {b.label}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 p-3 flex flex-col items-center justify-center">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-2 self-start">
            NPS split
          </p>
          <svg viewBox="0 0 80 80" className="w-20 h-20" role="img" aria-label="NPS split, 72 percent promoters">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#eef2f7" strokeWidth="10" />
            <path
              d={donutArc(0.72, 30, 40, 40)}
              fill="none"
              stroke={BLUE}
              strokeWidth="10"
              strokeLinecap="round"
            />
            <text
              x="40" y="44" textAnchor="middle"
              fontSize="15" fontWeight="800" fill={NAVY}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              72
            </text>
          </svg>
        </div>
      </div>

      {/* Trend line */}
      <div className="rounded-xl border border-gray-100 p-3">
        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          Consideration trend
        </p>
        <svg viewBox="0 0 240 80" className="w-full h-14" role="img" aria-label="Consideration trending upward">
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity="0.22" />
              <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`20,74 ${sparkPts} 220,74`} fill="url(#trendFill)" />
          <polyline
            points={sparkPts}
            fill="none"
            stroke={BLUE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="220" cy={70 - (spark[spark.length - 1] / 100) * 46} r="4" fill={NAVY} stroke="#fff" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════ 2. Pipeline ═══════════════ */

const stages = [
  { step: "01", name: "Collect", tools: ["Scrip8", "Decipher", "SurveyMonkey"] },
  { step: "02", name: "Process", tools: ["SAS", "SPSS", "Quantum", "Pandas"] },
  { step: "03", name: "Report", tools: ["Tableau", "Power BI", "Excel"] },
];

export function AnalyticsPipeline() {
  return (
    <div className="w-full flex flex-col gap-3">
      {stages.map((stage, i) => (
        <motion.div
          key={stage.name}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.45 }}
          className="relative rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
        >
          {/* Connector down to the next stage */}
          {i < stages.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[38px] top-full h-3 w-px bg-gray-200"
            />
          )}

          <div className="flex items-center gap-4">
            <span
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black text-white"
              style={{ background: i === stages.length - 1 ? BLUE : NAVY }}
            >
              {stage.step}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900">{stage.name}</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {stage.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
