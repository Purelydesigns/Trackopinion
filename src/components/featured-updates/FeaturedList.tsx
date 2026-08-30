"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import ListPageHero from "@/components/ui/ListPageHero";
import { featuredUpdates, formatUpdateDate } from "@/lib/featuredUpdates";

export default function FeaturedList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <main>
      {/* ── Video banner — same as the Resources listing ── */}
      <ListPageHero title="Featured Updates" breadcrumb="Featured Updates" />

      {/* ── White card overlapping the banner ── */}
      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10"
            style={{ marginTop: -40 }}
          >
            <div className="px-8 sm:px-10 py-4">
              <p className="text-gray-500 text-base leading-8 font-medium pt-6 pb-2">
                Insights, Breakthroughs, and Updates Shaping our Industry and Beyond
              </p>

              {featuredUpdates.map((item, i) => (
                  <motion.article
                    key={item.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.07 * i, duration: 0.4 }}
                    className={`flex items-center justify-between gap-6 py-8 group ${
                      i < featuredUpdates.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    {/* Left — tags + title + date */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className={
                              tagIndex === 0
                                ? "bg-primary text-white text-xs font-semibold px-3 py-1 rounded-md"
                                : "bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-md border border-gray-200"
                            }
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                        <Link href={`/featured-updates/${item.slug}`}>{item.title}</Link>
                      </h2>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <time dateTime={item.date} className="text-sm text-gray-400">
                          {formatUpdateDate(item.date)}
                        </time>
                      </div>
                    </div>

                    {/* Right — arrow to the detail page */}
                    <Link
                      href={`/featured-updates/${item.slug}`}
                      aria-label={`Read: ${item.title}`}
                      tabIndex={-1}
                      className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                    >
                      <ArrowRight aria-hidden className="w-5 h-5 text-white" />
                    </Link>
                  </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
