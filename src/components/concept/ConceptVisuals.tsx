"use client";

import { motion } from "framer-motion";
import { Check, Eye, Target, Repeat } from "lucide-react";

const NAVY = "#0d1b3e";
const BLUE = "#1a6fe8";

/* ═══════════════════════════════════════════════════════════
   1. Concept Testing — monadic scorecard
   Three concepts scored against each other, winner promoted.
   ═══════════════════════════════════════════════════════════ */

const concepts = [
  { id: "A", name: "Concept A", score: 82, winner: true },
  { id: "B", name: "Concept B", score: 64, winner: false },
  { id: "C", name: "Concept C", score: 41, winner: false },
];

export function ConceptScorecard() {
  return (
    <div className="relative w-full">
      {/* soft brand glow behind the card */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-3xl opacity-60"
        style={{ background: "radial-gradient(60% 60% at 40% 30%, rgba(26,111,232,0.12), transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl border border-gray-100 shadow-xl p-7"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">
              Monadic Test
            </p>
            <p className="text-primary font-extrabold text-lg leading-none">Concept Scorecard</p>
          </div>
          <span className="text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
            n = 1,200
          </span>
        </div>

        {/* Concept rows */}
        <div className="flex flex-col gap-5">
          {concepts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-7 h-7 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0"
                  style={{
                    background: c.winner ? NAVY : "#eef0f5",
                    color: c.winner ? "#fff" : "#6b7280",
                  }}
                >
                  {c.id}
                </span>
                <span className={`text-sm font-semibold ${c.winner ? "text-primary" : "text-gray-500"}`}>
                  {c.name}
                </span>

                {c.winner && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-primary rounded-full px-2.5 py-1">
                    <Check className="w-3 h-3" strokeWidth={3} /> Winner
                  </span>
                )}

                <span className="ml-auto text-sm font-black text-primary tabular-nums">{c.score}</span>
              </div>

              {/* Score bar */}
              <div className="h-2.5 rounded-full bg-[#eef3f9] overflow-hidden">
                <motion.div
                  className="h-2.5 rounded-full"
                  style={{ background: c.winner ? NAVY : "#c7d6ea" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer metrics */}
        <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-gray-100">
          {[
            { label: "Purchase Intent", value: "+34%" },
            { label: "Appeal", value: "4.6/5" },
            { label: "Uniqueness", value: "78%" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <p className="text-primary font-extrabold text-base leading-none mb-1">{m.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. Ad Testing — attention heatmap + gaze path
   ═══════════════════════════════════════════════════════════ */

/* Gaze fixations in view order on a 340x212 frame.
   `weight` drives bloom size + opacity so intensity is readable. */
const fixations = [
  { x: 96,  y: 118, order: 1, dwell: "1.4s", weight: 1.0,  labelSide: "left"  as const },
  { x: 232, y: 78,  order: 2, dwell: "0.9s", weight: 0.72, labelSide: "right" as const },
  { x: 244, y: 160, order: 3, dwell: "0.6s", weight: 0.5,  labelSide: "right" as const },
];

const GAZE_LEN = 420; // approx path length for the dash animation

export function AdAttentionVisual() {
  return (
    <div className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-3xl opacity-60"
        style={{ background: "radial-gradient(60% 60% at 60% 30%, rgba(26,111,232,0.12), transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl border border-gray-100 shadow-xl p-7"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">
              Eye Tracking
            </p>
            <p className="text-primary font-extrabold text-lg leading-none">Attention Heatmap</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
            <Eye className="w-3.5 h-3.5" /> Gaze path
          </span>
        </div>

        {/* Ad frame */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
          <svg viewBox="0 0 340 212" className="w-full block">
            <defs>
              {/* Cool -> warm heat ramp so intensity is legible, not flat blue */}
              <radialGradient id="heatRamp">
                <stop offset="0%"   stopColor="#ff5a3c" stopOpacity="0.62" />
                <stop offset="35%"  stopColor="#ffb03a" stopOpacity="0.42" />
                <stop offset="65%"  stopColor={BLUE}    stopOpacity="0.26" />
                <stop offset="100%" stopColor={BLUE}    stopOpacity="0" />
              </radialGradient>
              <linearGradient id="legendRamp" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor={BLUE} />
                <stop offset="55%"  stopColor="#ffb03a" />
                <stop offset="100%" stopColor="#ff5a3c" />
              </linearGradient>
              <clipPath id="adClip">
                <rect x="0" y="0" width="340" height="212" rx="2" />
              </clipPath>
            </defs>

            <g clipPath="url(#adClip)">
              {/* ── The creative being tested ── */}
              <rect x="0" y="0" width="340" height="212" fill="#ffffff" />

              {/* Product image block */}
              <rect x="20" y="52" width="150" height="112" rx="10" fill="#e8eef7" />
              <circle cx="95" cy="98" r="26" fill="#cfdcec" />
              <rect x="52" y="132" width="86" height="9" rx="4.5" fill="#d7e2ef" />

              {/* Brand lockup */}
              <rect x="20" y="22" width="30" height="14" rx="4" fill={NAVY} />
              <rect x="58" y="25" width="52" height="8" rx="4" fill="#c9d5e5" />

              {/* Headline + body */}
              <rect x="190" y="52" width="128" height="12" rx="6" fill="#b9c8dc" />
              <rect x="190" y="72" width="104" height="12" rx="6" fill="#b9c8dc" />
              <rect x="190" y="100" width="126" height="7" rx="3.5" fill="#dde5ef" />
              <rect x="190" y="113" width="112" height="7" rx="3.5" fill="#dde5ef" />
              <rect x="190" y="126" width="120" height="7" rx="3.5" fill="#dde5ef" />

              {/* CTA */}
              <rect x="190" y="148" width="86" height="26" rx="13" fill={NAVY} />
              <rect x="204" y="158" width="58" height="6" rx="3" fill="#ffffff" opacity="0.85" />

              {/* ── Heat blooms — sized & weighted per fixation ── */}
              {fixations.map((f, i) => (
                <motion.circle
                  key={`h${i}`}
                  cx={f.x} cy={f.y} r={62 * f.weight + 14}
                  fill="url(#heatRamp)"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: f.weight, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.22 }}
                  style={{ transformOrigin: `${f.x}px ${f.y}px` }}
                />
              ))}

              {/* ── Gaze path — dashes preserved via strokeDashoffset ── */}
              <motion.polyline
                points={fixations.map((f) => `${f.x},${f.y}`).join(" ")}
                fill="none"
                stroke={NAVY}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="5 5"
                initial={{ strokeDashoffset: GAZE_LEN, opacity: 0 }}
                whileInView={{ strokeDashoffset: 0, opacity: 0.75 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.55, ease: "easeInOut" }}
              />

              {/* ── Fixation markers + dwell chips ── */}
              {fixations.map((f, i) => {
                const chipW = 30;
                const chipX = f.labelSide === "left" ? f.x - 15 - chipW - 4 : f.x + 15 + 4;
                return (
                  <motion.g
                    key={`f${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.22, ease: "backOut" }}
                    style={{ transformOrigin: `${f.x}px ${f.y}px` }}
                  >
                    {/* dwell chip */}
                    <rect x={chipX} y={f.y - 9} width={chipW} height="18" rx="9" fill="#ffffff" opacity="0.92" />
                    <text
                      x={chipX + chipW / 2} y={f.y + 4}
                      textAnchor="middle" fontSize="9.5" fontWeight="700" fill={NAVY}
                    >
                      {f.dwell}
                    </text>

                    {/* marker */}
                    <circle cx={f.x} cy={f.y} r="13" fill={NAVY} stroke="#ffffff" strokeWidth="2.5" />
                    <text
                      x={f.x} y={f.y + 4.5}
                      textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff"
                    >
                      {f.order}
                    </text>
                  </motion.g>
                );
              })}

              {/* ── Intensity legend ── */}
              <g transform="translate(20, 186)">
                <rect x="0" y="0" width="76" height="6" rx="3" fill="url(#legendRamp)" />
                <text x="0" y="17" fontSize="8" fontWeight="700" fill="#94a3b8">LOW</text>
                <text x="76" y="17" fontSize="8" fontWeight="700" fill="#94a3b8" textAnchor="end">HIGH</text>
              </g>
            </g>
          </svg>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: Eye,    label: "Time to Brand", value: "1.4s" },
            { icon: Target, label: "Brand Recall",  value: "71%" },
            { icon: Repeat, label: "Ad Cut-Through", value: "+22%" },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="rounded-xl border border-gray-100 bg-[#f8f9fb] px-3 py-3"
              >
                <Icon className="w-4 h-4 text-primary mb-2" />
                <p className="text-primary font-extrabold text-base leading-none mb-1">{m.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{m.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
