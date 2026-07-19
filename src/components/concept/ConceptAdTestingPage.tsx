"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import PageHero from "../ui/PageHero";
import SiteCard from "../ui/SiteCard";
import SectionHeader from "../ui/SectionHeader";
import LatestReadsSection from "../shared/LatestReadsSection";

/* ── Helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

function CountUp({ end, suffix = "", decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = end / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

/* ── Capability cards with relevant icons ── */
const capabilities = [
  {
    title: "Concept Testing",
    desc: "Test your product idea at an early stage in development. Avoid expensive setbacks by obtaining users' input before investing in marketing, ads, and sales.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    title: "Ad Testing",
    desc: "Dodge expensive marketing failures. Test your advert design with a handful of sample users and tweak your ad before you actually launch it.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 16h6l18-8v32L14 32H8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" />
        <path d="M32 18c3 1.5 5 4 5 6s-2 4.5-5 6" />
        <path d="M14 32v8" />
      </svg>
    ),
  },
  {
    title: "Relaunch Testing",
    desc: "Planning to relaunch a product or service? Find a panel that suits your target audience, and test your remodeled product, design, idea, or packaging.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 24a16 16 0 1 1-3.5-10" />
        <polyline points="40 10 40 24 26 24" />
      </svg>
    ),
  },
  {
    title: "GTM Strategy",
    desc: "Define your go-to-market approach by testing the concept and ads. Learn what resonated with potential users and what needs tweaking before marketing.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 44 L24 20 L38 8 L38 32 Z" />
        <path d="M24 20 L10 14 L24 8" />
        <line x1="10" y1="14" x2="10" y2="38" />
        <line x1="10" y1="38" x2="24" y2="44" />
        <circle cx="24" cy="44" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Risk Mitigation",
    desc: "Testing your product at the early stages of ideation, designing, and development helps you curb potential risks and failure points and plan for mitigation.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L6 12v14c0 10 8 18 18 20 10-2 18-10 18-20V12Z" />
        <polyline points="16 24 21 29 32 18" />
      </svg>
    ),
  },
  {
    title: "Market Fit",
    desc: "Know what the industry needs to fill the existing gaps. Use the feedback from concept testing research and make your product more fit for the users.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="20" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="24" cy="24" r="4" />
        <line x1="24" y1="4" x2="24" y2="12" />
        <line x1="24" y1="36" x2="24" y2="44" />
        <line x1="4" y1="24" x2="12" y2="24" />
        <line x1="36" y1="24" x2="44" y2="24" />
      </svg>
    ),
  },
];

const contentSections = [
  {
    heading: "What's Product Concept Testing?",
    paragraphs: [
      "Toying with an idea to build something new or unique? Concept testing in new product development can help you achieve a viable product by assessing its potential for commercial success.",
      "You test your product at various stages. Descriptive writing, concept designs, and working prototypes are some artifacts you share with a selective audience and seek their input.",
      "The concept testing research feedback via surveys focus group meetings, and interviews weeds out the superfluous and enhances your product's functioning and benefits.",
    ],
  },
  {
    heading: "Why Creative Ad Testing?",
    paragraphs: [
      "Developing a novel idea or relaunching an old product? Define a go-to-market strategy with us by testing your creative ads.",
      "Analyze with a panel how your fresh idea will be perceived. Or test your product's renewed packaging or enhancements in the aisles.",
      "Measure your users' responses with our well-executed ad surveys with eye tracking and facial recognition. Test waters to find the target market's engagement before going full throttle into advertising.",
    ],
  },
];

const methods = [
  {
    num: "1",
    title: "Recognize Emotions",
    desc: "Analyze users' hidden emotions such as twitch of the lips, wide eyes, and furrowed brows using facial expression measurement.",
  },
  {
    num: "2",
    title: "Track Eye Movements",
    desc: "Track the gaze of users, movements of pupils, and their dilation, and learn their initial responses to your ads and new products.",
  },
  {
    num: "3",
    title: "Test Aisle Attraction",
    desc: "Place your product in a store and discover the responses for the packaging, its placement, pricing, and branding.",
  },
];

const stats = [
  { value: "15+",  label: "Years of Expertise" },
  { value: "100+", label: "Clients" },
  { value: "30+",  label: "Market Covered" },
  { value: "4.7M", label: "Active Panellists" },
  { value: "20K+", label: "Project Completed" },
];

const faqs = [
  {
    q: "Why are product Concepts and creative ad testing important for your business?",
    a: "Product concept and creative ad testing saves your effort, time, and money.\n\nWhether you're launching a new product, relaunching or rebranding an existing solution, or planning to start a marketing campaign, a lot of money is at stake. Instead of going blind to the market with your product or ad, you can gauge responses to your ads and products. This saves you from several setbacks, gives you the opportunity to fix shortcomings pointed out by your users, and opens the gate to enhance it within time.",
  },
  {
    q: "When should I conduct product concept testing?",
    a: "Product concept testing should be conducted as early as possible in the product development lifecycle — ideally before investing heavily in design, engineering, or marketing. Key moments include: after identifying a new product idea, after creating initial prototypes or design concepts, before finalizing packaging or branding, and before launching a major marketing campaign.",
  },
  {
    q: "What metrics are used in creative ad testing?",
    a: "Creative ad testing uses metrics such as recall (how well audiences remember the ad), comprehension (how clearly the message is understood), persuasion (how effectively it changes intent), emotional response (measured via facial coding or biometrics), attention (eye-tracking heatmaps), and brand linkage (association with the intended brand).",
  },
  {
    q: "How do I choose the right sample size for testing?",
    a: "Sample size depends on your research objectives, the number of concepts you're testing, and the subgroups you need to analyze. For monadic concept tests, a minimum of 150–200 respondents per concept is recommended to detect meaningful differences. For ad pre-testing, 100–150 respondents per ad is a common starting point. We help you define the right sample during our project consultation phase.",
  },
];

