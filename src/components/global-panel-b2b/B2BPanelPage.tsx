"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ShieldCheck, BadgeCheck, Network, UserCheck, Handshake, Activity, Search, X, Globe2, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteCard from "@/components/ui/SiteCard";
import ProcessSteps, { type ProcessStep } from "@/components/shared/ProcessSteps";
import GlobalReach from "@/components/about/GlobalReach";
import LatestReadsSection from "@/components/shared/LatestReadsSection";
import { PANEL_COUNTRIES } from "@/lib/mapCountries";
import {
  b2bMarkets, TOTAL_PANELISTS, recruitmentStrategy, validationCriteria,
  fraudDetection, panelAttributes, type Slice,
} from "./b2bData";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

const NAVY = "#0d1b3e";

/* Recruitment strategy as an interactive timeline. Sub-lines are condensed
   from the deck's own sentences, which become the detail-card bodies. */
const RECRUIT_SUBLINES = [
  "LinkedIn and relevant industry forums",
  "Existing relationships in business networks",
  "Trusted professional organizations",
  "Updates and participation monitoring",
];

const recruitmentSteps: ProcessStep[] = recruitmentStrategy.map((r, i) => ({
  num: String(i + 1).padStart(2, "0"),
  label: r.label,
  desc: RECRUIT_SUBLINES[i] ?? "",
  icon: [<Network key="a" className="w-6 h-6" />, <UserCheck key="b" className="w-6 h-6" />,
         <Handshake key="c" className="w-6 h-6" />, <Activity key="d" className="w-6 h-6" />][i],
  detail: {
    title: `Step ${String(i + 1).padStart(2, "0")} — ${r.label}`,
    body: r.desc,
  },
}));

/* Trim noisy precision: 38.97 -> 39, 31.9 -> 31.9 stays readable at 1dp */
const fmt = (n: number) => `${Number(n.toFixed(1))}%`;

const BLUE = "#3a5d92";

/* ─────────── Chart card ───────────
   Same shell the B2C panel page uses for its income and age charts: a plain
   white rounded panel with a muted chip, not the navy-barred SiteCard. */
function ChartCard({ chip, heading, sub, children }: {
  chip: string; heading: string; sub: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <span className="text-sm font-bold uppercase tracking-widest mb-2 text-gray-500">{chip}</span>
      <h3 className="text-xl font-extrabold uppercase leading-tight mb-1 text-primary">{heading}</h3>
      <p className="text-base leading-8 font-medium mb-6 text-gray-600">{sub}</p>
      {children}
    </div>
  );
}

/* ─────────── Ring gauge ───────────
   Stands in for the character illustration on the B2C demographics split —
   same job, a large soft visual anchoring each outer column. */
function RingGauge({ pct, color, track, centreValue, centreLabel }: {
  pct: number; color: string; track: string; centreValue: string; centreLabel: string;
}) {
  const SIZE = 240, STROKE = 16;
  const C = SIZE / 2, R = (SIZE - STROKE) / 2, CIRC = 2 * Math.PI * R;

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 240 }}>
      {/* Watermark wash, as behind the B2C characters */}
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{ width: 260, height: 260, background: `radial-gradient(circle, ${track} 0%, transparent 70%)` }}
      />
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="relative">
        <circle cx={C} cy={C} r={R} fill="none" stroke={track} strokeWidth={STROKE} />
        <motion.circle
          cx={C} cy={C} r={R} fill="none" stroke={color} strokeWidth={STROKE} strokeLinecap="round"
          transform={`rotate(-90 ${C} ${C})`}
          strokeDasharray={`${(pct / 100) * CIRC} ${CIRC}`}
          initial={{ strokeDashoffset: CIRC }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-center" style={{ width: SIZE - STROKE * 2 - 20 }}>
        <span className="text-3xl font-bold text-gray-800 leading-none">{centreValue}</span>
        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mt-2.5 leading-tight">
          {centreLabel}
        </span>
      </div>
    </div>
  );
}

