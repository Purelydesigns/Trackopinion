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

  const posts = (await getAllPosts()).slice(0, limit).map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: formatDate(post.date),
    href: `/resources/${post.slug}`,
  }));

  return NextResponse.json(posts);
}
