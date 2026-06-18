"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import TrustedBy from "@/components/TrustedBy";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

/* ── CountUp ── */
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
const steps = [
  {
    num: "1",
    title: "Design Surveys",
    desc: "Design and create online surveys for your brand in minutes. Scrip8, a market research software, helps you customize and render your branding with your logo, fonts, and themes. Select, drag, and drop features like question type and scales, add skip logic, and define the flow. Customize your team's information and terms & conditions and share.",
  },
  {
    num: "2",
    title: "Collect Data",
    desc: "Data collection with online survey software was never this easy. Once created, share your surveys and reviews with team members. And with users for data collection. Embed links in emails. Scrip8 offers mobile-based surveys for users to respond anytime, anywhere.",
  },
  {
    num: "3",
    title: "Mine Insights",
    desc: "Analytics simplified with Scrip8. With reporting features like eye-catching graphs and automatic summaries, generate results of your surveys and share them with your stakeholders. Synthesize the data and make marketing and business decisions that favor users' requirements.",
  },
];

const stats = [
  { value: "15",   label: "Years of Expertise"           },
  { value: "1M",   label: "Survey Completion Yearly"     },
  { value: "7K",   label: "Successful Projects Annually" },
  { value: "4.8M", label: "Global Panelists"             },
];

const plans = [
  {
    price: "$6.00",
    name: "Basic",
    features: ["Create survey", "Limit per survey - upto 20 question", "View Reports"],
    featured: false,
  },
  {
    price: "$14.00",
    name: "Standard",
    features: ["Create survey", "Limit per survey - upto 50 questions", "View Reports"],
    featured: true,
  },
  {
    price: "$29.00",
    name: "Premium",
    features: ["Create survey", "Unlimited Question Per Survey", "View Reports"],
    featured: false,
  },
];

