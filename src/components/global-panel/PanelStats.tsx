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

/* ─────────────── Bar chart ─────────────── */
const MAX_H = 200; // px — max visual bar height

function BarChart({ bars, chartKey }: { bars: Bar[]; chartKey: string }) {
  const maxPct = Math.max(...bars.map((b) => b.pct));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chartKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-end justify-between gap-4 sm:gap-5 group/chart mt-6 w-full"
        style={{ height: MAX_H + 52 }}
      >
        {bars.map((bar, i) => {
          const fillH = Math.round((bar.pct / maxPct) * MAX_H);
          const delay  = i * 0.04;

          return (
            <div
              key={bar.label}
              className="relative flex flex-col items-center flex-1 group/bar
                         group-hover/chart:opacity-30 hover:!opacity-100
                         transition-opacity duration-200 cursor-default"
              style={{ minWidth: 0, maxWidth: 44 }}
            >
              {/* ── Hover tooltip ── */}
              <div
                className="absolute z-20 pointer-events-none opacity-0 group-hover/bar:opacity-100
                            transition-opacity duration-150 flex flex-col items-center"
                style={{ bottom: fillH + 32 }}
              >
                <div className="bg-[#0d1b3e] text-white text-[11px] font-medium
                                px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                  {bar.label} — {bar.pct}%
                </div>
                <div className="w-2 h-2 bg-[#0d1b3e] rotate-45 -mt-[4px] rounded-sm" />
              </div>

              {/* ── Bar column ── */}
              <div className="relative w-full" style={{ height: MAX_H }}>
                {/* dotted background pill */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-full overflow-hidden"
                  style={{
                    height: MAX_H,
                    backgroundImage: "radial-gradient(circle, #b8cfe8 1.2px, transparent 1.2px)",
                    backgroundSize: "5px 5px",
                    backgroundPosition: "center top",
                    backgroundColor: "#dde9f6",
                  }}
                />

                {/* filled pill */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-full bg-[#0d1b3e]"
                  initial={{ height: 0 }}
                  animate={{ height: fillH }}
                  transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                {/* ── Percentage label — inside bar column so bottom is relative to 200px div ── */}
                <span
                  className="absolute left-0 right-0 text-center text-[11px] font-semibold text-primary pointer-events-none"
                  style={{ bottom: Math.max(fillH + 4, 4) }}
                >
                  {bar.pct}%
                </span>
              </div>

              {/* ── X-axis label ── */}
              <span className="text-base leading-8 font-medium flex-1 mb-2 text-gray-600 text-center whitespace-nowrap">
                {bar.label}
              </span>
            </div>
          );
        })}
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
      <BarChart bars={bars} chartKey={chartKey} />
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
