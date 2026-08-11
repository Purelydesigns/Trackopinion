"use client";

import { motion, AnimatePresence } from "framer-motion";

/* ─────────────── Data ─────────────── */
type Bar  = { label: string; pct: number };
type Stat = { income: Bar[]; age: Bar[] };

const statsData: Record<string, Stat> = {
  global:  {
    income: [{ label:"<$25K",pct:30 },{ label:"$25–49K",pct:28 },{ label:"$50–99K",pct:22 },{ label:"$100–200K",pct:14 },{ label:">$200K",pct:6  }],
    age:    [{ label:"<17",pct:8  },{ label:"18–24",pct:22 },{ label:"25–34",pct:28 },{ label:"35–44",pct:22 },{ label:"45–54",pct:12 },{ label:"55–64",pct:6  },{ label:"64+",pct:2  }],
  },
  india:   {
    income: [{ label:"<$25K",pct:42 },{ label:"$25–49K",pct:30 },{ label:"$50–99K",pct:18 },{ label:"$100–200K",pct:8  },{ label:">$200K",pct:2  }],
    age:    [{ label:"<17",pct:12 },{ label:"18–24",pct:28 },{ label:"25–34",pct:28 },{ label:"35–44",pct:18 },{ label:"45–54",pct:8  },{ label:"55–64",pct:5  },{ label:"64+",pct:1  }],
  },
  usa:     {
    income: [{ label:"<$25K",pct:18 },{ label:"$25–49K",pct:24 },{ label:"$50–99K",pct:32 },{ label:"$100–200K",pct:18 },{ label:">$200K",pct:8  }],
    age:    [{ label:"<17",pct:6  },{ label:"18–24",pct:18 },{ label:"25–34",pct:24 },{ label:"35–44",pct:24 },{ label:"45–54",pct:16 },{ label:"55–64",pct:8  },{ label:"64+",pct:4  }],
  },
  uk:      {
    income: [{ label:"<$25K",pct:20 },{ label:"$25–49K",pct:26 },{ label:"$50–99K",pct:30 },{ label:"$100–200K",pct:17 },{ label:">$200K",pct:7  }],
    age:    [{ label:"<17",pct:6  },{ label:"18–24",pct:20 },{ label:"25–34",pct:26 },{ label:"35–44",pct:24 },{ label:"45–54",pct:14 },{ label:"55–64",pct:7  },{ label:"64+",pct:3  }],
  },
  japan:   {
    income: [{ label:"<$25K",pct:16 },{ label:"$25–49K",pct:26 },{ label:"$50–99K",pct:34 },{ label:"$100–200K",pct:18 },{ label:">$200K",pct:6  }],
    age:    [{ label:"<17",pct:4  },{ label:"18–24",pct:14 },{ label:"25–34",pct:20 },{ label:"35–44",pct:22 },{ label:"45–54",pct:20 },{ label:"55–64",pct:14 },{ label:"64+",pct:6  }],
  },
  uae:     {
    income: [{ label:"<$25K",pct:14 },{ label:"$25–49K",pct:22 },{ label:"$50–99K",pct:30 },{ label:"$100–200K",pct:22 },{ label:">$200K",pct:12 }],
    age:    [{ label:"<17",pct:8  },{ label:"18–24",pct:22 },{ label:"25–34",pct:32 },{ label:"35–44",pct:24 },{ label:"45–54",pct:10 },{ label:"55–64",pct:3  },{ label:"64+",pct:1  }],
  },
  brazil:  {
    income: [{ label:"<$25K",pct:38 },{ label:"$25–49K",pct:32 },{ label:"$50–99K",pct:20 },{ label:"$100–200K",pct:8  },{ label:">$200K",pct:2  }],
    age:    [{ label:"<17",pct:10 },{ label:"18–24",pct:24 },{ label:"25–34",pct:28 },{ label:"35–44",pct:20 },{ label:"45–54",pct:10 },{ label:"55–64",pct:6  },{ label:"64+",pct:2  }],
  },
  germany: {
    income: [{ label:"<$25K",pct:12 },{ label:"$25–49K",pct:24 },{ label:"$50–99K",pct:36 },{ label:"$100–200K",pct:20 },{ label:">$200K",pct:8  }],
    age:    [{ label:"<17",pct:5  },{ label:"18–24",pct:16 },{ label:"25–34",pct:22 },{ label:"35–44",pct:24 },{ label:"45–54",pct:18 },{ label:"55–64",pct:10 },{ label:"64+",pct:5  }],
  },
};

/* ─────────────── Area curve chart ─────────────── */
/* SVG user-space box. The <svg> renders at width:100% / height:auto, so the
   rendered box keeps this exact aspect ratio — which lets the HTML tooltip
   overlay be positioned with plain percentages. */
