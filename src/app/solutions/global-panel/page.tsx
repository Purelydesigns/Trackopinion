import type { Metadata } from "next";
import GlobalPanelPage from "@/components/global-panel/GlobalPanelPage";

export const metadata: Metadata = {
  title: "Global Panel | Track Opinion",
  description: "Explore demographic, income, age and connectivity data across 10 key markets — updated continuously from 50M+ active panelists.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/global-panel" },
};

export default function Page() {
  return <GlobalPanelPage />;
}
