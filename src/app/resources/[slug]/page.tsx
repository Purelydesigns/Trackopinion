import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/resources/BlogDetail";
import JsonLd, { SITE_URL, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";
import { getAllPosts, getPostBySlug, limitWords, stripHtml } from "@/lib/blog";

/** Rebuild the post list at most once an hour; new posts appear without a deploy. */
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/resources/${post.slug}`;
  const description = limitWords(stripHtml(post.content), 30);

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      publishedTime: post.date || undefined,
      images: post.img ? [post.img] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // A real 404 rather than a 200 page saying "not found" — a soft 404 invites
  // search engines to index every junk URL under /resources.
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Resources", path: "/resources" },
            { name: post.title, path: `/resources/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: limitWords(stripHtml(post.content), 30),
            path: `/resources/${post.slug}`,
            datePublished: post.date,
            image: post.img,
          }),
        ]}
      />
      <BlogDetail post={post} />
    </>
  );
}
