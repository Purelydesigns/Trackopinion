import type { Metadata } from "next";
import SurveyProgrammingPage from "@/components/research/SurveyProgrammingPage";

export const metadata: Metadata = {
  title: "Online Survey Programming | Track Opinion",
  description:
    "Customized survey designing with advanced features at your fingertips. Build, brand, distribute and analyze surveys with Scrip8 — skip logic, branching, multilingual support and DIY reporting.",
  alternates: {
    canonical: "https://www.trackopinion.com/solutions/research-services/survey-programming",
  },
};

export default function Page() {
  return <SurveyProgrammingPage />;
}
