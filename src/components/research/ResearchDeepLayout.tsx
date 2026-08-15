"use client";

import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteCard from "@/components/ui/SiteCard";
import Button from "@/components/ui/Button";
import LatestReadsSection from "@/components/shared/LatestReadsSection";
import FloatingCards, { type FloatCard } from "@/components/shared/FloatingCards";

/* ═══════════════ Content types ═══════════════ */

export interface RadarDim {
  label: string;
  /** 0–1 */
  value: number;
  /** SVG angle, y-down: -90 = top */
  angle: number;
}

export interface OrbitNode {
  /** One entry per line of the label */
  label: string[];
  angle: number;
  /** Raw SVG path `d` strings, drawn on a 24×24 viewBox */
  icons: string[];
}

export type { FloatCard } from "@/components/shared/FloatingCards";

export interface ResearchDeepContent {
  hero: {
    /** Breadcrumb trail shown above the heading */
    breadcrumb?: { name: string; href?: string }[];
    badge: string;
    heading: React.ReactNode;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  methods: {
    label: string;
    heading: React.ReactNode;
    description: string;
    subheading: string;
    paragraphs: string[];
    items: { icon: LucideIcon; label: string; desc: string }[];
    radarLabel: string;
    radarDims: RadarDim[];
  };
  /** Floating-cards + bullets split. Omit to hide the section. */
  moreThanNumbers?: {
    heading: React.ReactNode;
    paragraphs: string[];
    bullets: string[];
    cards: [FloatCard, FloatCard, FloatCard];
  };
  /** Card grid of longer-form advantages. Omit to hide the section. */
  advantages?: {
    label: string;
    heading: React.ReactNode;
    description?: string;
    cards: { icon: LucideIcon; title: string; paragraphs: string[] }[];
  };
  benefits: {
    label: string;
    heading: React.ReactNode;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
    centerLabel: string;
    orbitNodes: OrbitNode[];
  };
  whyChoose: {
    label: string;
    heading: React.ReactNode;
    description: string;
    cards: { icon: LucideIcon; title: string; desc: string }[];
  };
  projectManagement: {
    label: string;
    heading: React.ReactNode;
    description: string;
    steps: { num: number; label: string; title: string; quote: string; desc: string }[];
  };
}

/* Literal classes so Tailwind keeps them in the build */
const PM_COLS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-3",
};

/* ═══════════════ Radar ═══════════════ */
const CX = 190, CY = 190, MAX_R = 130;
const guides = [0.25, 0.5, 0.75, 1];