/* ─────────── Outer column of the market split ─────────── */
function SplitColumn({ label, market, pct, accent, track, centreValue, centreLabel, className = "" }: {
  label: string; market: string; pct: number; accent: string; track: string;
  centreValue: string; centreLabel: string; className?: string;
}) {
  return (
    <div className={`flex flex-col pb-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
          <p className="text-base font-semibold text-gray-700">{market} Panel</p>
        </div>
        <div className="flex items-end gap-0.5 leading-none">
          <span className="font-black text-[56px] sm:text-[72px] leading-none" style={{ color: accent }}>
            {Number(pct.toFixed(1))}
          </span>
          <span className="text-2xl font-light mb-3" style={{ color: accent, opacity: 0.45 }}>%</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <RingGauge pct={pct} color={accent} track={track} centreValue={centreValue} centreLabel={centreLabel} />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold uppercase tracking-widest" style={{ color: accent }}>
            Panel Share
          </span>
          <span className="text-[13px] font-semibold text-gray-500">{fmt(pct)}</span>
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: track }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: accent }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────── Centre donut — working-class split around the market total ─────────── */
function CentreDonut({ white, blue, total }: { white: number; blue: number; total: string }) {
  const SIZE = 244, STROKE = 18;
  const C = SIZE / 2, R = (SIZE - STROKE) / 2, CIRC = 2 * Math.PI * R;
  const whiteArc = (white / 100) * CIRC;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle cx={C} cy={C} r={R} fill="none" stroke="#eef1f6" strokeWidth={STROKE} />
        <circle cx={C} cy={C} r={R} fill="none" stroke={BLUE} strokeWidth={STROKE}
          strokeDasharray={`${whiteArc} ${CIRC}`} strokeDashoffset={0}
          transform={`rotate(-90 ${C} ${C})`} strokeLinecap="round" />
        <circle cx={C} cy={C} r={R} fill="none" stroke={NAVY} strokeWidth={STROKE}
          strokeDasharray={`${(blue / 100) * CIRC} ${CIRC}`} strokeDashoffset={-whiteArc}
          transform={`rotate(-90 ${C} ${C})`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center text-center" style={{ width: SIZE - STROKE * 2 - 20 }}>
        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold whitespace-nowrap">
          Active Panelists
        </span>
        <span className="text-3xl font-bold text-gray-800 leading-none mt-2.5">{total}</span>
      </div>
    </div>
  );
}

/* ─────────── Labelled bar row, as used down the centre column ─────────── */
function StatRow({ label, pct, color, track }: { label: string; pct: number; color: string; track: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span className="text-sm text-gray-500">{label}</span>
        </div>
        <span className="text-sm font-semibold text-gray-700">{fmt(pct)}</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: track }}>
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

/* ─────────── Shared chart grammar ───────────
   All four breakdowns use one ramp, one track colour and one row shape, so the
   grid reads as a set rather than four charts that happen to sit together.
   Shades are assigned by rank, not by data order, so the largest slice is
   always the darkest. */
const RAMP  = ["#0d1b3e", "#2a4a86", "#3a5d92", "#5b7cae", "#8ba3c6", "#b9c9dd", "#c7d6ea"];
const TRACK = "#eef1f6";
const shadeFor = (i: number) => RAMP[Math.min(i, RAMP.length - 1)];

/** Label and value on one line, full-width bar beneath.

    The bar spans the whole card rather than sharing the row with a fixed label
    column: that column plus the value used to eat half the width, leaving a
    31.9% bar just 98px of a 597px card. Bars stay scaled 0–100 rather than to
    the set maximum, so a 10% bar looks like a tenth on every card. */
function BarRow({ label, pct, color, index, numeral }: {
  label: string; pct: number; color: string; index: number; numeral?: number;
}) {
  return (
    <div className="py-2.5 border-b border-gray-100 last:border-0">
      <div className="flex items-baseline gap-3 mb-2">
        {numeral !== undefined && (
          <span className="text-[13px] font-black tabular-nums text-primary/25 w-4 shrink-0">{numeral}</span>
        )}
        <span className="text-base font-medium text-gray-700 truncate">{label}</span>
        <span className="ml-auto text-base font-bold text-primary tabular-nums shrink-0">{fmt(pct)}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: TRACK }}>
        {/* Plain width + CSS transition — framer's width animations have proved
            unreliable here and can leave bars stuck at zero. */}
        <div
          className="h-2 rounded-full transition-[width] duration-700 ease-out"
          style={{ background: color, width: `${pct}%`, transitionDelay: `${index * 60}ms` }}
        />
      </div>
    </div>
  );
}

/** Dot, label and value — the legend shape shared by the stacked bar and donut. */
function LegendRow({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
      <span className="text-base text-gray-700 font-medium truncate">{label}</span>
      <span className="ml-auto text-base font-bold text-primary tabular-nums shrink-0">{fmt(pct)}</span>
    </div>
  );
}

/** Ranked bars, largest first. */
function BarList({ rows, numbered = false }: { rows: Slice[]; numbered?: boolean }) {
  const sorted = [...rows].sort((a, b) => b.pct - a.pct);
  return (
    <div className="flex flex-col">
      {sorted.map((r, i) => (
        <BarRow
          key={r.label}
          label={r.label}
          pct={r.pct}
          color={shadeFor(i)}
          index={i}
          numeral={numbered ? i + 1 : undefined}
        />
      ))}
    </div>
  );
}

/** One continuous 100% bar. Hairline dividers rather than gaps, so it reads as
    a single whole; a value is printed inside only where it actually fits. */
function StackedBar({ rows }: { rows: Slice[] }) {
  const sorted = [...rows].sort((a, b) => b.pct - a.pct);
  const shade = new Map(sorted.map((r, i) => [r.label, shadeFor(i)]));

  return (
    <div>
      <div className="flex h-11 rounded-xl overflow-hidden mb-5">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className="flex items-center justify-center transition-[flex-grow] duration-700 ease-out"
            style={{
              background: shade.get(r.label),
              flexGrow: r.pct,
              flexBasis: 0,
              transitionDelay: `${i * 80}ms`,
              boxShadow: i === 0 ? undefined : "inset 1px 0 0 rgba(255,255,255,0.35)",
            }}
          >
            {/* Printed inside only where it fits. A segment's pixel width is
                its share of the card, so a 14% slice is roomy at desktop width
                and barely 40px on a phone — hence the breakpoint rather than a
                percentage threshold alone. */}
            {r.pct >= 14 && (
              <span
                className={`text-[13px] font-bold ${r.pct >= 20 ? "" : "hidden sm:block"}`}
                style={{ color: sorted.findIndex((s) => s.label === r.label) < 3 ? "#fff" : NAVY }}
              >
                {fmt(r.pct)}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {sorted.map((r) => (
          <LegendRow key={r.label} label={r.label} pct={r.pct} color={shade.get(r.label)!} />
        ))}
      </div>
    </div>
  );
}

/** Donut with a legend beside it. */
function Donut({ rows }: { rows: Slice[] }) {
  const SIZE = 196, STROKE = 26;
  const CX = SIZE / 2, R = (SIZE - STROKE) / 2, C = 2 * Math.PI * R;
  const sorted = [...rows].sort((a, b) => b.pct - a.pct);

  // Prefix sum of the arc lengths — this cannot accumulate inside the map.
  const segments = sorted.reduce<{ label: string; len: number; offset: number }[]>((acc, s) => {
    const len = (s.pct / 100) * C;
    const prev = acc[acc.length - 1];
    acc.push({ label: s.label, len, offset: prev ? prev.offset + prev.len : 0 });
    return acc;
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-7">
      <div className="relative shrink-0">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {segments.map((s, i) => (
            <circle
              key={s.label}
              cx={CX} cy={CX} r={R} fill="none"
              stroke={shadeFor(i)}
              strokeWidth={STROKE}
              strokeDasharray={`${s.len} ${C}`}
              strokeDashoffset={-s.offset}
              transform={`rotate(-90 ${CX} ${CX})`}
            />
          ))}
        </svg>
        {/* Constrained to the ring's inner width so the label cannot run under
            the stroke — the old box was only padded, and long function names
            such as "Administration" collided with it. */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center mx-auto"
          style={{ width: SIZE - STROKE * 2 - 12 }}
        >
          <span className="text-2xl font-black text-primary leading-none">{fmt(sorted[0].pct)}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1.5 leading-tight">
            {sorted[0].label}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0 w-full">
        {sorted.slice(0, 6).map((s, i) => (
          <LegendRow key={s.label} label={s.label} pct={s.pct} color={shadeFor(i)} />
        ))}
      </div>
    </div>
  );
}

export default function B2BPanelPage() {
  const [marketId, setMarketId] = useState(b2bMarkets[0].id);
  const [attrQuery, setAttrQuery] = useState("");
  const [open, setOpen] = useState(false);

  const m = b2bMarkets.find((x) => x.id === marketId) ?? b2bMarkets[0];

  /* Panel-attribute filter */
  const aq = attrQuery.trim().toLowerCase();
  const filteredAttributes = aq
    ? panelAttributes
        .map((g) => ({ ...g, items: g.items.filter((it) => it.toLowerCase().includes(aq)) }))
        .filter((g) => g.items.length > 0)
    : panelAttributes;
  const totalAttributes = panelAttributes.reduce((n, g) => n + g.items.length, 0);

  const fullTime = m.jobType.find((j) => j.label === "Full time")?.pct ?? 0;

  return (
    <main>
      <PageHero
        breadcrumb={[{ name: "Global Panel", href: "/solutions/global-panel" }, { name: "B2B Panel" }]}
        badge={`B2B Panel — ${TOTAL_PANELISTS.toLocaleString()} Active Panelists`}
        heading={<>Delivering Data &amp; Insights<br />for Businesses</>}
        description="Tap into our diverse global B2B panel for unique market perspectives — validated decision-makers across industries, seniority levels and functions worldwide."
        primaryCta={{ label: "Request B2B Sample", href: "/contact-us" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact-us" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      {/* ════════ MAP ════════ */}
      <GlobalReach
        heading="27 Markets in Our B2B Reach"
        description="Validated decision-makers and professionals across every major business region — the footprint behind the market-level data below."
        pins={PANEL_COUNTRIES}
        sectionClassName="bg-section py-16"
      />

      {/* ════════ STATS BANNER ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1b3e 50%, #112254 100%)" }}
          >
            <div className="px-10 py-12">
              <SectionHeader
                label="B2B Panel Network"
                heading={<>A panel built for business research, validated end to end</>}
                description=""
                theme="dark"
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  // Compact, like the healthcare banner's "711K+" — the exact
                  // figure is spelled out in the hero badge, and at phone width
                  // "785,500" is wider than its own tile.
                  { icon: Users,       value: `${Math.floor(TOTAL_PANELISTS / 1000)}K+`, label: "Active B2B Panelists" },
                  { icon: Globe2,      value: `${PANEL_COUNTRIES.length}`,           label: "Markets Covered"      },
                  { icon: ShieldCheck, value: `${validationCriteria.length}`,        label: "Validation Gates"     },
                  { icon: BadgeCheck,  value: `${fraudDetection.length}`,            label: "Fraud Checks"         },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      className="flex flex-col items-center text-center rounded-2xl py-7 px-4"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Icon className="w-5 h-5 text-white/70 mb-3" strokeWidth={1.8} />
                      <p className="text-white font-black text-3xl sm:text-4xl mb-2 tabular-nums">{stat.value}</p>
                      <p className="text-white/50 text-xs font-semibold uppercase tracking-wider leading-5">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ PANEL COMPOSITION ════════ */}
      <section className="pt-24 pb-20 bg-section">
        <div className="site-container px-6">
          <SectionHeader
            label="Panel Composition"
            heading={<>B2B Panel by Market</>}
            description="Pick a market to see how our panel breaks down by seniority, function, industry and employment type."
            theme="light"
          />

          {/* Market picker — same control the B2C panel page uses */}
          <div className="flex items-center justify-center gap-3 mb-16">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Market</span>
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <span className="inline-flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded px-1.5 py-0.5 min-w-[22px] tracking-wide">
                  {m.code}
                </span>
                <span>{m.label}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-20 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden min-w-[230px] max-h-[320px] overflow-y-auto">
                  {b2bMarkets.map((mk) => (
                    <button
                      key={mk.id}
                      onClick={() => { setMarketId(mk.id); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        mk.id === marketId ? "bg-primary text-white font-medium" : "text-gray-600 hover:bg-gray-50 font-normal"
                      }`}
                    >
                      <span className={`inline-flex items-center justify-center text-[10px] font-semibold rounded px-1.5 py-0.5 min-w-[22px] ${
                        mk.id === marketId ? "bg-white/20 text-white" : "bg-primary text-white"
                      }`}>
                        {mk.code}
                      </span>
                      {mk.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Keyed on the market, so switching remounts the block and replays
              the fade-up.

              Deliberately NOT wrapped in <AnimatePresence mode="wait">: that
              only mounts the incoming child once the outgoing one has finished
              its exit animation, and exit animations are driven by
              requestAnimationFrame, which browsers pause in a backgrounded tab.
              Switch market, background the tab, come back, and the section is
              stuck on the old market while the picker shows the new one. A bare
              keyed remount cannot wedge that way. */}
          <div>
            <motion.div
              key={marketId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── Headline split: two gauges either side of the market total ── */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr_1px_1fr]">

                <SplitColumn
                  label="Decision Makers"
                  market={m.label}
                  pct={m.decisionMakers.yes}
                  accent={BLUE}
                  track="rgba(13,27,62,0.12)"
                  centreValue={fmt(m.decisionMakers.no)}
                  centreLabel="Not decision makers"
                  className="lg:pr-10"
                />

                <div className="hidden lg:block bg-gray-200 self-stretch" />

                {/* ── Centre ── */}
                <div className="flex flex-col items-center justify-center px-0 lg:px-8 gap-6 py-10 lg:py-0
                                [&>.stack]:w-full [&>.stack]:max-w-[280px]">
                  <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
                    <span className="inline-flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded px-1.5 py-0.5 min-w-[22px] tracking-wide">
                      {m.code}
                    </span>
                    <span className="text-xs font-semibold text-gray-600">{m.label}</span>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <CentreDonut
                      white={m.workingClass.white}
                      blue={m.workingClass.blue}
                      total={m.panelists.toLocaleString()}
                    />
                    <p className="text-[13px] font-semibold text-gray-500">Working Class Split (%)</p>
                  </div>

                  <div className="stack flex flex-col gap-3">
                    <StatRow label="White Collar" pct={m.workingClass.white} color={BLUE} track="#dbe1ec" />
                    <StatRow label="Blue Collar"  pct={m.workingClass.blue}  color={NAVY} track="#e5e7eb" />
                  </div>

                  <div className="stack border-t border-gray-200" />

                  <div className="stack flex items-center justify-between">
                    <span className="text-[13px] font-semibold uppercase tracking-widest text-gray-400">
                      Total Panelists
                    </span>
                    <span className="text-lg font-bold text-gray-800 tabular-nums">
                      {m.panelists.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block bg-gray-200 self-stretch" />

                <SplitColumn
                  label="Full Time"
                  market={m.label}
                  pct={fullTime}
                  accent={NAVY}
                  track="rgba(13,27,62,0.10)"
                  centreValue={fmt(100 - fullTime)}
                  centreLabel="Freelance, part-time or home-based"
                  className="lg:pl-10"
                />

              </div>

              {/* ── Four breakdowns, mixed chart forms ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
                {[
                  { chip: "Seniority",  heading: "Job Level by Share",   sub: "How the panel is distributed across seniority bands",        chart: <BarList    rows={m.jobLevel} /> },
                  { chip: "Employment", heading: "Job Type Breakdown",   sub: "The basis on which panelists in this market work",           chart: <StackedBar rows={m.jobType} /> },
                  { chip: "Function",   heading: "Panel by Department",  sub: `All ${m.department.length} business functions represented`,  chart: <Donut      rows={m.department} /> },
                  { chip: "Sector",     heading: "Leading Industries",   sub: `The top 6 of ${m.industry.length} sectors on the panel`,     chart: <BarList    rows={[...m.industry].sort((a, b) => b.pct - a.pct).slice(0, 6)} numbered /> },
                ].map((panel) => (
                  <ChartCard key={panel.chip} chip={panel.chip} heading={panel.heading} sub={panel.sub}>
                    {panel.chart}
                  </ChartCard>
                ))}
              </div>
            </motion.div>
          </div>

          <p className="text-sm text-gray-400 text-center mt-10">
            Source: Track Opinion B2B Panel Book 2026 · {b2bMarkets.length} of {PANEL_COUNTRIES.length} markets available on this page
          </p>
        </div>
      </section>

      {/* ════════ RECRUITMENT — shared ProcessSteps, same as CATI ════════ */}
      <ProcessSteps
        steps={recruitmentSteps}
        label="Recruitment"
        heading="How We Build the Panel"
        description="A long-term recruitment strategy that brings verified professionals onto the panel — and keeps them engaged."
        sectionClassName="bg-white py-20"
      />

      {/* ════════ VALIDATION ════════ */}
      <section className="py-20 bg-section">
        <div className="site-container px-6">
          <SectionHeader
            label="Validation Architecture"
            heading={<>How We Verify Every Panelist</>}
            description="Seven gates every panelist passes before they reach your study — each with a defined criterion and the method we use to prove it."
            theme="light"
            align="center"
          />

          {/* Editorial rows — the same numeral / title / copy layout the
              research pages use for their advantages. */}
          <div className="mt-12 border-t border-gray-200">
            {validationCriteria.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.5, ease: "easeOut" }}
                className="group relative border-b border-gray-200"
              >
                {/* hover wash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, rgba(13,27,62,0.05), transparent 60%)" }}
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-[100px_minmax(0,300px)_1fr] gap-x-10 gap-y-5 py-12">
                  {/* Numeral */}
                  <div className="hidden lg:block">
                    <span
                      className="font-black leading-none text-primary/[0.07] group-hover:text-primary/[0.14] transition-colors duration-300 tabular-nums"
                      style={{ fontSize: 68 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title + icon */}
                  <div className="flex items-start gap-4">
                    <span className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-9 h-9 text-white" strokeWidth={1.5} />
                    </span>
                    <div>
                      <span className="lg:hidden block text-xs font-black text-primary/25 mb-1 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-primary font-extrabold text-2xl leading-tight">{c.title}</h3>
                      <p className="text-gray-500 text-base leading-7 font-medium mt-3">{c.criteria}</p>
                    </div>
                  </div>

                  {/* How we verify */}
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-700 text-lg leading-9 font-medium">{c.validation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FRAUD DETECTION ════════ */}
      <section className="py-20 bg-primary overflow-hidden">
        <div className="site-container px-6">
          <SectionHeader
            label="Data Integrity"
            heading={<>Fraud Detection System</>}
            description="Ten layers of protection that keep fraudulent and duplicate responses out of your dataset."
            theme="dark"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {fraudDetection.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * (i % 3), duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col h-full rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1.5px dashed rgba(255,255,255,0.15)",
                  }}
                >
                  <div className="h-1.5 bg-white" />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5 text-primary font-bold text-sm bg-white tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug mb-2">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">{f.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PANEL ATTRIBUTES ════════ */}
      <section className="py-20 bg-white">
        <div className="site-container px-6">
          <SectionHeader
            label="Targeting"
            heading={<>Panel Attributes</>}
            description="The attributes you can screen and target on across our global B2B panel."
            theme="light"
            align="center"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <p className="text-base leading-8 font-medium text-gray-600">
              <span className="font-bold text-primary tabular-nums">{totalAttributes}</span> targetable attributes
              across <span className="font-bold text-primary">{panelAttributes.length}</span> groups
            </p>

            <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2.5 border border-gray-200 shadow-sm focus-within:border-primary/40 transition-colors w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={attrQuery}
                onChange={(e) => setAttrQuery(e.target.value)}
                placeholder="Filter attributes..."
                className="bg-transparent text-sm text-primary placeholder:text-gray-400 outline-none w-full"
              />
              {attrQuery && (
                <button
                  onClick={() => setAttrQuery("")}
                  aria-label="Clear filter"
                  className="text-gray-400 hover:text-primary shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Flowed into balanced columns so a long group does not force every
              card in its row to match its height. */}
          <div className="[column-fill:_balance] columns-1 md:columns-2 lg:columns-3 gap-6">
            {filteredAttributes.map((g) => (
              <div key={g.group} className="break-inside-avoid mb-6">
                <SiteCard>
                  <div className="p-7">
                    <div className="flex items-baseline justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                      <h3 className="text-gray-900 font-bold text-lg leading-snug">{g.group}</h3>
                      <span className="text-sm font-bold text-gray-300 tabular-nums shrink-0">
                        {g.items.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="text-sm text-gray-600 bg-section border border-gray-200 rounded-full px-3 py-1.5
                                     hover:border-primary/40 hover:bg-highlight hover:text-primary transition-colors duration-200"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </SiteCard>
              </div>
            ))}
          </div>

          {filteredAttributes.length === 0 && (
            <p className="text-center text-gray-400 text-base py-12">
              No attributes match &ldquo;{attrQuery}&rdquo;.{" "}
              <button onClick={() => setAttrQuery("")} className="underline hover:text-primary">Clear filter</button>
            </p>
          )}
        </div>
      </section>

      <SolutionEnquiryForm />

      <LatestReadsSection />
    </main>
  );
}
