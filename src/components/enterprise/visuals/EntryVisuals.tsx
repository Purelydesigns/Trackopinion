"use client";

import { motion } from "framer-motion";
import { Gauge, Tag } from "lucide-react";
import { VisualPanel, StatStrip, NAVY, BLUE, MUTED } from "./Panels";

/* ── 1. Entry readiness — segmented arc meter ── */
const dials = [
  { label: "Demand",     pct: 86 },
  { label: "Pricing",    pct: 74 },
  { label: "Access",     pct: 61 },
  { label: "Barriers",   pct: 42 },
];

function Arc({ pct, label, delay }: { pct: number; label: string; delay: number }) {
  const R = 34, C = Math.PI * R; // half circle
  return (
    <div className="flex flex-col items-center">
      <svg width="88" height="52" viewBox="0 0 88 52">
        <path d={`M 10 46 A ${R} ${R} 0 0 1 78 46`} fill="none" stroke="#eef3f9" strokeWidth="9" strokeLinecap="round" />
        <motion.path
          d={`M 10 46 A ${R} ${R} 0 0 1 78 46`}
          fill="none" stroke={pct >= 60 ? NAVY : MUTED} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C - (pct / 100) * C }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
        <text x="44" y="44" textAnchor="middle" fontSize="15" fontWeight="800" fill={NAVY}>{pct}</text>
      </svg>
      <span className="text-[11px] font-semibold text-gray-500 mt-1">{label}</span>
    </div>
  );
}

export function EntryReadiness() {
  return (
    <VisualPanel eyebrow="Feasibility" title="Entry Readiness Score" chip={<><Gauge className="w-3.5 h-3.5" /> Composite 66</>}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {dials.map((d, i) => (
          <Arc key={d.label} pct={d.pct} label={d.label} delay={0.2 + i * 0.12} />
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-gray-100 bg-[#f8f9fb] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: NAVY }} />
          <span className="text-[13px] font-bold text-primary">Recommendation: staged entry</span>
        </div>
        <p className="text-xs text-gray-500 leading-6 mt-1">
          Lead with the urban premium segment; defer mass-market until distribution barriers ease.
        </p>
      </div>

      <StatStrip items={[{ label: "Composite", value: "66/100" }, { label: "Lead Segment", value: "Urban" }, { label: "Verdict", value: "Go (staged)" }]} />
    </VisualPanel>
  );
}

/* ── 2. Price sensitivity — Van Westendorp crossing curves ── */
export function PriceSensitivity() {
  const W = 320, H = 190, padL = 32, padB = 30, padT = 12;
  const plotW = W - padL - 14, plotH = H - padB - padT;

  /* cumulative % against price index 0..100 */
  const tooCheap  = [92, 74, 52, 32, 18, 9, 4];
  const tooExp    = [3, 10, 24, 45, 66, 82, 94];
  const xs = tooCheap.map((_, i) => padL + (i / (tooCheap.length - 1)) * plotW);
  const toPts = (arr: number[]) => arr.map((v, i) => `${xs[i]},${padT + (1 - v / 100) * plotH}`).join(" ");

  return (
    <VisualPanel eyebrow="Willingness to Pay" title="Price Sensitivity" chip={<><Tag className="w-3.5 h-3.5" /> Van Westendorp</>}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
        {[0, 50, 100].map((v) => {
          const y = padT + (1 - v / 100) * plotH;
          return (
            <g key={v}>
              <line x1={padL} x2={W - 14} y1={y} y2={y} stroke="#eef3f9" strokeWidth="1" />
              <text x={padL - 7} y={y + 3} fontSize="8" fill="#9aa7b8" textAnchor="end">{v}%</text>
            </g>
          );
        })}

        {/* acceptable band */}
        <rect x={xs[2]} y={padT} width={xs[4] - xs[2]} height={plotH} fill={BLUE} opacity="0.07" />

        <motion.polyline
          points={toPts(tooCheap)} fill="none" stroke={MUTED} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
        <motion.polyline
          points={toPts(tooExp)} fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        />

        {/* optimal price point marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.05, ease: "backOut" }}
          style={{ transformOrigin: `${xs[3]}px ${padT + plotH * 0.62}px` }}
        >
          <line x1={xs[3]} x2={xs[3]} y1={padT} y2={padT + plotH} stroke={NAVY} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx={xs[3]} cy={padT + plotH * 0.62} r="6" fill={NAVY} stroke="#fff" strokeWidth="2" />
        </motion.g>

        <text x={xs[3]} y={H - 8} fontSize="8.5" fontWeight="700" fill={NAVY} textAnchor="middle">OPTIMAL</text>
        <text x={padL} y={H - 8} fontSize="8" fill="#9aa7b8">LOW</text>
        <text x={W - 14} y={H - 8} fontSize="8" fill="#9aa7b8" textAnchor="end">HIGH</text>
      </svg>

      <div className="flex items-center gap-5 mt-3">
        <span className="flex items-center gap-2 text-[11px] text-gray-500">
          <span className="w-4 h-[2.5px] rounded" style={{ background: MUTED }} /> Too cheap
        </span>
        <span className="flex items-center gap-2 text-[11px] text-gray-500">
          <span className="w-4 h-[2.5px] rounded" style={{ background: NAVY }} /> Too expensive
        </span>
      </div>

      <StatStrip items={[{ label: "Optimal Price", value: "₹1,499" }, { label: "Accept Range", value: "1.2k–1.8k" }, { label: "Elasticity", value: "Moderate" }]} />
    </VisualPanel>
  );
}