function radarPt(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

const labelAnchor = (angle: number) => {
  if (Math.abs(angle) === 90) return "middle";
  return angle > -90 && angle < 90 ? "start" : "end";
};

function RadarChart({ dims }: { dims: RadarDim[] }) {
  const dataPts  = dims.map((d) => radarPt(d.angle, d.value * MAX_R));
  const fullPts  = dims.map((d) => radarPt(d.angle, MAX_R));
  const polyFull = dataPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const polyZero = dims.map(() => `${CX},${CY}`).join(" ");

  return (
    <svg viewBox="0 0 380 380" className="w-full max-w-sm">
      <defs>
        <radialGradient id="rfill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1a6fe8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1a6fe8" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* guide rings */}
      {guides.map((g, i) => {
        const pts = dims
          .map((d) => {
            const p = radarPt(d.angle, g * MAX_R);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
          })
          .join(" ");
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke={i === guides.length - 1 ? "#cbd5e1" : "#e2e8f0"}
            strokeWidth={i === guides.length - 1 ? "1.5" : "1"}
            strokeDasharray={i < guides.length - 1 ? "3 3" : "none"}
          />
        );
      })}

      {/* spokes */}
      {fullPts.map((p, i) => (
        <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />
      ))}

      {/* 50% ring labels */}
      {dims.map((d, i) => {
        const p = radarPt(d.angle, MAX_R * 0.5);
        return (
          <text key={i} x={p.x} y={p.y + 3} textAnchor="middle" fontSize="7" fill="#cbd5e1"
            style={{ fontFamily: "system-ui" }}>
            50%
          </text>
        );
      })}

      {/* data polygon */}
      <motion.polygon
        points={polyFull}
        fill="url(#rfill)"
        stroke="#0d1b3e"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ points: polyZero, opacity: 0 }}
        whileInView={{ points: polyFull, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />

      {/* dots */}
      {dataPts.map((p, i) => (
        <motion.circle
          key={i} cx={p.x} cy={p.y} r="5"
          fill="#0d1b3e" stroke="white" strokeWidth="2"
          style={{ filter: "drop-shadow(0 0 4px rgba(26,111,232,0.5))" }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.07, duration: 0.3, ease: "backOut" }}
        />
      ))}

      {/* spoke labels */}
      {dims.map((d, i) => {
        const p = radarPt(d.angle, MAX_R + 26);
        const anchor = labelAnchor(d.angle);
        return (
          <motion.g key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.08 }}
          >
            <text x={p.x} y={p.y - 4} textAnchor={anchor} fontSize="11" fontWeight="700" fill="#0d1b3e"
              style={{ fontFamily: "system-ui, sans-serif" }}>
              {d.label}
            </text>
            <text x={p.x} y={p.y + 9} textAnchor={anchor} fontSize="9" fontWeight="600" fill="#0d1b3e"
              style={{ fontFamily: "system-ui, sans-serif" }}>
              {Math.round(d.value * 100)}%
            </text>
          </motion.g>
        );
      })}

      <circle cx={CX} cy={CY} r="5" fill="#0d1b3e"
        style={{ filter: "drop-shadow(0 0 6px rgba(26,111,232,0.6))" }} />
    </svg>
  );
}

/* ═══════════════ Orbital diagram ═══════════════ */
function OrbitalDiagram({ nodes: nodeData, centerLabel }: { nodes: OrbitNode[]; centerLabel: string }) {
  const cx = 220, cy = 230, orbitR = 152, nodeR = 56;

  const nodes = nodeData.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + orbitR * Math.cos(rad), y: cy + orbitR * Math.sin(rad) };
  });

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 440 460" className="w-full max-w-[460px]">
        <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="#dde3ee" strokeWidth="1.5" />

        {nodes.map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 + i * 0.1, duration: 0.4, ease: "backOut" }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r={nodeR} fill="white" stroke="#e8ecf3" strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }} />
            <svg
              x={n.x - 11} y={n.y - nodeR + 14}
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#0d1b3e" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
            >
              {n.icons.map((p, j) => <path key={j} d={p} />)}
            </svg>
            {n.label.map((line, li) => (
              <text
                key={li}
                x={n.x}
                y={n.y + (n.label.length === 1 ? 8 : li === 0 ? 2 : 16)}
                textAnchor="middle" fontSize="12" fontWeight="700" fill="#0d1b3e"
              >
                {line}
              </text>
            ))}
          </motion.g>
        ))}

        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "backOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r={66} fill="#0d1b3e"
            style={{ filter: "drop-shadow(0 8px 24px rgba(13,27,62,0.28))" }} />
          <text x={cx} y={cy + 7} textAnchor="middle" fontSize="18" fontWeight="800" fill="white" letterSpacing="0.5">
            {centerLabel}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ═══════════════ Page ═══════════════ */
