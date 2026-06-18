import type { Metadata } from "next";
import Scrip8Page from "@/components/scrip8/Scrip8Page";

export const metadata: Metadata = {
  title: "Scrip8 — Online Surveys Simplified | Track Opinion",
  description:
    "Create, share, and analyze online surveys with Scrip8 by Track Opinion. Mobile-based, result-oriented, and built for real-time data collection.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/scrip8" },
};

export default function Scrip8() {
  return <Scrip8Page />;
}
