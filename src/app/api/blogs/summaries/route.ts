import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

/**
 * Every post, without article bodies — what the blog index needs.
 *
 * The CMS list endpoint returns each post's full HTML, so one page of it runs
 * to about 4MB and the whole archive to roughly 15MB. Far too much to hand a
 * browser, which is why this strips each record down to a title, an excerpt,
 * a date and a slug first: ~80 posts come to tens of kilobytes.
 *
 * Returning the whole set in one response is deliberate. The index searches
 * and filters across every post, so paging this endpoint would make the search
 * box quietly useless past page one.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    console.error("[api/blogs/summaries] no posts — check API_BASE_URL and the CMS");
  }

  return NextResponse.json(posts);
}
