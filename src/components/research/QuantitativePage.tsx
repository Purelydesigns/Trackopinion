"use client";

import {
  ClipboardList, PhoneCall, Globe, FileSpreadsheet,
  Layers, Workflow, PieChart, FileText, Users, LineChart,
} from "lucide-react";
import ResearchDeepLayout, { type ResearchDeepContent } from "./ResearchDeepLayout";

const content: ResearchDeepContent = {
  hero: {
    breadcrumb: [{ name: "Research Services" }, { name: "Quantitative" }],
    badge: "Quantitative Market Research",
    heading: <>Numbers Through Online Surveys &amp; CATI Interviews</>,
    description:
      "Know what the audience thinks about your offerings. As a quantitative market research agency in India, we amplify your business decision-making capabilities.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "Explore Methods", href: "#methods" },
  },

  methods: {
    label: "Quantitative Market Research",
    heading: <>Numbers Through Online Surveys<br />And CATI Interviews</>,
    description:
      "Know what the audience thinks about your offerings. As a quantitative market research agency in India, we amplify your business decision-making capabilities.",
    subheading: "What's Quantitative Market Research?",
    paragraphs: [
      "Quantitative market research companies aid in gaining stats from users about their preferences, pain points, and needs. You can also assess market gaps, trends, and competition.",
      "Track Opinion uses diverse methods such as online and offline surveys, CATI, and web-enabled interviews, among many others.",
    ],
    items: [
      { icon: ClipboardList,    label: "Online Surveys",         desc: "Structured questionnaires fielded at scale" },
      { icon: FileSpreadsheet,  label: "Offline Surveys",        desc: "Field data collection where reach demands it" },
      { icon: PhoneCall,        label: "CATI Interviews",        desc: "Computer-assisted telephone interviewing" },
      { icon: Globe,            label: "Web-Enabled Interviews", desc: "Remote interviews across global markets" },
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
    heading: <>What&apos;s Quantitative Market Research?</>,
    paragraphs: [
      "Quantitative market research companies aid in gaining stats from users about their preferences, pain points, and needs. You can also assess market gaps, trends, and competition.",
      "Track Opinion uses diverse methods such as online and offline surveys, CATI, and web-enabled interviews, among many others.",
    ],
    bullets: [
      "Stats on user preferences, pain points, and needs",
      "Assess market gaps, trends, and competition",
      "Online and offline surveys, CATI, and web-enabled interviews",
    ],
    cards: [
      { eyebrow: "Survey",    title: "Online & Offline Surveys" },
      { eyebrow: "CATI",      title: "Telephone Interviews", sub: "Computer-assisted..." },
      { eyebrow: "Reporting", title: "Reporting Insights" },
    ],
  },

  benefits: {
    label: "Benefits",
    heading: <>Benefits of Quantitative<br />Research</>,
    paragraphs: [
      "As a quantitative research agency, we help you dig facts about your users' perceptions, market insights, and competitors' performance.",
      "By relying on demographic-based outcomes, refine your services, improve your products, and communicate better with users. Also, explore new territories, customer segments, and ideas using quantitative market research.",
    ],
    ctaLabel: "Discuss Your Research →",
    ctaHref: "/contact-us",
    centerLabel: "Insights",
    orbitNodes: [
      {
        label: ["User", "Perceptions"],
        angle: -90,
        icons: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
      },
      { label: ["Market"],      angle: 195, icons: ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"] },
      { label: ["Competitors"], angle: -20, icons: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"] },
      { label: ["Demographics"], angle: 122, icons: ["M18 20V10", "M12 20V4", "M6 20v-6"] },
      {
        label: ["Segments"],
        angle: 50,
        icons: ["M21.21 15.89A10 10 0 1 1 8 2.83", "M22 12A10 10 0 0 0 12 2v10z"],
      },
    ],
  },

  whyChoose: {
    label: "What Sets Us Apart",
    heading: <>Why Choose Track Opinion for Quantitative Research?</>,
    description:
      "Six reasons why leading brands, consulting firms, and agencies trust us for their quantitative market research.",
    cards: [
      { icon: Workflow,  title: "Process Oriented",      desc: "You don't get only data. You get a process-driven team that executes end-to-end quantitative market research." },
      { icon: PieChart,  title: "Customer Segmentation", desc: "Segment customers well that suit your sample requirements with legit panel profiles fulfilling survey prerequisites." },
      { icon: Layers,    title: "Highly Detailed",       desc: "Get holistic research — from understanding the project to designing surveys, programming them for distribution, data collection, and reporting." },
      { icon: Users,     title: "Population",            desc: "Whether B2C or B2B industry, our thorough vetting selects panelists with the necessary experience having apt psychographic and demographic data." },
      { icon: FileText,  title: "Questionnaire Designs", desc: "Receive a tailored approach in the survey designs and questions with the nuances only an experienced quantitative research agency understands." },
      { icon: LineChart, title: "Reporting Insights",    desc: "Collect and transform crude data into valuable insights that leverage your business decisions. Use our reporting capabilities to share and utilize opinions." },
    ],
  },

  projectManagement: {
    label: "How We Work",
    heading: <>Our Survey Process</>,
    description:
      "From screening the right panelists to making sure the survey gets completed — four steps that protect your response quality.",
    steps: [
      { num: 1, label: "Phone Screening and Validation", title: "For proper vetting.",        quote: '"The right respondents, verified first"', desc: "We select panel members based on initial phone screening and by validating their profiles and suitability." },
      { num: 2, label: "Send Our Survey Link",           title: "For easy access.",           quote: '"Delivered safely, wherever they are"',   desc: "Send survey links from various channels such as app notifications, emails, website forms, and other ways that embed links safely." },
      { num: 3, label: "Phone and Email Follow-ups",     title: "For better participation.",  quote: '"We keep respondents engaged"',           desc: "The number of responses matters. We regularly tap users for updates and engagement throughout the project lifecycle." },
      { num: 4, label: "Ensure Survey Completion",       title: "For good completion rates.", quote: '"Completion, not just participation"',    desc: "More than participation, the completion rate matters. And we ensure a higher number of clicks on the submit button." },
    ],
  },
};

export default function QuantitativePage() {
  return <ResearchDeepLayout content={content} />;
}
