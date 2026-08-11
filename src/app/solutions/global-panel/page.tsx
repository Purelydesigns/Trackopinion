import type { Metadata } from "next";
import GlobalPanelLanding from "@/components/global-panel/GlobalPanelLanding";

export const metadata: Metadata = {
  title: "Global Panel | Track Opinion",
  description:
    "Explore Track Opinion's global research panels — a B2C consumer panel across 10 key markets and a B2B panel of 785,500 validated professionals.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/global-panel" },
};

export default function Page() {
  return <GlobalPanelLanding />;
}
