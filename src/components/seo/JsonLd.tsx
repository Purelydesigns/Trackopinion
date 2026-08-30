/**
 * schema.org JSON-LD helpers.
 *
 * `JsonLd` is a server component, so the markup lands in the initial HTML and
 * crawlers see it without executing JavaScript.
 */

import { CONTACT_EMAIL, OFFICES, PHONE_IN, PHONE_US } from "@/lib/contactDetails";

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
  // Was hello@, while the site showed info@. Inconsistent contact details
  // across a site read as a weak signal in local search.
  email: CONTACT_EMAIL,
  address: OFFICES.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.lines[0],
    addressLocality: office.city,
    addressCountry: office.country,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE_IN.e164,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      telephone: PHONE_US.e164,
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

/** A blog post or news article. */
export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  /** ISO 8601, or "" when unknown — the field is omitted rather than faked. */
  datePublished?: string;
  image?: string;
}): Schema {
  const url = `${SITE_URL}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.image
      ? { image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}` }
      : {}),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * An open role. Feeds Google Jobs, which is the highest-value structured data
 * a careers page can carry.
 */
export function jobPostingSchema(opts: {
  title: string;
  description: string;
  path: string;
  /** ISO 8601 date the listing was last updated. */
  datePosted?: string;
  location: string;
  /** "Full Time" / "Internship" as written on the site. */
  employmentType: string;
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    ...(opts.datePosted ? { datePosted: opts.datePosted } : {}),
    employmentType: opts.employmentType.toUpperCase().replace(/\s+/g, "_"),
    hiringOrganization: { "@id": `${SITE_URL}/#organization` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: opts.location,
        addressCountry: "IN",
      },
    },
  };
}
