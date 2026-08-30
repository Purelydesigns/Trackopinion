import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { notFound } from "next/navigation";
import FeaturedDetail from "@/components/featured-updates/FeaturedDetail";
import JsonLd, { SITE_URL, articleSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { featuredUpdates, getUpdateBySlug, hasArticle } from "@/lib/featuredUpdates";

export function generateStaticParams() {
  return featuredUpdates.map((u) => ({ slug: u.slug }));
}

/** Only the slugs above exist; anything else is a real 404. */
export const dynamicParams = false;

function summarise(body: string[] | undefined): string {
  const first = body?.[0] ?? "";
  return first.length > 155 ? `${first.slice(0, 152).trimEnd()}…` : first;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);

  if (!update) {
    return { title: "Update Not Found", robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/featured-updates/${update.slug}`;
  const description = summarise(update.body) || `${update.title} — Track Opinion®.`;

  return {
    title: update.title,
    description,
    alternates: { canonical: url },
    // A headline with no article behind it is thin content. It stays reachable
    // for visitors but is kept out of the index until the copy is written.
    ...(hasArticle(update) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      images: [OG_IMAGE],
      type: "article",
      url,
      title: update.title,
      description,
      publishedTime: update.date,
    },
  };
}

export default async function FeaturedDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);
  if (!update) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Featured Updates", path: "/featured-updates" },
            { name: update.title, path: `/featured-updates/${update.slug}` },
          ]),
          // Article markup only where there is an article.
          ...(hasArticle(update)
            ? [
                articleSchema({
                  title: update.title,
                  description: summarise(update.body),
                  path: `/featured-updates/${update.slug}`,
                  datePublished: update.date,
                }),
              ]
            : []),
        ]}
      />
      <FeaturedDetail update={update} />
    </>
  );
}
