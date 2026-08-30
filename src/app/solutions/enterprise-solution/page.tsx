import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import SolutionsHub from "@/components/solutions/SolutionsHub";
import JsonLd, { SITE_URL, breadcrumbSchema, serviceSchema } from "@/components/seo/JsonLd";
import { enterpriseGroup } from "@/lib/solutionGroups";

const PATH = "/solutions/enterprise-solution";
const TITLE = "Enterprise Solutions";
const DESCRIPTION =
  "Strategic research programmes for large organisations — concept and ad testing, loyalty measurement, brand image tracking, competitive intelligence, market entry and usage & attitude studies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    images: [OG_IMAGE],
    url: `${SITE_URL}${PATH}`,
    title: `${TITLE} | Track Opinion®`,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Solutions", path: "/solutions" },
            { name: TITLE, path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
        ]}
      />
      <SolutionsHub
        title={TITLE}
        breadcrumb={[{ name: "Solutions", href: "/solutions" }, { name: TITLE }]}
        intro="Recurring, decision-grade research for teams who need to track a market rather than sample it once."
        groups={[enterpriseGroup]}
      />
    </>
  );
}
