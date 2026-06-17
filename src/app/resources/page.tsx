import type { Metadata } from "next";
import BlogList from "@/components/resources/BlogList";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "Resources & Blog",
  description:
    "Explore Track Opinion's latest blog posts, case studies, and market research insights across healthcare, FMCG, technology, pharma and more.",
  alternates: { canonical: "https://www.trackopinion.com/resources" },
  openGraph: {
    url: "https://www.trackopinion.com/resources",
    title: "Resources & Blog | Track Opinion®",
    description:
      "Browse all blog posts and research insights from Track Opinion® — global market research experts.",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Track Opinion Blog",
  url: "https://www.trackopinion.com/resources",
  description: "Market research insights, case studies, and industry news from Track Opinion®.",
  publisher: {
    "@type": "Organization",
    name: "Track Opinion",
    url: "https://www.trackopinion.com",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main>
        <BlogList />
        <NewsletterSubscribe />
      </main>
    </>
  );
}
