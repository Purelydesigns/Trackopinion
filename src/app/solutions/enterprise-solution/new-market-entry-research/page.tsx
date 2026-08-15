import type { Metadata } from "next";
import MarketEntryContent from "@/components/enterprise/MarketEntryContent";
import JsonLd, { breadcrumbSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/enterprise-solution/new-market-entry-research";
const TITLE = "New Market Entry Research";
const DESCRIPTION =
  "Test demand, pricing, competition and route-to-market before you commit budget. In-market, in-language entry research across 30+ countries.";

export const metadata: Metadata = {
  title: "New Market Entry Research | Track Opinion",
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
      <MarketEntryContent />
    </>
  );
}
