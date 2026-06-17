import type { Metadata } from "next";
import FeaturedDetail from "@/components/featured-updates/FeaturedDetail";

export const metadata: Metadata = {
  title: "David Solomon: Europe Has an Opportunity to Seize",
  description:
    "Goldman Sachs Chairman and CEO David Solomon shares insights on Europe's economic opportunity — originally published in Les Echos on June 24, 2025.",
  alternates: { canonical: "https://www.trackopinion.com/featured-updates/1" },
  openGraph: {
    url: "https://www.trackopinion.com/featured-updates/1",
    title: "David Solomon: Europe Has an Opportunity to Seize | Track Opinion®",
    description:
      "Insights on Europe's economic opportunity from Goldman Sachs Chairman and CEO David Solomon.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "David Solomon: Europe Has an Opportunity to Seize",
  datePublished: "2026-03-24",
  author: { "@type": "Person", name: "David Solomon" },
  publisher: {
    "@type": "Organization",
    name: "Track Opinion",
    url: "https://www.trackopinion.com",
  },
};

export default function FeaturedDetailPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <FeaturedDetail />
    </>
  );
}
