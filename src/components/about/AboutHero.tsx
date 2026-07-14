"use client";

import PageHero from "@/components/ui/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      breadcrumb="About Us"
      badge="Global Research Firm · Est. 2009"
      heading={
        <>
          Track Opinion:<br />
          Redefining Excellence<br />
          in{" "}<span className="italic font-normal" style={{ color: "#93c5fd" }}>Market Research</span>
        </>
      }
      description="Track Opinion® is a global market research and outsourcing firm headquartered in India. Established in 2009, we specialize in end-to-end custom research services for consulting firms, global corporations, and SMBs."
      primaryCta={{ label: "Get in Touch", href: "/contact-us" }}
      secondaryCta={{ label: "Our Panel", href: "/solutions" }}
      minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
    />
  );
}
