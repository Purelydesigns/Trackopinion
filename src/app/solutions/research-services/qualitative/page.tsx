import type { Metadata } from "next";
import QualitativePage from "@/components/research/QualitativePage";

export const metadata: Metadata = {
  title: "Qualitative Market Research | Track Opinion",
  description:
    "Explore hidden opinions and emotions through focus groups, IDIs, and online communities. Track Opinion's qualitative research delivers deep audience insights across 30+ markets.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/research-services/qualitative" },
};

export default function Qualitative() {
  return <QualitativePage />;
}
