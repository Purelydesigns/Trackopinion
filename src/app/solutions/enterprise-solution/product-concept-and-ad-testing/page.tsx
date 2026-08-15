import type { Metadata } from "next";
import ConceptAdTestingPage from "@/components/concept/ConceptAdTestingPage";
import { faqs } from "@/components/concept/faqs";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/enterprise-solution/product-concept-and-ad-testing";
const TITLE = "Product Concept & Creative Ad Testing";
const DESCRIPTION =
  "Test your product concept and creative ads before launch. Track Opinion's concept testing and ad testing research helps you save money, reduce risk, and go to market with confidence.";

export const metadata: Metadata = {
  title: "Product Concept & Creative Ad Testing | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function ConceptAdTesting() {
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
      <ConceptAdTestingPage />
    </>
  );
}
