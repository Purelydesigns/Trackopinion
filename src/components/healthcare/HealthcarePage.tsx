"use client";

import { motion } from "framer-motion";
;
import GlobalReach from "@/components/about/GlobalReach";
import PanelSpecialties from "./PanelSpecialties";
import LatestReadsSection from "../shared/LatestReadsSection";
import FaqAccordion from "../shared/FaqAccordion";
import PageHero from "../ui/PageHero";
import SiteCard from "../ui/SiteCard";
import SectionHeader from "../ui/SectionHeader";
import { ShieldCheck, Database, Languages } from "lucide-react";
import { faqs } from "./faqs";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

/* ── Data ── */
const capabilities = [
  {
    title: "Profile Validation & Maintenance",
    desc: "Strict profiling starts right at the registration process when building a healthcare panel for online surveys. Healthcare professionals and physicians' profiles validated against NPI and AMA databases. Compulsory updates every six months for the panelists to maintain their latest data.",
    icon: ShieldCheck,
  },
  {
    title: "Data Security",
    desc: "Patients' and professionals' records are secured with top-notch data sharing policies as directed by the local government and regulatory authorities. In compliance with GDPR, we seek panelists' consent before storing healthcare data points in Europe.",
    icon: Database,
  },
  {
    title: "Coherent Data",
    desc: "Never lose the tone of a panelist's opinion and sentiments expressed in words. Accurate qualitative customer insights for your complex research. Translation experts in our team across the globe make it possible to conduct qualitative market research in all major languages.",
    icon: Languages,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── Main ── */
export default function HealthcarePage() {
  return (
    <main className="bg-white">

      <PageHero
          breadcrumb={[{ name: "Solutions" }, { name: "Healthcare" }]}
          badge="Healthcare"
          heading={
            <>
              Healthcare{" "}
            </>
          }
          description="A carefully curated panel of thousands of patients, healthcare practitioners, and pharma employees for genuine data. Reach wide and deep in 30+ Countries. All your Medical research fulfilled right at Track Opinion."
          primaryCta={{ label: "Start a Research Project", href: "/contact-us" }}
          secondaryCta={{ label: "Explore Methods", href: "#methods" }}
          minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
        />

      {/* ════════ WHO'S IN OUR PANEL ════════ */}
      <PanelSpecialties />

      {/* ════════ STATS BANNER ════════ */}
      <section className="py-16 site-container px-6">
        <motion.div
          {...fadeUp()}
          className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1b3e 50%, #112254 100%)" }}
        >

          <div className="px-10 py-12">

            <SectionHeader
              label="Healthcare Panel Network"
              heading={
                <>
                  Elevate your research with our comprehensive healthcare solutions and cutting-edge methodologies
                </>
              }
              description=""
              className=""
              theme="dark"
            />

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "711K+", label: "Healthcare Professionals" },
                { value: "30+",   label: "Countries Covered"        },
                { value: "98%",   label: "Profile Accuracy Rate"    },
                { value: "48h",   label: "Average Turnaround"       },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex flex-col items-center text-center rounded-2xl py-7 px-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="text-white font-black text-3xl sm:text-4xl mb-2">{stat.value}</p>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider leading-5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ DIG DEEPER HEADING ════════ */}
      <section className="bg-section pt-12">
        <div className="site-container px-6 text-center">

          <SectionHeader
            label=""
            heading={
              <>
                Dig Deeper into Patient&apos;s and Practitioners Experience
              </>
            }
            description=""
            className="!mb-6"
          />
          <div className="border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ MAP CARD ════════ */}
      <GlobalReach
        heading="30+ Countries in Our Global Reach"
        description="Panel members available in all major countries and continents for healthcare market research. Partnership with local panel providers increases our bandwidth and diversifies online market research."
      />

      {/* ════════ CAPABILITIES ════════ */}
      <section className="py-20 bg-white">
        <div className="site-container px-6">
          <SectionHeader
            label="Our Capabilities"
            heading={<>What Sets Our Healthcare Research Apart</>}
            description="Validated panels, secure data practices, and multilingual expertise — built for the complexity of healthcare research."
            theme="light"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <SiteCard className="flex flex-col h-full">
                    <div className="p-7 flex flex-col flex-1">
                      <div
                        className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4"
                      >
                        <Icon size={26} strokeWidth={1.5} style={{ color: "white" }} />
                      </div>
                      <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">{cap.title}</h3>
                      <p className="text-gray-600 text-base leading-8 font-medium flex-1">{cap.desc}</p>
                    </div>
                  </SiteCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      

      

      {/* FAQs — the FAQPage JSON-LD on this route promises this content
          is visible, so it has to actually render. */}
      <FaqAccordion faqs={faqs} />

      <SolutionEnquiryForm />

      <LatestReadsSection />

    </main>
  );
}
