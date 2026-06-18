import type { Metadata } from "next";
import CatiPage from "@/components/cati/CatiPage";

export const metadata: Metadata = {
  title: "CATI Solutions | Track Opinion",
  description:
    "Computer Assisted Telephone Interviewing — collect qualitative and quantitative data fast with logical jumps, filter outcomes, and control questions.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/cati-solutions" },
};

export default function CatiSolutions() {
  return <CatiPage />;
}
