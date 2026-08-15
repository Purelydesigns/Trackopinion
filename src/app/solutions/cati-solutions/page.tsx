import type { Metadata } from "next";
import CatiPage from "@/components/cati/CatiPage";
import { faqs } from "@/components/cati/faqs";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/cati-solutions";
const TITLE = "CATI Solutions";
const DESCRIPTION =
  "Computer Assisted Telephone Interviewing with trained multilingual interviewers, predictive dialing, real-time monitoring and validated data delivery across 50+ languages.";

export const metadata: Metadata = {
  title: "CATI Solutions | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function CatiSolutions() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Solutions", path: "/solutions" },
            { name: "CATI Solutions", path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          faqSchema(faqs),
        ]}
      />
      <CatiPage />
    </>
  );
}
