"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import LatestReadsSection from "@/components/shared/LatestReadsSection";
import { CheckCircle2 } from "lucide-react";

/* ═══════════════ Content types ═══════════════ */

export interface EnterpriseContent {
  hero: {
    breadcrumb: { name: string; href?: string }[];
    badge: string;
    heading: ReactNode;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  /** Editorial numbered rows */
  capabilities: {
    label: string;
    heading: ReactNode;
    description: string;
    items: { icon: LucideIcon; title: string; desc: string }[];
  };
  /** Alternating text / visual splits. `visual` is page-specific artwork. */
  sections: {
    label: string;
    heading: string;
    paragraphs: string[];
    bullets: string[];
    visual: ReactNode;
  }[];
  /** Navy numbered-card band */
  methods: {
    label: string;
    heading: ReactNode;
    description: string;
    items: { num: string; title: string; desc: string }[];
  };
}

/* Literal classes so Tailwind keeps them in the build */
const METHOD_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-3",
  6: "sm:grid-cols-3",
};

/* ═══════════════ Layout ═══════════════ */

export default function EnterprisePageLayout({ content }: { content: EnterpriseContent }) {
  const { hero, capabilities, sections, methods } = content;

  return (
    <main className="bg-white">
      <PageHero
        breadcrumb={hero.breadcrumb}
        badge={hero.badge}
        heading={hero.heading}
        description={hero.description}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      {/* ════════ CAPABILITIES — editorial rows ════════ */}
      <section id="capabilities" className="bg-white py-16 scroll-mt-24">
        <div className="site-container px-6">
          <SectionHeader
            label={capabilities.label}
            heading={capabilities.heading}
            description={capabilities.description}
            theme="light"
            align="center"
          />

          <div className="mt-12 border-t border-gray-200">
            {capabilities.items.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: "easeOut" }}
                  className="group relative border-b border-gray-200"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, rgba(26,111,232,0.05), transparent 60%)" }}
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-[100px_minmax(0,300px)_1fr] gap-x-10 gap-y-5 py-12">
                    <div className="hidden lg:block">
                      <span
                        className="font-black leading-none text-primary/[0.07] group-hover:text-primary/[0.14] transition-colors duration-300 tabular-nums"
                        style={{ fontSize: 68 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                        <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                      </span>
                      <div>
                        <span className="lg:hidden block text-xs font-black text-primary/25 mb-1 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-primary font-extrabold text-2xl leading-tight">{cap.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <p className="text-gray-700 text-lg leading-9 font-medium">{cap.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ CONTENT SECTIONS — alternating split ════════ */}
      {sections.map((sec, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={sec.heading} className={`py-20 ${flip ? "bg-section" : "bg-white"}`}>
            <div className="site-container px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                <motion.div
                  initial={{ opacity: 0, x: flip ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={flip ? "lg:order-2" : ""}
                >
                  {sec.visual}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: flip ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`flex flex-col gap-5 ${flip ? "lg:order-1" : ""}`}
                >
                  <SectionHeader
                    label={sec.label}
                    heading={<>{sec.heading}</>}
                    theme="light"
                    align="left"
                    className="!mb-0"
                  />

                  {sec.paragraphs.map((para, j) => (
                    <p key={j} className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">
                      {para}
                    </p>
                  ))}

                  <ul className="flex flex-col gap-3 mt-1">
                    {sec.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + j * 0.08, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 size={17} className="text-primary shrink-0" />
                        <span className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ════════ METHODS — navy band ════════ */}
      <section className="py-20 bg-primary overflow-hidden">
        <div className="site-container px-6">
          <SectionHeader
            label={methods.label}
            heading={methods.heading}
            description={methods.description}
            theme="dark"
            align="center"
          />

          <div className={`grid grid-cols-1 ${METHOD_COLS[methods.items.length] ?? "sm:grid-cols-3"} gap-6 mt-10`}>
            {methods.items.map((m, i) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col h-full rounded-2xl overflow-hidden text-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1.5px dashed rgba(255,255,255,0.15)",
                  }}
                >
                  <div className="h-1.5 bg-white" />
                  <div className="p-8 flex flex-col flex-1 items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary font-bold text-lg bg-white">
                      {m.num}
                    </div>
                    <h3 className="text-white font-bold text-lg leading-snug mb-3">{m.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">{m.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LatestReadsSection />
    </main>
  );
}
