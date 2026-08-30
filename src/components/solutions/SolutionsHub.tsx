import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ListPageHero from "@/components/ui/ListPageHero";
import type { Crumb } from "@/components/ui/Breadcrumb";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

export interface HubEntry {
  label: string;
  href: string;
  desc: string;
}

export interface HubGroup {
  title: string;
  /** Optional line under the group heading. */
  intro?: string;
  entries: HubEntry[];
}

/**
 * Overview page for a category of solutions.
 *
 * These three hubs (`/solutions`, `/solutions/research-services`,
 * `/solutions/enterprise-solution`) were referenced throughout the site — by
 * the footer, hero CTAs, the mega-menu and the BreadcrumbList JSON-LD — without
 * existing, so every one of those references resolved to a 404.
 *
 * A server component: it is a list of links and needs no client JavaScript.
 */
export default function SolutionsHub({
  title,
  breadcrumb,
  intro,
  groups,
}: {
  title: string;
  breadcrumb: string | Crumb[];
  intro: string;
  groups: HubGroup[];
}) {
  return (
    <main>
      <ListPageHero title={title} breadcrumb={breadcrumb} />

      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div
            className="bg-white rounded-3xl shadow-sm relative z-10 px-8 sm:px-10 py-10"
            style={{ marginTop: -40 }}
          >
            <p className="text-gray-600 text-base leading-8 font-medium max-w-3xl mb-10">
              {intro}
            </p>

            <div className="flex flex-col gap-12">
              {groups.map((group) => (
                <div key={group.title}>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{group.title}</h2>
                  {group.intro && (
                    <p className="text-gray-500 text-sm leading-7 mb-6 max-w-2xl">
                      {group.intro}
                    </p>
                  )}

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {group.entries.map((entry) => (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          className="group flex items-start gap-4 h-full rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                              {entry.label}
                            </h3>
                            <p className="text-sm text-gray-500 leading-6 mt-1">{entry.desc}</p>
                          </div>
                          <ArrowRight
                            aria-hidden
                            className="w-5 h-5 text-gray-300 shrink-0 mt-0.5 transition-all duration-200 group-hover:text-primary group-hover:translate-x-1"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* On a hub page nothing is preselected — the visitor has not narrowed
          down yet, so pre-ticking six boxes would be noise, not a shortcut. */}
      <SolutionEnquiryForm
        heading="Not sure which fits your brief?"
        intro="Tell us what you need to learn and we'll recommend an approach — usually within 24 hours. Pick as many services as are relevant to your brief."
      />

    </main>
  );
}