const features = [
  {
    title: "Quick Responses",
    desc: "Design quick and versatile surveys. Add emoticons and Likert scales. Gamify your forms with skip logic and create sections for easy traversing. Share and track responses with the most versatile online survey software.",
  },
  {
    title: "Mobile Surveys",
    desc: "Create online surveys for every screen size. Allow your audience to respond anywhere, anytime, at their convenience. Scrip8 optimizes every form for mobiles, tablets, and bigger screens.",
  },
  {
    title: "Round-the-Clock Support",
    desc: "Seek help from our Scrip8 design and programming experts. Get your survey logic tailored to your requirements. Ask for survey design and reporting assistance anytime. We're available 24x7 to solve your queries and problems.",
  },
  {
    title: "Personalized Surveys",
    desc: "Reflect your brand in surveys without much hassles. Add your company's information, logo, and branding with preferred colors and themes. Keep your audience informed about your guidelines and terms & conditions.",
  },
  {
    title: "Security Surveys",
    desc: "Seek help from our Scrip8 design and programming experts. Get your survey logic tailored to your requirements. Ask for survey design and reporting assistance anytime. We're available 24x7 to solve your queries and problems.",
  },
  {
    title: "Sharable Insights",
    desc: "Scrip8 generates reports in graphical patterns for easy understanding. Analyze the insights with your team and learn what users want in your product. Make business decisions accordingly and circulate the reports to the concerned teams.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── Main ── */
export default function Scrip8Page() {
  const statsRef    = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <main className="bg-white">

      {/* ════════ HERO ════════ */}
      <section className="bg-white min-h-[560px] flex items-center relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 items-center py-20">
          <motion.div {...fadeUp(0)}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Online Surveys Simplified
            </h1>
            <p className="text-gray-900 text-base leading-8 font-medium mb-8 max-w-md">
              Know what your users want. Create online surveys and share them with ease. Mobile-based and result-oriented. Apt to unearth real-time data and hidden insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact-us" className="cursor-pointer bg-primary hover:bg-accent text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-300 text-sm">
                Get Started
              </Link>
              <button className="cursor-pointer border-2 border-primary text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 text-sm">
                How it Works
              </button>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="flex justify-end w-full">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ border: "10px solid color-mix(in srgb, var(--color-primary) 20%, transparent)" }}>
              <video
                src="/video/scrip8_video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ 3 STEPS ════════ */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 {...fadeUp()} className="text-2xl sm:text-3xl font-extrabold uppercase text-center text-white mb-12">
            Understand Your Audience in 3 Simple Steps
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp(0.1 * i)} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-5">
                  <span className="text-white text-2xl font-black">{step.num}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-3">{step.title}</h3>
                <p className="text-white/80 text-base leading-8 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CLIENTELE SLIDER — reuses TrustedBy component ════════ */}
      <TrustedBy heading="Real Clientele with 500+ Brands" navPrefix="scrip8" showWorldTagline={false} containerPadding="px-6" />

      {/* ════════ STATS ════════ */}
      <section ref={statsRef} className="py-16 bg-highlight">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 {...fadeUp()} className="text-2xl sm:text-3xl font-bold uppercase text-primary mb-12">
            Script Survey
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {(() => {
                    const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
                    const suffix = s.value.replace(/[0-9.]/g, "");
                    const decimals = s.value.includes(".") ? 1 : 0;
                    return <CountUp end={num} suffix={suffix} decimals={decimals} />;
                  })()}
                </div>
                <div className="text-gray-900 text-base font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <Link href="/contact-us" className="cursor-pointer inline-block bg-primary hover:bg-accent text-white font-bold px-10 py-3.5 rounded-lg uppercase tracking-widest text-sm transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </section>

      {/* ════════ PRICING ════════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-3">
              Affordable Pricing Plans
            </h2>
            <p className="text-gray-900 text-base font-medium">Best for medium business owners, startups who need landing pages for their business.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                className={`relative rounded-3xl overflow-hidden flex flex-col ${
                  plan.featured
                    ? "bg-primary shadow-2xl -translate-y-8"
                    : "bg-white border border-gray-100 shadow-md"
                }`}
              >
                {/* diagonal line pattern for featured */}
                {plan.featured && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 20px)",
                    }}
                  />
                )}

                <div className="relative flex flex-col flex-1 p-10">
                  {plan.featured && (
                    <span className="absolute top-5 right-5 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  )}

                  {/* Price */}
                  <div className="mb-2">
                    <span className={`text-4xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm ml-1 ${plan.featured ? "text-white/60" : "text-gray-400"}`}>/month</span>
                  </div>

                  {/* Name */}
                  <h3 className={`text-2xl font-bold mb-4 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>

                  {/* What's included */}
                  <p className={`text-sm mb-4 ${plan.featured ? "text-white/60" : "text-gray-400"}`}>What&apos;s included:</p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 ${plan.featured ? "text-accent" : "text-primary"}`}
                          strokeWidth={2.5}
                        />
                        <span className={plan.featured ? "text-white" : "text-gray-700"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Read more */}
                  <button className={`cursor-pointer text-sm font-semibold underline mb-5 text-left transition-colors ${
                    plan.featured ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-primary"
                  }`}>
                    Read more
                  </button>

                  {/* CTA */}
                  <button className={`cursor-pointer w-full py-3.5 rounded-full font-bold text-sm transition-colors duration-300 ${
                    plan.featured
                      ? "bg-white text-primary hover:bg-gray-100"
                      : "bg-primary text-white hover:bg-accent"
                  }`}>
                    Purchase Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ MASTERING RESPONSES ════════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-3">
              Mastering Responses
            </h2>
            <p className="text-gray-900 text-base font-medium">Mere minutes to create your survey. Just seconds to collect and analyze your responses.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full border-2 border-accent/40 flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feat.title}</h3>
                <p className="text-gray-900 text-base leading-8 font-medium">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSubscribe />

    </main>
  );
}
