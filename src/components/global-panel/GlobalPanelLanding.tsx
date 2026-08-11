"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteCard from "@/components/ui/SiteCard";

const panels = [
  {
    href: "/solutions/global-panel/b2c",
    icon: Users,
    label: "B2C Panel",
    stat: "50M+ consumers",
    desc: "Demographic, income, age, education and connectivity data across 10 key markets — profiled continuously across our consumer panel.",
    points: ["Gender & age distribution", "Household income brackets", "Education & connectivity", "10 core markets"],
  },
  {
    href: "/solutions/global-panel/b2b",
    icon: Building2,
    label: "B2B Panel",
    stat: "785,500 professionals",
    desc: "Validated decision-makers profiled by job level, department, industry and company attributes — recruited through professional networks and verified against B2B databases.",
    points: ["Job level & decision makers", "Department & function", "Industry segment", "ITDM, government & profession targeting"],
  },
];

export default function GlobalPanelLanding() {
  return (
    <main>
      <PageHero
        badge="Global Panel Data"
        heading={
          <>
            The World&apos;s Most<br />
            Verified Panel
          </>
        }
        description="Two panels, one standard of quality. Explore consumer demographics across 10 markets, or validated business decision-makers worldwide."
        primaryCta={{ label: "Explore Panel Data", href: "/solutions/global-panel/b2c" }}
        secondaryCta={{ label: "Request a Sample", href: "/contact-us" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Choose Your Panel"
            heading={<>B2C or B2B</>}
            description="Pick the panel that matches your audience — each with its own profiling, validation and market coverage."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {panels.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <SiteCard className="h-full">
                    <Link href={p.href} className="flex flex-col h-full p-8 group">
                      <span className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5">
                        <Icon className="w-7 h-7 text-white" strokeWidth={1.6} />
                      </span>

                      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                        {p.stat}
                      </p>
                      <h3 className="text-gray-900 font-bold text-2xl leading-snug mb-3">
                        {p.label}
                      </h3>
                      <p className="text-gray-600 text-base leading-8 font-medium mb-6">
                        {p.desc}
                      </p>

                      <ul className="flex flex-col gap-2 mb-8">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 text-gray-600 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>

                      <span className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-3 transition-all duration-200">
                        Explore {p.label} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </SiteCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
