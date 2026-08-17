"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, ShieldCheck, BadgeCheck, Users2, Briefcase,
  Network, UserCheck, Handshake, Activity, Search, X,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import PanelBooks from "@/components/global-panel/PanelBooks";
import ProcessSteps, { type ProcessStep } from "@/components/shared/ProcessSteps";
import {
  b2bMarkets, TOTAL_PANELISTS, recruitmentStrategy, validationCriteria,
  fraudDetection, panelAttributes, type Slice,
} from "./b2bData";

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

/* ─────────── Sub-panel wrapper ─────────── */
function ChartBlock({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
        <p className="text-[12px] font-bold uppercase tracking-widest text-primary">{title}</p>
        <p className="text-[12px] text-gray-400 text-right">{note}</p>
      </div>
      {children}
    </div>
  );
}

/* ─────────── 100% stacked bar ─────────── */
const STACK_FILLS = ["#0d1b3e", "#2a4a86", "#6f8fbf", "#c7d6ea"];

function StackedBar({ rows }: { rows: Slice[] }) {
  /* Shade by rank, not by data order, so the biggest slice is the darkest */
  const rank = [...rows].sort((a, b) => b.pct - a.pct).map((r) => r.label);
  const fillFor = (label: string) => STACK_FILLS[rank.indexOf(label)] ?? STACK_FILLS[3];

  return (
    <div>
      <div className="flex h-10 rounded-xl overflow-hidden gap-[3px] mb-5">
        {rows.map((r, i) => (
          /* Plain flexGrow + CSS transition — framer's width/flex animations
             have proved unreliable here and can leave bars stuck at zero. */
          <div
            key={r.label}
            className="flex items-center justify-center transition-[flex-grow] duration-700 ease-out"
            style={{ background: fillFor(r.label), flexGrow: r.pct, transitionDelay: `${i * 80}ms` }}
          >
            {r.pct > 12 && (
              <span
                className="text-[13px] font-bold"
                style={{ color: rank.indexOf(r.label) < 2 ? "#fff" : NAVY }}
              >
                {fmt(r.pct)}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Legend — larger type than the other panels, since Job Type has only
          four rows and the numbers are the point of the panel. */}
      <div className="flex flex-col">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
          >
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: fillFor(r.label) }} />
            <span className="text-[15px] text-gray-700">{r.label}</span>
            <span className="ml-auto text-[15px] font-bold text-primary tabular-nums">{fmt(r.pct)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Horizontal bar list ───────────
   Bars are scaled 0-100%, not to the set maximum, so a 26% bar is visibly
   shorter than a 43% bar across every panel. */
function BarList({ rows }: { rows: Slice[] }) {
  const top = Math.max(...rows.map((r) => r.pct));
  return (
    <div className="flex flex-col">
      {rows.map((r, i) => {
        const isTop = r.pct === top;
        return (
          <div
            key={r.label}
            className="grid grid-cols-[132px_1fr_58px] sm:grid-cols-[168px_1fr_58px] items-center gap-3
                       py-2.5 border-b border-gray-100 last:border-0"
          >
            <span className={`text-[15px] text-right leading-tight ${isTop ? "text-primary font-semibold" : "text-gray-700"}`}>
              {r.label}
            </span>
            <div className="h-2.5 rounded-full bg-[#eef3f9] overflow-hidden">
              {/* Width set directly with a CSS transition rather than a framer
                  animation, which was leaving bars stuck at 0px here. */}
              <div
                className="h-2.5 rounded-full transition-[width] duration-700 ease-out"
                style={{
                  background: isTop ? NAVY : "#4a6491",
                  width: `${r.pct}%`,
                  transitionDelay: `${i * 45}ms`,
                }}
              />
            </div>
            <span className={`text-[15px] tabular-nums text-right ${isTop ? "font-black text-primary" : "font-bold text-primary/70"}`}>
              {fmt(r.pct)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────── Donut with legend ─────────── */
const DONUT_FILLS = ["#0d1b3e", "#22406f", "#3a5d92", "#5b7cae", "#8ba3c6", "#b9c9dd", "#dde5ef"];

function Donut({ rows }: { rows: Slice[] }) {
  const R = 58, C = 2 * Math.PI * R;
  let offset = 0;
  const top = [...rows].sort((a, b) => b.pct - a.pct);

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="156" height="156" viewBox="0 0 156 156">
          {top.map((s, i) => {
            const len = (s.pct / 100) * C;
            const el = (
              <circle
                key={s.label}
                cx="78" cy="78" r={R} fill="none"
                stroke={DONUT_FILLS[Math.min(i, DONUT_FILLS.length - 1)]}
                strokeWidth="21"
                strokeDasharray={`${len} ${C}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 78 78)"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-primary leading-none">{fmt(top[0].pct)}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1 text-center px-5 leading-tight">
            {top[0].label}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        {top.slice(0, 6).map((s, i) => (
          <div
            key={s.label}
            className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
          >
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: DONUT_FILLS[Math.min(i, DONUT_FILLS.length - 1)] }} />
            <span className="text-[15px] text-gray-700 truncate">{s.label}</span>
            <span className="ml-auto text-[15px] font-bold text-primary tabular-nums shrink-0">{fmt(s.pct)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Ranked list with numerals ─────────── */
function RankedList({ rows }: { rows: Slice[] }) {
  const top = Math.max(...rows.map((r) => r.pct));
  return (
    <div className="flex flex-col">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className="group flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
        >
          <span className="w-5 text-[13px] font-black tabular-nums text-primary/25 shrink-0">
            {i + 1}
          </span>
          <span className={`text-[15px] flex-1 min-w-0 truncate ${i === 0 ? "text-primary font-semibold" : "text-gray-700"}`}>
            {r.label}
          </span>
          <div className="w-20 sm:w-28 h-1.5 rounded-full bg-[#eef3f9] overflow-hidden shrink-0">
            <div
              className="h-1.5 rounded-full transition-[width] duration-700 ease-out"
              style={{ background: i === 0 ? NAVY : "#4a6491", width: `${(r.pct / top) * 100}%`, transitionDelay: `${i * 45}ms` }}
            />
          </div>
          <span className={`text-[15px] tabular-nums w-14 text-right shrink-0 ${i === 0 ? "font-black text-primary" : "font-bold text-primary/70"}`}>
            {fmt(r.pct)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────── Stat tile ─────────── */
function Stat({ icon: Icon, value, label }: { icon: typeof Users2; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-11 h-11 rounded-xl bg-highlight flex items-center justify-center text-primary shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      <div>
        <p className="text-2xl font-extrabold text-primary leading-none tabular-nums">{value}</p>
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-1.5">{label}</p>
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

      {/* ════════ MARKET SNAPSHOT ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Panel Composition"
            heading={<>B2B Panel by Market</>}
            description="Pick a market to see how our panel breaks down by seniority, function, industry and employment type."
            theme="light"
            align="center"
          />

          <div className="relative">
            {/* soft brand glow behind the card for depth */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-70"
              style={{ background: "radial-gradient(50% 50% at 30% 0%, rgba(26,111,232,0.13), transparent 70%)" }}
            />

            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">

              {/* ── Navy header: market picker + headline figure + KPIs ── */}
              <div
                className="relative px-8 py-8"
                style={{ background: "linear-gradient(120deg, #0a1628 0%, #0d1b3e 55%, #16305e 100%)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />

                <div className="relative flex flex-col lg:flex-row lg:items-end gap-8 justify-between">
                  {/* Market + headline count */}
                  <div>
                    <div className="relative inline-block mb-4">
                      <button
                        onClick={() => setOpen((v) => !v)}
                        className="flex items-center gap-2 rounded-full pl-3 pr-2.5 py-2 border transition-colors"
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }}
                      >
                        <span className="inline-flex items-center justify-center bg-white text-primary text-[10px] font-bold rounded px-1.5 py-0.5 min-w-[22px] tracking-wide">
                          {m.code}
                        </span>
                        <span className="text-sm font-bold text-white">{m.label}</span>
                        <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>

                      {open && (
                        <div className="absolute top-[calc(100%+6px)] left-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden min-w-[230px] max-h-[320px] overflow-y-auto">
                          {b2bMarkets.map((mk) => (
                            <button
                              key={mk.id}
                              onClick={() => { setMarketId(mk.id); setOpen(false); }}
                              className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                                mk.id === marketId ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
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

                    <p className="text-4xl sm:text-5xl font-black text-white leading-none tabular-nums">
                      {m.panelists.toLocaleString()}
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-blue-300 mt-2">
                      Active B2B Panelists
                    </p>
                  </div>

                  {/* KPI trio */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:w-[440px]">
                    {[
                      { icon: BadgeCheck,  value: fmt(m.decisionMakers.yes), label: "Decision Makers" },
                      { icon: ShieldCheck, value: fmt(m.workingClass.white), label: "White Collar" },
                      { icon: Briefcase,   value: fmt(fullTime),             label: "Full Time" },
                    ].map((k) => {
                      const Icon = k.icon;
                      return (
                        <div
                          key={k.label}
                          className="rounded-2xl px-4 py-4 border"
                          style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" }}
                        >
                          <Icon className="w-4 h-4 text-blue-300 mb-3" />
                          <p className="text-xl font-extrabold text-white leading-none tabular-nums">{k.value}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/45 mt-1.5 leading-tight">
                            {k.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Four breakdowns, mixed chart forms ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                <div className="px-8 py-7 border-b border-gray-100 lg:border-b">
                  <ChartBlock title="Job Level" note="Share of panel">
                    <BarList rows={m.jobLevel} />
                  </ChartBlock>
                </div>

                <div className="px-8 py-7 border-b border-gray-100 lg:border-b">
                  <ChartBlock title="Job Type" note="Employment basis">
                    <StackedBar rows={m.jobType} />
                  </ChartBlock>
                </div>

                <div className="px-8 py-7">
                  <ChartBlock title="Department" note={`All ${m.department.length} functions`}>
                    <Donut rows={m.department} />
                  </ChartBlock>
                </div>

                <div className="px-8 py-7">
                  <ChartBlock title="Industry" note={`Top 6 of ${m.industry.length} sectors`}>
                    <RankedList rows={[...m.industry].sort((a, b) => b.pct - a.pct).slice(0, 6)} />
                  </ChartBlock>
                </div>
              </div>

              {/* ── Footer note ── */}
              <div className="px-8 py-4 bg-section border-t border-gray-100 flex flex-wrap items-center gap-x-6 gap-y-1">
                <p className="text-[12px] text-gray-400">
                  Source: Track Opinion B2B Panel Book 2026
                </p>
                <p className="text-[12px] text-gray-400">
                  {b2bMarkets.length} of 27 markets available on this page
                </p>
              </div>
            </div>
          </div>
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

      {/* ════════ VALIDATION — own section, own heading ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Validation Architecture"
            heading={<>How We Verify Every Panelist</>}
            description="Seven gates every panelist passes before they reach your study — each with a defined criterion and the method we use to prove it."
            theme="light"
            align="center"
          />

          {/* ── Validation pipeline — a spine of gates, each showing the
                 criterion on the left and how we verify it on the right. ── */}
          <div className="relative">
            {/* vertical spine */}
            <span
              aria-hidden
              className="hidden md:block absolute left-[27px] top-3 bottom-3 w-px"
              style={{ background: "linear-gradient(180deg, rgba(13,27,62,0.25), rgba(13,27,62,0.06))" }}
            />

            <div className="flex flex-col">
              {validationCriteria.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.45, ease: "easeOut" }}
                  className="group relative flex gap-0 md:gap-6 pb-4 last:pb-0"
                >
                  {/* Gate node */}
                  <div className="hidden md:flex flex-col items-center shrink-0 w-14">
                    <span
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative z-10
                                 transition-all duration-300 group-hover:scale-105"
                      style={{ background: NAVY, boxShadow: "0 0 0 5px var(--color-section)" }}
                    >
                      <ShieldCheck className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </span>
                    <span className="mt-2 text-[10px] font-black tabular-nums text-primary/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Gate card */}
                  <div className="flex-1 rounded-2xl border border-gray-200 bg-white overflow-hidden
                                  transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                      <span className="md:hidden text-[10px] font-black tabular-nums text-primary/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-primary font-bold text-base flex-1">{c.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider
                                       text-primary bg-highlight rounded-full px-2.5 py-1 shrink-0">
                        <BadgeCheck className="w-3 h-3" /> Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                      <div className="px-6 py-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                          Criterion
                        </p>
                        <p className="text-gray-700 text-[15px] leading-7">{c.criteria}</p>
                      </div>
                      <div className="px-6 py-5 bg-section/60">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                          How We Verify
                        </p>
                        <p className="text-gray-600 text-[15px] leading-7">{c.validation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Targeting"
            heading={<>Panel Attributes</>}
            description="The attributes you can screen and target on across our global B2B panel."
            theme="light"
            align="center"
          />

          {/* ── Attribute explorer — every attribute visible, flowed into
                 balanced columns, with a live filter across all groups. ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <p className="text-sm text-gray-500">
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
                <button onClick={() => setAttrQuery("")} className="text-gray-400 hover:text-primary shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="[column-fill:_balance] columns-1 md:columns-2 lg:columns-3 gap-6">
            {filteredAttributes.map((g) => (
              <div
                key={g.group}
                className="break-inside-avoid mb-6 bg-white rounded-2xl border border-gray-100 p-6"
              >
                <div className="flex items-baseline justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{g.group}</p>
                  <span className="text-[11px] font-bold text-gray-300 tabular-nums shrink-0">
                    {g.items.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="text-[13px] text-gray-600 bg-section border border-gray-200 rounded-full px-3 py-1.5
                                 hover:border-primary/40 hover:bg-highlight hover:text-primary transition-colors duration-200"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredAttributes.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-12">
              No attributes match &ldquo;{attrQuery}&rdquo;.{" "}
              <button onClick={() => setAttrQuery("")} className="underline hover:text-primary">Clear filter</button>
            </p>
          )}
        </div>
      </section>

      <PanelBooks />
    </main>
  );
}
