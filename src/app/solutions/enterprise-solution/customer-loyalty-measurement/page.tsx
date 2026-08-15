import type { Metadata } from "next";
import CustomerLoyaltyContent from "@/components/enterprise/CustomerLoyaltyContent";
import { faqs } from "@/components/loyalty/faqs";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/enterprise-solution/customer-loyalty-measurement";
const TITLE = "Customer Loyalty Measurement";
const DESCRIPTION =
  "Measure, understand and grow customer loyalty with NPS, CSAT and retention research from Track Opinion — turning loyalty data into business strategy.";

export const metadata: Metadata = {
  title: "Customer Loyalty Measurement | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function CustomerLoyalty() {
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
      <CustomerLoyaltyContent />
    </>
  );
}
