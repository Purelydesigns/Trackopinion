"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

/* ─────────────── Config ─────────────── */
const EDU_LEVELS = [
  { num: "01", label: "High School Grade",       sub: "Below secondary education" },
  { num: "02", label: "High School / Tertiary",  sub: "Secondary or trade school"  },
  { num: "03", label: "Bachelors Degree",         sub: "Undergraduate degree"       },
  { num: "04", label: "Masters Degree",           sub: "Postgraduate degree"        },
  { num: "05", label: "Doctoral / Professional",  sub: "PhD / professional degree"  },
];

const EDU_COLORS = ["#bfdbfe", "#60a5fa", "#1a6fe8", "#1e40af", "#0d1b3e"];

const eduData: Record<string, number[]> = {
  global:  [8,  22, 42, 22, 6 ],
  india:   [12, 28, 38, 16, 6 ],
  usa:     [5,  18, 45, 24, 8 ],
  uk:      [6,  20, 44, 22, 8 ],
  japan:   [4,  14, 46, 28, 8 ],
  uae:     [8,  20, 42, 22, 8 ],
  brazil:  [18, 32, 34, 12, 4 ],
  germany: [4,  16, 40, 30, 10],
};

/* ─────────────── Donut ─────────────── */
const R   = 70;
const CX  = 110;
const CY  = 110;
const C   = 2 * Math.PI * R;
const GAP = 3;

function DonutChart({
  pcts, hoveredIdx, onHover, marketKey,
}: {
  pcts: number[]; hoveredIdx: number | null; onHover: (i: number | null) => void; marketKey: string;
}) {
  const defaultIdx = pcts.indexOf(Math.max(...pcts));
  const activeIdx  = hoveredIdx ?? defaultIdx;

  /* build segments */
  const segments: { segLen: number; offset: number }[] = [];
  let cum = 0;
  pcts.forEach((pct) => {
    const segLen = (pct / 100) * C;
    segments.push({ segLen, offset: cum });
    cum += segLen;
  });

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 220 220" className="w-60 h-60 -rotate-90 drop-shadow-sm">
        {/* track ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e5e7eb" strokeWidth="16" />

        {pcts.map((pct, i) => {
          const { segLen, offset } = segments[i];
          const isActive = i === activeIdx;

          return (
            <motion.circle
              key={`${marketKey}-${i}`}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={EDU_COLORS[i]}
              strokeWidth="16"
              strokeLinecap="round"
              style={{ cursor: "pointer" }}
              initial={{ strokeDasharray: `0 ${C}`, strokeDashoffset: -offset, opacity: 0 }}
              animate={{
                strokeDasharray: `${segLen - GAP} ${C}`,
                strokeDashoffset: -offset,
                opacity: hoveredIdx !== null && !isActive ? 0.25 : 1,
              }}
              transition={{
                strokeDasharray: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.2 },
              }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
            />
          );
        })}
      </svg>

      {/* centre text — animate on active change */}
      <div className="absolute flex flex-col items-center text-center pointer-events-none select-none">
        <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
          Highest Edu
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={`pct-${activeIdx}-${marketKey}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="text-4xl font-bold leading-none"
            style={{ color: EDU_COLORS[activeIdx] }}
          >
            {pcts[activeIdx]}%
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`lbl-${activeIdx}-${marketKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] text-gray-500 mt-1.5 max-w-[80px] leading-tight font-medium"
          >
            {EDU_LEVELS[activeIdx].label.split(" ").slice(0, 2).join(" ")}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────── Main ─────────────── */
export default function PanelEducation({ marketId }: { marketId: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pcts    = eduData[marketId] ?? eduData.global;
  const maxPct  = Math.max(...pcts);

  return (
    <section className="py-20" style={{ background: "#f0ece4" }}>
      <div className="site-container px-6">

        <SectionHeader
          label="Education"
          heading={<>Education Breakdown</>}
          description="Highest qualification attained by panelists — hover to cross-highlight"
          theme="light"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={marketId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start"
          >

            {/* ── Left: donut + legend ── */}
            <div className="flex flex-col items-center gap-6">
              <DonutChart
                pcts={pcts}
                hoveredIdx={hoveredIdx}
                onHover={setHoveredIdx}
                marketKey={marketId}
              />

              {/* legend */}
              <div className="w-full flex flex-col gap-2.5 px-2">
                {EDU_LEVELS.map((lvl, i) => {
                  const isActive = hoveredIdx === i || (hoveredIdx === null && pcts[i] === maxPct);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between cursor-pointer"
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-200"
                          style={{
                            background: EDU_COLORS[i],
                            opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.3 : 1,
                          }}
                        />
                        <span
                          className="text-sm transition-colors duration-200"
                          style={{
                            color: isActive ? "#0d1b3e" : "#9ca3af",
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {lvl.label}
                        </span>
                      </div>
                      <span
                        className="text-sm font-semibold transition-colors duration-200"
                        style={{ color: isActive ? EDU_COLORS[i] : "#9ca3af" }}
                      >
                        {pcts[i]}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right: education cards ── */}
            <div className="flex flex-col gap-3">
              {EDU_LEVELS.map((lvl, i) => {
                const isActive = hoveredIdx === i;
                const barW     = `${(pcts[i] / maxPct) * 100}%`;

                return (
                  <motion.div
                    key={i}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    animate={{
                      backgroundColor: "#ffffff",
                      boxShadow: isActive
                        ? "0 4px 20px rgba(0,0,0,0.07)"
                        : "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl px-5 py-4 cursor-default border-l-4 border border-gray-100"
                    style={{ borderLeftColor: isActive ? EDU_COLORS[i] : "transparent" }}
                  >
                    <div className="flex items-center gap-4">
                      {/* number */}
                      <span className="text-base leading-8 font-medium text-gray-600 w-5 shrink-0 self-start mt-0.5">
                        {lvl.num}
                      </span>

                      {/* label + bar */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold leading-tight text-gray-800">{lvl.label}</p>
                        <p className="text-base leading-8 font-medium flex-1 text-gray-600">{lvl.sub}</p>
                        <div className="mt-2.5 h-[8px] rounded-full bg-gray-100 w-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: EDU_COLORS[i] }}
                            initial={{ width: 0 }}
                            animate={{ width: barW }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* percentage */}
                      <span
                        className="text-2xl font-bold shrink-0 tabular-nums transition-colors duration-200"
                        style={{ color: EDU_COLORS[i] }}
                      >
                        {pcts[i]}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
