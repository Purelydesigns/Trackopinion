"use client";

import { Fragment, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteCard from "@/components/ui/SiteCard";
import LatestReadsSection from "@/components/shared/LatestReadsSection";
import FaqAccordion, { type Faq } from "@/components/shared/FaqAccordion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

/* ═══════════════ Content types ═══════════════ */

export interface EnterpriseContent {
  hero: {
    breadcrumb: { name: string; href?: string }[];
    badge: string;
    heading: ReactNode;
    /** One paragraph, or an array for several. */
    description: string | string[];
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
    /** Optional — a section that carries none renders no list at all. */
    bullets?: string[];
    visual: ReactNode;
  }[];
  /** Navy card band — numbered, or icon-led where the cards are not a sequence */
  methods: {
    label: string;
    heading: ReactNode;
    /** One paragraph, or an array for several. */
    description: string | string[];
    /** Each card shows its `icon` when it has one, otherwise its `num`. */
    items: { num?: string; icon?: LucideIcon; title: string; desc: string }[];
  };
  /** Optional bands of cards, in order, between the navy band and the FAQs. */
  cardBands?: {
    label: string;
    heading: ReactNode;
    /** One paragraph, or an array for several. */
    description: string | string[];
    /** Optional run of steps shown as pills above the cards, e.g. Wave 1 → Wave 2 → Wave 3. */
    steps?: string[];
    /** Optional strip of short proof points under the cards. */
    strip?: string[];
    items: { title: string; desc: string }[];
  }[];
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

export default function EnterprisePageLayout({
  content,
  faqs,
  faqLabel,
  faqHeading,
}: {
  content: EnterpriseContent;
  /**
   * Pass the same list the route hands to `faqSchema`. FAQPage markup is only
   * valid when the questions are visible on the page.
   */
  faqs?: Faq[];
  /** Override the FAQ block's eyebrow and heading; it has its own defaults. */
  faqLabel?: string;
  faqHeading?: string;
}) {
  const { hero, capabilities, sections, methods, cardBands } = content;

  /* A single-string standfirst stays inside SectionHeader, exactly as the
     other enterprise pages render it. Several paragraphs get their own
     centred block underneath, which SectionHeader has no slot for. */
  const methodsLead = typeof methods.description === "string" ? methods.description : undefined;
  const methodsParagraphs = Array.isArray(methods.description) ? methods.description : null;

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
                    style={{ background: "linear-gradient(90deg, rgba(13,27,62,0.05), transparent 60%)" }}
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
          /* overflow-hidden: the visual panels carry a decorative -inset-6
             glow that reaches past the container and put a 20px horizontal
             scrollbar on the page. */
          <section key={sec.heading} className={`py-20 overflow-hidden ${flip ? "bg-section" : "bg-white"}`}>
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

                  {sec.bullets && sec.bullets.length > 0 && (
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
                  )}
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
            description={methodsLead}
            theme="dark"
            align="center"
            className={methodsParagraphs ? "!mb-6" : ""}
          />

          {methodsParagraphs && (
            <div className="mx-auto text-center flex flex-col gap-4">
              {methodsParagraphs.map((para, i) => (
                <p key={i} className="text-white/60 text-base leading-8 font-medium">
                  {para}
                </p>
              ))}
            </div>
          )}

          <div className={`grid grid-cols-1 ${METHOD_COLS[methods.items.length] ?? "sm:grid-cols-3"} gap-6 mt-10`}>
            {methods.items.map((m, i) => (
              <motion.div
                key={m.title}
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
                      {m.icon ? <m.icon className="w-6 h-6" strokeWidth={2} /> : m.num}
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

      {cardBands?.map((band, b) => (
        /* Alternating so two bands in a row stay visually separate. */
        <section key={band.label} className={`py-20 ${b % 2 === 0 ? "bg-section" : "bg-white"}`}>
          <div className="site-container px-6">
            <SectionHeader
              label={band.label}
              heading={band.heading}
              theme="light"
              align="center"
              className="!mb-6"
            />

            <div className="mx-auto text-center flex flex-col gap-4">
              {(Array.isArray(band.description) ? band.description : [band.description]).map((para, i) => (
                <p key={i} className="text-gray-600 text-base leading-8 font-medium">
                  {para}
                </p>
              ))}
            </div>

            {band.steps && band.steps.length > 0 && (
              <div className="flex items-center justify-center flex-wrap gap-3 mt-8">
                {band.steps.map((step, i) => (
                  <Fragment key={step}>
                    <span className="rounded-full border border-primary/15 bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
                      {step}
                    </span>
                    {i < band.steps!.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-primary/40 shrink-0" aria-hidden />
                    )}
                  </Fragment>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-10">
              {band.items.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.45 }}
                  className="h-full"
                >
                  <SiteCard className="h-full">
                    <div className="p-7 flex flex-col h-full">
                      <h3 className="text-primary font-bold text-lg leading-snug mb-2">{c.title}</h3>
                      <p className="text-gray-600 text-base leading-8 font-medium">{c.desc}</p>
                    </div>
                  </SiteCard>
                </motion.div>
              ))}
            </div>

            {band.strip && band.strip.length > 0 && (
              /* Ticker. The list is rendered twice and the track slides by
                 exactly half its width, so the loop has no visible seam; the
                 second copy is decorative and hidden from screen readers. */
              <div className="mt-10 overflow-hidden">
                <div className="flex w-max animate-marquee-ltr hover:[animation-play-state:paused] motion-reduce:animate-none">
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                      {band.strip!.map((point) => (
                        <span
                          key={point}
                          className="whitespace-nowrap border-l border-primary/15 px-6 text-sm font-bold uppercase tracking-wider text-primary/70"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {faqs && faqs.length > 0 && (
        <FaqAccordion faqs={faqs} label={faqLabel} heading={faqHeading} />
      )}

      <SolutionEnquiryForm />

      <LatestReadsSection />
    </main>
  );
}
