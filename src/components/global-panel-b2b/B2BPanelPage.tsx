"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, BadgeCheck, Users2, Briefcase, Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import PanelBooks from "@/components/global-panel/PanelBooks";
import {
  b2bMarkets, TOTAL_PANELISTS, recruitmentStrategy, validationCriteria,
  fraudDetection, panelAttributes, type Slice,
} from "./b2bData";

const NAVY = "#0d1b3e";

/* ─────────── Horizontal bar list ─────────── */
function BarList({ rows }: { rows: Slice[] }) {
  const max = Math.max(...rows.map((r) => r.pct));
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r, i) => (
        <div key={r.label} className="grid grid-cols-[170px_1fr_50px] items-center gap-4">
          <span className="text-[13px] text-gray-600 text-right leading-tight">{r.label}</span>
          <div className="h-2.5 rounded-full bg-[#eef3f9] overflow-hidden">
            <motion.div
              className="h-2.5 rounded-full"
              style={{ background: NAVY }}
              initial={{ width: 0 }}
              animate={{ width: `${(r.pct / max) * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
            />
          </div>
          <span className="text-[13px] font-bold text-primary tabular-nums">{r.pct}%</span>
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
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"jobLevel" | "department" | "industry" | "jobType">("jobLevel");
  const [openCriteria, setOpenCriteria] = useState<number | null>(0);
  const [openAttr, setOpenAttr] = useState<number | null>(0);

  const m = b2bMarkets.find((x) => x.id === marketId) ?? b2bMarkets[0];

  const tabs = [
    { id: "jobLevel"   as const, label: "Job Level",  rows: m.jobLevel },
    { id: "department" as const, label: "Department", rows: [...m.department].sort((a, b) => b.pct - a.pct) },
    { id: "industry"   as const, label: "Industry",   rows: [...m.industry].sort((a, b) => b.pct - a.pct) },
    { id: "jobType"    as const, label: "Job Type",   rows: m.jobType },
  ];
  const activeTab = tabs.find((t) => t.id === tab)!;
  const fullTime = m.jobType.find((j) => j.label === "Full time")?.pct ?? 0;

  return (
    <main>
      <PageHero
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

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Header: market picker + headline stats */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between px-8 py-7 border-b border-gray-100">
              <div className="relative shrink-0">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 bg-section border border-gray-200 rounded-full pl-4 pr-3 py-2.5 hover:border-primary/40 transition-colors"
                >
                  <span className="inline-flex items-center justify-center bg-primary text-white text-[10px] font-semibold rounded px-1.5 py-0.5 min-w-[22px] tracking-wide">
                    {m.code}
                  </span>
                  <span className="text-sm font-bold text-primary">{m.label}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                  <div className="absolute top-[calc(100%+6px)] left-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden min-w-[220px]">
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

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10">
                <Stat icon={Users2}     value={m.panelists.toLocaleString()} label="Active Panelists" />
                <Stat icon={BadgeCheck} value={`${m.decisionMakers.yes}%`}   label="Decision Makers" />
                <Stat icon={ShieldCheck} value={`${m.workingClass.white}%`}  label="White Collar" />
                <Stat icon={Briefcase}  value={`${fullTime}%`}               label="Full Time" />
              </div>
            </div>

            {/* Tabs + single chart */}
            <div className="px-8 py-7">
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 ${
                      tab === t.id
                        ? "bg-primary text-white"
                        : "bg-section text-gray-600 hover:text-primary hover:bg-highlight"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${m.id}-${tab}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <BarList rows={activeTab.rows} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ RECRUITMENT ════════ */}
      <section className="bg-white py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Recruitment & Validation"
            heading={<>How We Build the Panel</>}
            description="A long-term recruitment strategy combined with an extensive validation architecture ensures panelists are of the highest quality."
            theme="light"
            align="center"
          />

          {/* Strategy — plain list, no cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-14">
            {recruitmentStrategy.map((r) => (
              <div key={r.label} className="flex items-start gap-4 pb-6 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-highlight text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-primary font-bold text-base mb-1">{r.label}</p>
                  <p className="text-gray-600 text-[15px] leading-7">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Validation accordion */}
          <div className="flex flex-col gap-3">
            {validationCriteria.map((c, i) => {
              const isOpen = openCriteria === i;
              return (
                <div key={c.title} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenCriteria(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors ${
                      isOpen ? "bg-primary text-white" : "bg-white hover:bg-section"
                    }`}
                  >
                    <span className={`font-bold text-base ${isOpen ? "text-white" : "text-primary"}`}>
                      {c.title}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 py-5 flex flex-col gap-4 bg-white">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Criteria</p>
                        <p className="text-gray-600 text-base leading-8">{c.criteria}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Validation</p>
                        <p className="text-gray-600 text-base leading-8">{c.validation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ FRAUD DETECTION ════════ */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1b3e 55%, #16305e 100%)" }}>
        <div className="site-container px-6">
          <SectionHeader
            label="Data Integrity"
            heading={<>Fraud Detection System</>}
            description="Ten layers of protection that keep fraudulent and duplicate responses out of your dataset."
            theme="dark"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-0">
            {fraudDetection.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
                className="flex items-start gap-5 py-6 border-b border-white/10"
              >
                <span className="text-blue-300/50 font-black text-lg tabular-nums shrink-0 w-7 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-white font-bold text-base mb-1.5">{f.title}</p>
                  <p className="text-white/60 text-[15px] leading-7">{f.desc}</p>
                </div>
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

          <div className="flex flex-col gap-3 max-w-4xl mx-auto">
            {panelAttributes.map((g, i) => {
              const isOpen = openAttr === i;
              return (
                <div key={g.group} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenAttr(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-section transition-colors"
                  >
                    <span className="font-bold text-base text-primary">{g.group}</span>
                    <span className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-gray-400 tabular-nums">{g.items.length}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="text-[13px] text-gray-600 bg-section border border-gray-200 rounded-full px-3 py-1.5"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PanelBooks />
    </main>
  );
}
