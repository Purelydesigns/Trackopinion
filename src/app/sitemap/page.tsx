import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ListPageHero from "@/components/ui/ListPageHero";
import JsonLd, { breadcrumbSchema } from "@/components/seo/JsonLd";
import { siteGroups, allSiteLinks } from "@/lib/siteLinks";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Browse every page on the Track Opinion website — solutions, research services, global panel data, resources and company information.",
  alternates: { canonical: "https://www.trackopinion.com/sitemap" },
};

export default function SitemapPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Sitemap", path: "/sitemap" }])} />

      {/* ── Video banner — same as Terms / Privacy ── */}
      <ListPageHero title="Sitemap" breadcrumb="Sitemap" />

      {/* ── White card overlapping the banner ── */}
      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div
            className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10"
            style={{ marginTop: -40 }}
          >
            <div className="px-8 sm:px-10 py-12">

              <p className="text-gray-900 text-base leading-8 mb-2 font-medium">
                Every page on the Track Opinion website, grouped by section.
              </p>
              <p className="text-gray-500 text-sm leading-7 mb-2">
                {allSiteLinks.length} pages. Looking for the machine-readable version?{" "}
                <a
                  href="/sitemap.xml"
                  className="text-primary underline hover:text-primary-hover"
                >
                  sitemap.xml
                </a>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                {siteGroups.map((group) => (
                  <section key={group.title} className="break-inside-avoid">
                    <h2 className="inline-block bg-[#e8ecf8] text-primary text-sm font-bold px-4 py-2 rounded-lg mb-6 mt-10">
                      {group.title}
                    </h2>

                    <ul className="flex flex-col">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-start gap-3 py-3.5 border-b border-gray-100 transition-colors duration-200 hover:border-primary/30"
                          >
                            <span className="flex-1">
                              <span className="block text-gray-900 text-base font-bold leading-snug group-hover:text-primary transition-colors duration-200">
                                {link.label}
                              </span>
                              {link.desc && (
                                <span className="block text-gray-500 text-sm leading-6 mt-0.5">
                                  {link.desc}
                                </span>
                              )}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-gray-300 shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all duration-200" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
