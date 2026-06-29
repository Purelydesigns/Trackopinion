"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

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

/* ── Data ── */
const capabilities = [
  {
    title: "Customer Loyalty",
    desc: "Measure how loyal your regular customers are by analyzing their repeat purchases and buying journeys. Bank on your positives.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 38 C24 38 8 28 8 18 C8 12 12 8 18 8 C21 8 24 11 24 11 C24 11 27 8 30 8 C36 8 40 12 40 18 C40 28 24 38 24 38Z" />
        <path d="M18 22 L22 26 L30 18" />
      </svg>
    ),
  },
  {
    title: "Emerging Trends",
    desc: "Spot the trends within and across the segments—market and social conditions that cause churn, promote loyalty, and encourage prospects to move ahead.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 36 16 24 24 30 38 12" />
        <polyline points="32 12 38 12 38 18" />
        <line x1="6" y1="42" x2="42" y2="42" />
      </svg>
    ),
  },
  {
    title: "NPS",
    desc: "Know how many customers refer your brand and products to the world by analyzing the Net Promoter Score. One crucial marker no business should miss.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 6 L24 12 M24 36 L24 42 M6 24 L12 24 M36 24 L42 24" />
        <path d="M16 20 L20 24 L28 16" />
        <path d="M20 28 L28 28" />
      </svg>
    ),
  },
  {
    title: "In-Depth Analysis",
    desc: "Learn the why behind your NPS — what motivates users to like your brand and stick to it, or the facts behind the dissatisfaction and complaints.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="22" cy="22" r="14" />
        <line x1="32" y1="32" x2="42" y2="42" />
        <line x1="16" y1="22" x2="28" y2="22" />
        <line x1="22" y1="16" x2="22" y2="28" />
      </svg>
    ),
  },
  {
    title: "Find Champions",
    desc: "Convert customers into patrons who refer your brands in their circles or social media. Engage with them personally and honor their commitment.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="7" />
        <path d="M10 40 C10 31 38 31 38 40" />
        <path d="M34 10 L36 14 L40 14 L37 17 L38 21 L34 19 L30 21 L31 17 L28 14 L32 14 Z" />
      </svg>
    ),
  },
  {
    title: "Customer Retention",
    desc: "Incentivize your potential ambassadors the right way. Reward them with vouchers or cash, share premium content, and provide early access to exclusive deals.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 24 C40 32 33 40 24 42 C15 40 8 32 8 24 V12 L24 6 L40 12 Z" />
        <path d="M24 18 V26" />
        <circle cx="24" cy="30" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const contentSections = [
  {
    heading: "Why's Customer Loyalty Measurement Crucial?",
    paragraphs: [
      "Loyal customers don't have prejudices but trust in your brand. Also, marketing endeavors are reduced. So, retention is easier than conversion.",
      "Customer loyalty measurement helps you identify your loyal customers and the reasons behind their repeat purchases.",
      "By measuring the loyalty factor, know what drives your customers to buy once again. Learn the low and high points in their buying journey. Capture their emotions, engage with their views, and develop a strong bond with them.",
    ],
  },
  {
    heading: "Benefits of Customer Loyalty Assessment",
    paragraphs: [
      "Loyal customers don't have prejudices but trust in your brand. Also, marketing endeavors are reduced. So, retention is easier than conversion.",
      "Customer loyalty measurement helps you identify your loyal customers and the reasons behind their repeat purchases.",
      "By measuring the loyalty factor, know what drives your customers to buy once again. Learn the low and high points in their buying journey. Capture their emotions, engage with their views, and develop a strong bond with them.",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Engage",
    desc: "Because users like attention. Personalize your communication on all channels. Engage your users the way they'd appreciate.",
  },
  {
    num: "02",
    title: "Engage",
    desc: "Because users like attention. Personalize your communication on all channels. Engage your users the way they'd appreciate.",
  },
  {
    num: "03",
    title: "Engage",
    desc: "Because users like attention. Personalize your communication on all channels. Engage your users the way they'd appreciate.",
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
    q: "What is Customer satisfaction (CSAT) & how it is measured?",
    a: "CSAT is a measurement score that gauges how satisfied customers are with a product, service, or brand. It indicated the level of retention, loyalty, and happiness of customers. It is measured using simple questions like “How happy are you with our product?”.\n\nCSAT Score = (Number of Satisfied Responses / Total Number of Responses) × 100",
  },
  {
    q: "How can measuring customer loyalty impact business strategy?",
    a: "Measuring customer loyalty helps businesses identify their most valuable customers, understand what drives retention, and allocate resources effectively. Loyal customers tend to spend more, refer others, and stay longer — making loyalty a leading indicator of sustainable growth.",
  },
  {
    q: "How often should customer loyalty be measured?",
    a: "Customer loyalty should ideally be measured quarterly or after key touchpoints such as purchases, support interactions, or product launches. Regular measurement helps track trends and respond proactively to any decline in satisfaction.",
  },
  {
    q: "How often should customer loyalty be measured?",
    a: "Customer loyalty should ideally be measured quarterly or after key touchpoints such as purchases, support interactions, or product launches. Regular measurement helps track trends and respond proactively to any decline in satisfaction.",
  },
  {
    q: "What are common challenges in measuring customer loyalty?",
    a: "Common challenges include survey fatigue, response bias, difficulty linking loyalty data to business outcomes, and inconsistent methodologies across departments. Using standardized metrics like NPS or CSAT and integrating them with CRM data can help overcome these barriers.",
  },
];

const resources = [
  { date: "24.03.2026", title: "From Clinical to Commercial: How Research Bridges Science and Market Reality", gradient: "from-blue-400 to-indigo-500" },
  { date: "24.03.2026", title: "Why Your Market Research Needs Custom Survey Programming?", gradient: "from-gray-700 to-gray-900" },
  { date: "24.03.2026", title: "Why Your Market Research Needs Custom Survey Programming?", gradient: "from-blue-200 to-blue-400" },
  { date: "24.03.2026", title: "How Panel Quality Affects Research Outcomes in B2B Studies", gradient: "from-teal-400 to-cyan-600" },
  { date: "24.03.2026", title: "Data Collection Best Practices for International Market Research Projects", gradient: "from-violet-500 to-purple-700" },
];

export default function CustomerLoyaltyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      {/* ════════ BANNER ════════ */}
      <section className="-mt-[76px] relative min-h-[500px] sm:min-h-[700px] lg:h-[840px] flex items-center overflow-hidden">
        <video
          src="/video/banner.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative w-full max-w-[1536px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Customer Loyalty Measurement
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 leading-8">
              Find your loyal customers and reward them. Understand what drives repeat purchases, identify your brand champions, and build lasting relationships that fuel sustainable growth.
            </p>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Explore More »
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ CAPABILITIES ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1536px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shrink-0">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{cap.title}</h3>
                <p className="text-gray-700 text-base leading-7 font-medium">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTENT SECTIONS ════════ */}
      {contentSections.map((sec, i) => (
        <section key={i} className="bg-white py-6">
          <div className="max-w-[1536px] mx-auto px-6">
            <motion.div {...fadeUp()} className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 48 48" className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M24 38 C24 38 8 28 8 18 C8 12 12 8 18 8 C21 8 24 11 24 11 C24 11 27 8 30 8 C36 8 40 12 40 18 C40 28 24 38 24 38Z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">{sec.heading}</h2>
            </motion.div>
            <div>
              {sec.paragraphs.map((p, j) => (
                <motion.p key={j} {...fadeUp(0.08 * j)} className="text-gray-900 text-base leading-8 mb-3 font-medium">{p}</motion.p>
              ))}
            </div>
            {i < contentSections.length - 1 && <div className="mt-6 border-b border-gray-100" />}
          </div>
        </section>
      ))}

      {/* ════════ USE LOYALTY ANALYSIS RIGHT — Steps (bg-highlight) ════════ */}
      <section className="bg-highlight py-16">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-primary font-bold uppercase text-sm tracking-widest mb-3">
              Use Customer Loyalty Analysis Right
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 max-w-2xl mx-auto leading-snug">
              Perform this three-step process after you know who your loyal customers are
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.12 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 relative overflow-hidden"
              >
                <span className="absolute top-4 left-5 text-6xl font-black text-gray-100 select-none leading-none">
                  {step.num}
                </span>
                <div className="relative pt-10">
                  <p className="text-primary font-extrabold uppercase text-sm tracking-wider mb-3">{step.title}</p>
                  <p className="text-gray-900 text-base leading-8 font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1536px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {stats.map((s, i) => {
              const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
              const suffix = s.value.replace(/[0-9.]/g, "");
              const decimals = s.value.includes(".") ? 1 : 0;
              return (
                <motion.div key={i} {...fadeUp(0.1 * i)}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={num} suffix={suffix} decimals={decimals} />
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ FAQs ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <p className="text-primary font-semibold uppercase text-sm mb-2">FAQs</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Have a Question? Contact Us</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="cursor-pointer w-full flex items-center justify-between px-6 py-5 text-left border border-gray-200 rounded-2xl bg-white hover:border-gray-300 transition-colors"
                >
                  <span className="text-base font-bold text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-2 px-6 py-5 border border-gray-200 rounded-2xl bg-white whitespace-pre-line"
                  >
                    <p className="text-gray-900 text-base leading-8 font-medium">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ RESOURCES SLIDER ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">Explore Our Resources</h2>
          </motion.div>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="resources-swiper !pb-12"
          >
            {resources.map((r, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className={`h-48 bg-gradient-to-br ${r.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" /> {r.date}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug">{r.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-14 bg-highlight">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div
            {...fadeUp()}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Find out how Track Opinion can help you measure, understand, and grow customer loyalty
              </h3>
              <p className="text-gray-500 text-base leading-8">
                Reach out to Track Opinion — an end-to-end market research company with a panel strength of 4.7Mn. Identify your brand champions and build loyalty programs that actually work.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact-us"
                className="bg-primary hover:bg-primary text-white text-base font-bold px-10 py-5 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
