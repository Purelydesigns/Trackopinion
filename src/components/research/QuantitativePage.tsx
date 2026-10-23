"use client";

import {
  ClipboardList, PhoneCall, Globe, FileSpreadsheet,
  BadgeCheck, Filter, PieChart, Smile, ScanSearch, ShieldCheck,
} from "lucide-react";
import ResearchDeepLayout, { type ResearchDeepContent } from "./ResearchDeepLayout";

const content: ResearchDeepContent = {
  hero: {
    breadcrumb: [{ name: "Research Services" }, { name: "Quantitative" }],
    badge: "Quantitative Market Research",
    heading: <>Measure What Matters With the Right People Behind the Data</>,
    description:
      "Quantitative research is most useful when the sample, methodology, and execution are built around the research question. Track Opinion supports research teams in measuring behaviors, attitudes, preferences, and change at scale while keeping audience relevance, feasibility, and data quality at the center of the study.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "Explore Methods", href: "#methods" },
  },

  methods: {
    label: "Quantitative Market Research",
    heading: <>Numbers Through Online Surveys<br />And CATI Interviews</>,
    description:
      "Know what the audience thinks about your offerings. As a quantitative market research agency in India, we amplify your business decision-making capabilities.",
    subheading: "One Research Question. The Right Route to the Answer.",
    paragraphs: [
      "No single route ensures the best reach to every audience. Track Opinion executes an established methodology or recommends an appropriate data-collection route based on the target audience, geography, research objective, incidence, and timeline.",
    ],
    items: [
      { icon: ClipboardList,    label: "Online & Mobile Surveys",         desc: "Reach profiled consumers and professional audiences through structured digital research." },
      { icon: PhoneCall,        label: "CATI",        desc: "Interviewer-led telephone research where direct contact or controlled interviewing adds value." },
      { icon: FileSpreadsheet,  label: "Face-to-Face Research",        desc: "Quantitative data collection through intercepts, street interviews, and other location-based fieldwork." },
      { icon: Globe,            label: "Hybrid & Mixed-Mode", desc: "Combine online, offline, and telephonic methods when audience accessibility or study design calls for more than one route." },
    ],
    radarLabel: "Quantitative Coverage Map",
    radarDims: [
      { label: "Preferences",  value: 0.88, angle: -90  },
      { label: "Pain Points",  value: 0.82, angle: -30  },
      { label: "Needs",        value: 0.86, angle:  30  },
      { label: "Market Gaps",  value: 0.74, angle:  90  },
      { label: "Trends",       value: 0.80, angle: 150  },
      { label: "Competition",  value: 0.78, angle: -150 },
    ],
  },

  moreThanNumbers: {
    heading: <>From Everyday Consumers to Specialist Decision-Makers</>,
    paragraphs: [
      "Broad reach matters. Relevant reach matters more.",
      "Track Opinion's panel resources target beyond broad demographics, using characteristics relevant to the research.",
    ],
    // The three audience types are the floating cards; repeating them as bullets
    // would say the same thing twice in one view.
    bullets: [],
    cards: [
      {
        eyebrow: "Consumer",
        title: "Consumer Audiences",
        sub: "Demographic, behavioral, interest, category, and purchase-related targeting.",
      },
      {
        eyebrow: "B2B",
        title: "Business Professionals",
        sub: "Industry, function, job level, company characteristics, and decision-making responsibility.",
      },
      {
        eyebrow: "Specialist",
        title: "Specialist & Hard-to-Reach Audiences",
        sub: "Study-specific approaches for narrower and lower-incidence populations.",
      },
    ],
  },

  benefits: {
    label: "Benefits",
    heading: <>Know What Is Realistic Before Fieldwork Begins</>,
    paragraphs: [
      "Feasibility should inform the research design, not become a problem discovered after launch.",
    ],
    ctaLabel: "Discover Your Research →",
    ctaHref: "/contact-us",
    centerLabel: "Insights",
    orbitNodes: [
      {
        label: ["Audience"],
        angle: -90,
        icons: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
      },
      {
        label: ["Geography"],
        angle: -18,
        icons: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
      },
      {
        label: ["Incidence", "& Sample"],
        angle: 54,
        icons: ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
      },
      {
        label: ["Timeline"],
        angle: 126,
        icons: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6l4 2"],
      },
      {
        label: ["Method"],
        angle: 198,
        icons: ["M6 3v12", "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 9a9 9 0 0 1-9 9"],
      },
    ],
  },

  whyChoose: {
    label: "What Sets Us Apart",
    heading: <>Quality Isn&apos;t a Final Check. It Runs Through the Research.</>,
    description:
      "Data quality depends on whether respondents are authentic, relevant to the study, appropriately represent the population, and able to participate meaningfully.",
    cards: [
      { icon: BadgeCheck,  title: "Authenticity",                 desc: "Identity and survey-level controls, including verification, geolocation validation, duplicate detection, device fingerprinting, and IP/VPN controls." },
      { icon: Filter,      title: "Relevance",                    desc: "Profiling and study-specific screening help ensure respondents meet the required research criteria." },
      { icon: PieChart,    title: "Representation",               desc: "Sample and quota structures help ensure the intended groups are represented within the research." },
      { icon: Smile,       title: "Respondent Experience",        desc: "Questionnaire design, survey logic, and mobile accessibility support more considered participation." },
      { icon: ScanSearch,  title: "Survey-Level Quality",         desc: "Attention checks, speeding, and straight-lining detection, together with fieldwork monitoring." },
      { icon: ShieldCheck, title: "Audience-Specific Validation", desc: "Additional professional, company, role, or healthcare-specific validation can be applied wherever relevant." },
    ],
  },

  projectManagement: {
    label: "Flexible Research Support",
    heading: <>Choose the Level of Research Support You Need</>,
    description:
      "From audience access to end-to-end execution, choose the level of service that fits your research requirements.",
    steps: [
      { num: 1, label: "", quote: "", title: "Audience / Sample Only",          desc: "Access the required consumer, B2B, or specialist audience against agreed targeting and sample criteria." },
      { num: 2, label: "", quote: "", title: "Sample + Fieldwork",              desc: "Audience recruitment, fieldwork management, quota monitoring, and relevant quality controls." },
      { num: 3, label: "", quote: "", title: "Programming + Fieldwork",         desc: "Questionnaire setup, scripting, logic, branching, multilingual setup, and fieldwork execution." },
      { num: 4, label: "", quote: "", title: "End-to-End Quantitative Support", desc: "Research planning through sampling, fieldwork, quality control, data processing, analysis, and reporting." },
    ],
  },

  enquiry: {
    heading: "Need Quantitative Research Built Around Your Audience?",
    intro:
      "Tell us whom you need to reach, where you need to reach them, and what you need to measure. We can assess feasibility, recommend an appropriate data-collection route, and build the level of execution around your research requirements.",
  },
};

export default function QuantitativePage() {
  return <ResearchDeepLayout content={content} />;
}
