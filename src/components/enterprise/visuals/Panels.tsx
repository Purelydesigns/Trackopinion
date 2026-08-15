"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const NAVY = "#0d1b3e";
export const BLUE = "#1a6fe8";
export const MUTED = "#c7d6ea";
export const TRACK = "#eef3f9";

/** Shared white panel shell so every page's artwork sits in the same frame. */
export function VisualPanel({
  eyebrow,
  title,
  chip,
  children,
}: {
  eyebrow: string;
  title: string;
  chip?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-3xl opacity-60"
        style={{ background: "radial-gradient(60% 60% at 45% 30%, rgba(26,111,232,0.12), transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl border border-gray-100 shadow-xl p-7"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">{eyebrow}</p>
            <p className="text-primary font-extrabold text-lg leading-none">{title}</p>
          </div>
          {chip && (
            <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
              {chip}
            </span>
          )}
        </div>
        {children}
      </motion.div>
    </div>
  );
}

/** Small stat strip used at the foot of several panels. */
export function StatStrip({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 mt-6 pt-6 border-t border-gray-100" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }}>
      {items.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 + i * 0.08 }}
        >
          <p className="text-primary font-extrabold text-base leading-none mb-1">{m.value}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{m.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
