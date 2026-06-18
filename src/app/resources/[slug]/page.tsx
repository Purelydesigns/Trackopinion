import type { Metadata } from "next";
import BlogDetail from "@/components/resources/BlogDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title,
    description: `Read more about ${title} on Track Opinion®.`,
    alternates: { canonical: `https://www.trackopinion.com/resources/${slug}` },
    openGraph: {
      url: `https://www.trackopinion.com/resources/${slug}`,
      title: `${title} | Track Opinion®`,
    },
  };
}

export default function BlogDetailPage() {
  return <BlogDetail />;
}
