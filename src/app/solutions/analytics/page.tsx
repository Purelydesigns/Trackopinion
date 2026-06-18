import type { Metadata } from "next";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";

export const metadata: Metadata = {
  title: "Analytics and Reporting | Track Opinion",
  description:
    "From opinions to decisions with clarity. Track Opinion's analytics and reporting services deliver data cleansing, dashboards, visualization, and actionable insights.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/analytics" },
};

export default function Analytics() {
  return <AnalyticsPage />;
}
