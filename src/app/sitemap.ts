import type { MetadataRoute } from "next";
import { allSiteLinks } from "@/lib/siteLinks";

const BASE_URL = "https://www.trackopinion.com";

/**
 * Built from the same route list as the HTML sitemap (/sitemap), so the two
 * cannot drift apart.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allSiteLinks.map((link) => ({
    url: link.href === "/" ? BASE_URL : `${BASE_URL}${link.href}`,
    lastModified,
    changeFrequency: link.changeFrequency ?? "monthly",
    priority: link.priority ?? 0.5,
  }));
}
