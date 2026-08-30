import Link from "next/link";
import { Calendar, ArrowLeft, Check } from "lucide-react";
import ListPageHero from "@/components/ui/ListPageHero";
import SharePopover from "@/components/resources/SharePopover";
import { formatUpdateDate, type FeaturedUpdate } from "@/lib/featuredUpdates";

/**
 * A single featured update. Server-rendered from the entry it is given — this
 * component used to accept no props at all, so every slug produced the same
 * article.
 */
export default function FeaturedDetail({ update }: { update: FeaturedUpdate }) {
  return (
    <main>
      <ListPageHero
        title="Featured Updates"
        titleAs="p"
        breadcrumb={[
          { name: "Featured Updates", href: "/featured-updates" },
          { name: update.title },
        ]}
      />

      {/* ── White card overlapping the banner ── */}
      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div
            className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10 px-8 sm:px-10 pt-8 pb-0"
            style={{ marginTop: -40 }}
          >
            {/* Back link */}
            <Link
              href="/featured-updates"
              className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All Featured Updates
            </Link>

            {/* ── Article header ── */}
            <div className="pb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {update.title}
              </h1>

              {update.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-highlight text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Date + share */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <div className="flex items-center gap-2 text-gray-900 text-base font-medium">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <time dateTime={update.date}>{formatUpdateDate(update.date)}</time>
                </div>
                <SharePopover title={update.title} />
              </div>
            </div>

            {/* ── Source badge ── */}
            {update.source && (
              <div className="mb-8 mt-8">
                <span className="inline-block bg-highlight text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-lg">
                  {update.source}
                </span>
              </div>
            )}

            {/* ── Article body ──
                Skipped entirely when the entry is still just a headline, so the
                card closes up rather than leaving an empty block. */}
            <div className={update.body?.length ? "pb-16" : "pb-10"}>
              <ul>
                {(update.body ?? []).map((paragraph) => (
                  <li
                    key={paragraph.slice(0, 60)}
                    className="flex gap-4 items-start py-5 border-b border-gray-100 last:border-0"
                  >
                    <span
                      aria-hidden
                      className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-gray-900 text-base leading-8 font-medium">
                      {paragraph}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
