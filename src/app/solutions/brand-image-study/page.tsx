import type { Metadata } from "next";
import BrandTrackerPage from "@/components/brandtracker/BrandTrackerPage";

export const metadata: Metadata = {
  title: "Brand Image Study | Track Opinion",
  description:
    "Monitor your brand health continuously with Track Opinion's Brand Image Study. Measure awareness, consideration, preference, and loyalty wave by wave across 30+ global markets.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/brand-image-study" },
};

export default function BrandImageStudy() {
  return <BrandTrackerPage />;
}
