import type { Metadata } from "next";
import { Suspense } from "react";
import CareerPage from "@/components/career/CareerPage";

export const metadata: Metadata = {
  title: "Careers | Track Opinion",
  description:
    "Explore current job openings at Track Opinion. Join our team and make a difference in global market research.",
  alternates: { canonical: "https://www.trackopinion.com/career" },
};

export default function Career() {
  return (
    <Suspense>
      <CareerPage />
    </Suspense>
  );
}
