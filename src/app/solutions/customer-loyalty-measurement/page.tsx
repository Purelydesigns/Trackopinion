import type { Metadata } from "next";
import CustomerLoyaltyPage from "@/components/loyalty/CustomerLoyaltyPage";

export const metadata: Metadata = {
  title: "Customer Loyalty Measurement | Track Opinion®",
  description:
    "Find your loyal customers and reward them. Measure NPS, CSAT, and loyalty drivers with Track Opinion's market research solutions.",
  alternates: { canonical: "https://www.trackopinion.com/solutions/customer-loyalty-measurement" },
  openGraph: {
    url: "https://www.trackopinion.com/solutions/customer-loyalty-measurement",
    title: "Customer Loyalty Measurement | Track Opinion®",
  },
};

export default function CustomerLoyaltyMeasurementPage() {
  return <CustomerLoyaltyPage />;
}
