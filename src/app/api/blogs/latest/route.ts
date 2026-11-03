import { NextResponse } from "next/server";
import { apiBaseUrl, clampInt, logAndDescribe, upstreamJson } from "@/lib/api";
import { toBlogSlug } from "@/lib/blogSlug";
import { formatDate, limitWords, stripHtml } from "@/lib/blogText";

/**
 * The newest posts, shaped for the "Explore Our Resources" teaser.
 *
 * That teaser sits inside client components on a dozen pages, so it cannot
 * load posts itself. This route does it server-side and hands back the handful
 * of fields a card needs.
 *
 * It deliberately does NOT go through `getAllPosts`. That walks the whole
 * archive behind `unstable_cache` and imports the HTML sanitiser, and on
 * Vercel this route answered 500 in half a second — before its own error
 * handling could run — while `/api/blogs`, which is a plain `upstreamJson`
 * call, served the same CMS fine. A teaser needs three posts, not a hundred,
 * so it now asks for one small page over the proven path.
 */
export const dynamic = "force-dynamic";

/** Shape of the upstream list rows, as much of it as a card needs. */
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
  content?: string;
  body?: string;
  subHeader?: string;
  description?: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = clampInt(searchParams.get("limit"), { min: 1, max: 12, fallback: 3 });

    const json = (await upstreamJson(`${apiBaseUrl()}/api/Blog/blogList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageNumber: 1, pageSize: limit }),
      cache: "no-store",
    })) as { data?: { item1?: RawPost[] } };

    const posts = (json?.data?.item1 ?? [])
      .map((raw) => {
        const title = raw.header ?? raw.title ?? raw.blogTitle ?? "";
        // No title means no stable slug, so no reachable URL.
        if (!title.trim()) return null;

        const plain = stripHtml(
          (raw.content ?? raw.body ?? "") || raw.subHeader || raw.description || "",
        );
        const date = raw.fromDt ?? raw.publishDate ?? raw.createdAt ?? "";

        return {
          title,
          excerpt: limitWords(plain, 60),
          category: raw.blogTags ?? raw.tags ?? raw.category ?? "General",
          date: formatDate(date),
          href: `/resources/${toBlogSlug(title)}`,
        };
      })
      .filter((post) => post !== null)
      .slice(0, limit);

    return NextResponse.json(posts);
  } catch (err) {
    /* A teaser in the footer of every page must not be able to serve a 500.
       Answer with an empty list and let the section render without cards. */
    logAndDescribe("blogs/latest", err);
    return NextResponse.json([]);
  }
}
