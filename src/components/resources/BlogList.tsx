"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Calendar, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ListPageHero from "@/components/ui/ListPageHero";
import { formatDate, type BlogSummary } from "@/lib/blog";

const PAGE_SIZE = 10;
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg==";

/**
 * Blog index.
 *
 * Every post is supplied by the server page, so search, category filtering and
 * pagination all run over the complete set. Filtering only the current page —
 * as this previously did — makes the search box quietly useless past page one.
 */
export default function BlogList({ posts }: { posts: BlogSummary[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const rawPage = Number(searchParams.get("page"));
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.trunc(rawPage) : 1;
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("cat") ?? "";

  const pushParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      const qs = params.toString();
      router.push(qs ? `?${qs}` : "/resources", { scroll: false });
    },
    [router, searchParams],
  );

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort(),
    [posts],
  );

  const hasActiveFilter = Boolean(query || category);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchQ && (!category || p.category === category);
    });
  }, [posts, query, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  /* ── Search + filter slot passed to hero ── */
  const searchSlot = (
    <div className="flex items-center gap-3">
      {/* Search pill */}
      <div
        className="flex items-center gap-3 rounded-full px-5 py-2.5 w-64"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <Search className="w-4 h-4 text-white/50 shrink-0" />
        <label className="sr-only" htmlFor="blog-search">
          Search blog posts
        </label>
        <input
          id="blog-search"
          type="search"
          placeholder="Search blog posts…"
          value={query}
          onChange={(e) => pushParams({ q: e.target.value || null, page: null })}
          className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none w-full"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => pushParams({ q: null, page: null })}
            className="text-white/50 hover:text-white shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowFilter((v) => !v)}
          aria-expanded={showFilter}
          aria-haspopup="true"
          aria-label="Filter by category"
          className="w-9 h-9 rounded-full flex items-center justify-center transition hover:opacity-80"
          style={{
            background: category || showFilter ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <SlidersHorizontal className="w-4 h-4 text-white/70" />
        </button>

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-11 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 min-w-[180px] z-50"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Category
              </p>
              <button
                type="button"
                onClick={() => {
                  pushParams({ cat: null, page: null });
                  setShowFilter(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${!category ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                All Posts
              </button>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    pushParams({ cat, page: null });
                    setShowFilter(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${category === cat ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {cat}
                </button>
              ))}
              {categories.length === 0 && (
                <p className="text-xs text-gray-400 px-2 py-1">No categories yet</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <main>
      <ListPageHero title="Blog Posts" breadcrumb={[{ name: "Resources" }]} right={searchSlot} />

      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div
            ref={ref}
            className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10"
            style={{ marginTop: -40 }}
            onClick={() => showFilter && setShowFilter(false)}
          >
            <div className="px-8">
              {/* Active filters bar */}
              {hasActiveFilter && (
                <div className="flex items-center gap-3 pt-6 pb-2 flex-wrap">
                  <span className="text-sm text-gray-400">Showing results for:</span>
                  {query && (
                    <span className="inline-flex items-center gap-1.5 bg-highlight text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                      &ldquo;{query}&rdquo;
                      <button
                        type="button"
                        aria-label="Remove search filter"
                        onClick={() => pushParams({ q: null, page: null })}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {category && (
                    <span className="inline-flex items-center gap-1.5 bg-highlight text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                      {category}
                      <button
                        type="button"
                        aria-label="Remove category filter"
                        onClick={() => pushParams({ cat: null, page: null })}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => pushParams({ q: null, cat: null, page: null })}
                    className="text-xs text-gray-400 underline hover:text-gray-600"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Empty state */}
              {visible.length === 0 && (
                <div className="py-24 text-center text-gray-400 text-sm">
                  {hasActiveFilter ? (
                    <>
                      <span className="font-semibold text-gray-500">
                        No posts match your search.
                      </span>
                      <br />
                      Try a different keyword or{" "}
                      <button
                        type="button"
                        className="underline hover:text-primary"
                        onClick={() => pushParams({ q: null, cat: null, page: null })}
                      >
                        clear filters
                      </button>
                      .
                    </>
                  ) : (
                    "No blog posts yet."
                  )}
                </div>
              )}

              {/* Posts */}
              {visible.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {visible.map((post, i) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.06 * i, duration: 0.4 }}
                      className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 py-10 group"
                    >
                      {/* Left — content */}
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <Calendar className="w-4 h-4 text-base" />
                          {post.date && (
                            <time dateTime={post.date} className="text-sm text-base">
                              {formatDate(post.date)}
                            </time>
                          )}
                          {post.category && (
                            <>
                              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                              <button
                                type="button"
                                onClick={() => pushParams({ cat: post.category, page: null })}
                                className="text-xs font-semibold text-primary bg-highlight px-2 py-0.5 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors duration-200"
                              >
                                {post.category}
                              </button>
                            </>
                          )}
                        </div>

                        <Link href={`/resources/${post.slug}`}>
                          <h2 className="text-lg font-bold text-gray-900 mb-4 leading-snug group-hover:text-primary transition-colors duration-300 cursor-pointer">
                            {post.title}
                          </h2>
                        </Link>

                        <p className="text-gray-900 text-base leading-8 font-medium mb-6 line-clamp-4">
                          {post.excerpt}
                        </p>

                        <Link
                          href={`/resources/${post.slug}`}
                          className="flex items-center gap-3 text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors duration-300 w-fit"
                        >
                          <span className="w-8 h-px bg-gray-400 inline-block group-hover:bg-primary transition-colors duration-300" />
                          Read More
                        </Link>
                      </div>

                      {/* Right — image */}
                      <Link
                        href={`/resources/${post.slug}`}
                        className="hidden md:flex items-center"
                        tabIndex={-1}
                        aria-hidden
                      >
                        <Image
                          src={post.img}
                          alt={post.altText}
                          width={360}
                          height={203}
                          sizes="360px"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                          style={{ height: "auto", borderRadius: "1rem", width: "100%" }}
                          unoptimized
                        />
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Pagination — over the filtered set, so it stays correct while searching */}
              {pageCount > 1 && (
                <nav aria-label="Blog pagination" className="flex justify-center gap-2 py-10">
                  {Array.from({ length: pageCount }, (_, i) => {
                    const n = i + 1;
                    return (
                      <button
                        type="button"
                        key={n}
                        aria-current={n === currentPage ? "page" : undefined}
                        onClick={() => {
                          pushParams({ page: n === 1 ? null : String(n) });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-300 ${
                          n === currentPage
                            ? "bg-primary text-white shadow"
                            : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
