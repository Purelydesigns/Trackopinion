"use client";

import {
  Sparkles, MessageSquareText, TrendingDown, FileOutput,
  UserX, Clock, Puzzle,
  Zap, Smartphone, Headphones, Palette, ShieldCheck, Share2,
} from "lucide-react";
import ResearchDeepLayout, {
  type ResearchDeepContent,
} from "@/components/research/ResearchDeepLayout";
import { Scrip8Builder } from "@/components/research/visuals/Scrip8Visuals";
import { CustomerStories, PricingSection } from "./Scrip8Extras";

const content: ResearchDeepContent = {
  hero: {
    breadcrumb: [{ name: "Solutions", href: "/solutions" }, { name: "Scrip8" }],
    badge: "Scrip8 · AI-Powered Survey Platform",
    heading: (
      <>
        The Survey Platform
        <br />
        Built for Real Insights
      </>
    ),
    description:
      "Create, distribute and analyze surveys in minutes with Scrip8. Mobile-first, AI-powered, and trusted by 500+ research teams worldwide — from startups to Fortune 500s.",
    primaryCta: { label: "Start Free — No Card Needed", href: "#enquiry" },
    secondaryCta: { label: "See the Builder", href: "#methods" },
  },

  methods: {
    label: "Intelligence Built Into Every Step",
    heading: (
      <>
        Build, Field and Read a Survey
        <br />
        Without Leaving One Tool
      </>
    ),
    description:
      "Drag, drop and configure. Scrip8's builder creates any survey type — from NPS to complex branching questionnaires — without writing a single line of code.",
    subheading: "What the AI Does For You",
    paragraphs: [
      "Describe your research goal in plain English and Scrip8 generates a complete, best-practice survey in seconds — with the right question types, order and logic pre-configured.",
      "Then it watches the fieldwork: response patterns are monitored in real time, and questions causing drop-off are flagged before you lose more respondents.",
    ],
    items: [
      {
        icon: Sparkles,
        label: "AI Survey Generator",
        desc: "A plain-English goal becomes a complete survey with logic pre-configured",
      },
      {
        icon: MessageSquareText,
        label: "Semantic Analysis",
        desc: "Open text clustered by theme, sentiment and priority — no manual coding",
      },
      {
        icon: TrendingDown,
        label: "Drop-off Alerts",
        desc: "Questions losing respondents flagged in real time, with fixes suggested",
      },
      {
        icon: FileOutput,
        label: "One-Click Reports",
        desc: "Executive-ready PDF, PowerPoint or web reports in under 30 seconds",
      },
    ],
    radarLabel: "Inside the Builder",
    visual: <Scrip8Builder />,
    radarDims: [
      { label: "Design", value: 0.94, angle: -90 },
      { label: "Logic", value: 0.9, angle: -30 },
      { label: "Distribution", value: 0.88, angle: 30 },
      { label: "Analysis", value: 0.92, angle: 90 },
      { label: "Branding", value: 0.86, angle: 150 },
      { label: "Security", value: 0.95, angle: -150 },
    ],
  },

  moreThanNumbers: {
    heading: (
      <>
        Trusted by 500+
        <br />
        Research Teams Worldwide
      </>
    ),
    paragraphs: [
      "Five million surveys created, a million responses a month, across sixty countries — Scrip8 is the same platform Track Opinion runs its own fieldwork on.",
      "Start free and scale when you're ready. No hidden fees, no surprise overages, no weeks of onboarding before your first survey goes out.",
    ],
    bullets: [
      "Unlimited surveys on every plan, including the free tier",
      "Skip logic, branching, sections and page breaks as standard",
      "GDPR, HIPAA, ISO 27001 and SOC 2 Type II compliant",
      "Email, SMS, QR code, website embed or direct link — one dashboard",
    ],
    cards: [
      { eyebrow: "Surveys Created", title: "5M+", sub: "since launch" },
      { eyebrow: "Monthly Responses", title: "1M+", sub: "collected every month" },
      { eyebrow: "Countries Reached", title: "60+", sub: "fielding worldwide" },
    ],
  },

  advantages: {
    label: "The Problem",
    heading: <>Why Teams Move Off Their Old Survey Tool</>,
    description:
      "Three things break most survey projects — and all three are platform problems, not research problems.",
    cards: [
      {
        icon: UserX,
        title: "Low Response Rates",
        paragraphs: [
          "Desktop-first survey tools average 14% completion on mobile. Most respondents abandon before finishing, making your data incomplete and unreliable.",
        ],
      },
      {
        icon: Clock,
        title: "Insights Take Too Long",
        paragraphs: [
          "Waiting days or weeks for analysis reports means decisions are made on stale data. In fast-moving markets, timing is everything.",
        ],
      },
      {
        icon: Puzzle,
        title: "Overly Complex Tools",
        paragraphs: [
          "Enterprise survey platforms require weeks of training, IT support, and steep license fees — before you've even created your first survey.",
        ],
      },
    ],
  },

  benefits: {
    label: "Why It Matters",
    heading: (
      <>
        From Brief to Field
        <br />
        in Hours, Not Days
      </>
    ),
    paragraphs: [
      "A survey tool decides how much of your research budget survives contact with reality. Mobile completion, time-to-insight and how long onboarding takes are the three numbers that matter.",
      "Scrip8 optimises every delivery method for response rate, and turns what comes back into dashboards and reports the same day — so the decision happens while the data is still true.",
    ],
    ctaLabel: "Start Free →",
    ctaHref: "#enquiry",
    centerLabel: "Scrip8",
    orbitNodes: [
      {
        label: ["Design"],
        angle: -90,
        icons: ["M12 19l7-7 3 3-7 7-3-3z", "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z", "M2 2l7.586 7.586"],
      },
      {
        label: ["Distribute"],
        angle: 195,
        icons: ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "M16 6l-4-4-4 4", "M12 2v13"],
      },
      {
        label: ["Collect"],
        angle: -20,
        icons: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
      },
      {
        label: ["Analyse"],
        angle: 122,
        icons: ["M18 20V10", "M12 20V4", "M6 20v-6"],
      },
      {
        label: ["Report"],
        angle: 50,
        icons: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
      },
    ],
  },

  whyChoose: {
    label: "Everything Included",
    heading: <>On Every Plan, From Free Upwards</>,
    description:
      "The features that usually sit behind an enterprise tier — included from the start.",
    cards: [
      {
        icon: Zap,
        title: "Quick Response Capture",
        desc: "Design quick, versatile surveys with emotions and Likert scales. Add skip logic, sections, and page breaks for smooth traversal. Share in one click and track responses live.",
      },
      {
        icon: Smartphone,
        title: "Mobile-First Design",
        desc: "Every survey is optimized for phones and tablets automatically. Your respondents can answer from any device, any time — without pinching, zooming, or frustration.",
      },
      {
        icon: Headphones,
        title: "24 × 7 Expert Support",
        desc: "Get help from Scrip8's design and research experts anytime. Whether it's survey logic, methodology advice, or report interpretation — we're available round the clock.",
      },
      {
        icon: Palette,
        title: "Full Brand Personalization",
        desc: "Apply your logo, brand colors, custom fonts, and domain to every survey. White-label the entire respondent experience — from invite email to thank-you page.",
      },
      {
        icon: ShieldCheck,
        title: "Enterprise-Grade Security",
        desc: "GDPR, HIPAA, ISO 27001, and SOC 2 Type II compliant. All data is encrypted in transit and at rest. Role-based access, SSO, and audit logs for enterprise teams.",
      },
      {
        icon: Share2,
        title: "Shareable Visual Reports",
        desc: "Generate branded reports as PDF, Excel, or interactive dashboards. Share a live link with stakeholders so they can filter and explore data — no login required.",
      },
    ],
  },

  projectManagement: {
    label: "How Scrip8 Works",
    heading: <>Three Steps From Idea to Insight</>,
    description:
      "Design, collect, analyse — the whole loop inside one platform, with no handoffs between tools.",
    steps: [
      {
        num: 1,
        label: "Design",
        title: "Build in minutes, not hours.",
        quote: '"No line of code required"',
        desc: "Drag, drop, and configure. Scrip8's intuitive builder lets you create any survey type — from NPS to complex branching questionnaires — without writing a single line of code.",
      },
      {
        num: 2,
        label: "Collect",
        title: "Reach respondents anywhere.",
        quote: '"Email, SMS, QR, embed or link"',
        desc: "Share your survey via email, SMS, QR code, website embed, or direct link — all from a single dashboard. Scrip8 optimizes every delivery method for maximum response rates.",
      },
      {
        num: 3,
        label: "Analyze",
        title: "Turn responses into decisions.",
        quote: '"Instantly, not next week"',
        desc: "Real-time dashboards, AI-generated summaries, and visual reports make it easy to understand what your audience is really saying — and act on it fast.",
      },
    ],
  },
};

export default function Scrip8Page() {
  return (
    <ResearchDeepLayout
      content={content}
      extras={
        <>
          <CustomerStories />
          <PricingSection />
        </>
      }
    />
  );
}
