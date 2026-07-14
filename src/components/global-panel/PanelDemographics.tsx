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
const charImages: Record<string, { female: string; male: string; nameF: string; nameM: string }> = {
  global:  { female: "/images/Demographics/US-female.png",      male: "/images/Demographics/US-male.png",      nameF: "Female", nameM: "Male"   },
  india:   { female: "/images/Demographics/india-female.png",   male: "/images/Demographics/india-male.png",   nameF: "Mahila", nameM: "Purush" },
  usa:     { female: "/images/Demographics/US-female.png",      male: "/images/Demographics/US-male.png",      nameF: "Female", nameM: "Male"   },
  uk:      { female: "/images/Demographics/UK-female.png",      male: "/images/Demographics/UK-male.png",      nameF: "Female", nameM: "Male"   },
  japan:   { female: "/images/Demographics/japan-female.png",   male: "/images/Demographics/japan-male.png",   nameF: "Josei",  nameM: "Dansei" },
  uae:     { female: "/images/Demographics/UAE-female.png",     male: "/images/Demographics/UAE-male.png",     nameF: "Female", nameM: "Male"   },
  brazil:  { female: "/images/Demographics/Brazil-female.png",  male: "/images/Demographics/Brazil-male.png",  nameF: "Mulher", nameM: "Homem"  },
  germany: { female: "/images/Demographics/Germany-female.png", male: "/images/Demographics/Germany-male.png", nameF: "Frau",   nameM: "Mann"   },
};

/* ─────────────── Donut ─────────────── */
const R = 58, CX = 72, CY = 72, CIRC = 2 * Math.PI * R;
function DonutChart({ female, male, total }: { female: number; male: number; total: string }) {
  const fArc = (female / 100) * CIRC;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="144" height="144" viewBox="0 0 144 144">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f0f2f8" strokeWidth="14" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1a6fe8" strokeWidth="14"
          strokeDasharray={`${fArc} ${CIRC}`} strokeDashoffset={0}
          transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="round" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#0d1b3e" strokeWidth="14"
          strokeDasharray={`${(male / 100) * CIRC} ${CIRC}`} strokeDashoffset={-fArc}
          transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-2xl font-semibold text-gray-800 leading-none">{total}</span>
        <span className="text-[9px] uppercase tracking-widest text-gray-400 mt-1 font-medium">Panelists</span>
      </div>
    </div>
  );
}

/* ─────────────── Thin bar stat ─────────────── */
function StatBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span className="text-sm text-gray-500 font-medium">{label}</span>
        </div>
        <span className="text-sm font-semibold text-gray-700">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ─────────────── Gender card ─────────────── */
function GenderCard({
  gender, pct, localName, imgSrc,
}: {
  gender: "female" | "male"; pct: number; localName: string; imgSrc: string;
}) {
  const isFemale = gender === "female";
  const accent   = isFemale ? "#1a6fe8" : "#0d1b3e";
  const bgGrad   = isFemale
    ? "linear-gradient(170deg, #dbeafe 0%, #eff6ff 45%, #f0f4ff 100%)"
    : "linear-gradient(170deg, #dde2ee 0%, #eef0f5 45%, #f4f5f8 100%)";
  const glowColor = isFemale ? "rgba(26,111,232,0.12)" : "rgba(13,27,62,0.08)";

  return (
    <div
      className="relative rounded-3xl overflow-hidden flex flex-col"
      style={{ background: bgGrad, minHeight: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
    >
      {/* accent top bar */}
      <div className="h-1 w-full" style={{ background: accent }} />

      {/* header row */}
      <div className="flex items-start justify-between px-6 pt-5 pb-2">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            {isFemale ? "Female" : "Male"}
          </span>
          <p className="text-base font-semibold text-gray-700 mt-0.5">{localName}</p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-bold leading-none" style={{ color: accent }}>{pct}</span>
          <span className="text-xl font-normal text-gray-400">%</span>
        </div>
      </div>

      {/* glow blob behind character */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          bottom: 60,
          width: 180,
          height: 180,
          background: glowColor,
          filter: "blur(40px)",
        }}
      />

      {/* character image */}
      <div className="relative flex-1 flex items-end justify-center" style={{ minHeight: 300 }}>
        <Image
          src={imgSrc}
          alt={localName}
          fill
          className="object-contain object-bottom"
          style={{ mixBlendMode: "multiply" }}
          sizes="300px"
        />
      </div>

      {/* bottom stat strip */}
      <div
        className="px-6 py-4 border-t"
        style={{ borderColor: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: accent }}>
            Panel Share
          </span>
          <span className="text-xs font-semibold text-gray-600">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: accent }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
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

  return (
    <section className="pt-24 pb-12 bg-section">
      <div className="site-container px-6">
        <SectionHeader
          label="Demographics"
          heading={<>Panel Users by Market</>}
          description="Explore gender distribution and panel size across key global markets."
          theme="light"
        />

        {/* Market selector */}
        <div className="flex items-center justify-center gap-3 mb-14">
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

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={marketId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] gap-6"
          >
            {/* Female */}
            <GenderCard gender="female" pct={d.female} localName={chars.nameF} imgSrc={chars.female} />

            {/* Centre info card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">

              {/* market label */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-50">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Selected Market</p>
                <div className="flex items-center gap-2">
                  <MarketBadge m={market} />
                  <span className="text-base font-semibold text-gray-800">{market.label}</span>
                </div>
              </div>

              {/* donut */}
              <div className="flex items-center justify-center py-7">
                <DonutChart female={d.female} male={d.male} total={d.total} />
              </div>

              {/* stat bars */}
              <div className="px-6 pb-4 flex flex-col gap-4">
                <StatBar label="Female" pct={d.female} color="#1a6fe8" />
                <StatBar label="Male"   pct={d.male}   color="#0d1b3e" />
              </div>

              {/* divider */}
              <div className="mx-6 border-t border-gray-100 mt-2" />

              {/* total */}
              <div className="px-6 py-5 flex items-center justify-between mt-auto">
                <span className="text-sm text-gray-400 font-medium">Total Panelists</span>
                <span className="text-xl font-semibold text-gray-800">{d.total}</span>
              </div>
            </div>

            {/* Male */}
            <GenderCard gender="male" pct={d.male} localName={chars.nameM} imgSrc={chars.male} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
