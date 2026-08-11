import type { Metadata } from "next";
import B2BPanelPage from "@/components/global-panel-b2b/B2BPanelPage";

export const metadata: Metadata = {
  title: "B2B Global Panel | Track Opinion",
  description:
    "Tap into our global B2B panel of 785,500 validated professionals — job level, department, industry and decision-maker data across key markets.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/global-panel/b2b" },
};

export default function Page() {
  return <B2BPanelPage />;
}
