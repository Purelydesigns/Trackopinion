/**
 * Shared Open Graph image.
 *
 * `app/opengraph-image.tsx` generates this, and Next.js attaches it
 * automatically to any route that does not declare its own `openGraph` block.
 * A route that *does* declare one replaces the parent's entirely — openGraph is
 * not deep-merged across segments — so those pages must include this explicitly
 * or they end up with no share image at all.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Track Opinion — Global Market Research & Online Panel",
} as const;
