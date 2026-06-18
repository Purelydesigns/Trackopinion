import type { Metadata } from "next";
import HealthcarePage from "@/components/healthcare/HealthcarePage";

export const metadata: Metadata = {
  title: "Healthcare | Track Opinion",
  description:
    "A carefully curated panel of thousands of patients, healthcare practitioners, and pharma employees for genuine data. Reach wide and deep in 30+ countries.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/healthcare" },
};

export default function Healthcare() {
  return <HealthcarePage />;
}
