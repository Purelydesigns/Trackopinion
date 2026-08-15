import type { Metadata } from "next";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";
import JsonLd, { breadcrumbSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/research-services/analytics";
const TITLE = "Analytics and Reporting";
const DESCRIPTION =
  "From opinions to decisions with clarity. Track Opinion's analytics and reporting services deliver data cleansing, dashboards, visualization, and actionable insights.";

export const metadata: Metadata = {
  title: "Analytics and Reporting | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function Analytics() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Research Services", path: "/solutions/research-services" },
            { name: TITLE, path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
        ]}
      />
      <AnalyticsPage />
    </>
  );
}
