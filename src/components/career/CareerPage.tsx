"use client";

import PageHero from "@/components/ui/PageHero";
import RoleMatchQuiz from "@/components/career/RoleMatchQuiz";
import HiringProcess from "@/components/career/HiringProcess";
import OpenPositions from "@/components/career/OpenPositions";
import ApplySection from "@/components/career/ApplySection";
import CareerCta from "@/components/career/CareerCta";

export default function CareerPage() {
  return (
    <main>
      <PageHero
        badge="We're Hiring — Join Our Team"
        heading={
          <>
            Build your career<br />
            at a{" "}
            global research
            {" "}firm
          </>
        }
        description="Join a team of 150+ researchers, analysts, and innovators working on projects across 60+ countries. Curiosity, collaboration, and impact — that's what we stand for."
        primaryCta={{ label: "View Open Roles", href: "/contact-us" }}
        secondaryCta={{ label: "Submit Your CV", href: "/contact-us" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />
      <RoleMatchQuiz />
      <HiringProcess />
      <OpenPositions />
      <ApplySection />
      <CareerCta />
    </main>
  );
}
