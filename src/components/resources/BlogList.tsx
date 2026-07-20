"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Calendar, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ListPageHero from "@/components/ui/ListPageHero";
import { toBlogSlug } from "@/lib/blogSlug";

type Post = {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  img: string;
  altText: string;
};

function formatDate(raw: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

function limitWords(text: string, max: number): string {
  const words = text.split(" ").filter(Boolean);
  if (words.length <= max) return text;
  return words.slice(0, max).join(" ") + "…";
}

const PAGE_SIZE = 10;
const BLUR_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg==";

export default function BlogList() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts]           = useState<Post[]>([]);
  const [loading, setLoading]       = useState(true);
  const [fetchErr, setFetchErr]     = useState("");
  const [total, setTotal]           = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  const page     = Math.max(1, Number(searchParams.get("page") ?? 1));
  const query    = searchParams.get("q") ?? "";
  const category = searchParams.get("cat") ?? "";

  const pushParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v); else params.delete(k);
    });
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setFetchErr("");
    setPosts([]);

    fetch(`/api/blogs?pageNumber=${page}&pageSize=${PAGE_SIZE}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const raw = Array.isArray(data) ? data : data?.data?.item1 ?? data?.data ?? data?.result ?? [];
        const totalCount = data?.data?.item2 ?? 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const slugMap: Record<string, number> = JSON.parse(sessionStorage.getItem("blogSlugMap") ?? "{}");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const list = (Array.isArray(raw) ? raw : []).map((item: any, idx: number) => {
          const slug = toBlogSlug(item.header ?? item.title ?? "blog-post");
          const numId = item.blogsId ?? item.id ?? idx;
          slugMap[slug] = numId;
          return {
            slug,
            date:     formatDate(item.fromDt ?? item.publishDate ?? item.createdAt ?? ""),
            category: item.blogTags ?? item.tags ?? item.category ?? "General",
            title:    item.header ?? item.title ?? item.blogTitle ?? "Blog Post",
            excerpt:  limitWords(stripHtml(item.content ?? item.subHeader ?? item.description ?? ""), 150),
            img:      item.imagePath ?? item.image ?? `https://picsum.photos/seed/${idx}/640/400`,
            altText:  item.altText ?? item.header ?? item.title ?? "Blog image",
          };
        });
        sessionStorage.setItem("blogSlugMap", JSON.stringify(slugMap));
        setPosts(list);
        setTotal(totalCount);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setFetchErr("Could not load blog posts. Please refresh.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page]);

  const categories   = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
  const hasActiveFilter = query || category;

  const filtered = posts.filter((p) => {
    const q = query.toLowerCase();
    const matchQ   = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchCat = !category || p.category === category;
    return matchQ && matchCat;
  });

  /* ── Search + filter slot passed to hero ── */
  const searchSlot = (
    <div className="flex items-center gap-3">
      {/* Search pill */}
      <div
        className="flex items-center gap-3 rounded-full px-5 py-2.5 w-64"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <Search className="w-4 h-4 text-white/50 shrink-0" />
        <input
          type="text"
          placeholder="Search blog posts…"
          value={query}
          onChange={(e) => pushParams({ q: e.target.value || null, page: null })}
          className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none w-full"
        />
        {query && (
          <button onClick={() => pushParams({ q: null })} className="text-white/50 hover:text-white shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter button */}
      <div className="relative">
        <button
          onClick={() => setShowFilter((v) => !v)}
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
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Category</p>
              <button
                onClick={() => { pushParams({ cat: null, page: null }); setShowFilter(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${!category ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                All Posts
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { pushParams({ cat, page: null }); setShowFilter(false); }}
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
      <ListPageHero title="Blog Posts" right={searchSlot} />

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
              {hasActiveFilter && !loading && (
                <div className="flex items-center gap-3 pt-6 pb-2 flex-wrap">
                  <span className="text-sm text-gray-400">Showing results for:</span>
                  {query && (
                    <span className="inline-flex items-center gap-1.5 bg-highlight text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                      &ldquo;{query}&rdquo;
                      <button onClick={() => pushParams({ q: null })}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {category && (
                    <span className="inline-flex items-center gap-1.5 bg-highlight text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                      {category}
                      <button onClick={() => pushParams({ cat: null, page: null })}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  <button
                    onClick={() => pushParams({ q: null, cat: null, page: null })}
                    className="text-xs text-gray-400 underline hover:text-gray-600"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Skeleton loader */}
              {loading && (
                <div className="divide-y divide-gray-100">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 py-10">
                      <div className="flex flex-col justify-center gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
                          <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                          <div className="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                        <div className="h-5 w-3/4 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-5 w-1/2 rounded-full bg-gray-200 animate-pulse" />
                        <div className="space-y-2 mt-1">
                          <div className="h-3.5 w-full rounded-full bg-gray-100 animate-pulse" />
                          <div className="h-3.5 w-full rounded-full bg-gray-100 animate-pulse" />
                          <div className="h-3.5 w-5/6 rounded-full bg-gray-100 animate-pulse" />
                          <div className="h-3.5 w-4/6 rounded-full bg-gray-100 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="h-px w-8 bg-gray-200 animate-pulse" />
                          <div className="h-3.5 w-20 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                      </div>
                      <div className="hidden md:flex items-center">
                        <div className="w-full aspect-video rounded-2xl bg-gray-200 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error */}
              {fetchErr && (
                <div className="py-24 text-center text-red-500 text-sm">{fetchErr}</div>
              )}

              {/* Empty state */}
              {!loading && !fetchErr && filtered.length === 0 && (
                <div className="py-24 text-center text-gray-400 text-sm">
                  {hasActiveFilter ? (
                    <>
                      <span className="font-semibold text-gray-500">No posts match your search.</span>
                      <br />
                      Try a different keyword or{" "}
                      <button className="underline hover:text-primary" onClick={() => pushParams({ q: null, cat: null, page: null })}>
                        clear filters
                      </button>.
                    </>
                  ) : "No blog posts yet."}
                </div>
              )}

              {/* Posts */}
              {!loading && !fetchErr && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4 }}
                  className="divide-y divide-gray-100"
                >
                  {filtered.map((post, i) => (
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
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">{post.date}</span>
                          {post.category && (
                            <>
                              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                              <button
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
                      <Link href={`/resources/${post.slug}`} className="hidden md:flex items-center">
                        <Image
                          src={post.img}
                          alt={post.altText}
                          width={360}
                          height={0}
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                          style={{ height: "auto", borderRadius: "1rem", width: "100%" }}
                          unoptimized
                        />
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {/* Pagination */}
              {!hasActiveFilter && total > PAGE_SIZE && (
                <div className="flex justify-center gap-2 py-10">
                  {Array.from({ length: Math.ceil(total / PAGE_SIZE) }, (_, i) => {
                    const n = i + 1;
                    return (
                      <button
                        key={n}
                        onClick={() => { pushParams({ page: String(n) }); window.scrollTo({ top: 0, behavior: "smooth" }); }}
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

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
