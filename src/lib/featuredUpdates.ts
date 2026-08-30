/**
 * Featured Updates content.
 *
 * Kept out of the components so the list page, the detail route and the sitemap
 * all read one source. Every entry gets its own page rendering its own title,
 * date and tags; `body` is what decides whether that page is substantial enough
 * to be indexed and put in the sitemap.
 */

export interface FeaturedUpdate {
  slug: string;
  title: string;
  tags: string[];
  /** ISO 8601. Rendered as dd.mm.yyyy by the UI. */
  date: string;
  /** Line shown above the body, e.g. original place of publication. */
  source?: string;
  /** Paragraphs of the article. Absent until the copy has been written. */
  body?: string[];
}

export const featuredUpdates: FeaturedUpdate[] = [
  {
    slug: "david-solomon-europe-opportunity-to-seize",
    title: "David Solomon: Europe Has an Opportunity to Seize",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    date: "2026-03-24",
    source:
      "This opinion article was originally published in Les Echos on June 24, 2025",
    body: [
      "One of the most striking things about my conversations with CEOs at the beginning of the year was the deep pessimism about Europe. While it is important not to understate the challenges still facing the Continent, especially as conflict continues both on the Continent and in the Middle East, that negativity has undergone a remarkable reversal.",
      "As I convene our Board of Directors in Paris this week, it's clear to us that this nascent optimism presents an opportunity. European nations are making meaningful strides towards a more cohesive defence policy, and the Continent would also benefit from making more cohesive economic and financial strides—especially by reducing cross-border frictions and harnessing the power of a more integrated capital market and banking union.",
      "I see reasons to be encouraged that Europe can make progress.",
      "EU leaders clearly recognise that greater autonomy in the realm of defence and security is both a strategic and economic imperative.",
      "First, the agreement of a new spending target among NATO members, and the historic shift in Germany's positioning earlier this year, is testament to a fundamental change in mindset. As defence expenditures accelerate, the Eurozone is forecast to grow at a faster rate than predicted just a few months ago, with this fiscal expansion as a tailwind.",
      "To be clear, prolonged war benefits no one. We are hopeful for swift and peaceful resolutions to the current conflicts.",
      "Second, Europe retains important strengths. While international investors would like to see faster action, reforms in recent years by individual countries have improved tax regimes to attract talent and Europe remains one of the richest and largest economies in the world.",
      "Our experience is a case in point. Over the last few years, Goldman Sachs has significantly scaled up our operations across Europe—from Warsaw to Frankfurt, and Milan to The Hague. Here in Paris, we opened a new office to accommodate our growing footprint, with almost 500 positions now on the ground and all our business lines represented in the city. This would not have been possible without the positive reform agenda in France.",
      "Finally, Europe benefits from a rich talent pool. Its schools and universities, especially for business and engineering, are globally competitive. It does not lack for hungry and driven young professionals who are the foundation of firms like ours.",
      "ECB President Christine Lagarde and European Commission President Ursula von der Leyen have recently made the same point: Per million inhabitants, the EU produces almost as many science, technology, engineering, and mathematics graduates as the US.",
      "The open question is why these strengths have not translated to the same level of economic and entrepreneurial dynamism as in the United States.",
      "I believe Europe can achieve economic dynamism, but only if more decisive actions are taken to unlock the full potential of the European market."
    ],
  },
  {
    slug: "john-waldron-navigating-uncertain-time",
    title: "How Goldman Sachs' John Waldron is navigating 'a more uncertain time'",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    date: "2026-03-24",
  },
  {
    slug: "goldman-sachs-bernstein-strategic-decisions-conference",
    title:
      "Goldman Sachs to Speak at Bernstein's 41st Annual Strategic Decisions Conference",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    date: "2026-03-24",
  },
  {
    slug: "first-quarter-2025-pillar-3-disclosures",
    title: "First Quarter 2025 Pillar 3 Disclosures",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    date: "2026-03-24",
  },
  {
    slug: "first-quarter-2025-liquidity-coverage-ratio",
    title: "First Quarter 2025 Liquidity Coverage Ratio Disclosure",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    date: "2026-03-24",
  },
  {
    slug: "first-quarter-2025-form-10-q",
    title: "First Quarter 2025 Form 10-Q",
    tags: ["Loyalty", "Fiduciary and Consulting"],
    date: "2026-03-24",
  },
];

/**
 * Every update has its own page, so every row in the list can be clicked and
 * each URL renders its own title, date and tags. That is what keeps them
 * distinct — the original bug was that all seven slugs rendered one shared
 * article, not that they had pages at all.
 */
export function getUpdateBySlug(slug: string): FeaturedUpdate | undefined {
  return featuredUpdates.find((u) => u.slug === slug);
}

/**
 * Whether the entry has article copy behind the headline.
 *
 * Entries without one still get a page, but are kept out of the sitemap and
 * marked noindex — a headline with no body is thin content, and there is no
 * reason to put it in front of search engines until the copy is written.
 */
export function hasArticle(update: FeaturedUpdate): boolean {
  return Boolean(update.body?.length);
}

/** Entries substantial enough to be indexed and listed in the sitemap. */
export const publishedUpdates = featuredUpdates.filter(hasArticle);

/** dd.mm.yyyy, matching the rest of the site. */
export function formatUpdateDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, ".");
}
