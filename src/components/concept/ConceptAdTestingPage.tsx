"use client";

;
import { motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  ClipboardPen,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import ProcessSteps, { type ProcessStep } from "../shared/ProcessSteps";
import PageHero from "../ui/PageHero";
import SectionHeader from "../ui/SectionHeader";
import SiteCard from "../ui/SiteCard";
import LatestReadsSection from "../shared/LatestReadsSection";
import FaqAccordion from "../shared/FaqAccordion";
import { ConceptScorecard, AdAttentionVisual } from "./ConceptVisuals";
import { faqs } from "./faqs";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

/* ── Capability cards with relevant icons ── */
const capabilities = [
  {
    title: "Product Concept Testing",
    desc: "Evaluate early product, service, or design ideas before moving them further into development.",
    bullets: [
      "Appeal and relevance",
      "Clarity and credibility",
      "Differentiation from current alternatives",
      "Purchase interest and barriers",
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6a12 12 0 0 1 8 20.8V30a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-3.2A12 12 0 0 1 24 6z" />
        <path d="M20 32v2a4 4 0 0 0 8 0v-2" />
        <line x1="24" y1="6" x2="24" y2="2" />
        <line x1="10" y1="12" x2="7" y2="9" />
        <line x1="38" y1="12" x2="41" y2="9" />
        <line x1="6" y1="24" x2="2" y2="24" />
        <line x1="42" y1="24" x2="46" y2="24" />
      </svg>
    ),
  },
  {
    title: "Product, Packaging, & Proposition Evaluation",
    desc: "Assess the factors that oversee how an offer is understood: descriptions, claims, packaging routes, feature combinations, or price perceptions.",
    bullets: [
      "What your audience notices first",
      "How claims and packaging shape expectations",
      "Points of confusion and perceived trade-offs",
      "Fair comparison of alternatives",
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4 42 13v22L24 44 6 35V13Z" />
        <path d="M6 13l18 9 18-9" />
        <line x1="24" y1="22" x2="24" y2="44" />
        <path d="M15 8.5 33 17.5" />
      </svg>
    ),
  },
  {
    title: "Creative & Advertising Testing",
    desc: "Evaluate ads before launch or while creative is still in development.",
    bullets: [
      "Message takeout and brand linkage",
      "Relevance and credibility",
      "Engagement and response",
      "What to change before rollout",
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 16h6l18-8v32L14 32H8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" />
        <path d="M32 18c3 1.5 5 4 5 6s-2 4.5-5 6" />
        <path d="M14 32v8" />
      </svg>
    ),
  },
];

const contentSections = [
  {
    label: "Concept Testing",
    heading: "What concept testing helps you decide?",
    paragraphs: [
      "Concept testing shows how your audience reacts to an idea while it can still be modified. You share a written concept, visual, or prototype with your target audience and learn what they notice, what they appreciate, and what holds them back.",
    ],
    bullets: [
      "Which ideas merit further development and which need refinement",
      "Whether the proposition is understood and believed",
      "What makes it different from what’s already available",
    ],
  },
  {
    label: "Ad Testing",
    heading: "Understand what your ad communicates, not just whether it’s liked",
    paragraphs: [
      "Test scripts, storyboards, rough cuts, or finished creative to learn what your audience notices and remembers, whether the message reflects your brand, and which elements to refine before rollout.",
    ],
    bullets: [
      "Test scripts and storyboards early before production starts",
      "Measure message takeout, brand linkage, relevance, and credibility",
      "Learn which elements work and which need polishing for effective marketing",
    ],
  },
];

/* The worked example, as a table: a research question, what the study reads
   to answer it, and what the answer is good for. */
const workedExample = [
  {
    question: "Which is clearer?",
    examines: "Understanding of the benefit and promise",
    use: "Rewrite unclear wording before launch",
  },
  {
    question: "Which feels more relevant?",
    examines: "Appeal and fit with the need or occasion",
    use: "Prioritize the best-fit proposition",
  },
  {
    question: "What creates hesitation?",
    examines: "Credibility concerns, missing information, trade-offs",
    use: "Address the barrier in the next iteration",
  },
  {
    question: "Does the brand come through?",
    examines: "Attribution and fit with positioning",
    use: "Strengthen brand cues if weak",
  },
];

/* How a concept or ad study is put together. `desc` is the line under the
   rail, `detail.body` the full sentence once a step is opened. */
const designSteps: ProcessStep[] = [
  {
    num: "01",
    label: "Define the decision and priorities",
    desc: "What the study has to settle",
    icon: <Target className="w-6 h-6" />,
    detail: {
      title: "Step 01 — Define the decision and priorities",
      body: "Clarify the objective, whether it is selection, refinement, launch readiness, creative optimization, or identifying next steps.",
    },
  },
  {
    num: "02",
    label: "Identify the audience",
    desc: "Who the respondents are",
    icon: <Users className="w-6 h-6" />,
    detail: {
      title: "Step 02 — Identify the audience",
      body: "Define respondents by category use, needs, behaviour, or geography.",
    },
  },
  {
    num: "03",
    label: "Select the research method",
    desc: "Qualitative, quantitative, or staged",
    icon: <Workflow className="w-6 h-6" />,
    detail: {
      title: "Step 03 — Select the research method",
      body: "Determine the right qualitative, quantitative, or staged approach.",
    },
  },
  {
    num: "04",
    label: "Prepare the stimulus and questionnaire",
    desc: "Neutral stimuli and measures",
    icon: <ClipboardPen className="w-6 h-6" />,
    detail: {
      title: "Step 04 — Prepare the stimulus and questionnaire",
      body: "Develop neutral, relevant stimuli and measures aligned with the research objectives.",
    },
  },
  {
    num: "05",
    label: "Collect and quality-check data",
    desc: "Eligibility, sample, response patterns",
    icon: <ShieldCheck className="w-6 h-6" />,
    detail: {
      title: "Step 05 — Collect and quality-check data",
      body: "Validate respondent eligibility, sample quality, and response patterns.",
    },
  },
  {
    num: "06",
    label: "Interpret the findings",
    desc: "Strengths, barriers, and next steps",
    icon: <Lightbulb className="w-6 h-6" />,
    detail: {
      title: "Step 06 — Interpret the findings",
      body: "Identify strengths, barriers, and actionable insights, including what the evidence supports and where further testing may help.",
    },
  },
];

/* What lands at the end of a study, and the categories it is run in. */
const reportContents = [
  { title: "Executive summary" },
  { title: "Method and sample" },
  { title: "Side-by-side concept or creative comparison" },
  { title: "Audience differences", note: "Where the sample supports it" },
  { title: "Open-ended themes" },
  { title: "Recommendations and next steps" },
];

const industries = [
  "FMCG",
  "Personal care",
  "Consumer durables",
  "Retail and e-commerce",
  "Technology",
  "Financial services",
  "Healthcare-related products",
  "B2B",
];

export default function ConceptAdTestingPage() {

  return (
    <main className="bg-white">

      <PageHero
          breadcrumb={[{ name: "Enterprise Solution" }, { name: "Product Concept & Ad Testing" }]}
          badge="Product Concept & Creative Ad Testing"
          heading={
            <>
              Test the idea before you take it to market
            </>
          }
          description="Understand how your audience responds to a product concept, proposition, or advertising idea before you commit to wider development or campaign spend. We help you reach the right people to ask the right questions and turn their feedback into a practical business plan."
          primaryCta={{ label: "Discuss Your Project", href: "/contact-us" }}
          secondaryCta={{ label: "Explore Testing Options", href: "#capabilities" }}
          minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
        />

      {/* ════════ CAPABILITIES ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">

          <SectionHeader
              label="What We Test"
              heading={<>Choose the right test for the decisions <br></br>you need to make</>}
              description="A concept that sounds appealing may lack a clear point of difference. An advertisement may attract attention without communicating the message or linking it to the brand. A precise test depends on what you need to decide and how far your product or campaign has progressed."
              theme="light"
              align="center"
            />

          {/* Editorial rows — no cards; number + title left, copy right */}
          <div className="mt-12 border-t border-gray-200">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
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

                <div className="relative grid grid-cols-1 lg:grid-cols-[100px_minmax(0,400px)_1fr] gap-x-10 gap-y-5 py-12">
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
                      {cap.icon}
                    </span>
                    <div>
                      <span className="lg:hidden block text-xs font-black text-primary/25 mb-1 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-primary font-extrabold text-2xl leading-tight">
                        {cap.title}
                      </h3>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-700 text-lg leading-9 font-medium">{cap.desc}</p>

                    <ul className="flex flex-col gap-2">
                      {cap.bullets.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <CheckCircle2 size={17} className="text-primary shrink-0 mt-2" />
                          <span className="text-gray-600 text-base leading-8 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS — alternating split, same rhythm as the Qualitative page */}
      {contentSections.map((sec, i) => {
        const flip = i % 2 === 1;
        return (
          /* overflow-hidden: these columns animate in from an x offset and the
             visual panels carry a decorative -inset-6 glow, both of which reach
             past the container and put horizontal scroll on the page. */
          <section key={i} className={`py-20 overflow-hidden ${flip ? "bg-section" : "bg-white"}`}>
            <div className="site-container px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, x: flip ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={flip ? "lg:order-2" : ""}
                >
                  {i === 0 ? <ConceptScorecard /> : <AdAttentionVisual />}
                </motion.div>

                {/* Text */}
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

      {/* ════════ METHODS (bg-primary) ════════ */}
      <section className="py-20 bg-primary overflow-hidden">
        <div className="site-container px-6">

          <SectionHeader
            label="How the Study Works"
            heading={<>What a Concept and Ad Test Helps You Answer</>}
            description="Four research questions, what each one examines, and how to act on the result."
            theme="dark"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            {workedExample.map((row, i) => (
              <motion.div
                key={row.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
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
                    {/* The question the card answers — numbered badge above a
                        centred title, matching the numbered bands elsewhere. */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <span className="w-12 h-12 rounded-full bg-white text-primary font-bold text-lg flex items-center justify-center mb-4 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-snug">{row.question}</h3>
                    </div>

                    {/* What it reads, and what the answer is good for */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-white/10 pt-5">
                      {[
                        { label: "What the study examines", value: row.examines },
                        { label: "How it can be used", value: row.use },
                      ].map((col) => (
                        <div key={col.label}>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1.5">
                            {col.label}
                          </p>
                          <p className="text-slate-300 text-sm leading-relaxed font-normal">{col.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-slate-400 text-xs leading-relaxed">
            Illustrative scenario, not a Track Opinion case study or a claim of measured
            commercial impact.
          </p>
        </div>
      </section>

      {/* ════════ HOW WE DESIGN THE STUDY ════════ */}
      <ProcessSteps
        steps={designSteps}
        label="The Process"
        heading={<>How We Design the Study</>}
        description="Six steps from the decision you need to make to the findings you can act on."
        sectionClassName="bg-section py-20"
        footnote="Specialist methods on request: eye tracking, facial expression measurement, in-store aisle testing."
      />

      {/* ════════ YOUR REPORT AND WHERE IT APPLIES ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">

          <SectionHeader
            label="Your Report and Where It Applies"
            heading={<>What Your Report Includes</>}
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mt-10 items-stretch">

            {/* Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SiteCard className="h-full">
                <div className="p-8 flex flex-col h-full">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50 mb-5">
                    Inside Your Report
                  </p>

                  {reportContents.map((item, i) => (
                    <div
                      key={item.title}
                      className={`flex items-center gap-4 py-4 ${i > 0 ? "border-t border-gray-100" : ""}`}
                    >
                      <span className="w-9 h-9 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-primary font-bold text-base leading-snug">{item.title}</p>
                        {item.note && (
                          <p className="text-gray-600 text-sm mt-0.5">{item.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SiteCard>
            </motion.div>

            {/* Where it applies.

                The wrapper takes the row's full height so the panel inside has
                somewhere to travel; the panel itself is only as tall as its
                content and sticks while the longer list scrolls past. Stretched
                to the row, it left a tall empty block under the industries. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
            {/* No transform on the sticky element itself: an entrance offset
                left here shifts where it pins, by its own y value. */}
            <div className="sticky top-24 bg-primary rounded-2xl p-8 text-white">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                Where It Applies
              </p>
              <h3 className="text-xl font-extrabold leading-snug mb-6">
                Used across these industries
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {industries.map((industry) => (
                  <div key={industry} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white/60 shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-white/85 text-sm leading-snug">{industry}</span>
                  </div>
                ))}
              </div>

              {/* <div className="mt-auto pt-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                  Markets Covered
                </p>
                <span className="inline-flex items-center rounded-md border border-white/25 px-3 py-1.5 text-sm font-bold">
                  [CONFIRM]
                </span>
              </div> */}
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs — the FAQPage JSON-LD on this route promises this content
          is visible, so it has to actually render. */}
      <FaqAccordion faqs={faqs} />

      <SolutionEnquiryForm />

      <LatestReadsSection />

    </main>
  );
}
