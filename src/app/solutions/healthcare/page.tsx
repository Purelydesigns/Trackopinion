import type { Metadata } from "next";
import HealthcarePage from "@/components/healthcare/HealthcarePage";
import { faqs } from "@/components/healthcare/faqs";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/healthcare";
const TITLE = "Healthcare Market Research";
const DESCRIPTION =
  "A carefully curated panel of thousands of patients, healthcare practitioners, and pharma employees for genuine data. Reach wide and deep in 30+ countries.";

export const metadata: Metadata = {
  title: "Healthcare | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function Healthcare() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Solutions", path: "/solutions" },
            { name: "Healthcare", path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          faqSchema(faqs),
        ]}
      />
      <HealthcarePage />
    </>
  );
}
