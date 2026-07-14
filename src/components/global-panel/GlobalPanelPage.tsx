"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import PanelDemographics from "./PanelDemographics";
import PanelStats from "./PanelStats";
import PanelEducation from "./PanelEducation";
import PanelReach from "./PanelReach";
import PanelBooks from "./PanelBooks";

export default function GlobalPanelPage() {
  const [marketId, setMarketId] = useState("india");

  return (
    <main>
      <PageHero
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
      <PanelBooks />
    </main>
  );
}
