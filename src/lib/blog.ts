import { apiBaseUrl } from "@/lib/api";
import { toBlogSlug } from "@/lib/blogSlug";
import { formatDate, limitWords, stripHtml } from "@/lib/blogText";

/* Re-exported so existing importers keep working; they live in blogText so a
   caller can use them without pulling jsdom in through this module. */
export { formatDate, limitWords, stripHtml };

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

/**
 * Give up on a slow CMS rather than hang.
 *
 * The list is paged, so several of these run back to back; without a bound,
 * one stalled connection sits on undici's 10s default and can outlast the
 * serverless function itself, which the platform then answers with a 500. A
 * timeout here throws instead, which the callers already turn into an empty
 * list and a page that still renders.
 */
const UPSTREAM_TIMEOUT_MS = 6000;

/**
 * The list endpoint is fast but unreliable.
 *
 * Measured against the live CMS: a page of 25 posts, 4.3MB, came back in 1.5s,
 * while a one-post page immediately afterwards hung for 21 seconds and
 * returned nothing at all. A single attempt is therefore a coin flip, and when
 * it loses `getAllPosts` returns an empty list — which is how /resources came
 * to prerender as "No blog posts yet" while the same code served posts
 * locally minutes earlier.
 *
 * So: a bounded wait, and retries, because the next attempt usually works.
 */
const LIST_TIMEOUT_MS = 12000;
const LIST_ATTEMPTS = 3;

async function fetchListPage(
  pageNumber: number,
  pageSize: number,
): Promise<{ item1?: RawPost[]; item2?: number }> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= LIST_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`${apiBaseUrl()}/api/Blog/blogList`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageNumber, pageSize }),
        /* `revalidate`, never `no-store`: a no-store fetch marks the route
           dynamic, and during static generation that throws
           DynamicServerError — which `getAllPosts` then caught and turned into
           an empty list. A page of this list runs past the 2MB cache limit and
           is refused with a build-log warning; that is noise, not failure. */
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(LIST_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);

      const json = (await res.json()) as { data?: { item1?: RawPost[]; item2?: number } };
      return json?.data ?? {};
    } catch (err) {
      lastError = err;
      console.error(
        `[lib/blog] list page ${pageNumber} attempt ${attempt}/${LIST_ATTEMPTS} failed:`,
        err instanceof Error ? err.message : err,
      );
      if (attempt < LIST_ATTEMPTS) await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }

  throw lastError;
}

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


/**
 * Allow the formatting a CMS editor needs and nothing else. Scripts, event
 * handlers, iframes and `javascript:` URLs are stripped before the HTML ever
 * reaches `dangerouslySetInnerHTML`.
 */
async function sanitize(html: string): Promise<string> {
  if (!html) return "";

  /* Imported here rather than at module scope. It pulls in jsdom, which needs
     Node >= 22.10 and is the heaviest thing this file touches; at the top it
     loads for the post list too, where no HTML is sanitised, and a failure
     takes down every blog path before any error handling runs. */
  let DOMPurify;
  try {
    DOMPurify = (await import("isomorphic-dompurify")).default;
  } catch (err) {
    // Never fall back to returning the raw HTML.
    console.error("[lib/blog] sanitiser unavailable:", err instanceof Error ? err.message : err);
    return "";
  }

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
 * The upstream list returns each post's full HTML body, so one page runs to
 * several megabytes — past Next's 2MB cache-entry limit. This used to sit
 * inside `unstable_cache` so the small derived result could be cached instead,
 * but that combination worked locally and failed on Vercel, where every path
 * through this module answered 500 at request time while the plain
 * `upstreamJson` routes served the same CMS fine. The caching now happens in
 * `getAllPosts`, in plain memory.
 */
async function loadSummaries(): Promise<BlogSummary[]> {
  const pageSize = 25;
  const collected: RawPost[] = [];

  for (let pageNumber = 1; pageNumber <= 40; pageNumber++) {
    const data = await fetchListPage(pageNumber, pageSize);
    const items = data.item1 ?? [];
    const total = data.item2 ?? 0;

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
}

/* Derived summaries, held per server instance for the revalidate window.
   This is what `unstable_cache` used to do, minus the framework API that
   proved fragile in production: the payload is the stripped-down list, a miss
   costs one walk of the archive, and a cold instance simply refetches. */
let memo: { at: number; posts: BlogSummary[] } | null = null;

/** Every post, without article bodies. Used by the index, sitemap and routing. */
export async function getAllPosts(): Promise<BlogSummary[]> {
  if (memo && Date.now() - memo.at < REVALIDATE_SECONDS * 1000) return memo.posts;

  try {
    const posts = await loadSummaries();
    memo = { at: Date.now(), posts };
    return posts;
  } catch (err) {
    // An upstream outage must not take a page down with it.
    console.error("[lib/blog] getAllPosts failed:", err instanceof Error ? err.message : err);

    /* Stale beats empty. Returning [] here is what printed "No blog posts yet"
       on a prerendered page and then cached it for an hour; last known good is
       worse than fresh but far better than pretending the blog is empty. */
    if (memo) {
      console.error("[lib/blog] serving the last known list instead");
      return memo.posts;
    }
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
      {
        headers: { accept: "*/*" },
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      },
    );
    if (!res.ok) throw new Error(`Upstream ${res.status}`);

    const json = (await res.json()) as { data?: RawPost } | RawPost;
    const raw = ("data" in json ? json.data : json) as RawPost | undefined;

    return { ...summary, content: await sanitize(raw?.content ?? raw?.body ?? "") };
  } catch (err) {
    console.error("[lib/blog] getPostBySlug failed:", err instanceof Error ? err.message : err);
    // The post exists — render it with what the summary already gave us rather
    // than 404ing on a transient upstream error.
    return { ...summary, content: "" };
  }
}
