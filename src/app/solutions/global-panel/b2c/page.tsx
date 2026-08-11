import type { Metadata } from "next";
import GlobalPanelPage from "@/components/global-panel/GlobalPanelPage";

export const metadata: Metadata = {
  title: "B2C Global Panel | Track Opinion",
  description:
    "Explore demographic, income, age and connectivity data for our B2C consumer panel across 10 key markets — updated continuously from 50M+ active panelists.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/global-panel/b2c" },
};

export default function Page() {
  return <GlobalPanelPage />;
}
