"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import PanelDemographics from "./PanelDemographics";
import PanelStats from "./PanelStats";
import PanelEducation from "./PanelEducation";
import PanelReach from "./PanelReach";
import GlobalReach from "@/components/about/GlobalReach";
import { PANEL_COUNTRIES } from "@/lib/mapCountries";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

export default function GlobalPanelPage() {
  const [marketId, setMarketId] = useState("india");

  return (
    <main>
      <PageHero
        breadcrumb={[{ name: "Global Panel", href: "/solutions/global-panel" }, { name: "B2C Panel" }]}
        badge="Global Panel Data — 10 Markets"
        heading={
          <>
            The World&apos;s Most<br />
            Verified Panel
          </>
        }
        description="Explore demographic, income, age and connectivity data across 10 key markets — updated continuously from 50M+ active panelists."
        primaryCta={{ label: "Explore Panel Data", href: "/contact-us" }}
        secondaryCta={{ label: "Request a Sample", href: "/contact-us" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />
      <PanelDemographics marketId={marketId} setMarketId={setMarketId} />
      <PanelStats        marketId={marketId} />
      <PanelEducation    marketId={marketId} />
      <PanelReach        marketId={marketId} />

      {/* ════════ MAP ════════ */}
      <GlobalReach
        heading="27 Markets in Our Consumer Reach"
        description="Verified consumer panelists across every major region — so a study can run in one market or twenty-seven without changing partners."
        pins={PANEL_COUNTRIES}
        sectionClassName="bg-white py-16"
      />

      <SolutionEnquiryForm />

    </main>
  );
}
