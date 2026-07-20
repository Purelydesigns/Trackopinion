"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/ui/SectionHeader";

type Job = {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  locationType: string;
  type: string;
  desc: string;
};

const PAGE_SIZE = 10;

const typeColor: Record<string, string> = {
  "Full Time":  "text-green-700 bg-green-50 border-green-200",
  "Remote":     "text-blue-700 bg-blue-50 border-blue-200",
  "Internship": "text-purple-700 bg-purple-50 border-purple-200",
  "Hybrid":     "text-amber-700 bg-amber-50 border-amber-200",
};

const deptColor: Record<string, string> = {
  "Research":   "text-primary bg-highlight border-primary/20",
  "Projects":   "text-accent bg-blue-50 border-accent/20",
  "Marketing":  "text-orange-700 bg-orange-50 border-orange-200",
  "Internship": "text-purple-700 bg-purple-50 border-purple-200",
};

export default function OpenPositions() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs]         = useState<Job[]>([]);
  const [loading, setLoading]   = useState(true);
  const [fetchErr, setFetchErr] = useState("");
  const [total, setTotal]       = useState(0);
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("All Roles");

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));

  const pushPage = useCallback((n: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (n === 1) params.delete("page"); else params.set("page", String(n));
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setFetchErr("");
    setJobs([]);

    fetch(`/api/careers?pageNumber=${page}&pageSize=${PAGE_SIZE}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const raw        = Array.isArray(data) ? data : data?.data?.item1 ?? data?.data ?? data?.result ?? [];
        const totalCount = data?.data?.item2 ?? 0;
        const typeLabel: Record<number, string> = { 1: "Full Time", 2: "Part Time", 3: "Internship", 4: "Remote", 5: "Hybrid" };
        const list: Job[] = (Array.isArray(raw) ? raw : []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any, idx: number) => ({
            id:           item.pkId ?? item.id ?? idx,
            slug:         String(item.pkId ?? item.id ?? idx),
            title:        item.role ?? item.title ?? item.jobTitle ?? "Open Position",
            department:   item.department ?? item.category ?? "General",
            location:     item.location ?? item.city ?? "India",
            locationType: item.locationType ?? "On-site",
            type:         typeLabel[item.type] ?? item.type ?? "Full Time",
            desc:         (() => { const t = item.jobDesscription ?? item.jobDescription ?? item.description ?? item.shortDescription ?? ""; const w = t.split(/\s+/).filter(Boolean); return w.length > 50 ? w.slice(0, 50).join(" ") + "…" : t; })(),
          })
        );
        setJobs(list);
        setTotal(totalCount);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setFetchErr("Could not load openings. Please refresh.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page]);

  const categories = ["All Roles", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filtered = jobs.filter((j) => {
    const matchCat = category === "All Roles" || j.department === category;
    const q = query.toLowerCase();
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || j.department.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className="bg-section py-24">
      <div className="site-container px-6">

        <SectionHeader
          label="Open Positions"
          heading="Find your perfect role"
          description="We're actively hiring across research, project management, marketing, and analytics. See what's open and apply directly."
        />

        {/* ── Skeleton loader ── */}
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gray-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/5 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-3 w-20 rounded-md bg-gray-100 animate-pulse" />
                    <div className="h-3 w-24 rounded-md bg-gray-100 animate-pulse" />
                    <div className="h-3 w-16 rounded-md bg-gray-100 animate-pulse" />
                  </div>
                  <div className="h-3 w-3/4 rounded-full bg-gray-100 animate-pulse" />
                </div>
                <div className="shrink-0 flex gap-3">
                  <div className="h-9 w-20 rounded-lg bg-gray-100 animate-pulse" />
                  <div className="h-9 w-20 rounded-lg bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {fetchErr && (
          <div className="text-center py-16 text-red-500 text-sm">{fetchErr}</div>
        )}

        {/* ── Content ── */}
        {!loading && !fetchErr && (
          <>
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className={`flex items-center gap-3 flex-1 border rounded-xl px-5 py-3 bg-white transition-colors duration-200 ${query ? "border-accent shadow-sm" : "border-gray-200"}`}>
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search roles, departments, locations..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setCategory("All Roles"); }}
                  className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
                />
              </div>
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

            <p className="text-sm text-gray-500 mb-5">
              <span className="font-bold text-primary">{filtered.length}</span> position{filtered.length !== 1 ? "s" : ""} available
            </p>

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
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex gap-5"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-primary">
                        <Briefcase className="w-5 h-5" />
                      </div>

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
                        <p className="text-base leading-8 font-medium flex-1 text-gray-600">{job.desc}</p>
                      </div>

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

            {/* ── Pagination ── */}
            {!query && category === "All Roles" && totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-10">
                {Array.from({ length: totalPages }, (_, i) => {
                  const n = i + 1;
                  return (
                    <button
                      key={n}
                      onClick={() => { pushPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-300 ${
                        n === page
                          ? "bg-primary text-white shadow"
                          : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
