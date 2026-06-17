import type { Metadata } from "next";
import BlogDetail from "@/components/resources/BlogDetail";

export const metadata: Metadata = {
  title: "How to Conduct Customer Satisfaction Research",
  description:
    "Learn the step-by-step process to conduct customer satisfaction research — from defining your goals to selecting the right methodology.",
  alternates: { canonical: "https://www.trackopinion.com/resources/1" },
  openGraph: {
    url: "https://www.trackopinion.com/resources/1",
    title: "How to Conduct Customer Satisfaction Research | Track Opinion®",
    description:
      "A complete guide to conducting customer satisfaction research with Track Opinion®.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Conduct Customer Satisfaction Research",
  datePublished: "2026-03-24",
  publisher: {
    "@type": "Organization",
    name: "Track Opinion",
    url: "https://www.trackopinion.com",
  },
};

export default function BlogDetailPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogDetail />
    </>
  );
}
