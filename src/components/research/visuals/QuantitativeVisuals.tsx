"use client";

import { motion } from "framer-motion";

/**
 * Page-specific artwork for /solutions/research-services/quantitative.
 *
 * Two earlier attempts were rejected and are worth recording so nobody walks
 * back into them: a routing diagram simply redrew the section heading, and a
 * dot matrix read as a flat block of 98 identical circles. Both were tile-grids
 * inside a card, which is the texture the rest of the page already has.
 *
 * This is a Sankey — the one shape on the site drawn from curves rather than
 * boxes — showing the three collection modes converging into a single set of
 * valid completes. It carries the same information the dot grid did, but the
 * ribbon widths do the work, and it has a focal point to land on.
 */

const NAVY = "#0d1b3e";
const TINT = "#3a5d92";
const SOFT = "#8ba3c6";

/* An illustrative study, in the same spirit as the report mock-up on the
   analytics page — a product shot, not a claim about a specific project. */
const sources = [
  { label: "Online & mobile", share: 0.56, color: NAVY },
  { label: "CATI",            share: 0.26, color: TINT },
  { label: "Face-to-face",    share: 0.18, color: SOFT },
];

/* ── Geometry ──────────────────────────────────────────────────────────────
   Computed rather than hand-tuned so the ribbons stay aligned to their nodes
   if a share is ever edited. */
const W = 420, H = 290;
const TOP = 30, SPAN = 230;          // vertical band the diagram occupies
const GAP = 30;                      // breathing room between source nodes
const NODE_W = 11;                   // the slim bars at each end
const X_SRC = 132, X_DST = 294;      // inner edges the ribbons span
const FLOW = SPAN - GAP * (sources.length - 1);
/* The stack lands narrower than it starts, so the ribbons visibly taper rather
   than running flat across. The factor is the qualified rate quoted below, so
   the drawing and the number agree. */
const QUALIFIED = 0.62;
const DST_FLOW = FLOW * QUALIFIED;

/** Source nodes: spaced apart, so each mode reads as its own stream. */
let cursor = TOP;
const srcNodes = sources.map((s) => {
  const h = FLOW * s.share;
  const node = { ...s, y0: cursor, y1: cursor + h };
  cursor += h + GAP;
  return node;
});

/** Target: the shares stacked flush and centred, scaled down by the taper. */
cursor = TOP + (SPAN - DST_FLOW) / 2;
const dstNodes = sources.map((s) => {
  const h = DST_FLOW * s.share;
  const node = { y0: cursor, y1: cursor + h };
  cursor += h;
  return node;
});
/** Vertical centre of the stack — the number is set against it. */
const DST_MID = TOP + SPAN / 2;

/** A ribbon from one source band to its slot in the stack, as a closed curve. */
function ribbon(sy0: number, sy1: number, ty0: number, ty1: number) {
  const mid = (X_SRC + X_DST) / 2;
  return [
    `M ${X_SRC} ${sy0}`,
    `C ${mid} ${sy0} ${mid} ${ty0} ${X_DST} ${ty0}`,
    `L ${X_DST} ${ty1}`,
    `C ${mid} ${ty1} ${mid} ${sy1} ${X_SRC} ${sy1}`,
    "Z",
  ].join(" ");
}

export function SampleFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-lg"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Sample flow
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Live</span>
        </span>
      </div>

      {/* Drawn statically — a nested in-view reveal has proved unreliable
          inside a card like this; the card as a whole still animates in. */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Three collection modes converging into 6,240 valid completes: online and mobile 56 percent, CATI 26 percent, face-to-face 18 percent"
      >
        {/* Ribbons first, so the nodes sit crisply on top of them */}
        {srcNodes.map((s, i) => (
          <path
            key={s.label}
            d={ribbon(s.y0, s.y1, dstNodes[i].y0, dstNodes[i].y1)}
            fill={s.color}
            opacity={0.34}
          />
        ))}

        {/* Source nodes + their labels */}
        {srcNodes.map((s) => (
          <g key={s.label}>
            <rect
              x={X_SRC - NODE_W} y={s.y0} width={NODE_W} height={s.y1 - s.y0}
              rx={4} fill={s.color}
            />
            <text
              x={X_SRC - NODE_W - 12} y={(s.y0 + s.y1) / 2 - 3}
              textAnchor="end" fontSize="13" fontWeight="700" fill={NAVY}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {s.label}
            </text>
            <text
              x={X_SRC - NODE_W - 12} y={(s.y0 + s.y1) / 2 + 13}
              textAnchor="end" fontSize="12" fontWeight="600" fill="#94a3b8"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {Math.round(s.share * 100)}%
            </text>
          </g>
        ))}

        {/* The destination stack, flush, reading as one sample */}
        {dstNodes.map((d, i) => (
          <rect
            key={i}
            x={X_DST} y={d.y0} width={NODE_W} height={d.y1 - d.y0}
            rx={i === 0 || i === dstNodes.length - 1 ? 4 : 0}
            fill={sources[i].color}
          />
        ))}

        {/* Focal point: what it all adds up to */}
        <text
          x={X_DST + NODE_W + 14} y={DST_MID - 8}
          fontSize="34" fontWeight="900" fill={NAVY}
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          6,240
        </text>
        <text
          x={X_DST + NODE_W + 15} y={DST_MID + 12}
          fontSize="12" fontWeight="600" fill="#94a3b8"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          valid completes
        </text>
        <text
          x={X_DST + NODE_W + 15} y={DST_MID + 29}
          fontSize="12" fontWeight="600" fill="#94a3b8"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          across 11 markets
        </text>
      </svg>

      {/* Field metrics */}
      <div className="grid grid-cols-3 gap-2.5 mt-1 pt-4 border-t border-gray-100">
        {[
          { k: "Qualified", v: "62%" },
          { k: "Avg. LOI", v: "12 min" },
          { k: "Day", v: "6 of 9" },
        ].map((t) => (
          <div key={t.k} className="rounded-xl bg-gray-50 px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t.k}</p>
            <p className="text-sm font-black text-primary tabular-nums">{t.v}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