const W = 640, H = 250;
const PAD_L = 26, PAD_R = 26, PAD_T = 34, PAD_B = 44;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const NAVY = "#0d1b3e";
const BLUE = "#2a6bb8";

function AreaChart({ bars, chartKey }: { bars: Bar[]; chartKey: string }) {
  const maxPct = Math.max(...bars.map((b) => b.pct));

  const pts = bars.map((bar, i) => ({
    ...bar,
    x: PAD_L + (i / (bars.length - 1)) * PLOT_W,
    y: PAD_T + (1 - bar.pct / maxPct) * PLOT_H,
  }));

  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${line} ${PAD_L + PLOT_W},${PAD_T + PLOT_H} ${PAD_L},${PAD_T + PLOT_H}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chartKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full mt-6 group/chart"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full h-auto overflow-visible"
          role="img"
          aria-label={`Distribution curve: ${bars.map((b) => `${b.label} ${b.pct}%`).join(", ")}`}
        >
          {/* horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={PAD_L}
              x2={PAD_L + PLOT_W}
              y1={PAD_T + t * PLOT_H}
              y2={PAD_T + t * PLOT_H}
              stroke="#e6edf5"
              strokeWidth={1}
            />
          ))}

          {/* area fill */}
          <motion.polygon
            points={area}
            fill={BLUE}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          />

          {/* curve */}
          <motion.polyline
            points={line}
            fill="none"
            stroke={NAVY}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />

          {/* points + value labels */}
          {pts.map((p, i) => (
            <motion.g
              key={p.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.45 + i * 0.05 }}
            >
              <circle cx={p.x} cy={p.y} r={6} fill={NAVY} stroke="#fff" strokeWidth={2.5} />
              <text
                x={p.x}
                y={p.y - 14}
                textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}
                className="fill-primary"
                style={{ fontSize: 15, fontWeight: 700 }}
              >
                {p.pct}%
              </text>
            </motion.g>
          ))}

          {/* x-axis labels */}
          {pts.map((p, i) => (
            <text
              key={p.label}
              x={p.x}
              y={H - 14}
              textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}
              fill="#4b5563"
              style={{ fontSize: 15, fontWeight: 500 }}
            >
              {p.label}
            </text>
          ))}
        </svg>

        {/* ── Hover targets + tooltips (HTML overlay, positioned in %) ── */}
        {pts.map((p) => (
          <div
            key={p.label}
            className="absolute top-0 bottom-0 group/pt"
            style={{
              left: `${((p.x - PLOT_W / (bars.length - 1) / 2) / W) * 100}%`,
              width: `${(PLOT_W / (bars.length - 1) / W) * 100}%`,
            }}
          >
            <div
              className="absolute -translate-x-1/2 z-20 pointer-events-none opacity-0
                         group-hover/pt:opacity-100 transition-opacity duration-150
                         flex flex-col items-center"
              style={{ left: "50%", top: `${(p.y / H) * 100}%`, marginTop: -46 }}
            >
              <div className="bg-[#0d1b3e] text-white text-[11px] font-medium px-3 py-1.5
                              rounded-full whitespace-nowrap shadow-lg">
                {p.label} — {p.pct}%
              </div>
              <div className="w-2 h-2 bg-[#0d1b3e] rotate-45 -mt-[4px] rounded-sm" />
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────── Stat card ─────────────── */
function StatCard({
  chip, heading, sub, bars, chartKey,
}: {
  chip: string; heading: React.ReactNode; sub: string; bars: Bar[]; chartKey: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
      {/* chip */}
      <div className="flex gap-4 mb-4 justify-left">
        <span className="text-sm font-bold uppercase tracking-widest mb-2 text-gray-500">{chip}</span>
      </div>

      {/* heading */}
      <h3 className="text-xl font-extrabold uppercase leading-tight mb-1 text-primary">{heading}</h3>
      <p className="text-base leading-8 font-medium flex-1 mb-6 text-gray-600">{sub}</p>

      {/* chart */}
      <AreaChart bars={bars} chartKey={chartKey} />
    </div>
  );
}

/* ─────────────── Export ─────────────── */
export default function PanelStats({ marketId }: { marketId: string }) {
  const data = statsData[marketId] ?? statsData.global;

  return (
    <section className="bg-section pt-12 pb-24">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <StatCard
            chip="Income"
            heading={<>Income Graph Ratio ($)</>}
            sub="Annual household income distribution across panelists"
            bars={data.income}
            chartKey={`income-${marketId}`}
          />

          <StatCard
            chip="Age"
            heading={<>Panel Details by Age Group</>}
            sub="How panelists are distributed across age brackets"
            bars={data.age}
            chartKey={`age-${marketId}`}
          />

        </div>
      </div>
    </section>
  );
}
