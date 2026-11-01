"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SiteCard from "@/components/ui/SiteCard";
import SectionHeader from "@/components/ui/SectionHeader";

export interface LatestRead {
  title: string;
  excerpt?: string;
  /** Eyebrow line above the title — falls back to `date` */
  category?: string;
  /** Used as the eyebrow when no `category` is given */
  date?: string;
  /** Per-card destination; overrides the section-wide `linkHref` */
  href?: string;
}

interface Props {
  /** Supply a list to pin the cards; left out, the newest posts are fetched. */
  posts?: LatestRead[];
  /** Small uppercase line above the heading */
  label?: string;
  heading?: React.ReactNode;
  description?: string;
  /** Card footer link */
  linkLabel?: string;
  linkHref?: string;
  /** Show only the first N posts — keeps the grid to a single row */
  limit?: number;
  /** Bottom CTA. Omit to hide it. */
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function LatestReadsSection({
  posts,
  label = "Latest Reads",
  heading = <>Explore Our Resources</>,
  description = "Expert-written articles on qualitative research, consumer insights, and market research best practices.",
  linkLabel = "Read more →",
  linkHref = "/resources",
  limit,
  viewAllHref = "/resources",
  viewAllLabel = "VIEW ALL",
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  /* `null` while the newest posts are still on their way, so the grid can show
     placeholders instead of collapsing and shoving the page around. A caller
     that passes `posts` skips the request entirely. */
  const [fetched, setFetched] = useState<LatestRead[] | null>(null);
  const count = limit ?? 3;

  useEffect(() => {
    if (posts) return;

    const controller = new AbortController();
    fetch(`/api/blogs/latest?limit=${count}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Upstream ${res.status}`))))
      .then((data: LatestRead[]) => setFetched(data))
      .catch((err: Error) => {
        // An aborted request is this effect cleaning up, not a failure.
        if (err.name === "AbortError") return;
        console.error("[LatestReadsSection] could not load posts:", err.message);
        setFetched([]);
      });

    return () => controller.abort();
  }, [posts, count]);

  const items = posts ? (limit ? posts.slice(0, limit) : posts) : fetched;

  return (
    <section ref={ref} className="bg-section py-10">
      <div className="site-container px-6">

        <SectionHeader
          label={label}
          heading={heading}
          description={description}
          theme="light"
          className="!mb-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items === null &&
            Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-white/70 border border-gray-100 animate-pulse"
                aria-hidden
              />
            ))}

          {items?.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
            >
              <SiteCard className="flex flex-col h-full">
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                    {post.category ?? post.date}
                  </p>
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-8 font-medium flex-1 mb-6">
                    {post.excerpt ?? ""}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <Link
                      href={post.href ?? linkHref}
                      className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all duration-200"
                    >
                      {linkLabel}
                    </Link>
                  </div>
                </div>
              </SiteCard>
            </motion.div>
          ))}
        </div>

        {viewAllHref && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Link
              href={viewAllHref}
              className="bg-primary text-white text-sm font-semibold px-10 py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 shadow hover:-translate-y-0.5"
            >
              {viewAllLabel}
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
