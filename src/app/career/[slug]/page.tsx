import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, jobs } from "@/lib/jobs";
import CareerDetail from "@/components/career/CareerDetail";

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
    title: `${job.title} | Careers | Track Opinion`,
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
  return <CareerDetail job={job} />;
}
