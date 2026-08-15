"use client";

import { motion } from "framer-motion";
import { Filter, Crosshair } from "lucide-react";
import { VisualPanel, StatStrip, NAVY, BLUE, MUTED } from "./Panels";

/* ── 1. Brand funnel — awareness → recall → trust → recommend ── */
const funnel = [
  { label: "Awareness",       pct: 88 },
  { label: "Recall",          pct: 64 },
  { label: "Consideration",   pct: 47 },
  { label: "Trust",           pct: 35 },
  { label: "Recommendation",  pct: 22 },
];

export function BrandFunnel() {
  return (
    <VisualPanel eyebrow="Brand Health" title="Perception Funnel" chip={<><Filter className="w-3.5 h-3.5" /> vs category</>}>
      <div className="flex flex-col gap-2.5">
        {funnel.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.09 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-semibold text-primary">{s.label}</span>
              <span className="text-[13px] font-black text-primary tabular-nums">{s.pct}%</span>
            </div>
            {/* tapering funnel bar, centred */}
            <div className="h-7 rounded-md bg-[#eef3f9] overflow-hidden flex justify-center">
              <motion.div
                className="h-7"
                style={{ background: i === 0 ? NAVY : i < 3 ? "#1d3566" : MUTED }}
                initial={{ width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <StatStrip items={[{ label: "Aided Awareness", value: "88%" }, { label: "Top of Mind", value: "31%" }, { label: "Wave", value: "Q3" }]} />
    </VisualPanel>
  );
}

/* ── 2. Competitive perception map — quadrant scatter ── */
const brands = [
  { name: "You",    x: 68, y: 72, us: true },
  { name: "Rival A", x: 82, y: 44, us: false },
  { name: "Rival B", x: 38, y: 61, us: false },
  { name: "Rival C", x: 30, y: 28, us: false },
];

export function PerceptionMap() {
  const W = 320, H = 240, pad = 32;
  const px = (v: number) => pad + (v / 100) * (W - pad * 2);
  const py = (v: number) => H - pad - (v / 100) * (H - pad * 2);

  return (
    <VisualPanel eyebrow="Competitive Position" title="Perception Map" chip={<><Crosshair className="w-3.5 h-3.5" /> n = 2,400</>}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
        {/* quadrant fill */}
        <rect x={px(50)} y={py(100)} width={px(100) - px(50)} height={py(50) - py(100)} fill={BLUE} opacity="0.05" />

        {/* axes */}
        <line x1={pad} x2={W - pad} y1={py(50)} y2={py(50)} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={px(50)} x2={px(50)} y1={pad} y2={H - pad} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        <rect x={pad} y={pad} width={W - pad * 2} height={H - pad * 2} fill="none" stroke="#eef3f9" strokeWidth="1.5" rx="6" />

        {/* axis labels */}
        <text x={W / 2} y={H - 10} fontSize="8.5" fontWeight="700" fill="#9aa7b8" textAnchor="middle">QUALITY PERCEPTION →</text>
        <text x={12} y={H / 2} fontSize="8.5" fontWeight="700" fill="#9aa7b8" textAnchor="middle" transform={`rotate(-90 12 ${H / 2})`}>TRUST →</text>

        {brands.map((b, i) => (
          <motion.g
            key={b.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.12, ease: "backOut" }}
            style={{ transformOrigin: `${px(b.x)}px ${py(b.y)}px` }}
          >
            <circle cx={px(b.x)} cy={py(b.y)} r={b.us ? 15 : 11}
              fill={b.us ? NAVY : "#dbe4f0"} stroke="#fff" strokeWidth="2.5" />
            <text
              x={px(b.x)} y={py(b.y) + (b.us ? 4 : 3.5)}
              textAnchor="middle" fontSize={b.us ? "9" : "8"} fontWeight="800"
              fill={b.us ? "#fff" : "#64748b"}
            >
              {b.us ? "YOU" : b.name.replace("Rival ", "")}
            </text>
          </motion.g>
        ))}
      </svg>

      <StatStrip items={[{ label: "Trust Index", value: "72" }, { label: "Rank", value: "#2" }, { label: "Gap to #1", value: "-6pts" }]} />
    </VisualPanel>
  );
}
