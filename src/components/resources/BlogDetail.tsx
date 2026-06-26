"use client";

import Link from "next/link";
import { Calendar, Share2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ── Share Popover ── */
const shareLinks = [
  {
    label: "LinkedIn",
    color: "hover:bg-[#0077b5] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8.5h4.5V24H.25V8.5zM8.5 8.5h4.31v2.13h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.94c0-1.89-.03-4.33-2.64-4.33-2.64 0-3.04 2.06-3.04 4.19V24H8.5V8.5z" />
      </svg>
    ),
    href: (url: string, title: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    label: "Twitter / X",
    color: "hover:bg-black hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.728-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Facebook",
    color: "hover:bg-[#1877f2] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    color: "hover:bg-[#25d366] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    label: "Email",
    color: "hover:bg-primary hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
    href: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

function SharePopover({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const url = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-900 font-medium hover:text-primary transition text-base"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-900">Share this article</p>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href(url, title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 text-gray-500 transition-all duration-200 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Copy link */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
              <span className="text-xs text-gray-500 truncate flex-1">{url}</span>
              <button
                onClick={copyLink}
                className="text-xs font-bold text-primary hover:text-primary transition shrink-0"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Reusable building blocks ── */

function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-block bg-[#e8ecf8] text-primary text-sm font-bold px-4 py-2 rounded-lg mb-6">
      {text}
    </div>
  );
}

function BoldPara({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-900 text-base leading-8 mb-3 font-medium">{children}</p>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-900 text-base leading-8 mb-3 font-medium">{children}</p>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start py-1.5">
      <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-1">
        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
      </span>
      <span className="text-gray-900 text-base leading-8 font-medium">{children}</span>
    </li>
  );
}

function SubCheckItem({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start py-1.5">
      <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-1">
        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
      </span>
      <span className="text-gray-900 text-base leading-8 font-medium">
        {label && <strong className="text-gray-900 font-bold">{label} </strong>}
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
      <section className="-mt-[76px] bg-white pt-14 pb-0 pt-[calc(76px+3.5rem)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            {...fadeUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl"
          >
            How to Conduct Customer Satisfaction Research
          </motion.h1>

          {/* Date + share */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 text-gray-900 text-base font-medium">
              <Calendar className="w-4 h-4" />
              <span>24.03.2026</span>
            </div>
            <SharePopover title="How to Conduct Customer Satisfaction Research" />
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
                <li key={i} className="flex gap-4 items-start py-1.5">
                  <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                  </span>
                  <span className="text-gray-900 text-base leading-8 font-medium">
                    <strong className="text-gray-900 font-bold">{item.label} </strong>
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 bg-highlight">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Willing to Conduct a Customer Satisfaction Study?
              </h3>
              <p className="text-gray-900 text-base leading-8 font-medium">
                If you&apos;re willing to know how satisfied your users are, worry not.
                You can partner with a market research firm like Track Opinion. We
                have over 15 years of experience in various domains. We conduct
                both online and offline market research surveys to collect
                qualitative and quantitative reviews.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
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
