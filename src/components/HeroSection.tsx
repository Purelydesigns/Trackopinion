"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "./ui/PageHero";

export default function HeroSection() {
  return (

    <PageHero
      badge="Global Market Research · Est. 2009"
      heading={
        <>
          Welcome to
Track Opinion —
Delivering Insights
        </>
      }
      description="Bank on a Global panel of 4.5 Million members. Get tailor-made online surveys and market research processes. Unlock user behaviour and market intelligence."
      primaryCta={{ label: "Explore More", href: "/contact-us" }}
      secondaryCta={{ label: "Get a Quote", href: "/solutions" }}
      minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
    />
  );
}
