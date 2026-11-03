"use client";

;
import PageHero from "./ui/PageHero";

export default function HeroSection() {
  return (

    <PageHero
      badge="Global Market Research · Est. 2009"
      heading={
        <>
          Navigating Data, Powering Growth
        </>
      }
      description="From understanding niche audiences and market dynamics to evaluating brands, products, and growth opportunities, Track Opinion combines research expertise, global reach, and analytical capabilities to turn complex business questions into actionable insights."
      primaryCta={{ label: "Explore More", href: "/contact-us" }}
      secondaryCta={{ label: "Get a Quote", href: "/contact-us" }}
      minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
    />
  );
}
