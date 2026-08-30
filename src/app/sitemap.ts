import type { MetadataRoute } from "next";
import { allSiteLinks } from "@/lib/siteLinks";
import { jobs } from "@/lib/jobs";
import { publishedUpdates } from "@/lib/featuredUpdates";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/components/seo/JsonLd";

/**
 * Built from the same route list as the HTML sitemap (/sitemap), so the two
 * cannot drift apart, plus every piece of content the site publishes: blog
 * posts, open roles and featured updates. Listing only the static routes left
 * everything the site actually publishes out of search engines' reach.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = allSiteLinks.map((link) => ({
    url: link.href === "/" ? SITE_URL : `${SITE_URL}${link.href}`,
    lastModified: now,
    changeFrequency: link.changeFrequency ?? "monthly",
    priority: link.priority ?? 0.5,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/career/${job.slug}`,
    lastModified: new Date(job.updatedDate),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const updateRoutes: MetadataRoute.Sitemap = publishedUpdates.map((update) => ({
    url: `${SITE_URL}/featured-updates/${update.slug}`,
    lastModified: new Date(update.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  // An upstream outage must not take the whole sitemap down with it, so
  // getAllPosts returns [] rather than throwing.
  const posts = await getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/resources/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...jobRoutes, ...updateRoutes, ...postRoutes];
}
