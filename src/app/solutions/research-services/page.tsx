import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import SolutionsHub from "@/components/solutions/SolutionsHub";
import JsonLd, { SITE_URL, breadcrumbSchema, serviceSchema } from "@/components/seo/JsonLd";
import { researchServicesGroup } from "@/lib/solutionGroups";

const PATH = "/solutions/research-services";
const TITLE = "Research Services";
const DESCRIPTION =
  "Full-service qualitative and quantitative market research — focus groups, IDIs, online surveys, CATI, survey programming, and reporting and analytics.";

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
        intro="Design, fieldwork, analysis and reporting — run as one engagement or picked up at whichever stage you need."
        groups={[researchServicesGroup]}
      />
    </>
  );
}
