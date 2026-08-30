"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

/**
 * Scrip8-specific sections that the shared research layout has no slot for:
 * the pricing table and the customer stories. Lifted out of the old bespoke
 * page unchanged so nothing is lost in the redesign, and passed to
 * ResearchDeepLayout via its `extras` prop.
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export function CustomerStories() {
  return (
    <>
      {/* ════════ CUSTOMER STORIES ════════ */}
      <section className="bg-white py-20">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Customer Stories</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Real results from{" "}
                <span className="italic font-normal text-primary">real research teams</span>
              </h2>
            </div>
            <Link href="/case-studies" className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              View all case studies →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "FMCG · Product Research",
                watermark: "FMCG",
                company: "Hindustan Consumer Brands",
                context: "Needed faster consumer feedback loops for new product launches across 12 Indian cities",
                stats: [{ val: "42%", label: "Higher response rate vs. prior tool" }, { val: "3×", label: "Faster insight delivery" }],
                quote: '"Scrip8 let us go from brief to field in 4 hours instead of 4 days. The AI summary alone saved our team 12 hours per project."',
              },
              {
                tag: "Healthcare · Patient Experience",
                watermark: "HEALTH",
                company: "MedReach Diagnostics",
                context: "Tracking patient satisfaction across 40 clinic locations with inconsistent data collection methods",
                stats: [{ val: "89%", label: "Survey completion rate" }, { val: "67%", label: "Improvement in data quality" }],
                quote: '"We standardized feedback collection across 40 locations in a single week using Scrip8\'s templates. The compliance features gave our legal team full confidence."',
              },
              {
                tag: "SaaS · Product-Market Fit",
                watermark: "TECH",
                company: "Velo Technologies",
                context: "Early-stage startup needed fast, affordable PMF research without a dedicated research team",
                stats: [{ val: "50%", label: "Lower research cost vs. agency" }, { val: "8 hrs", label: "From survey to final report" }],
                quote: '"We ran 6 rounds of user research in 3 months entirely on Scrip8 — it would have cost us 5× more with an agency and taken 3× as long."',
              },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(0.1 * i)} whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(13,27,62,0.12)" }} transition={{ duration: 0.25 }} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col cursor-pointer">
                {/* Dark top with watermark */}
                <div className="bg-primary p-6 relative overflow-hidden">
                  {/* Watermark — bottom-right */}
                  <span className="absolute -bottom-3 -right-2 text-[56px] font-black text-white/[0.06] select-none leading-none pointer-events-none uppercase tracking-tight">
                    {s.watermark}
                  </span>
                  <span className="inline-block bg-white/15 text-white/90 text-[10px] font-semibold px-3 py-1.5 rounded-full mb-4">{s.tag}</span>
                  <h3 className="text-white font-black text-lg mb-2">{s.company}</h3>
                  <p className="text-white/60 text-sm leading-6">{s.context}</p>
                </div>
                {/* Light bottom */}
                <div className="bg-white p-6 flex flex-col flex-1">
                  {/* Stats row — centered with vertical divider */}
                  <div className="flex mb-6">
                    {s.stats.map((st, j) => (
                      <div key={j} className={`flex-1 flex flex-col items-center justify-center py-2 px-3 text-center ${j < s.stats.length - 1 ? "border-r border-gray-200" : ""}`}>
                        <p className="text-2xl font-black text-primary leading-none mb-1">{st.val}</p>
                        <p className="text-[11px] text-gray-400 leading-snug">{st.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-900 text-base italic leading-8 font-medium flex-1 mb-5">{s.quote}</p>
                  <Link href="/case-studies" className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Read case study →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

/* ── Pricing (own state, so it stays a separate component) ── */
export 
/* ── Pricing toggle (needs useState, extracted to avoid hooks-in-loop) ── */
function PricingSection() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "BASIC",
      monthly: 6,
      desc: "For individuals and small teams just getting started with surveys.",
      features: ["Create unlimited surveys", "Up to 20 questions per survey", "100 responses / month", "Email distribution", "Basic analytics dashboard"],
      cta: "Start for free",
      highlight: false,
    },
    {
      name: "STANDARD",
      monthly: 14,
      desc: "For growing teams needing advanced logic, branding and analytics.",
      features: ["Everything in Basic", "Up to 50 questions per survey", "Unlimited responses", "Skip logic & branching", "AI summary reports", "Brand themes & white-label"],
      cta: "Start free trial",
      highlight: true,
    },
    {
      name: "PREMIUM",
      monthly: 29,
      desc: "For enterprises needing unlimited scale, AI features, and API access.",
      features: ["Everything in Standard", "Unlimited questions per survey", "AI survey generator & analysis", "API & webhook access", "SSO & role-based access", "Dedicated account manager"],
      cta: "Contact sales",
      highlight: false,
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="site-container px-6">
        <motion.div {...fadeUp()} className="text-center mb-10">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Simple, transparent{" "}
            <span className="italic font-normal text-primary">pricing</span>
          </h2>
          <p className="text-base leading-8 font-medium text-gray-900 max-w-md mx-auto">
            Start free. Scale when you&apos;re ready. No hidden fees, no surprise overages.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-semibold ${!annual ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? "bg-primary" : "bg-primary"}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${annual ? "translate-x-6" : "translate-x-0"}`} />
          </button>
          <span className={`text-sm font-semibold ${annual ? "text-gray-900" : "text-gray-400"}`}>Annual</span>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Save 30%</span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const price = annual ? Math.round(plan.monthly * 0.7) : plan.monthly;
            return (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                whileHover={{ y: -8, boxShadow: plan.highlight ? "0 24px 50px rgba(13,27,62,0.35)" : "0 20px 40px rgba(13,27,62,0.12)" }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl cursor-pointer ${plan.highlight ? "bg-primary shadow-2xl" : "bg-white border border-gray-200 shadow-sm"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="text-white text-xs font-bold px-6 py-2 rounded-full block whitespace-nowrap shadow-lg" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1a6fe8 60%, #1558c0 100%)" }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`p-8 ${plan.highlight ? "pt-12" : "pt-8"}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.name}</p>
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-lg font-bold ${plan.highlight ? "text-white/80" : "text-gray-500"}`}>$</span>
                    <span className={`text-5xl font-black leading-none ${plan.highlight ? "text-white" : "text-gray-900"}`}>{price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>/month</span>
                  </div>
                  <p className={`leading-8 mb-6 pb-6 border-b ${plan.highlight ? "text-sm text-white/60 border-white/10" : "text-base font-medium text-gray-900 border-gray-100"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2.5 ${plan.highlight ? "text-sm text-white/80" : "text-base font-medium text-gray-900"}`}>
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-white/70" : "text-primary"}`} strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact-us"
                    className={`block text-center font-bold text-sm py-3.5 rounded-xl transition-all duration-300 ${plan.highlight ? "bg-white text-primary hover:bg-gray-100" : "bg-primary text-white hover:bg-primary-hover"}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
