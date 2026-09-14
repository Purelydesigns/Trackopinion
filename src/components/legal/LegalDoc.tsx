import { Check } from "lucide-react";
import ListPageHero from "@/components/ui/ListPageHero";

/**
 * Shared shell and building blocks for the long-form legal documents —
 * Privacy Policy, Terms of Service, Trust Centre.
 *
 * These were previously copy-pasted into each page, so a styling change had to
 * be made in several places to keep the documents looking like one another.
 * A server component: legal copy is static text and needs no client JavaScript.
 */

/**
 * Section heading. Rendered as an `<h2>` so the document has a real heading
 * outline for SEO, while keeping the badge styling.
 */
export function SectionBadge({ text }: { text: string }) {
  return (
    <h2 className="inline-block bg-[#e8ecf8] text-primary text-sm font-bold px-4 py-2 rounded-lg mb-6 mt-10">
      {text}
    </h2>
  );
}

export function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-900 text-base leading-8 mb-3 font-medium">{children}</p>;
}

export function CheckItem({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4 items-start py-1.5">
      <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-1">
        <Check aria-hidden className="w-3 h-3 text-primary" strokeWidth={3} />
      </span>
      <span className="text-gray-900 text-base leading-8 font-medium">
        {label && <strong className="text-gray-900 font-bold">{label} </strong>}
        {children}
      </span>
    </li>
  );
}

/** Banner, overlapping white card and the "Updated Date" line. */
export default function LegalDoc({
  title,
  updatedDate,
  children,
}: {
  title: string;
  /** Shown under the heading, e.g. "02-06-2026". Omit to hide the line. */
  updatedDate?: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* ── Video banner — same as the Resources listing ── */}
      <ListPageHero title={title} breadcrumb={title} />

      {/* ── White card overlapping the banner ── */}
      <section className="bg-section pb-20">
        <div className="site-container px-6">
          <div
            className="bg-white rounded-3xl shadow-sm overflow-hidden relative z-10"
            style={{ marginTop: -40 }}
          >
            <div className="px-8 sm:px-10 py-12">
              {updatedDate && (
                <p className="font-bold text-gray-900 text-base mb-8">
                  Updated Date: {updatedDate}
                </p>
              )}

              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
