"use client";

import { motion } from "framer-motion";
import { Gauge, Repeat } from "lucide-react";
import { VisualPanel, StatStrip, NAVY, BLUE, MUTED, TRACK } from "./Panels";

/* ── 1. NPS breakdown — promoters / passives / detractors ── */
const nps = [
  { label: "Promoters",  range: "9–10", pct: 54, fill: NAVY },
  { label: "Passives",   range: "7–8",  pct: 28, fill: MUTED },
  { label: "Detractors", range: "0–6",  pct: 18, fill: "#e3ebf5" },
];

export function NpsBreakdown() {
  return (
    <VisualPanel eyebrow="Net Promoter Score" title="Loyalty Breakdown" chip={<><Gauge className="w-3.5 h-3.5" /> NPS 36</>}>
      {/* Single 100% stacked bar */}
      <div className="flex h-11 rounded-xl overflow-hidden gap-[3px] mb-6">
        {nps.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex items-center justify-center"
            style={{ background: s.fill }}
            initial={{ flexGrow: 0, opacity: 0 }}
            whileInView={{ flexGrow: s.pct, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: "easeOut" }}
          >
            <span className={`text-xs font-bold ${i === 0 ? "text-white" : "text-primary"}`}>{s.pct}%</span>
          </motion.div>
        ))}
      </div>

      {/* Legend rows */}
      <div className="flex flex-col gap-3">
        {nps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: s.fill }} />
            <span className="text-sm font-semibold text-primary">{s.label}</span>
            <span className="text-xs text-gray-400">score {s.range}</span>
            <span className="ml-auto text-sm font-black text-primary tabular-nums">{s.pct}%</span>
          </motion.div>
        ))}
      </div>

      <StatStrip items={[{ label: "NPS", value: "+36" }, { label: "CSAT", value: "4.4/5" }, { label: "Referral Rate", value: "27%" }]} />
    </VisualPanel>
  );
}

/* ── 2. Retention curve — repeat purchase over time ── */
const retention = [100, 74, 58, 49, 44, 41, 39];
const months = ["M0", "M1", "M2", "M3", "M4", "M5", "M6"];

export function RetentionCurve() {
  const W = 320, H = 170, padL = 34, padB = 28, padT = 10;
  const plotW = W - padL - 12, plotH = H - padB - padT;
  const pts = retention.map((v, i) => ({
    x: padL + (i / (retention.length - 1)) * plotW,
    y: padT + (1 - v / 100) * plotH,
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${line} ${pts[pts.length - 1].x},${padT + plotH} ${padL},${padT + plotH}`;

  return (
    <VisualPanel eyebrow="Cohort Analysis" title="Repeat Purchase Curve" chip={<><Repeat className="w-3.5 h-3.5" /> 6-month cohort</>}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
        {[0, 25, 50, 75, 100].map((v) => {
          const y = padT + (1 - v / 100) * plotH;
          return (
            <g key={v}>
              <line x1={padL} x2={W - 12} y1={y} y2={y} stroke="#eef3f9" strokeWidth="1" />
              <text x={padL - 8} y={y + 3} fontSize="8" fill="#9aa7b8" textAnchor="end">{v}%</text>
            </g>
          );
        })}

        <motion.polygon
          points={area} fill={BLUE} opacity="0.10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.polyline
          points={line} fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {pts.map((p, i) => (
          <motion.circle
            key={i} cx={p.x} cy={p.y} r="4.5" fill={NAVY} stroke="#fff" strokeWidth="2"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.07, ease: "backOut" }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}
        {pts.map((p, i) => (
          <text key={i} x={p.x} y={H - 8} fontSize="8" fill="#9aa7b8" textAnchor="middle">{months[i]}</text>
        ))}
      </svg>

      <StatStrip items={[{ label: "M6 Retention", value: "39%" }, { label: "Repeat Rate", value: "2.4×" }, { label: "Churn Risk", value: "Low" }]} />
    </VisualPanel>
  );
}
