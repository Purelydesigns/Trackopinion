import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { Suspense } from "react";
import BlogList from "@/components/resources/BlogList";
import JsonLd, { SITE_URL } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";

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

export default async function ResourcesPage() {
  // Fetched here so the posts are in the server-rendered HTML and the client
  // component can search and paginate across all of them at once.
  const posts = await getAllPosts();

  return (
    <>
      <JsonLd data={blogSchema} />
      <Suspense>
        <BlogList posts={posts} />
      </Suspense>
    </>
  );
}
