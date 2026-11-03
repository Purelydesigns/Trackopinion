import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { Suspense } from "react";
import BlogList from "@/components/resources/BlogList";
import JsonLd, { SITE_URL } from "@/components/seo/JsonLd";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resources & Blog",
  description:
    "Explore Track Opinion's latest blog posts, case studies, and market research insights across healthcare, FMCG, technology, pharma and more.",
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
      images: [OG_IMAGE],
    url: `${SITE_URL}/resources`,
    title: "Resources & Blog",
    description:
      "Browse all blog posts and research insights from Track Opinion® — global market research experts.",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Track Opinion Blog",
  url: `${SITE_URL}/resources`,
  description:
    "Market research insights, case studies, and industry news from Track Opinion®.",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function ResourcesPage() {
  /* The list loads itself from /api/blogs/summaries, the way the careers page
     loads its openings. Fetching here instead put the posts in the initial
     HTML, but it also meant one flaky upstream response during the build baked
     an empty page — "No blog posts yet" — and served it for an hour. */
  return (
    <>
      <JsonLd data={blogSchema} />
      <Suspense>
        <BlogList />
      </Suspense>
    </>
  );
}
