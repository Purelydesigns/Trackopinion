import type { Metadata } from "next";
import CaseStudiesList from "@/components/case-studies/CaseStudiesList";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore Track Opinion's real-world case studies across healthcare, FMCG, technology, pharma and more — see how we deliver market research results.",
  alternates: { canonical: "https://www.trackopinion.com/case-studies" },
  openGraph: {
    url: "https://www.trackopinion.com/case-studies",
    title: "Case Studies | Track Opinion®",
    description:
      "Real-world market research case studies from Track Opinion® — global research experts.",
  },
};

const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Track Opinion Case Studies",
  url: "https://www.trackopinion.com/case-studies",
  description:
    "A collection of market research case studies from Track Opinion® across multiple industries.",
  publisher: {
    "@type": "Organization",
    name: "Track Opinion",
    url: "https://www.trackopinion.com",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />
      <main>
        <CaseStudiesList />
      </main>
    </>
  );
}
