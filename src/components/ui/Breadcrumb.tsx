"use client";

import Link from "next/link";

/** One step in the breadcrumb trail. Omit `href` to render it as plain text. */
export interface Crumb {
  name: string;
  href?: string;
}

interface Props {
  /** "About Us", or a trail: [{ name: "Global Panel", href: "..." }, { name: "B2B" }] */
  trail: string | Crumb[];
  className?: string;
}

/**
 * Breadcrumb rendered as a real <nav>/<ol> so it is clickable, accessible and
 * machine-readable. The last crumb is never a link — it is the current page.
 */
export default function Breadcrumb({ trail, className = "mb-5" }: Props) {
  const crumbs: Crumb[] = typeof trail === "string" ? [{ name: trail }] : trail;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-sm font-medium">
        <li>
          <Link
            href="/"
            className="text-white/50 hover:text-white underline-offset-4 hover:underline transition-colors duration-200"
          >
            Home
          </Link>
        </li>

        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.name} className="flex items-center gap-1.5">
              <span aria-hidden className="text-white/40">/</span>
              {c.href && !isLast ? (
                <Link
                  href={c.href}
                  className="text-white/50 hover:text-white underline-offset-4 hover:underline transition-colors duration-200"
                >
                  {c.name}
                </Link>
              ) : (
                <span
                  className="text-white/80"
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {c.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