export default function ResearchDeepLayout({ content }: { content: ResearchDeepContent }) {
  const { hero, methods, moreThanNumbers, advantages, benefits, whyChoose, projectManagement } = content;

  return (
    <main>
      <PageHero
        breadcrumb={hero.breadcrumb}
        badge={hero.badge}
        heading={hero.heading}
        description={hero.description}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      {/* ════════ METHODS ════════ */}
      <section id="methods" className="py-20 bg-section">
        <div className="site-container px-6">
          <SectionHeader
            label={methods.label}
            heading={methods.heading}
            description={methods.description}
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">{methods.subheading}</h3>
                {methods.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-8 font-medium flex-1 mb-2 text-gray-600">{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {methods.items.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-md font-semibold leading-tight transition-colors duration-200">{m.label}</p>
                        <p className="text-sm leading-8 font-medium flex-1 text-gray-600">{m.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Radar */}
            <div className="flex flex-col items-center justify-center py-4 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {methods.radarLabel}
                </span>
              </div>
              <RadarChart dims={methods.radarDims} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ MORE THAN NUMBERS ════════ */}
      {moreThanNumbers && (
      <section className="py-20 bg-white">
        <div className="site-container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <FloatingCards cards={moreThanNumbers.cards} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              <SectionHeader
                label=""
                heading={moreThanNumbers.heading}
                description=""
                theme="light"
                align="left"
                className="!mb-0"
              />

              {moreThanNumbers.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">{p}</p>
              ))}

              <ul className="flex flex-col gap-3 mt-1">
                {moreThanNumbers.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
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
      )}

      {/* ════════ ADVANTAGES ════════ */}
      {advantages && (
        <section className="py-20 bg-white">
          <div className="site-container px-6">
            <SectionHeader
              label={advantages.label}
              heading={advantages.heading}
              description={advantages.description}
              theme="light"
              align="center"
            />

            {/* Editorial rows — no cards; number + title left, copy right */}
            <div className="mt-12 border-t border-gray-200">
              {advantages.cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
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
                      style={{ background: "linear-gradient(90deg, rgba(26,111,232,0.05), transparent 60%)" }}
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
                        <span className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
                          <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                        </span>
                        <div>
                          <span className="lg:hidden block text-xs font-black text-primary/25 mb-1 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-primary font-extrabold text-2xl leading-tight">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      {/* Copy */}
                      <div className="flex flex-col gap-4">
                        {card.paragraphs.map((p, pi) => (
                          <p
                            key={pi}
                            className="text-gray-700 text-lg leading-9 font-medium"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════ BENEFITS ════════ */}
      <section className="py-20 bg-section">
        <div className="site-container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <SectionHeader
                label={benefits.label}
                heading={benefits.heading}
                description=""
                theme="light"
                align="left"
                className="!mb-2"
              />
              {benefits.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">{p}</p>
              ))}
              <div>
                <Button href={benefits.ctaHref}>{benefits.ctaLabel}</Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              <OrbitalDiagram nodes={benefits.orbitNodes} centerLabel={benefits.centerLabel} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ WHY CHOOSE ════════ */}
      <section className="py-20 bg-white">
        <div className="site-container px-6">
          <SectionHeader
            label={whyChoose.label}
            heading={whyChoose.heading}
            description={whyChoose.description}
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {whyChoose.cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <SiteCard className="flex flex-col h-full">
                    <div className="p-7 flex flex-col flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
                        <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">{card.title}</h3>
                      <p className="text-gray-600 text-base leading-8 font-medium flex-1">{card.desc}</p>
                    </div>
                  </SiteCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ PROJECT MANAGEMENT ════════ */}
      <section className="py-20 bg-primary overflow-hidden">
        <div className="site-container px-6">
          <SectionHeader
            label={projectManagement.label}
            heading={projectManagement.heading}
            description={projectManagement.description}
            theme="dark"
            align="center"
          />

          <div className={`grid grid-cols-1 sm:grid-cols-2 ${PM_COLS[projectManagement.steps.length] ?? "lg:grid-cols-3"} gap-6 mt-10`}>
            {projectManagement.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.5 }}
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
                  <div className="h-1.5" style={{ background: "linear-gradient(90deg, #fff, #fff)" }} />
                  <div className="p-8 flex flex-col flex-1 items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary font-bold text-lg bg-white">
                      {step.num}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-3">{step.label}</p>
                    <h3 className="text-white font-bold text-lg leading-snug mb-2">{step.title}</h3>
                    <p className="text-white text-sm italic mb-4 font-medium">{step.quote}</p>
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">{step.desc}</p>
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
