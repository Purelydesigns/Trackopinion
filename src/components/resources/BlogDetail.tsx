"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Share2, X, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ListPageHero from "@/components/ui/ListPageHero";
import { toBlogSlug } from "@/lib/blogSlug";

/* ── Share Popover ── */
const shareLinks = [
  {
    label: "LinkedIn",
    color: "hover:bg-[#0077b5] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8.5h4.5V24H.25V8.5zM8.5 8.5h4.31v2.13h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.94c0-1.89-.03-4.33-2.64-4.33-2.64 0-3.04 2.06-3.04 4.19V24H8.5V8.5z" />
      </svg>
    ),
    href: (url: string, title: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    label: "Twitter / X",
    color: "hover:bg-black hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.728-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Facebook",
    color: "hover:bg-[#1877f2] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    color: "hover:bg-[#25d366] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    label: "Email",
    color: "hover:bg-primary hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
    href: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

function SharePopover({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const url = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-900 font-medium hover:text-primary transition text-base"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-900">Share this article</p>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href(url, title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 text-gray-500 transition-all duration-200 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
              <span className="text-xs text-gray-500 truncate flex-1">{url}</span>
              <button onClick={copyLink} className="text-xs font-bold text-primary hover:text-primary transition shrink-0">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatDate(raw: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".");
}

type BlogData = {
  title: string;
  date: string;
  category: string;
  img: string;
  altText: string;
  content: string;
};

/* ── Main component ── */
export default function BlogDetail({ id }: { id: string }) {
  const [blog, setBlog]       = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      try {
        setLoading(true);
        setError("");
        setBlog(null);

        // Step 1 — resolve slug → numeric ID.
        // Fast path: check sessionStorage cache populated by the list page.
        const slugMap: Record<string, number> = JSON.parse(
          sessionStorage.getItem("blogSlugMap") ?? "{}"
        );
        let numericId: number | null = slugMap[id] ?? null;

        // Slow path: fetch list pages until we find the slug match.
        if (!numericId) {
          let pageNum = 1;
          const batchSize = 100;

          while (!numericId) {
            const listRes = await fetch(
              `/api/blogs?pageNumber=${pageNum}&pageSize=${batchSize}`,
              { signal }
            );
            if (!listRes.ok) throw new Error(`HTTP ${listRes.status}`);
            const listData = await listRes.json();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items: any[] = listData?.data?.item1 ?? [];
            const total: number = listData?.data?.item2 ?? 0;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const match = items.find((item: any) =>
              toBlogSlug(item.header ?? item.title ?? "") === id
            );

            if (match) {
              numericId = match.blogsId ?? match.id;
              // Seed the cache so subsequent visits are instant
              slugMap[id] = numericId!;
              sessionStorage.setItem("blogSlugMap", JSON.stringify(slugMap));
            } else if (pageNum * batchSize >= total) {
              break;
            } else {
              pageNum++;
            }
          }
        }

        if (!numericId) throw new Error("Post not found");

        // Step 2 — fetch the full detail
        const detailRes = await fetch(`/api/blogs/${numericId}`, { signal });
        if (!detailRes.ok) throw new Error(`HTTP ${detailRes.status}`);
        const data = await detailRes.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item: any = data?.data ?? data;
        setBlog({
          title:    item.header ?? item.title ?? item.blogTitle ?? "Blog Post",
          date:     formatDate(item.fromDt ?? item.publishDate ?? item.createdAt ?? ""),
          category: item.blogTags ?? item.tags ?? item.category ?? "",
          img:      item.imagePath ?? item.image ?? "",
          altText:  item.altText ?? item.header ?? "Blog image",
          content:  item.content ?? item.body ?? "",
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError(
          (err as Error).message === "Post not found"
            ? "This blog post could not be found."
            : "Could not load this post. Please try again."
        );
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  if (loading) {
    return (
      <main>
        <ListPageHero title="Blog Posts" />
        <section className="bg-section pb-20">
          <div className="site-container px-6">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10 px-8 py-16" style={{ marginTop: -40 }}>
              {/* Article skeleton */}
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="h-4 w-24 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-8 w-3/4 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-8 w-1/2 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-px w-full bg-gray-100 my-6" />
                <div className="w-full aspect-video rounded-2xl bg-gray-100 animate-pulse" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 rounded-full bg-gray-100 animate-pulse" style={{ width: `${85 + Math.sin(i) * 12}%` }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main>
        <ListPageHero title="Blog Posts" />
        <section className="bg-section pb-20">
          <div className="site-container px-6">
            <div className="bg-white rounded-3xl shadow-sm relative z-10 px-8 py-24 text-center text-red-500 text-sm" style={{ marginTop: -40 }}>
              {error || "Post not found."}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <ListPageHero title="Blog Posts" />

      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10 px-8 pt-8 pb-0" style={{ marginTop: -40 }}>

            {/* Back link */}
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All Blog Posts
            </Link>

            {/* Category tag */}
            {blog.category && (
              <div className="mb-4">
                <span className="inline-block bg-highlight text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
                  {blog.category}
                </span>
              </div>
            )}

            <motion.h1
              {...fadeUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl"
            >
              {blog.title}
            </motion.h1>

            {/* Date + share */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
              <SharePopover title={blog.title} />
            </div>
            {/* ── Hero image ── */}
            {blog.img && (
              <div className="flex justify-center pt-8">
                <Image
                  src={blog.img}
                  alt={blog.altText}
                  width={900}
                  height={0}
                  style={{ height: "auto", width: "60%", borderRadius: "1.25rem" }}
                  unoptimized
                  priority
                />
              </div>
            )}

            {/* ── Article body (API HTML) ── */}
            <div
              className="blog-content py-10"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 bg-highlight">
        <div className="site-container px-6">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Ready to Start Your Research?
              </h3>
              <p className="text-gray-900 text-base leading-8 font-medium">
                Partner with Track Opinion for expert market research solutions tailored to your business needs.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact-us"
                className="bg-primary hover:opacity-90 text-white text-base font-bold px-10 py-5 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
