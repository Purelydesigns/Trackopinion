"use client";

import { motion } from "framer-motion";
import { Headphones, Globe, ShieldCheck, Zap, PhoneCall, MessageSquare } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GlobalReach from "@/components/about/GlobalReach";
import SectionHeader from "../ui/SectionHeader";
import SiteCard from "../ui/SiteCard";
import LatestReadsSection from "../shared/LatestReadsSection";
import FaqAccordion from "../shared/FaqAccordion";
import ProcessSteps, { ProcessStep } from "../shared/ProcessSteps";
import { FileText, Users, BarChart3, ClipboardCheck } from "lucide-react";
import { faqs } from "./faqs";
import { CATI_COUNTRIES } from "@/lib/mapCountries";
import SolutionEnquiryForm from "@/components/solutions/SolutionEnquiryForm";

/* ── Data ── */
const catiSteps: ProcessStep[] = [
  {
    num: "01",
    label: "Project Consultation & Questionnaire Design",
    desc: "Scoping, then logical jumps and control questions",
    icon: <FileText className="w-6 h-6" />,
    detail: {
      title: "Step 01 — Project Consultation & Questionnaire Design",
      body: "We start by scoping your objectives, target audience, and markets. From there we build precision questionnaires with logical jumps, skip patterns, and control questions tailored to your research goals.",
    },
  },
  {
    num: "02",
    label: "Recruitment & Moderator Allocation",
    desc: "Matched by demographic, timezone, and language",
    icon: <Users className="w-6 h-6" />,
    detail: {
      title: "Step 02 — Recruitment & Moderator Allocation",
      body: "Respondents are recruited against your screening criteria, and trained interviewers are assigned by demographic, timezone, and language requirements of your target audience.",
    },
  },
  {
    num: "03",
    label: "Pilot Testing & Quality Validation",
    desc: "A soft launch before full fieldwork",
    icon: <ClipboardCheck className="w-6 h-6" />,
    detail: {
      title: "Step 03 — Pilot Testing & Quality Validation",
      body: "A soft launch validates the script, routing, and average interview length before full fieldwork begins — so issues are caught and corrected while the sample is still intact.",
    },
  },
  {
    num: "04",
    label: "Live CATI Fieldwork",
    desc: "Predictive dialing, monitored in real time",
    icon: <PhoneCall className="w-6 h-6" />,
    detail: {
      title: "Step 04 — Live CATI Fieldwork",
      body: "Predictive dialing connects agents to respondents instantly. Calls are recorded and monitored in real-time, with progress against quota tracked throughout fieldwork.",
    },
  },
  {
    num: "05",
    label: "Quality Assurance & Verification",
    desc: "Back-checks, audits, and open-end review",
    icon: <ShieldCheck className="w-6 h-6" />,
    detail: {
      title: "Step 05 — Quality Assurance & Verification",
      body: "Completed interviews go through back-checks, call audits, and open-end review. Anything that fails validation is removed and replaced before the dataset is signed off.",
    },
  },
  {
    num: "06",
    label: "Recordings & Data Delivery",
    desc: "Cleaned datasets, reports, and call recordings",
    icon: <BarChart3 className="w-6 h-6" />,
    detail: {
      title: "Step 06 — Recordings & Data Delivery",
      body: "Cleaned, validated datasets with analysis-ready reports and call recordings — on time, every time, across the formats you need.",
    },
  },
];

const capabilities = [
  {
    title: "Gather, Not Manage",
    desc: "Call recordings and intuitive interfaces help agents facilitate respondents' answers and focus on their cadence without managing the incoming feedback and advanced training.",
    icon: <Headphones className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Time Zones",
    desc: "No worry about calling your respondents at an ungodly hour. Allow CATI to manage various timezones based on your users' demographics.",
    icon: <Globe className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Data Security",
    desc: "With strong firewalls and secure file sharing, your call records and user data are in safe hands. No distortion, no leaks, no loss. Complete data integrity.",
    icon: <ShieldCheck className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Turnaround Efficiency",
    desc: "Save over 30% of your time by commissioning a CATI project with us and still get qualitative market research data.",
    icon: <Zap className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Predictive Dialing",
    desc: "CATI software helps establish an automatic call connection between the first available agent and your respondent.",
    icon: <PhoneCall className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Agent Assist",
    desc: "Chat with your interviewers, broadcast messages to an individual or all, and hand-hold them through the initial phase by setting program rules.",
    icon: <MessageSquare className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
];

/* ── Main ── */
export default function CatiPage() {
  return (
    <main className="bg-white">

      <PageHero
        breadcrumb={[{ name: "Solutions" }, { name: "CATI Solutions" }]}
        badge="CATI · Computer Assisted Telephone Interviewing"
        heading={
          <>
            Computer Assisted<br />
            Telephone{" "}
            Interviewing
          </>
        }
        description="CATI is a cost-effective online user interview process. You can collect qualitative and quantitative data fast. Fine-tune your questionnaires with logical jumps and filter outcomes with control questions."
        primaryCta={{ label: "Explore More", href: "/contact-us" }}
        secondaryCta={{ label: "See Capabilities", href: "#capabilities" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      {/* ════════ ERASE COMPLEXITIES HEADING ════════ */}
      <section className="bg-section pt-12">
        <div className="site-container px-6 text-center">

          <SectionHeader
            label=""
            heading={
              <>
                Erase Complexities from Data Collection with CATI
              </>
            }
            description="Software driven calls for user feedback. Quality data with swift turnaround, anytime, from anywhere. That&apos;s what computer aided telephone interviews brings."
            className="!mb-0"
          />
          <div className="border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ MAP ════════ */}
      <GlobalReach
        heading="CATI Reach"
        description="CATI is a cost-effective online user interview process. You can collect qualitative and quantitative data fast. Fine-tune your questionnaires with logical jumps and filter outcomes with control questions."
        pins={CATI_COUNTRIES}
      />

      {/* ════════ HOW CATI WORKS ════════ */}
      <ProcessSteps
        steps={catiSteps}
        label="The Process"
        heading={<>CATI Works</>}
        description="A six-step framework from project consultation to clean data delivery — managed end-to-end by our expert team."
        sectionClassName="bg-white py-20"
      />

      {/* ════════ OUR CAPABILITIES ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">

          <SectionHeader
            label="Our Capabilities"
            heading={<>Scale &amp; Precision</>}
            description="Six CATI capabilities that make Track Opinion the most reliable partner for software-driven telephone research."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
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
                      {cap.icon}
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">{cap.title}</h3>
                    <p className="text-gray-600 text-base leading-8 font-medium flex-1">{cap.desc}</p>
                  </div>
                </SiteCard>
              </motion.div>
            ))}
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
