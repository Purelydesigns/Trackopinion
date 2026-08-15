/**
 * schema.org JSON-LD helpers.
 *
 * `JsonLd` is a server component, so the markup lands in the initial HTML and
 * crawlers see it without executing JavaScript.
 */

export type Schema = Record<string, unknown>;

export default function JsonLd({ data }: { data: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so page content can never break out of the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const SITE_URL = "https://www.trackopinion.com";

/* ── Site-wide entities ── */

export const organizationSchema: Schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Track Opinion",
  legalName: "Track Opinion Research Private Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  foundingDate: "2009",
  description:
    "Track Opinion® is a global market research and outsourcing firm providing end-to-end custom research services, online panels, survey programming and data analytics.",
  email: "hello@trackopinion.com",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "607-608, Tower C, Nirvana Courtyard, Sector 50",
      addressLocality: "Gurugram",
      postalCode: "122018",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "1401, 21st Street, STE R",
      addressLocality: "Sacramento",
      addressRegion: "CA",
      postalCode: "95811",
      addressCountry: "US",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-836-843-0469",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+1-916-460-9393",
      contactType: "sales",
      areaServed: "US",
      availableLanguage: ["en"],
    },
  ],
};

export const websiteSchema: Schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Track Opinion",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/* ── Builders ── */

/** Breadcrumb trail. Pass segments in order, excluding "Home". */
export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `${SITE_URL}${it.path}`,
      })),
    ],
  };
}

/** FAQ rich result. Only use where the Q&As are visible on the page. */
export function faqSchema(faqs: { q: string; a: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A service / solution page. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    serviceType: "Market Research",
  };
}
