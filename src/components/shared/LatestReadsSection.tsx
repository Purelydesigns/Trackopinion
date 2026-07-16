"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteCard from "@/components/ui/SiteCard";

export interface LatestRead {
  emoji: string;
  date: string;
  title: string;
  excerpt: string;
}

interface Props {
  posts?: LatestRead[];
  description?: string;
}

const defaultPosts: LatestRead[] = [
  {
    emoji: "🧠",
    date: "24.03.2026",
    title: "From Clinical to Commercial: How Research Bridges Science and Market Reality",
    excerpt: "How qualitative insights drive the transition from lab findings to commercially viable products.",
  },
  {
    emoji: "📊",
    date: "24.03.2026",
    title: "Why Your Market Research Needs Custom Survey Programming?",
    excerpt: "Tailored qualitative instruments drive richer, more actionable consumer understanding.",
  },
  {
    emoji: "🎯",
    date: "24.03.2026",
    title: "Measuring Customer Loyalty: Key Metrics to Track via Market Research",
    excerpt: "Blend qualitative depth with key loyalty metrics for a complete customer picture.",
  },
];

export default function LatestReadsSection({
  posts = defaultPosts,
  description = "Expert-written articles on qualitative research, consumer insights, and market research best practices.",
}: Props) {
  return (
    <section className="py-20 bg-section">
      <div className="site-container px-6">

        <SectionHeader
          label="Latest Reads"
          heading={
            <>
              Explore Our Resources{" "}
            </>
          }
          description={description}
          theme="light"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <SiteCard className="flex flex-col h-full">
                {/* Dark image area */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0d1b3e 0%, #1a3468 100%)",
                    height: 160,
                  }}
                >
                  <span className="text-5xl">{post.emoji}</span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                    {post.date}
                  </p>
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-8 font-medium flex-1 mb-6">
                    {post.excerpt}
                  </p>
                </div>
              </SiteCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
