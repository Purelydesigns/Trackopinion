import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, jobs } from "@/lib/jobs";
import CareerDetail from "@/components/career/CareerDetail";
import JsonLd, { breadcrumbSchema, jobPostingSchema } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} | Careers`,
    description: `Apply for the ${job.title} position at Track Opinion — ${job.location}, ${job.type}.`,
    alternates: { canonical: `https://www.trackopinion.com/career/${slug}` },
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  // The listing's responsibilities and qualifications, as a plain-text
  // description — JobPosting requires one, and it feeds Google Jobs.
  const description = job.sections
    .map((section) => [section.heading, ...section.items.map((i) => `• ${i}`)].join("\n"))
    .join("\n\n");

  const posted = new Date(job.updatedDate);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Careers", path: "/career" },
            { name: job.title, path: `/career/${job.slug}` },
          ]),
          jobPostingSchema({
            title: job.title,
            description: job.intro ? `${job.intro}\n\n${description}` : description,
            path: `/career/${job.slug}`,
            datePosted: Number.isNaN(posted.getTime()) ? undefined : posted.toISOString(),
            location: job.location,
            employmentType: job.type,
          }),
        ]}
      />
      <CareerDetail job={job} />
    </>
  );
}
