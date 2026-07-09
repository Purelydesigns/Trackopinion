import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import VisionMission from "@/components/about/VisionMission";
import SpecializedSectors from "@/components/about/SpecializedSectors";
import OurValues from "@/components/OurValues";
import GlobalReach from "@/components/about/GlobalReach";
import Leadership from "@/components/about/Leadership";
import WhyBusinesses from "@/components/about/WhyBusinesses";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Track Opinion® is a global market research and outsourcing firm headquartered in India. Established in 2009, we specialize in end-to-end custom research services.",
  alternates: { canonical: "https://www.trackopinion.com/about" },
  openGraph: {
    url: "https://www.trackopinion.com/about",
    title: "About Us | Track Opinion®",
    description:
      "Learn about Track Opinion® — our vision, mission, leadership team, and global reach across 60+ languages and 4.5 million panel members.",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Track Opinion",
  url: "https://www.trackopinion.com/about",
  description:
    "Track Opinion® is a global market research and outsourcing firm headquartered in India, established in 2009.",
  mainEntity: {
    "@type": "Organization",
    name: "Track Opinion",
    foundingDate: "2009",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 500 },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <main>
        <AboutHero />
        <VisionMission />
        <SpecializedSectors />
        <OurValues />
        <GlobalReach />
        <Leadership />
        <WhyBusinesses />
        <Testimonials />
        {/* <Certifications /> */}
      </main>
    </>
  );
}
