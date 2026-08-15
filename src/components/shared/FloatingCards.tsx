"use client";

import { motion } from "framer-motion";

export interface FloatCard {
  eyebrow: string;
  title: string;
  sub?: string;
}

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
            background: i === bars.length - 1 ? "#0d1b3e" : i === bars.length - 2 ? "#60a5fa" : "#bfdbfe",
          }}
        />
      ))}
    </div>
  );
}

/* Each card gets a different amplitude + duration so they drift independently */
const bounceVariants = [
  { y: [0, -14, 0], duration: 3.2 },
  { y: [0, -10, 0], duration: 2.6 },
  { y: [0, -18, 0], duration: 3.8 },
];

/**
 * Three drifting cards used as the visual half of a text/visual split section.
 * Shared by the research pages and the concept & ad-testing page.
 */
export default function FloatingCards({ cards }: { cards: [FloatCard, FloatCard, FloatCard] }) {
  return (
    <div className="relative w-full h-[560px]">
      <div className="absolute w-48 h-48 rounded-full bg-blue-50 opacity-70 bottom-0 right-8 blur-3xl pointer-events-none" />
      <div className="absolute w-28 h-28 rounded-full bg-blue-100 opacity-40 top-6 right-2 blur-2xl pointer-events-none" />

      {/* card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0, duration: 0.55 }}
        style={{ top: "2%", left: "2%", position: "absolute" }}
      >
        <motion.div
          animate={{ y: bounceVariants[0].y }}
          transition={{ duration: bounceVariants[0].duration, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white rounded-2xl shadow-xl px-6 py-5 w-74"
          style={{ rotate: -4 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">{cards[0].eyebrow}</p>
          <p className="text-base font-bold text-gray-800 leading-snug">{cards[0].title}</p>
          {cards[0].sub && <p className="text-xs text-gray-400 mt-1">{cards[0].sub}</p>}
          <MiniBarChart />
        </motion.div>
      </motion.div>

      {/* card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.14, duration: 0.55 }}
        style={{ top: "30%", right: "0%", position: "absolute" }}
      >
        <motion.div
          animate={{ y: bounceVariants[1].y }}
          transition={{ duration: bounceVariants[1].duration, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl px-6 py-5 w-66"
          style={{ rotate: 3 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">{cards[1].eyebrow}</p>
          <p className="text-base font-bold text-gray-800 leading-snug">{cards[1].title}</p>
          {cards[1].sub && <p className="text-xs text-gray-400 mt-1">{cards[1].sub}</p>}
          <span className="inline-block mt-2.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full px-3 py-1">
            Results
          </span>
        </motion.div>
      </motion.div>

      {/* card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.26, duration: 0.55 }}
        style={{ top: "55%", left: "8%", position: "absolute" }}
      >
        <motion.div
          animate={{ y: bounceVariants[2].y }}
          transition={{ duration: bounceVariants[2].duration, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="bg-white rounded-2xl shadow-xl px-6 py-5 w-70"
          style={{ rotate: -2 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">{cards[2].eyebrow}</p>
          <p className="text-base font-bold text-gray-800 leading-snug">{cards[2].title}</p>
          {cards[2].sub && <p className="text-xs text-gray-400 mt-1">{cards[2].sub}</p>}
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
