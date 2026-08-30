import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import SolutionsHub from "@/components/solutions/SolutionsHub";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { allSolutionGroups } from "@/lib/solutionGroups";

const PATH = "/solutions";
const TITLE = "Solutions";
const DESCRIPTION =
  "Every Track Opinion research solution in one place — global B2C and B2B panels, qualitative and quantitative research services, enterprise insight programmes, CATI, healthcare and our Scrip8 survey platform.";

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
      <JsonLd data={breadcrumbSchema([{ name: TITLE, path: PATH }])} />
      <SolutionsHub
        title={TITLE}
        breadcrumb="Solutions"
        intro="From a single concept test to a multi-country tracking programme, these are the ways we help teams find out what their market actually thinks."
        groups={allSolutionGroups}
      />
    </>
  );
}
