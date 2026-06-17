import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import WhatWeDo from "@/components/WhatWeDo";
import WhyUs from "@/components/WhyUs";
import TrustedBy from "@/components/TrustedBy";
import OurValues from "@/components/OurValues";
import SuccessStories from "@/components/SuccessStories";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Track Opinion® — Global Market Research & Online Panel",
  description:
    "Bank on a Global panel of 4.5 Million members. Get tailor-made online surveys, data collection, analytics, and market intelligence with Track Opinion®.",
  alternates: {
    canonical: "https://www.trackopinion.com",
  },
  openGraph: {
    url: "https://www.trackopinion.com",
    title: "Track Opinion® — Global Market Research & Online Panel",
    description:
      "Bank on a Global panel of 4.5 Million members. Get tailor-made online surveys and market research processes.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Track Opinion",
  url: "https://www.trackopinion.com",
  logo: "https://www.trackopinion.com/logo.png",
  description:
    "Track Opinion® is a global market research and outsourcing firm that provides end-to-end custom research services.",
  foundingDate: "2018",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 500 },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "607-608, Tower C, Nirvana Courtyard, Sector 50",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122018",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "91 Springboard, C2, Block C, Sector 1",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/trackopinion",
    "https://twitter.com/TrackOpinion",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Market Research Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Collection" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Survey Programming" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Processing & Analytics" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Translation Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desk Research" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Project Management" } },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Track Opinion",
  url: "https://www.trackopinion.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.trackopinion.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <main>
        <HeroSection />
        <WhatWeDo />
        <WhyUs />
        <TrustedBy />
        <OurValues />
        <SuccessStories />
        <Certifications />
        <Testimonials />
      </main>
    </>
  );
}
