"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

/* ─────────────── Markets ─────────────── */
const markets = [
  { id: "global",  label: "Global",         code: "🌐", badge: false },
  { id: "india",   label: "India",          code: "IN", badge: true  },
  { id: "usa",     label: "United States",  code: "US", badge: true  },
  { id: "uk",      label: "United Kingdom", code: "GB", badge: true  },
  { id: "japan",   label: "Japan",          code: "JP", badge: true  },
  { id: "uae",     label: "UAE",            code: "AE", badge: true  },
  { id: "brazil",  label: "Brazil",         code: "BR", badge: true  },
  { id: "germany", label: "Germany",        code: "DE", badge: true  },
];

/* ─────────────── Panel data ─────────────── */
type MarketData = { total: string; female: number; male: number };
const panelData: Record<string, MarketData> = {
  global:  { total: "15.4M", female: 52, male: 48 },
  india:   { total: "42.0M", female: 45, male: 55 },
  usa:     { total: "38.0M", female: 55, male: 45 },
  uk:      { total: "18.0M", female: 53, male: 47 },
  japan:   { total: "8.2M",  female: 50, male: 50 },
  uae:     { total: "9.5M",  female: 38, male: 62 },
  brazil:  { total: "12.5M", female: 56, male: 44 },
  germany: { total: "12.0M", female: 49, male: 51 },
};

/* ─────────────── Image mapping ─────────────── */
const charImages: Record<string, { female: string; male: string }> = {
  global:  { female: "/images/Demographics/US-female.png",      male: "/images/Demographics/US-male.png"      },
  india:   { female: "/images/Demographics/india-female.png",   male: "/images/Demographics/india-male.png"   },
  usa:     { female: "/images/Demographics/US-female.png",      male: "/images/Demographics/US-male.png"      },
  uk:      { female: "/images/Demographics/UK-female.png",      male: "/images/Demographics/UK-male.png"      },
  japan:   { female: "/images/Demographics/japan-female.png",   male: "/images/Demographics/japan-male.png"   },
  uae:     { female: "/images/Demographics/UAE-female.png",     male: "/images/Demographics/UAE-male.png"     },
  brazil:  { female: "/images/Demographics/Brazil-female.png",  male: "/images/Demographics/Brazil-male.png"  },
  germany: { female: "/images/Demographics/Germany-female.png", male: "/images/Demographics/Germany-male.png" },
};

/* ─────────────── Donut ─────────────── */
const R = 52, CX = 66, CY = 66, CIRC = 2 * Math.PI * R;
function DonutChart({ female, male, total }: { female: number; male: number; total: string }) {
  const fArc = (female / 100) * CIRC;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="132" height="132" viewBox="0 0 132 132">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f0f4ff" strokeWidth="11" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1a6fe8" strokeWidth="11"
          strokeDasharray={`${fArc} ${CIRC}`} strokeDashoffset={0}
          transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="round" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#0d1b3e" strokeWidth="11"
          strokeDasharray={`${(male / 100) * CIRC} ${CIRC}`} strokeDashoffset={-fArc}
          transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-xl font-bold text-gray-800 leading-none">{total}</span>
        <span className="text-[8px] uppercase tracking-widest text-gray-400 mt-1 font-semibold">Panelists</span>
      </div>
    </div>
  );
}

/* ─────────────── Market badge ─────────────── */
function MarketBadge({ m }: { m: typeof markets[0] }) {
  if (!m.badge) return <span className="text-sm">{m.code}</span>;
  return (
    <span className="inline-flex items-center justify-center bg-[#1a6fe8] text-white text-[10px] font-semibold rounded px-1.5 py-0.5 min-w-[22px] tracking-wide">
      {m.code}
    </span>
  );
}

