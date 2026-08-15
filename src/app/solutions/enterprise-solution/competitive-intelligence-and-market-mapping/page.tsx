import type { Metadata } from "next";
import CompetitiveIntelligenceContent from "@/components/enterprise/CompetitiveIntelligenceContent";
import JsonLd, { breadcrumbSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/enterprise-solution/competitive-intelligence-and-market-mapping";
const TITLE = "Competitive Intelligence & Market Mapping";
const DESCRIPTION =
  "Map the competitive landscape, size every segment and find the white space. Track Opinion's competitive intelligence and market mapping research, validated with real category buyers.";

export const metadata: Metadata = {
  title: "Competitive Intelligence & Market Mapping | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Enterprise Solution", path: "/solutions/enterprise-solution" },
            { name: TITLE, path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
        ]}
      />
      <CompetitiveIntelligenceContent />
    </>
  );
}
