"use client";

import Link from "next/link";
import { Calendar, Share2, Check } from "lucide-react";
import { motion } from "framer-motion";

/* ── Reusable building blocks ── */

function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-block bg-[#e8ecf8] text-[#0d1b3e] text-sm font-semibold px-4 py-2 rounded-lg mb-5">
      {text}
    </div>
  );
}

function BoldPara({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-900 font-bold text-sm leading-8 mb-4">{children}</p>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-600 text-sm leading-8 mb-4">{children}</p>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start py-3 border-b border-gray-100 last:border-0">
      <span className="w-6 h-6 rounded-full border-2 border-[#0d1b3e] flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-[#0d1b3e]" strokeWidth={3} />
      </span>
      <span className="text-gray-700 text-sm leading-7">{children}</span>
    </li>
  );
}

function SubCheckItem({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start py-3">
      <span className="w-6 h-6 rounded-full border-2 border-[#0d1b3e] flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-[#0d1b3e]" strokeWidth={3} />
      </span>
      <span className="text-gray-700 text-sm leading-7">
        {label && <strong className="text-[#0d1b3e]">{label} </strong>}
        {children}
      </span>
    </li>
  );
}

function IllustrationBlock({ emoji, caption }: { emoji: string; caption: string }) {
  return (
    <div className="my-10 flex flex-col items-center gap-4">
      <div className="w-64 h-64 bg-purple-50 rounded-full flex items-center justify-center shadow-inner">
        <span className="text-9xl">{emoji}</span>
      </div>
      <p className="text-[#0d1b3e] text-sm text-center italic max-w-md">{caption}</p>
    </div>
  );
}

/* ── Main component ── */
export default function BlogDetail() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <main>
      {/* ── Article header ── */}
      <section className="bg-white pt-14 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            {...fadeUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl"
          >
            How to Conduct Customer Satisfaction Research
          </motion.h1>

          {/* Date + share */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>24.03.2026</span>
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-[#0d1b3e] transition text-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 max-w-4xl space-y-12">

          {/* Section 1 */}
          <motion.div {...fadeUp}>
            <SectionBadge text="1. Define Your Why" />
            <BoldPara>
              The first step in any market research survey is to nail your goals.
              Ensure you&apos;re clear about what your survey objective is. Don&apos;t
              include multiple objectives in one survey; otherwise, your strategy
              will be complicated and might derail as the project moves on.
              Some of your objectives could be:
            </BoldPara>
            <ul className="divide-y divide-gray-100">
              <CheckItem>To understand user problems and gaps in your offering.</CheckItem>
              <CheckItem>To assess brand loyalty and user advocacy.</CheckItem>
              <CheckItem>To improve your services and customer care operations.</CheckItem>
              <CheckItem>To analyze the churn reasons.</CheckItem>
              <CheckItem>To strengthen customer engagement.</CheckItem>
            </ul>
            <Para>
              There can be more reasons why you want to evaluate user satisfaction
              other than the ones we have defined here, based on your domain, the
              scale of your business, and its issues.
            </Para>
          </motion.div>

          {/* Section 2 */}
          <motion.div {...fadeUp}>
            <SectionBadge text="2. Chalk Out Your Key Metrics" />
            <BoldPara>
              Once you know what your goals are, you need to lay down the KPIs to
              evaluate. Based on these parameters, you can take actions and
              course-correct your business strategies.
            </BoldPara>
            <Para>Some of the important parameters we measure for our customers are:</Para>
            <ul className="space-y-1">
              <SubCheckItem label="NPS:">
                <span className="underline">Net Promoter Score</span> is measured
                based on the likelihood of users recommending your brand to others.
              </SubCheckItem>
              <SubCheckItem label="CES:">
                Customer effort score measures how easy it is for a particular
                customer to deal with your company during a transaction, a customer
                care call, a question being answered, or an issue resolution.
              </SubCheckItem>
              <SubCheckItem label="CRR:">
                Customer retention rate is the number of customers retained during
                a specific period, irrespective of their engagement level and buying
                value.
              </SubCheckItem>
            </ul>
            <Para>Here is how you measure user satisfaction .</Para>

            <IllustrationBlock
              emoji="📊"
              caption="To understand user satisfaction, knowing which KPI you should measure is important."
            />
          </motion.div>

          {/* Section 3 */}
          <motion.div {...fadeUp}>
            <SectionBadge text="3. Segment Your Audience" />
            <BoldPara>
              Needless to say, this is one of the most important steps in any
              market research project. To know your customer satisfaction level,
              you must first know who your audience is.
            </BoldPara>
            <Para>Divide your audience into segments based on:</Para>
            <ul className="space-y-1">
              <SubCheckItem label="Demographics:">gender, age, location, salary, education level, job profile.</SubCheckItem>
              <SubCheckItem label="Psychographics:">motivation, hobbies, behavior, interests.</SubCheckItem>
              <SubCheckItem label="Touchpoints:">sales, delivery, customer support, inquiries, issues reported, technical assistance, etc.</SubCheckItem>
              <SubCheckItem label="Customer type:">new or old, repeat or churned, dormant or frequent.</SubCheckItem>
              <SubCheckItem label="Role:">expert or generic (SMEs, end users, evangelists, technicians, ad hoc testers).</SubCheckItem>
            </ul>
          </motion.div>

          {/* Section 4 */}
          <motion.div {...fadeUp}>
            <SectionBadge text="4. Select the Right Methodology" />
            <BoldPara>
              Next is to decide the level of depth you need to go to assess user
              satisfaction. If your goals are elaborate and your users are industry
              experts, you need to go for qualitative market research survey
              methods. Quantitative surveys work well in the case of NPS and when
              you just want to measure the numbers and not the sentiments behind
              them.
            </BoldPara>
            <Para>You can use these qualitative methods:</Para>
            <ul className="space-y-4">
              {[
                {
                  label: "Focus group meetings.",
                  desc: "These meetings are effective when users are comfortable sharing pain points publicly. Automotive and other B2B domains fit here.",
                },
                {
                  label: "Online communities",
                  desc: "These shared spaces are great for crowdfunding ideas and co-creating solutions.",
                },
                {
                  label: "Personal Interviews",
                  desc: "When users hesitate to discuss their experiences that are personal, sensitive, and require extra caution to be dealt with, such as healthcare, use in-depth interviews.",
                },
                {
                  label: "Personal Interviews",
                  desc: "When users hesitate to discuss their experiences that are personal, sensitive, and require extra caution to be dealt with, such as healthcare, use in-depth interviews.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full border-2 border-[#0d1b3e] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#0d1b3e]" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-[#0d1b3e] font-bold text-sm mb-1">{item.label}</p>
                    <p className="text-gray-600 text-sm leading-7">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#dde4f0] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Willing to Conduct a Customer Satisfaction Study?
              </h2>
              <p className="text-gray-600 text-sm leading-7">
                If you&apos;re willing to know how satisfied your users are, worry not.
                You can partner with a market research firm like Track Opinion. We
                have over 15 years of experience in various domains. We conduct
                both online and offline market research surveys to collect
                qualitative and quantitative reviews.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-[#0d1b3e] hover:bg-orange-500 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