const resources = [
  { date: "24.03.2026", title: "From Clinical to Commercial: How Research Bridges Science and Market Reality", gradient: "from-blue-400 to-indigo-500" },
  { date: "24.03.2026", title: "Why Your Market Research Needs Custom Survey Programming?", gradient: "from-gray-700 to-gray-900" },
  { date: "24.03.2026", title: "Measuring Customer Loyalty: Key Metrics to Track via Market Research", gradient: "from-blue-200 to-blue-400" },
  { date: "24.03.2026", title: "How Panel Quality Affects Research Outcomes in B2B Studies", gradient: "from-teal-400 to-cyan-600" },
  { date: "24.03.2026", title: "Data Collection Best Practices for International Market Research Projects", gradient: "from-violet-500 to-purple-700" },
];

export default function ConceptAdTestingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      <PageHero
          badge="Product Concept And Ad-Testing"
          heading={
            <>
              Product Concept &amp; Creative Ad Testing
            </>
          }
          description="Translate your message to connect better with your target audience before going to market. Validate ideas, ads, and packaging with real users — before you invest at scale."
          primaryCta={{ label: "Explore More", href: "/contact-us" }}
          secondaryCta={{ label: "See Capabilities", href: "#capabilities" }}
          minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
        />

      {/* ════════ CAPABILITIES ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">

          <SectionHeader
              label="Product Viability and Ad Testing"
              heading={<>Numbers that lead your idea to a product <br></br>with creative ad testing</>}
              description="Convert ideas into profitable products. Transform products into brand icons. Use our world-class product concept testing."
              theme="light"
              align="center"
            />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <SiteCard className="flex flex-col h-full">
                  <div className="p-7 flex flex-col flex-1">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mb-5"
                      style={{ background: "rgba(13,27,62,0.07)" }}
                    >
                      {cap.icon}
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">{cap.title}</h3>
                    <p className="text-gray-600 text-base leading-8 font-medium flex-1">{cap.desc}</p>
                  </div>
                </SiteCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTENT SECTIONS ════════ */}
      {contentSections.map((sec, i) => (
        <section key={i} className="bg-white py-10">
          <div className="site-container px-6">
            <motion.div {...fadeUp()} className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(13,27,62,0.07)" }}
              >
                {i === 0 ? (
                  /* Concept Testing — lightbulb */
                  <svg viewBox="0 0 48 48" className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 6a12 12 0 0 1 8 20.8V30a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-3.2A12 12 0 0 1 24 6z" />
                    <path d="M20 32v2a4 4 0 0 0 8 0v-2" />
                    <line x1="24" y1="6" x2="24" y2="2" />
                    <line x1="10" y1="12" x2="7" y2="9" />
                    <line x1="38" y1="12" x2="41" y2="9" />
                    <line x1="6" y1="24" x2="2" y2="24" />
                    <line x1="42" y1="24" x2="46" y2="24" />
                  </svg>
                ) : (
                  /* Ad Testing — megaphone */
                  <svg viewBox="0 0 48 48" className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 16h6l18-8v32L14 32H8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" />
                    <path d="M32 18c3 1.5 5 4 5 6s-2 4.5-5 6" />
                    <path d="M14 32v8" />
                  </svg>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold leading-tight text-primary">{sec.heading}</h2>
            </motion.div>
            <div>
              {sec.paragraphs.map((p, j) => (
                <motion.p key={j} {...fadeUp(0.08 * j)} className="text-gray-600 text-base leading-8 font-medium flex-1 mb-2">{p}</motion.p>
              ))}
            </div>
            {i < contentSections.length - 1 && <div className="mt-10 border-b border-gray-100" />}
          </div>
        </section>
      ))}

      {/* ════════ METHODS (bg-primary) ════════ */}
      <section className="py-20 bg-primary overflow-hidden">
        <div className="site-container px-6">

          <SectionHeader
            label="Our Methods"
            heading={
              <>
                Track Opinion offers technology-backed solutions for concept testing research and creative ad testing service in India
              </>
            }
            description="Unique Product Concept Testing and Creative Ad Testing Methods."
            theme="dark"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {methods.map((m, i) => (
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
                  {/* Blue top accent bar */}
                  <div className="h-1.5" style={{ background: "linear-gradient(90deg, #1a6fe8, #60a5fa)" }} />

                  <div className="p-8 flex flex-col flex-1 items-center">
                    {/* Step number bubble */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white font-bold text-lg"
                      style={{ background: "#1a6fe8" }}
                    >
                      {m.num}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-lg leading-snug mb-3">
                      {m.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">
                      {m.desc}
                    </p>
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