/* ─────────────── Main ─────────────── */
export default function PanelDemographics({
  marketId, setMarketId,
}: {
  marketId: string;
  setMarketId: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const market = markets.find((m) => m.id === marketId)!;
  const d = panelData[marketId];
  const chars = charImages[marketId];
  const nameF = "Female";
  const nameM = "Male";

  return (
    <section className="pt-24 pb-20 bg-section">
      <div className="site-container px-6">
        <SectionHeader
          label="Demographics"
          heading={<>Panel Users by Market</>}
          description="Explore gender distribution and panel size across key global markets."
          theme="light"
        />

        {/* Market selector */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Market</span>
          <div className="relative">
            <button
              onClick={() => setOpen((p) => !p)}
              className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <MarketBadge m={market} />
              <span>{market.label}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-[calc(100%+6px)] left-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden min-w-[200px]"
                >
                  {markets.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setMarketId(m.id); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                        ${m.id === marketId
                          ? "bg-[#0d1b3e] text-white font-medium"
                          : "text-gray-600 hover:bg-gray-50 font-normal"}`}
                    >
                      <MarketBadge m={m} />
                      {m.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={marketId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-[1fr_1px_220px_1px_1fr]"
            style={{ minHeight: 480 }}
          >

            {/* ── Female ── */}
            <div className="flex flex-col pr-10 pb-8">
              {/* Top label row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Female</p>
                  <p className="text-base font-semibold text-gray-700">{nameF}</p>
                </div>
                {/* Large accent % */}
                <div className="flex items-end gap-0.5 leading-none">
                  <span className="font-black text-[72px] leading-none" style={{ color: "#1a6fe8" }}>{d.female}</span>
                  <span className="text-2xl font-light text-blue-300 mb-3">%</span>
                </div>
              </div>

              {/* Character — with big watermark circle behind */}
              <div className="relative flex-1 flex items-end justify-center" style={{ minHeight: 320 }}>
                {/* Watermark ring */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ bottom: 40 }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: 260,
                      height: 260,
                      background: "radial-gradient(circle, rgba(26,111,232,0.07) 0%, transparent 70%)",
                    }}
                  />
                </div>
                <Image
                  src={chars.female}
                  alt={nameF}
                  fill
                  className="object-contain object-bottom"
                  style={{ mixBlendMode: "multiply" }}
                  sizes="380px"
                />
              </div>

              {/* Panel share */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#1a6fe8" }}>Panel Share</span>
                  <span className="text-xs font-semibold text-gray-500">{d.female}%</span>
                </div>
                <div className="h-[3px] rounded-full overflow-hidden bg-blue-100">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "#1a6fe8" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${d.female}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="bg-gray-200 self-stretch mx-0" />

            {/* ── Center stats ── */}
            <div className="flex flex-col items-center justify-center px-8 gap-6">
              {/* Market pill */}
              <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
                <MarketBadge m={market} />
                <span className="text-xs font-semibold text-gray-600">{market.label}</span>
              </div>

              {/* Donut */}
              <DonutChart female={d.female} male={d.male} total={d.total} />

              {/* Stat rows */}
              <div className="w-full flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: "#1a6fe8" }} />
                      <span className="text-xs text-gray-500">Female</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{d.female}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden bg-blue-100">
                    <motion.div className="h-full rounded-full" style={{ background: "#1a6fe8" }}
                      initial={{ width: 0 }} animate={{ width: `${d.female}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-800" />
                      <span className="text-xs text-gray-500">Male</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{d.male}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden bg-gray-200">
                    <motion.div className="h-full rounded-full bg-gray-800"
                      initial={{ width: 0 }} animate={{ width: `${d.male}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }} />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-gray-200" />

              {/* Total */}
              <div className="w-full flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Total Panelists</span>
                <span className="text-lg font-bold text-gray-800">{d.total}</span>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="bg-gray-200 self-stretch mx-0" />

            {/* ── Male ── */}
            <div className="flex flex-col pl-10 pb-8">
              {/* Top label row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Male</p>
                  <p className="text-base font-semibold text-gray-700">{nameM}</p>
                </div>
                {/* Large accent % */}
                <div className="flex items-end gap-0.5 leading-none">
                  <span className="font-black text-[72px] leading-none text-gray-800">{d.male}</span>
                  <span className="text-2xl font-light text-gray-400 mb-3">%</span>
                </div>
              </div>

              {/* Character */}
              <div className="relative flex-1 flex items-end justify-center" style={{ minHeight: 320 }}>
                {/* Watermark ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="rounded-full"
                    style={{
                      width: 260,
                      height: 260,
                      background: "radial-gradient(circle, rgba(13,27,62,0.05) 0%, transparent 70%)",
                    }}
                  />
                </div>
                <Image
                  src={chars.male}
                  alt={nameM}
                  fill
                  className="object-contain object-bottom"
                  style={{ mixBlendMode: "multiply" }}
                  sizes="380px"
                />
              </div>

              {/* Panel share */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Panel Share</span>
                  <span className="text-xs font-semibold text-gray-500">{d.male}%</span>
                </div>
                <div className="h-[3px] rounded-full overflow-hidden bg-gray-200">
                  <motion.div
                    className="h-full rounded-full bg-gray-800"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.male}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
