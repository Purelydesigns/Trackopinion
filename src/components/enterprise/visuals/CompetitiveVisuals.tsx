"use client";

import { motion } from "framer-motion";
import { Grid3x3, PieChart } from "lucide-react";
import { VisualPanel, StatStrip, NAVY, BLUE, MUTED } from "./Panels";

/* ── 1. Feature coverage grid — who covers what ── */
const players = ["You", "Rival A", "Rival B", "Rival C"];
const features = ["Enterprise tier", "Self-serve", "Global panel", "API access", "Compliance"];
/* 2 = strong, 1 = partial, 0 = absent */
const matrix: number[][] = [
  [2, 2, 2, 2, 2],
  [2, 1, 2, 0, 1],
  [1, 2, 0, 1, 0],
  [0, 1, 1, 0, 0],
];

export function CoverageGrid() {
  return (
    <VisualPanel eyebrow="Market Mapping" title="Coverage Matrix" chip={<><Grid3x3 className="w-3.5 h-3.5" /> 5 dimensions</>}>
      <div className="overflow-x-auto">
        <table className="w-full border-separate" style={{ borderSpacing: "3px" }}>
          <thead>
            <tr>
              <th className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 pb-1 pr-2" />
              {players.map((p) => (
                <th key={p} className={`text-[10px] font-bold uppercase tracking-wider pb-1 ${p === "You" ? "text-primary" : "text-gray-400"}`}>
                  {p === "You" ? "YOU" : p.replace("Rival ", "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, r) => (
              <tr key={f}>
                <td className="text-[12px] font-semibold text-gray-600 pr-3 whitespace-nowrap">{f}</td>
                {players.map((p, c) => {
                  const v = matrix[c][r];
                  return (
                    <td key={p} className="w-12">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + (r * players.length + c) * 0.025 }}
                        className="h-8 rounded-md flex items-center justify-center"
                        style={{
                          background: v === 2 ? (c === 0 ? NAVY : "#2a4a86") : v === 1 ? MUTED : "#f1f4f8",
                        }}
                      >
                        <span className={`text-[11px] font-black ${v === 2 ? "text-white" : v === 1 ? "text-primary" : "text-gray-300"}`}>
                          {v === 2 ? "●" : v === 1 ? "◐" : "○"}
                        </span>
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatStrip items={[{ label: "Full Coverage", value: "5/5" }, { label: "Nearest Rival", value: "3/5" }, { label: "Unique Edge", value: "2" }]} />
    </VisualPanel>
  );
}

/* ── 2. Share of market — donut with white space callout ── */
const share = [
  { label: "You",        pct: 24, fill: NAVY },
  { label: "Rival A",    pct: 31, fill: "#2a4a86" },
  { label: "Rival B",    pct: 18, fill: "#6f8fbf" },
  { label: "Others",     pct: 12, fill: MUTED },
  { label: "Unserved",   pct: 15, fill: "#e3ebf5" },
];

export function ShareDonut() {
  const R = 54, C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <VisualPanel eyebrow="Segment Share" title="Where Demand Sits" chip={<><PieChart className="w-3.5 h-3.5" /> by revenue</>}>
      <div className="flex items-center gap-7">
        <div className="relative shrink-0">
          <svg width="150" height="150" viewBox="0 0 150 150">
            {share.map((s) => {
              const len = (s.pct / 100) * C;
              const el = (
                <motion.circle
                  key={s.label}
                  cx="75" cy="75" r={R} fill="none" stroke={s.fill} strokeWidth="20"
                  strokeDasharray={`${len} ${C}`} strokeDashoffset={-offset}
                  transform="rotate(-90 75 75)"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              );
              offset += len;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-primary leading-none">15%</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-1">Unserved</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 flex-1">
          {share.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.07 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.fill }} />
              <span className={`text-[13px] ${s.label === "Unserved" ? "font-bold text-primary" : "text-gray-600"}`}>{s.label}</span>
              <span className="ml-auto text-[13px] font-bold text-primary tabular-nums">{s.pct}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      <StatStrip items={[{ label: "Your Share", value: "24%" }, { label: "White Space", value: "15%" }, { label: "Segments", value: "6" }]} />
    </VisualPanel>
  );
}
