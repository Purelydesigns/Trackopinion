import { NextResponse } from "next/server";
import { clampInt } from "@/lib/api";
import { formatDate, getAllPosts } from "@/lib/blog";

/**
 * The newest posts, in the order the resources index shows them, shaped for
 * the "Explore Our Resources" teaser.
 *
 * That teaser sits inside client components on a dozen pages, so it cannot
 * call `getAllPosts` itself. This route does it server-side and hands back the
 * handful of fields a card needs — no article bodies.
 */
export const revalidate = 3600;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = clampInt(searchParams.get("limit"), { min: 1, max: 12, fallback: 3 });

  const all = await getAllPosts();

  /* `getAllPosts` answers an upstream failure with an empty list so a page
     never dies with it, which leaves this route unable to tell "no posts" from
     "could not reach the CMS". Say so in the server log, or the teaser just
     renders empty and the deployment gives no clue why. */
  if (all.length === 0) {
    console.error(
      "[api/blogs/latest] no posts returned — check API_BASE_URL is set in this environment and that the CMS is reachable from it",
    );
  }

  const posts = all.slice(0, limit).map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: formatDate(post.date),
    href: `/resources/${post.slug}`,
  }));

  return NextResponse.json(posts);
}
