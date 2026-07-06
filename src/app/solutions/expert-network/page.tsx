import type { Metadata } from "next";
import ExpertNetworkPage from "@/components/expertnetwork/ExpertNetworkPage";

export const metadata: Metadata = {
  title: "Expert Network Services | Track Opinion",
  description:
    "Connect with pre-screened, executive-level experts across 5,500+ subsectors worldwide. Accelerate your research with real-world intelligence — on demand.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/expert-network" },
};

export default function ExpertNetwork() {
  return <ExpertNetworkPage />;
}
