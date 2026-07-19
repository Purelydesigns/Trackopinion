"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, Globe } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

/* ─────────────── Data ─────────────── */
const reachData: Record<string, number> = {
  global:  52.4,
  india:   42.8,
  usa:     89.6,
  uk:      92.1,
  japan:   88.5,
  uae:     96.2,
  brazil:  68.3,
  germany: 91.4,
};

/* ─────────────── Liquid circle ─────────────── */
function LiquidCircle({ pct }: { pct: number }) {
  const cx = 110, cy = 110, r = 86;
  const fillTopY = (cy - r) + (1 - pct / 100) * (2 * r);

  // Path starts at x = -waveW (local) so the clip [cx-r..cx+r] = [24..196]
  // sits in the middle of the path at all times. Animate x: [0, -waveW] to
  // scroll one period left — seamless because path repeats every waveW px.
  const waveW = r * 2;       // 172px — one period
  const waveA = 13;
  const steps  = 80;
  const pStartX = -waveW;               // -172
  const pEndX   = pStartX + waveW * 4; // 516  (4 full periods)

  const buildPath = (phaseOffset: number) => {
    let d = "";
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const x = pStartX + t * (pEndX - pStartX);
      const y = fillTopY - waveA * Math.sin((t * 4 + phaseOffset) * Math.PI * 2);
      d += `${k === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    d += `L ${pEndX.toFixed(1)} 220 L ${pStartX.toFixed(1)} 220 Z`;
    return d;
  };

  const path1 = buildPath(0);
  const path2 = buildPath(0.5);

  // Outer dot ring
  const DOTS = 64;
  const dots = Array.from({ length: DOTS }, (_, i) => {
    const angle = (i / DOTS) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + 106 * Math.cos(angle), y: cy + 106 * Math.sin(angle) };
  });

  return (
    <svg viewBox="0 0 220 220" className="w-64 h-64 sm:w-72 sm:h-72">
      <defs>
        <clipPath id="reach-circle">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        {/* Water gradient: lighter at surface, richer at depth */}
        <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4a8fe0" />
          <stop offset="100%" stopColor="#0d3f9e" />
        </linearGradient>
      </defs>

      {/* outer dot ring */}
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r="2"
          fill={i % 3 === 0 ? "#93b8d8" : "#c4d8ec"} />
      ))}

      {/* dark background circle — matches section bg so no bubble highlight */}
      <circle cx={cx} cy={cy} r={r} fill="#0d1b3e" />

      {/* ── all animated fill inside clip ── */}
      <g clipPath="url(#reach-circle)">

        {/* wave 1 — lighter shade of base blue */}
        <motion.g
          animate={{ x: [0, -waveW] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        >
          <path d={path1} fill="#1a6fe8" />
        </motion.g>

        {/* wave 2 — deeper shade for layered depth */}
        <motion.g
          animate={{ x: [0, -waveW] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
        >
          <path d={path2} fill="#4a8fe0" />
        </motion.g>
      </g>

      {/* inner border ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

      {/* percentage */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="32" fontWeight="800" fill="white"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45))" }}>
        {pct}%
      </text>
      {/* label */}
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize="7.5"
            fill="white" letterSpacing="2.5" fontWeight="700"
            style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }}>
        INTERNET PENETRATION
      </text>
    </svg>
  );
}

/* ─────────────── Feature card ─────────────── */
const features = [
  {
    icon: Clock,
    title: "Real-time survey delivery",
    desc: "Instant reach to mobile & broadband panelists",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    icon: CheckCircle,
    title: "Quality-verified responses",
    desc: "Device fingerprinting & IP validation",
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    icon: Globe,
    title: "Global + mobile-first reach",
    desc: "Coverage across low & high-connectivity markets",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

/* ─────────────── Main ─────────────── */
export default function PanelReach({ marketId }: { marketId: string }) {
  const pct = reachData[marketId] ?? reachData.global;

  return (
    <section className="py-20 overflow-hidden bg-primary">
      <div className="site-container px-6">

        <SectionHeader
          label="Connectivity"
          heading={<>Online Reach of Our Panel</>}
          description="Percentage of active panelists with reliable internet access — updated per market selection."
          theme="dark"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={marketId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center"
          >

            {/* ── Left feature cards ── */}
            <div className="flex flex-col gap-4">
              {features.slice(0, 2).map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 + 0.1 }}
                  className="flex items-start gap-3 rounded-2xl px-5 py-4 border"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.iconBg}`}>
                    <f.icon size={18} className={f.iconColor} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-slate-400 font-normal mt-0.5 leading-snug">{f.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* stat chip */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl px-5 py-4 border"
                style={{ background: "rgba(26,111,232,0.1)", borderColor: "rgba(26,111,232,0.25)" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400 mb-1">Coverage Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-white">{pct}%</span>
                  <span className="text-xs text-slate-400 mb-1 font-normal">digital reach</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #1a6fe8, #60a5fa)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* ── Centre — liquid circle with pulse rings ── */}
            <div className="flex items-center justify-center relative">
              {/* decorative pulse rings */}
              {[1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  className="absolute rounded-full border border-blue-400/20"
                  style={{ width: 290 + n * 44, height: 290 + n * 44 }}
                  animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.15, 0.4] }}
                  transition={{ duration: 2.8 + n * 0.6, repeat: Infinity, ease: "easeInOut", delay: n * 0.4 }}
                />
              ))}
              <LiquidCircle pct={pct} />
            </div>

            {/* ── Right — text + last feature ── */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl px-5 py-4 border"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400 mb-2">Market Snapshot</p>
                <p className="text-sm text-slate-300 font-normal leading-relaxed">
                  The liquid fill represents real-time internet penetration for the selected market panel.
                  Switch markets above to see data update live.
                </p>
              </div>

              {(() => {
                const f = features[2];
                const Icon = f.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 rounded-2xl px-5 py-4 border"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.iconBg}`}>
                      <Icon size={18} className={f.iconColor} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                      <p className="text-xs text-slate-400 font-normal mt-0.5 leading-snug">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })()}

              {/* offline vs online split */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="rounded-2xl px-5 py-4 border"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-3">Online vs Offline</p>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="rounded-l-full"
                    style={{ background: "#1a6fe8" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <div className="flex-1 rounded-r-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[11px] text-blue-400 font-semibold">Online {pct}%</span>
                  <span className="text-[11px] text-slate-500 font-medium">Offline {(100 - pct).toFixed(1)}%</span>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
