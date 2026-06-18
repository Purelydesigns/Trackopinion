import type { Metadata } from "next";
import QuantitativePage from "@/components/research/QuantitativePage";

export const metadata: Metadata = {
  title: "Quantitative Market Research | Track Opinion",
  description:
    "Measure, validate, and scale your business decisions with structured surveys and statistical analysis. Track Opinion delivers quantitative research across 30+ global markets.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/research-services/quantitative" },
};

export default function Quantitative() {
  return <QuantitativePage />;
}
