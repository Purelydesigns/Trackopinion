"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { jobs } from "@/lib/jobs";
type JobEntry = typeof jobs[0];

/* ── Job row ── */
function JobRow({ job }: { job: JobEntry }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-7 border-b border-gray-100 last:border-0">
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-2">{job.title}</h3>
        <div className="flex gap-2">
          <span className="text-xs font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary" /> {job.location}
          </span>
          <span className="text-xs font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 text-primary" /> {job.type}
          </span>
        </div>
      </div>
      <div className="flex gap-3 shrink-0">
        <Link
          href={`/career/${job.slug}`}
          className="cursor-pointer px-6 py-2.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-blue-50 transition-colors duration-200"
        >
          Details
        </Link>
        <Link
          href={`/career/${job.slug}#apply`}
          className="cursor-pointer px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary transition-colors duration-200"
        >
          Apply
        </Link>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function CareerPage() {
  const [query, setQuery] = useState("");
  const listRef = useRef(null);
  const inView = useInView(listRef, { once: true });

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.location.toLowerCase().includes(query.toLowerCase()) ||
    j.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      {/* ── Banner ── */}
      <div className="-mt-[76px] bg-primary py-8">
        <div className="site-container px-6 text-center pt-[76px]">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            Careers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/70 text-base"
          >
            Explore our Current Openings for you, we believe you will find it interesting.
          </motion.p>
        </div>
      </div>

      {/* ── White card — job list ── */}
      <div className="bg-[#111827]">
        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-t-[2.5rem]"
        >
          <div className="site-container px-6 py-10">

            {/* Search */}
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3 mb-8">
              <input
                type="text"
                placeholder="Find your Role"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
            </div>

            {/* Job list */}
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400 py-16 text-sm">No openings found for &ldquo;{query}&rdquo;</p>
            ) : (
              filtered.map((job, i) => (
                <motion.div
                  key={job.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <JobRow job={job} />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
