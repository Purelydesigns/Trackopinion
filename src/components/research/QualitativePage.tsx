"use client";

import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { Users, MessageSquare, BookOpen, Globe, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

/* ─────────────── Methods data ─────────────── */
const methods = [
  {
    icon: Users,
    label: "Focus Group Interviews",
    desc: "In-person or virtual moderated group discussions",
  },
  {
    icon: MessageSquare,
    label: "In-Depth Interviews (IDI)",
    desc: "One-on-one expert conversations for rich context",
  },
  {
    icon: BookOpen,
    label: "Diary Studies",
    desc: "Longitudinal self-reporting of user behaviour",
  },
  {
    icon: Globe,
    label: "Online Communities",
    desc: "Digital qualitative platforms for ongoing insight",
  },
];

/* ─────────────── Methods section ─────────────── */
function MethodsSection() {
  return (
    <section className="py-20 bg-section">
      <div className="site-container px-6">

        {/* Section header — centred */}
        <SectionHeader
          label="Why It Matters"
          heading={
            <>
              Facts That Reveal the Reasons<br />
              Behind Users&apos; Emotions{" "}
            </>
          }
          description={
            "Learn your audience's opinions in depth through complex and elaborate methods like focus group interviews, diary studies, and online surveys with open-ended questions."
          }
          theme="light"
          align="center"
        />

        {/* Content — full width, no right image */}
        <div className="">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-primary mb-3">
              Qualitative Market Research Methods{" "}
            </h3>
            <p className="text-base leading-8 font-medium flex-1 mb-2 text-gray-600">
              Qualitative research companies help you explore hidden opinions inside your users&apos; hearts. What numbers can&apos;t reveal, we can.
            </p>
            <p className="text-base leading-8 font-medium flex-1 mb-2 text-gray-600">
              At Track Opinion, we use diverse methods based on your project needs. Digital discussions, physical communities, web-enabled or real-time focus groups, and in-person or CATI interviews are some primary methods qualitative research agencies in India deploy.
            </p>
          </div>

          {/* Method cards — 2 col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {methods.map((m, i) => {
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
                    <Icon size={18} className="text-blue-500" />
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

      </div>
    </section>
  );
}

/* ─────────────── More Than Numbers data ─────────────── */
const bullets = [
  "Validated panelist profiles with a minimum of 6 months engagement history",
  "Psychographic & demographic data that truly reflects your target audience",
  "Rigorous quality checks at every stage of the research process",
];

function MiniBarChart() {
  const bars = [0.35, 0.55, 0.75, 1];
  return (
    <div className="flex items-end gap-2 h-12 mt-4">
      {bars.map((h, i) => (
        <div
          key={i}
          className="rounded flex-1"
          style={{
            height: `${h * 100}%`,
            background: i === bars.length - 1 ? "#1a6fe8" : i === bars.length - 2 ? "#60a5fa" : "#bfdbfe",
          }}
        />
      ))}
    </div>
  );
}

/* bounce variants — each card gets a different amplitude + duration */
const bounceVariants = [
  { y: [0, -14, 0], duration: 3.2 },
  { y: [0, -10, 0], duration: 2.6 },
  { y: [0, -18, 0], duration: 3.8 },
];

function FloatingCards() {
  return (
    <div className="relative w-full h-[560px]">

      {/* decorative bg blobs */}
      <div className="absolute w-48 h-48 rounded-full bg-blue-50 opacity-70 bottom-0 right-8 blur-3xl pointer-events-none" />
      <div className="absolute w-28 h-28 rounded-full bg-blue-100 opacity-40 top-6 right-2 blur-2xl pointer-events-none" />

      {/* card 1 — Research with bar chart (top-left, large) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0, duration: 0.55 }}
        animate={{ y: bounceVariants[0].y }}
        // @ts-ignore — framer accepts both initial+whileInView and animate together
        style={{ top: "2%", left: "2%", position: "absolute" }}
      >
        <motion.div
          animate={{ y: bounceVariants[0].y }}
          transition={{ duration: bounceVariants[0].duration, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white rounded-2xl shadow-xl px-6 py-5 w-74"
          style={{ rotate: -4 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1.5">Research</p>
          <p className="text-base font-bold text-gray-800 leading-snug">Analysis &amp; Research...</p>
          <span className="inline-block mt-2.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full px-3 py-1">Results</span>
          <MiniBarChart />
        </motion.div>
      </motion.div>

      {/* card 2 — Analysis (right, mid height) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.14, duration: 0.55 }}
        style={{ top: "30%", right: "0%", position: "absolute" }}
      >
        <motion.div
          animate={{ y: bounceVariants[1].y }}
          transition={{ duration: bounceVariants[1].duration, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl px-6 py-5 w-66"
          style={{ rotate: 3 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1.5">Analysis</p>
          <p className="text-base font-bold text-gray-800 leading-snug">Research</p>
          <p className="text-xs text-gray-400 mt-1">Analysis &amp; Research...</p>
          <span className="inline-block mt-2.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full px-3 py-1">Results</span>
        </motion.div>
      </motion.div>

      {/* card 3 — Deep Consumer Insights (bottom-left) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.26, duration: 0.55 }}
        style={{ top: "55%", left: "8%", position: "absolute" }}
      >
        <motion.div
          animate={{ y: bounceVariants[2].y }}
          transition={{ duration: bounceVariants[2].duration, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="bg-white rounded-2xl shadow-xl px-6 py-5 w-70"
          style={{ rotate: -2 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1.5">Insight</p>
          <p className="text-base font-bold text-gray-800 leading-snug">Deep Consumer<br />Insights</p>
          <div className="flex gap-2 mt-4">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-300 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-100 inline-block" />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}

/* ─────────────── More Than Numbers section ─────────────── */
function MoreThanNumbersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FloatingCards />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase leading-tight mb-2 text-primary">
              More Than Numbers
            </h2>
            <p className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">
              At Track Opinion, we believe market research is bigger than numbers. That&apos;s
              why we analyze the &lsquo;whys&rsquo; and &lsquo;hows&rsquo; rather than just &lsquo;what and how many&rsquo;
              through user behavior.
            </p>
            <p className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">
              We only vet and onboard panelists with validated profiles and at least 6 months
              of experience. Our panel members&apos; psychographic and demographic data
              reflects your audience segment.
            </p>

            <ul className="flex flex-col gap-3 mt-1">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={17} className="text-blue-500 shrink-0" />
                  <span className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────── Benefits orbital diagram ─────────────── */
/* SVG angle system (y-down): -90°=top, 0°=right, 90°=bottom, 180°=left */
const orbitNodes = [
  {
    label: ["User", "Behaviour"],
    angle: -90,   /* 12 o'clock — top center */
    icons: [
      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
      "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    ],
  },
  {
    label: ["Emotion"],
    angle: 195,   /* ~8 o'clock — left, slightly below center */
    icons: ["M22 12h-4l-3 9L9 3l-3 9H2"],
  },
  {
    label: ["Trust"],
    angle: -20,   /* ~2 o'clock — right, slightly above center */
    icons: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  },
  {
    label: ["Mindset"],
    angle: 122,   /* ~7 o'clock — lower-left */
    icons: [
      "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z",
      "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
      "M12 17h.01",
    ],
  },
  {
    label: ["Influences"],
    angle: 50,    /* ~4 o'clock — lower-right */
    icons: [
      "M17 8h1a4 4 0 0 1 0 8h-1",
      "M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z",
      "M6 1v3M10 1v3",
    ],
  },
];

function OrbitalDiagram() {
  const cx = 220, cy = 230, orbitR = 152, nodeR = 56;

  const nodes = orbitNodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + orbitR * Math.cos(rad), y: cy + orbitR * Math.sin(rad) };
  });

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 440 460" className="w-full max-w-[460px]">

        {/* orbit ring — solid, light gray */}
        <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="#dde3ee" strokeWidth="1.5" />

        {/* satellite nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 + i * 0.1, duration: 0.4, ease: "backOut" }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {/* white circle */}
            <circle cx={n.x} cy={n.y} r={nodeR} fill="white" stroke="#e8ecf3" strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }} />
            {/* icon — 22×22, centred above text */}
            <svg
              x={n.x - 11} y={n.y - nodeR + 14}
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#1a6fe8" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
            >
              {n.icons.map((p, j) => <path key={j} d={p} />)}
            </svg>
            {/* label lines */}
            {n.label.map((line, li) => (
              <text
                key={li}
                x={n.x}
                y={n.y + (n.label.length === 1 ? 8 : li === 0 ? 2 : 16)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#0d1b3e"
              >
                {line}
              </text>
            ))}
          </motion.g>
        ))}

        {/* centre node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "backOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r={66} fill="#0d1b3e"
            style={{ filter: "drop-shadow(0 8px 24px rgba(13,27,62,0.28))" }} />
          <text x={cx} y={cy + 7} textAnchor="middle"
            fontSize="18" fontWeight="800" fill="white" letterSpacing="0.5">
            Quality
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ─────────────── Benefits section ─────────────── */
function BenefitsSection() {
  return (
    <section className="py-20 bg-section">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <SectionHeader
              label="Benefits"
              heading={
                <>
                  Benefits of Qualitative<br />Research{" "}
                </>
              }
              description=""
              theme="light"
              align="left"
              className="!mb-2"
            />
            <p className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">
              Qualitative data offers motivation behind user behavior, mindsets, and influences. These methods, alongside social media listening, help qualitative research companies learn about users' needs, demands, pain points, and underlying granular nuances.
            </p>
            <p className="text-base leading-8 font-medium flex-1 mb-1 text-gray-600">
              With thoughtfully curated open-ended questions, you can now extract the
              unexplored that quantitative data can&apos;t.
            </p>
            <div>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #1a6fe8 0%, #1458c8 100%)" }}
              >
                Discuss Your Research →
              </a>
            </div>
          </motion.div>

          {/* Right — orbital diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <OrbitalDiagram />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────── Page ─────────────── */
export default function QualitativePage() {
  return (
    <main>
      <PageHero
        badge="Consumer Insights · Deep Qualitative Research"
        heading={
          <>
            Qualitative Market Research{" "}
          </>
        }
        description="Improve Your Offering with Qualitative Market Research. Understand the emotions, motivations, and behaviours that drive your audience — beyond what numbers can reveal."
        primaryCta={{ label: "Start a Research Project", href: "/contact-us" }}
        secondaryCta={{ label: "Explore Methods", href: "#methods" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />
      <MethodsSection />
      <MoreThanNumbersSection />
      <BenefitsSection />
    </main>
  );
}
