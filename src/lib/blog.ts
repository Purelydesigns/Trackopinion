import { unstable_cache } from "next/cache";
import DOMPurify from "isomorphic-dompurify";
import { apiBaseUrl } from "@/lib/api";
import { toBlogSlug } from "@/lib/blogSlug";

/**
 * Server-side blog data access.
 *
 * Posts are fetched here, on the server, so the article body and its real
 * metadata land in the initial HTML. The browser is never asked to resolve a
 * slug by paging through the list endpoint.
 */

/**
 * A post as the index needs it — everything except the article body.
 *
 * Keeping `content` out of this shape is what allows the whole list to be
 * cached: the upstream list endpoint returns each post's full HTML, and
 * seventy-odd of those together run well past Next's 2MB cache-entry limit.
 */
export interface BlogSummary {
  id: number;
  slug: string;
  title: string;
  /** ISO date, or "" when upstream sent nothing parseable. */
  date: string;
  category: string;
  img: string;
  altText: string;
  excerpt: string;
}

/** A summary plus the article itself, for the detail page. */
export interface BlogPost extends BlogSummary {
  /** Sanitised HTML, safe to pass to dangerouslySetInnerHTML. */
  content: string;
}

/** Shown when a post has no image of its own. */
export const FALLBACK_IMAGE = "/images/blog-fallback.svg";

/** Cache window for blog data. Posts change rarely; an hour is plenty. */
const REVALIDATE_SECONDS = 3600;

/* ── Upstream shape ── */
interface RawPost {
  blogsId?: number;
  id?: number;
  header?: string;
  title?: string;
  blogTitle?: string;
  fromDt?: string;
  publishDate?: string;
  createdAt?: string;
  blogTags?: string;
  tags?: string;
  category?: string;
  imagePath?: string;
  image?: string;
  altText?: string;
  content?: string;
  body?: string;
  subHeader?: string;
  description?: string;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function limitWords(text: string, max: number): string {
  const words = text.split(" ").filter(Boolean);
  return words.length <= max ? text : words.slice(0, max).join(" ") + "…";
}

/** Render an ISO date as dd.mm.yyyy, matching the design. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, ".");
}

/**
 * Allow the formatting a CMS editor needs and nothing else. Scripts, event
 * handlers, iframes and `javascript:` URLs are stripped before the HTML ever
 * reaches `dangerouslySetInnerHTML`.
 */
function sanitize(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "hr", "strong", "b", "em", "i", "u", "s",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "pre", "code",
      "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      "span", "div",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "colspan", "rowspan"],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/)/i,
  });
}

function normalise(raw: RawPost): BlogSummary | null {
  const title = raw.header ?? raw.title ?? raw.blogTitle ?? "";
  // A post with no title cannot get a stable slug, so it cannot get a URL.
  if (!title.trim()) return null;

  const id = raw.blogsId ?? raw.id;
  // Falling back to the array index here would mint a wrong, stable-looking id
  // and route visitors to the wrong post. Better to skip the entry.
  if (typeof id !== "number") return null;

  const rawContent = raw.content ?? raw.body ?? "";
  const plain = stripHtml(rawContent || raw.subHeader || raw.description || "");
  const date = raw.fromDt ?? raw.publishDate ?? raw.createdAt ?? "";
  const parsed = date ? new Date(date) : null;

  return {
    id,
    slug: toBlogSlug(title),
    title,
    date: parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : "",
    category: raw.blogTags ?? raw.tags ?? raw.category ?? "General",
    img: raw.imagePath ?? raw.image ?? FALLBACK_IMAGE,
    altText: raw.altText ?? title,
    excerpt: limitWords(plain, 60),
  };
}

/**
 * Every post, de-duplicated by slug.
 *
 * `toBlogSlug` strips punctuation and truncates, so two similar titles can
 * collide. The first post wins and later collisions get a `-2`, `-3` suffix so
 * each post keeps a reachable, stable URL.
 *
 * The upstream list endpoint returns each post's full HTML body, so a page of
 * ten can run to several megabytes — past Next's 2MB per-entry limit, which
 * silently disables caching for the whole blog. The fetches below are therefore
 * uncached, and `unstable_cache` stores the *derived* result instead: the same
 * revalidate window, over data small enough to actually cache.
 */
const loadSummaries = unstable_cache(
  async (): Promise<BlogSummary[]> => {
    const pageSize = 25;
    const collected: RawPost[] = [];

    for (let pageNumber = 1; pageNumber <= 40; pageNumber++) {
      const res = await fetch(`${apiBaseUrl()}/api/Blog/blogList`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageNumber, pageSize }),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);

      const json = (await res.json()) as { data?: { item1?: RawPost[]; item2?: number } };
      const items = json?.data?.item1 ?? [];
      const total = json?.data?.item2 ?? 0;

      collected.push(...items);
      // Stop on an empty page too — a wrong `total` must not spin the loop.
      if (items.length === 0 || collected.length >= total) break;
    }

    const seen = new Map<string, number>();
    const posts: BlogSummary[] = [];

    for (const raw of collected) {
      const post = normalise(raw);
      if (!post) continue;

      const count = seen.get(post.slug) ?? 0;
      seen.set(post.slug, count + 1);
      if (count > 0) post.slug = `${post.slug}-${count + 1}`;

      posts.push(post);
    }

    return posts;
  },
  ["blog-summaries"],
  { revalidate: REVALIDATE_SECONDS, tags: ["blog"] },
);

/** Every post, without article bodies. Used by the index, sitemap and routing. */
export async function getAllPosts(): Promise<BlogSummary[]> {
  try {
    return await loadSummaries();
  } catch (err) {
    // An upstream outage must not take a page down with it.
    console.error("[lib/blog] getAllPosts failed:", err instanceof Error ? err.message : err);
    return [];
  }
}

/**
 * One post with its article body.
 *
 * The summary list resolves the slug to an id, then the body comes from the
 * single-post endpoint — a small response that caches normally, rather than
 * dragging every other post's HTML along with it.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const summary = (await getAllPosts()).find((p) => p.slug === slug);
  if (!summary) return null;

  try {
    const res = await fetch(
      `${apiBaseUrl()}/api/Blog/blogDetails?id=${encodeURIComponent(String(summary.id))}`,
      { headers: { accept: "*/*" }, next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) throw new Error(`Upstream ${res.status}`);

    const json = (await res.json()) as { data?: RawPost } | RawPost;
    const raw = ("data" in json ? json.data : json) as RawPost | undefined;

    return { ...summary, content: sanitize(raw?.content ?? raw?.body ?? "") };
  } catch (err) {
    console.error("[lib/blog] getPostBySlug failed:", err instanceof Error ? err.message : err);
    // The post exists — render it with what the summary already gave us rather
    // than 404ing on a transient upstream error.
    return { ...summary, content: "" };
  }
}
