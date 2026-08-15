import type { Metadata } from "next";
import BrandImageContent from "@/components/enterprise/BrandImageContent";
import { faqs } from "@/components/brandtracker/faqs";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/enterprise-solution/brand-image-study";
const TITLE = "Brand Image Study";
const DESCRIPTION =
  "Track brand health over time with Track Opinion's brand image studies — awareness, perception, consideration and competitive positioning across waves.";

export const metadata: Metadata = {
  title: "Brand Image Study | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function BrandImageStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Enterprise Solution", path: "/solutions/enterprise-solution" },
            { name: TITLE, path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          faqSchema(faqs),
        ]}
      />
      <BrandImageContent />
    </>
  );
}
