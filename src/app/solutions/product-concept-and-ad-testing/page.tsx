import type { Metadata } from "next";
import ConceptAdTestingPage from "@/components/concept/ConceptAdTestingPage";

export const metadata: Metadata = {
  title: "Product Concept & Creative Ad Testing | Track Opinion",
  description:
    "Test your product concept and creative ads before launch. Track Opinion's concept testing and ad testing research helps you save money, reduce risk, and go to market with confidence.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/product-concept-and-ad-testing" },
};

export default function ConceptAdTesting() {
  return <ConceptAdTestingPage />;
}
