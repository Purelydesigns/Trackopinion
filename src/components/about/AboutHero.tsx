"use client";

import PageHero from "@/components/ui/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      breadcrumb="About Us"
      badge="Global Market Research Firm | Established in 2009"
      heading={
        <>
          Track Opinion: Redefining Excellence in Market Research
        </>
      }
      description="We offer end-to-end B2B, B2C and health care studies via online and offline methods. With a proprietary scripting platform, advanced analytics and multilingual expertise, we deliver insights that drive confident decisions."
      primaryCta={{ label: "Get in Touch", href: "/contact-us" }}
      secondaryCta={{ label: "Explore Our Panel", href: "/solutions/global-panel" }}
      minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
    />
  );
}
