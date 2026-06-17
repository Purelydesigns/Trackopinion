import type { Metadata } from "next";
import FeaturedList from "@/components/featured-updates/FeaturedList";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "Featured Updates",
  description:
    "Stay informed with the latest insights, breakthroughs, and updates shaping the market research industry and beyond from Track Opinion®.",
  alternates: { canonical: "https://www.trackopinion.com/featured-updates" },
  openGraph: {
    url: "https://www.trackopinion.com/featured-updates",
    title: "Featured Updates | Track Opinion®",
    description:
      "Insights, Breakthroughs, and Updates Shaping our Industry and Beyond — Track Opinion®.",
  },
};

const featuredSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Track Opinion Featured Updates",
  url: "https://www.trackopinion.com/featured-updates",
  description:
    "Latest insights, breakthroughs, and featured updates from Track Opinion®.",
  publisher: {
    "@type": "Organization",
    name: "Track Opinion",
    url: "https://www.trackopinion.com",
  },
};

export default function FeaturedUpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredSchema) }}
      />
      <main>
        <FeaturedList />
        <NewsletterSubscribe />
      </main>
    </>
  );
}
