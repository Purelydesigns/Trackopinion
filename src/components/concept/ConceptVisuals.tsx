"use client";

import { motion } from "framer-motion";
import {
  Eye,
  GitCompare,
  Lightbulb,
  MessageSquareQuote,
  Repeat,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  Target,
} from "lucide-react";

const NAVY = "#0d1b3e";
const BLUE = "#3a5d92";

/* ═══════════════════════════════════════════════════════════
   1. Concept Testing — what the test measures

   This was a scorecard: three named concepts with scores, a winner
   badge and footer metrics. Invented numbers in that shape read as a
   real client result rather than an illustration, so the card now
   shows what a concept test covers instead of inventing findings.
   ═══════════════════════════════════════════════════════════ */

const measures = [
  { icon: Sparkles,           label: "Appeal & relevance",    question: "Does it matter to them?" },
  { icon: MessageSquareQuote, label: "Clarity & credibility", question: "Is it understood and believed?" },
  { icon: GitCompare,         label: "Differentiation",       question: "Is it different from what exists?" },
  { icon: ShoppingCart,       label: "Purchase interest",     question: "Would they act on it?" },
  { icon: ShieldAlert,        label: "Barriers",              question: "What holds them back?" },
];

export function ConceptScorecard() {
  return (
    <div className="relative w-full">
      {/* soft brand glow behind the card */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-3xl opacity-60"
        style={{ background: "radial-gradient(60% 60% at 40% 30%, rgba(13,27,62,0.12), transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl border border-gray-100 shadow-xl p-7"
      >
        {/* Header */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">
            Concept Testing
          </p>
          <p className="text-primary font-extrabold text-lg leading-none">
            What a Concept Test Measures
          </p>
        </div>

        {/* What goes in — the thing the five lenses below are reading. */}
        <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-primary/25 bg-[#f8f9fb] px-4 py-3">
          <Lightbulb className="w-4 h-4 text-primary shrink-0" />
          <span className="text-primary text-sm font-bold">Your concept, idea or prototype</span>
        </div>

        {/* The lenses, strung on a single line so they read as one pass
            through the concept rather than five unrelated ticks. */}
        <div className="relative mt-5">
          <span
            aria-hidden
            className="pointer-events-none absolute left-[18px] top-2 bottom-6 w-px"
            style={{ background: "linear-gradient(180deg, rgba(13,27,62,0.35), rgba(13,27,62,0.08))" }}
          />

          {measures.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                className="relative flex items-start gap-4 pb-5 last:pb-0"
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ring-4 ring-white"
                  style={{ background: NAVY }}
                >
                  <Icon className="w-4 h-4 text-white" strokeWidth={2.4} />
                </span>
                <div className="pt-1">
                  <p className="text-primary text-sm font-bold leading-none mb-1.5">{m.label}</p>
                  <p className="text-gray-500 text-[13px] leading-snug">{m.question}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. Ad Testing — attention heatmap + gaze path
   ═══════════════════════════════════════════════════════════ */

/* Gaze fixations in view order on a 340x212 frame.
   `weight` drives bloom size + opacity so intensity is readable.

   The markers are numbered because view order is what the diagram explains.
   They carried dwell times too — invented seconds that read as a real
   eye-tracking result, so those are gone. */
const fixations = [
  { x: 96,  y: 118, order: 1, weight: 1.0,  labelSide: "left"  as const },
  { x: 232, y: 78,  order: 2, weight: 0.72, labelSide: "right" as const },
  { x: 244, y: 160, order: 3, weight: 0.5,  labelSide: "right" as const },
];

const GAZE_LEN = 420; // approx path length for the dash animation

export function AdAttentionVisual() {
  return (
    <div className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-3xl opacity-60"
        style={{ background: "radial-gradient(60% 60% at 60% 30%, rgba(13,27,62,0.12), transparent 70%)" }}
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

              {/* ── Fixation markers ── */}
              {fixations.map((f, i) => {
                return (
                  <motion.g
                    key={`f${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.22, ease: "backOut" }}
                    style={{ transformOrigin: `${f.x}px ${f.y}px` }}
                  >
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
            { icon: Eye,    label: "Message takeout" },
            { icon: Target, label: "Brand linkage" },
            { icon: Repeat, label: "Engagement & response" },
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
                <p className="text-primary font-bold text-sm leading-snug">{m.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
