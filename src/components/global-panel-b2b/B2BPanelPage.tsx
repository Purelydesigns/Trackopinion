"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, BadgeCheck, Users2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteCard from "@/components/ui/SiteCard";
import PanelBooks from "@/components/global-panel/PanelBooks";
import {
  b2bMarkets, TOTAL_PANELISTS, recruitmentStrategy, validationCriteria,
  fraudDetection, panelAttributes, type Slice,
} from "./b2bData";

const NAVY = "#0d1b3e";
const BLUE = "#1a6fe8";

/* ─────────── Horizontal bar list ─────────── */
function BarList({ rows, accent = NAVY }: { rows: Slice[]; accent?: string }) {
  const max = Math.max(...rows.map((r) => r.pct));
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r, i) => (
        <div key={r.label} className="flex items-center gap-3">
          <span className="w-[150px] shrink-0 text-[13px] text-gray-600 text-right leading-tight">
            {r.label}
          </span>
          <div className="flex-1 h-5 rounded bg-[#eef3f9] overflow-hidden">
            <motion.div
              className="h-5 rounded"
              style={{ background: accent }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(r.pct / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
            />
          </div>
          <span className="w-[52px] shrink-0 text-[13px] font-semibold text-primary">
            {r.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────── Donut ─────────── */
function Donut({ pct, label, sub }: { pct: number; label: string; sub: string }) {
  const R = 46, C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={R} fill="none" stroke="#e6edf5" strokeWidth="13" />
          <motion.circle
            cx="60" cy="60" r={R} fill="none" stroke={BLUE} strokeWidth="13"
            strokeLinecap="round" transform="rotate(-90 60 60)"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C - (pct / 100) * C }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-primary">{pct}%</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

/* ─────────── Card shell ─────────── */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <p className="text-[13px] font-bold uppercase tracking-widest text-gray-500 mb-5">{title}</p>
      {children}
    </div>
  );
}

export default function B2BPanelPage() {
  const [marketId, setMarketId] = useState(b2bMarkets[0].id);
  const [open, setOpen] = useState(false);
  const [openCriteria, setOpenCriteria] = useState<number | null>(0);
  const m = b2bMarkets.find((x) => x.id === marketId) ?? b2bMarkets[0];

  return (
    <main>
      <PageHero
        badge={`B2B Panel — ${TOTAL_PANELISTS.toLocaleString()} Active Panelists`}
        heading={
          <>
            Delivering Data &amp; Insights<br />
            for Businesses
          </>
        }
        description="Tap into our diverse global B2B panel for unique market perspectives — validated decision-makers across industries, seniority levels and functions worldwide."
        primaryCta={{ label: "Request B2B Sample", href: "/contact-us" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact-us" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      {/* ════════ MARKET DATA ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Panel Composition"
            heading={<>B2B Panel by Market</>}
            description="Job type, seniority, department and industry breakdowns for every market in our B2B panel."
            theme="light"
            align="center"
          />

          {/* Market selector */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Market</span>
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-4 pr-3 py-2.5 shadow-sm hover:border-primary/40 transition-colors"
              >
                <span className="inline-flex items-center justify-center bg-[#1a6fe8] text-white text-[10px] font-semibold rounded px-1.5 py-0.5 min-w-[22px] tracking-wide">
                  {m.code}
                </span>
                <span className="text-sm font-semibold text-gray-700">{m.label}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[calc(100%+6px)] left-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden min-w-[220px]"
                  >
                    {b2bMarkets.map((mk) => (
                      <button
                        key={mk.id}
                        onClick={() => { setMarketId(mk.id); setOpen(false); }}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                          mk.id === marketId ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center text-[10px] font-semibold rounded px-1.5 py-0.5 min-w-[22px] ${
                          mk.id === marketId ? "bg-white/20 text-white" : "bg-[#1a6fe8] text-white"
                        }`}>
                          {mk.code}
                        </span>
                        {mk.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Headline stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-primary shrink-0">
                    <Users2 className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-extrabold text-primary leading-none">
                      {m.panelists.toLocaleString()}
                    </p>
                    <p className="text-[13px] font-semibold uppercase tracking-widest text-gray-400 mt-1">
                      Active Panelists
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-primary shrink-0">
                    <BadgeCheck className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-extrabold text-primary leading-none">
                      {m.decisionMakers.yes}%
                    </p>
                    <p className="text-[13px] font-semibold uppercase tracking-widest text-gray-400 mt-1">
                      Decision Makers
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-primary shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-extrabold text-primary leading-none">
                      {m.workingClass.white}%
                    </p>
                    <p className="text-[13px] font-semibold uppercase tracking-widest text-gray-400 mt-1">
                      White Collar
                    </p>
                  </div>
                </div>
              </div>

              {/* Job type + working class */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Panel title="Job Type">
                  <BarList rows={m.jobType} accent={BLUE} />
                </Panel>
                <Panel title="Working Class">
                  <div className="flex items-center justify-center gap-12 py-2">
                    <Donut pct={m.workingClass.white} label="White collar" sub="Office-based roles" />
                    <Donut pct={m.workingClass.blue}  label="Blue collar"  sub="Field & trade roles" />
                  </div>
                </Panel>
              </div>

              {/* Job level + department */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Panel title="Job Level">
                  <BarList rows={m.jobLevel} />
                </Panel>
                <Panel title="Department">
                  <BarList rows={m.department} accent={BLUE} />
                </Panel>
              </div>

              {/* Industry */}
              <Panel title="Industry">
                <BarList rows={m.industry} />
              </Panel>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════ RECRUITMENT & VALIDATION ════════ */}
      <section className="bg-white py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Recruitment & Validation"
            heading={<>B2B Panel Recruitment Criteria</>}
            description="A long-term recruitment strategy combined with an extensive validation architecture ensures panelists are of the highest quality."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {recruitmentStrategy.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <SiteCard className="h-full">
                  <div className="p-6">
                    <p className="text-primary font-bold text-base mb-2">{r.label}</p>
                    <p className="text-gray-600 text-sm leading-7">{r.desc}</p>
                  </div>
                </SiteCard>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {validationCriteria.map((c, i) => {
              const isOpen = openCriteria === i;
              return (
                <div key={c.title} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenCriteria(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors ${
                      isOpen ? "bg-primary text-white" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <span className={`font-bold text-base ${isOpen ? "text-white" : "text-primary"}`}>
                      {c.title}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-white"
                      >
                        <div className="px-6 py-5 flex flex-col gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Criteria</p>
                            <p className="text-gray-600 text-base leading-8">{c.criteria}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Validation</p>
                            <p className="text-gray-600 text-base leading-8">{c.validation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ FRAUD DETECTION ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Data Integrity"
            heading={<>Fraud Detection System</>}
            description="Ten layers of protection that keep fraudulent and duplicate responses out of your dataset."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fraudDetection.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <SiteCard className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    <span className="w-9 h-9 rounded-lg bg-highlight text-primary text-sm font-bold flex items-center justify-center mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-primary font-bold text-base mb-2">{f.title}</p>
                    <p className="text-gray-600 text-sm leading-7">{f.desc}</p>
                  </div>
                </SiteCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PANEL ATTRIBUTES ════════ */}
      <section className="bg-white py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Targeting"
            heading={<>Panel Attributes</>}
            description="The attributes you can screen and target on across our global B2B panel."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {panelAttributes.map((g, i) => (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className={i === 1 ? "lg:row-span-2" : ""}
              >
                <SiteCard className="h-full">
                  <div className="p-6">
                    <p className="text-primary font-bold text-base mb-4">{g.group}</p>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="text-[13px] text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </SiteCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PanelBooks />
    </main>
  );
}
