"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Monitor, FileText, BarChart2, Megaphone, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = ["All Roles", "Research", "Projects", "Marketing", "Internship"];

const jobs = [
  {
    id: 1,
    slug: "assistant-project-manager",
    title: "Assistant Project Manager",
    department: "Projects",
    location: "Noida",
    locationType: "On-site",
    type: "Full Time",
    icon: <Monitor className="w-5 h-5" />,
    desc: "Support end-to-end delivery of market research projects. Coordinate with clients, manage timelines, and ensure quality across simultaneous studies.",
  },
  {
    id: 2,
    slug: "project-associate",
    title: "Project Associate",
    department: "Research",
    location: "Remote",
    locationType: "Remote",
    type: "Remote",
    icon: <FileText className="w-5 h-5" />,
    desc: "Execute quantitative and qualitative research projects — data collection, vendor coordination, fieldwork management, and reporting support.",
  },
  {
    id: 3,
    slug: "research-associate",
    title: "Research Associate",
    department: "Research",
    location: "Noida",
    locationType: "On-site",
    type: "Full Time",
    icon: <BarChart2 className="w-5 h-5" />,
    desc: "Analyse survey data, prepare client-ready reports, and deliver actionable insights across healthcare, FMCG, and technology verticals.",
  },
  {
    id: 4,
    slug: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Noida",
    locationType: "On-site",
    type: "Full Time",
    icon: <Megaphone className="w-5 h-5" />,
    desc: "Drive brand growth through content marketing, social media campaigns, and thought leadership for a global research audience.",
  },
  {
    id: 5,
    slug: "senior-research-associate",
    title: "Senior Research Associate",
    department: "Research",
    location: "Remote",
    locationType: "Remote",
    type: "Full Time",
    icon: <FileText className="w-5 h-5" />,
    desc: "Lead end-to-end research projects, mentor junior associates, and deliver high-quality insights to global clients.",
  },
  {
    id: 6,
    slug: "research-associate-intern",
    title: "Research Associate Intern",
    department: "Internship",
    location: "New Delhi",
    locationType: "On-site",
    type: "Internship",
    icon: <GraduationCap className="w-5 h-5" />,
    desc: "Join our research team as an intern — assist with data collection, coding, and report preparation on live client projects.",
  },
];

const typeColor: Record<string, string> = {
  "Full Time": "text-green-700 bg-green-50 border-green-200",
  "Remote":    "text-blue-700 bg-blue-50 border-blue-200",
  "Internship":"text-purple-700 bg-purple-50 border-purple-200",
  "Hybrid":    "text-amber-700 bg-amber-50 border-amber-200",
};

const deptColor: Record<string, string> = {
  "Research":   "text-primary bg-highlight border-primary/20",
  "Projects":   "text-accent bg-blue-50 border-accent/20",
  "Marketing":  "text-orange-700 bg-orange-50 border-orange-200",
  "Internship": "text-purple-700 bg-purple-50 border-purple-200",
};

export default function OpenPositions() {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("All Roles");

  const filtered = jobs.filter((j) => {
    const matchCat = category === "All Roles" || j.department === category;
    const q = query.toLowerCase();
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || j.department.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <section className="bg-section py-24">
      <div className="site-container px-6">


        <SectionHeader
          label="Open Positions"
          heading="Find your perfect role"
          description="We're actively hiring across research, project management, marketing, and analytics. See what's open and apply directly."
        />

        {/* ── Search + Filter ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className={`flex items-center gap-3 flex-1 border rounded-xl px-5 py-3 bg-white transition-colors duration-200 ${query ? "border-accent shadow-sm" : "border-gray-200"}`}>
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search roles, departments, locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-200 whitespace-nowrap
                  ${category === cat
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-primary/40 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Count ── */}
        <p className="text-sm text-gray-500 mb-5">
          <span className="font-bold text-primary">{filtered.length}</span> position{filtered.length !== 1 ? "s" : ""} available
        </p>

        {/* ── Job cards ── */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-20 text-gray-400"
              >
                <Search className="w-10 h-10 mb-4 text-gray-300" />
                <p className="text-sm">No roles match your search. Try a different term or clear the filter.</p>
              </motion.div>
            ) : (
              filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-5"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-primary">
                    {job.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-primary mb-1.5">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`text-xs font-semibold border rounded-md px-2.5 py-1 ${deptColor[job.department] ?? "text-gray-600 bg-gray-50 border-gray-200"}`}>
                        {job.department}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" /> {job.location}
                      </span>
                      <span className={`text-xs font-semibold border rounded-md px-2.5 py-1 ${typeColor[job.type] ?? "text-gray-600 bg-gray-50 border-gray-200"}`}>
                        {job.type}
                      </span>
                    </div>
                    <p className="text-base leading-8 font-medium flex-1 text-gray-600">
                      {job.desc}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex items-center gap-3 ml-14">
                    <Link
                      href={`/career/${job.slug}`}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:border-primary/40 hover:text-primary transition-all duration-200 whitespace-nowrap"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/career/${job.slug}#apply`}
                      className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
                    >
                      Apply <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
