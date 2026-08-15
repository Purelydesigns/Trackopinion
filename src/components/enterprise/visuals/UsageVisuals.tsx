"use client";

import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";
import { VisualPanel, StatStrip, NAVY, BLUE, MUTED } from "./Panels";

/* ── 1. Occasion wheel — when the category is used ── */
const occasions = [
  { label: "Morning",   pct: 26 },
  { label: "Midday",    pct: 18 },
  { label: "Afternoon", pct: 12 },
  { label: "Evening",   pct: 31 },
  { label: "Late night", pct: 13 },
];

export function OccasionWheel() {
  const CX = 90, CY = 90, R_IN = 34, R_OUT = 78;
  const total = occasions.reduce((n, o) => n + o.pct, 0);
  let angle = -90;

  const arc = (start: number, sweep: number, r1: number, r2: number) => {
    const rad = (d: number) => (d * Math.PI) / 180;
    const x1 = CX + r2 * Math.cos(rad(start)),        y1 = CY + r2 * Math.sin(rad(start));
    const x2 = CX + r2 * Math.cos(rad(start + sweep)), y2 = CY + r2 * Math.sin(rad(start + sweep));
    const x3 = CX + r1 * Math.cos(rad(start + sweep)), y3 = CY + r1 * Math.sin(rad(start + sweep));
    const x4 = CX + r1 * Math.cos(rad(start)),         y4 = CY + r1 * Math.sin(rad(start));
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r2} ${r2} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r1} ${r1} 0 ${large} 0 ${x4} ${y4} Z`;
  };

  return (
    <VisualPanel eyebrow="Occasion Mapping" title="When the Category Is Used" chip={<><Clock className="w-3.5 h-3.5" /> day parts</>}>
      <div className="flex items-center gap-7">
        <svg viewBox="0 0 180 180" width="180" height="180" className="shrink-0">
          {occasions.map((o, i) => {
            const sweep = (o.pct / total) * 360 - 2;
            const d = arc(angle, sweep, R_IN, R_OUT * (0.72 + (o.pct / 31) * 0.28));
            const el = (
              <motion.path
                key={o.label} d={d}
                fill={i === 3 ? NAVY : i === 0 ? "#2a4a86" : MUTED}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.4 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
            );
            angle += (o.pct / total) * 360;
            return el;
          })}
          <circle cx={CX} cy={CY} r={R_IN - 4} fill="#fff" />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize="17" fontWeight="800" fill={NAVY}>31%</text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="8" fontWeight="700" fill="#9aa7b8">EVENING</text>
        </svg>

        <div className="flex flex-col gap-2.5 flex-1">
          {occasions.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: i === 3 ? NAVY : i === 0 ? "#2a4a86" : MUTED }} />
              <span className={`text-[13px] ${i === 3 ? "font-bold text-primary" : "text-gray-600"}`}>{o.label}</span>
              <span className="ml-auto text-[13px] font-bold text-primary tabular-nums">{o.pct}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      <StatStrip items={[{ label: "Peak Occasion", value: "Evening" }, { label: "Occasions/wk", value: "4.2" }, { label: "Repertoire", value: "2.8 brands" }]} />
    </VisualPanel>
  );
}

/* ── 2. Attitudinal segments — bubble field ── */
const segments = [
  { name: "Habitual",   size: 34, x: 26, y: 66, lead: false },
  { name: "Explorers",  size: 27, x: 62, y: 34, lead: true  },
  { name: "Value-led",  size: 22, x: 72, y: 74, lead: false },
  { name: "Occasional", size: 17, x: 36, y: 24, lead: false },
];

export function SegmentBubbles() {
  const W = 320, H = 230, pad = 26;
  const px = (v: number) => pad + (v / 100) * (W - pad * 2);
  const py = (v: number) => H - pad - (v / 100) * (H - pad * 2);

  return (
    <VisualPanel eyebrow="Segmentation" title="Attitudinal Segments" chip={<><Users className="w-3.5 h-3.5" /> 4 groups</>}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
        <rect x={pad} y={pad} width={W - pad * 2} height={H - pad * 2} fill="none" stroke="#eef3f9" strokeWidth="1.5" rx="6" />
        <line x1={pad} x2={W - pad} y1={py(50)} y2={py(50)} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={px(50)} x2={px(50)} y1={pad} y2={H - pad} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

        <text x={W / 2} y={H - 8} fontSize="8.5" fontWeight="700" fill="#9aa7b8" textAnchor="middle">FREQUENCY →</text>
        <text x={11} y={H / 2} fontSize="8.5" fontWeight="700" fill="#9aa7b8" textAnchor="middle" transform={`rotate(-90 11 ${H / 2})`}>INVOLVEMENT →</text>

        {segments.map((s, i) => (
          <motion.g
            key={s.name}
            initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, ease: "backOut" }}
            style={{ transformOrigin: `${px(s.x)}px ${py(s.y)}px` }}
          >
            <circle cx={px(s.x)} cy={py(s.y)} r={s.size} fill={s.lead ? NAVY : BLUE} opacity={s.lead ? 1 : 0.16} />
            <text x={px(s.x)} y={py(s.y) - 1} textAnchor="middle" fontSize="9.5" fontWeight="800" fill={s.lead ? "#fff" : NAVY}>
              {s.name}
            </text>
            <text x={px(s.x)} y={py(s.y) + 11} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={s.lead ? "rgba(255,255,255,0.75)" : "#64748b"}>
              {s.size}%
            </text>
          </motion.g>
        ))}
      </svg>

      <StatStrip items={[{ label: "Lead Segment", value: "Explorers" }, { label: "Size", value: "27%" }, { label: "Growth", value: "+8pts" }]} />
    </VisualPanel>
  );
}
