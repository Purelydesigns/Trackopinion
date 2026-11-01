"use client";

import Link from "next/link";
import { useRef } from "react";
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

const defaultPosts: LatestRead[] = [
  {
    //category: "Advertising",
    title: "One of Ukraine's leading beverage manufacturers",
    excerpt:
      "As a market leader in the beverage industry in our home country, understanding the dynamic Indian market is critical to our regional growth strategy. We partnered with Track Opinion for a comprehensive study on the Carbonated Soft Drinks (CSD) and Energy Drinks (ED) category, and the results exceeded our expectations.",
  },
  {
    // category: "FMCG",
    title: "Matthias Gitschell Director – Audience Measurement Ipsos UK",
    excerpt:
      "We are working with Track Opinion since now 7 years already. They are contributing a significant part of hard-to-reach respondents for one our major media surveys run across more than 30 markets globally. They are able to source Senior Business Executives for all markets included in the survey and we have always been ....",
  },
  {
    // category: "Automobile",
    title: "Teppei Yamashita Managing Director K&L Communications India Pvt. Ltd.",
    excerpt:
      "Track Opinion has supported us greatly to conduct a thorough survey to assess some of the online creatives which was requested by our client. TO has asked for detailed questions before diving into the planning of the survey, helped to customize each form of the survey so that it will be easily understood by the participants.",
  },
];

export default function LatestReadsSection({
  posts = defaultPosts,
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

  const items = limit ? posts.slice(0, limit) : posts;

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
          {items.map((post, i) => (
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
