"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface Faq {
  q: string;
  a: string;
}

/**
 * FAQ accordion.
 *
 * Several solution pages emit `faqSchema(faqs)` JSON-LD while rendering nothing
 * — they still had the `openFaq` state but had lost the markup. Google's
 * structured data policy requires FAQPage markup to correspond to content
 * visible on the page, so the schema on those pages was invalid. This is the
 * accordion that was on the loyalty and brand-tracker pages, shared so every
 * page emitting the schema also shows the content.
 */
export default function FaqAccordion({
  faqs,
  heading = "Have a Question? Contact Us",
  /** Tone for pages with a dark background. */
  variant = "light",
}: {
  faqs: Faq[];
  heading?: string;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  const dark = variant === "dark";

  return (
    <section className={dark ? "py-16" : "bg-white py-16"}>
      <div className="site-container px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2
            className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}
          >
            {heading}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.06 * i }}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`cursor-pointer w-full flex items-center justify-between px-6 py-5 text-left border rounded-2xl transition-colors ${
                    dark
                      ? "border-white/15 bg-white/5 hover:border-white/30"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`text-base font-bold pr-4 ${dark ? "text-white" : "text-gray-900"}`}
                  >
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp
                      aria-hidden
                      className={`w-5 h-5 shrink-0 ${dark ? "text-white/50" : "text-gray-400"}`}
                    />
                  ) : (
                    <ChevronDown
                      aria-hidden
                      className={`w-5 h-5 shrink-0 ${dark ? "text-white/50" : "text-gray-400"}`}
                    />
                  )}
                </button>

                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`mt-2 px-6 py-5 border rounded-2xl whitespace-pre-line ${
                      dark ? "border-white/15 bg-white/5" : "border-gray-200 bg-white"
                    }`}
                  >
                    <p
                      className={`text-base leading-8 font-medium ${
                        dark ? "text-white/80" : "text-gray-900"
                      }`}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
