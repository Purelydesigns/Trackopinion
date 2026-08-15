"use client";

import {
  Workflow, Gamepad2, Languages, Brain,
  LayoutTemplate, SlidersHorizontal, PieChart, Filter, Table2, ShieldCheck,
  Boxes, Wallet, Headphones, Palette, Lock,
} from "lucide-react";
import ResearchDeepLayout, { type ResearchDeepContent } from "./ResearchDeepLayout";

const content: ResearchDeepContent = {
  hero: {
    breadcrumb: [{ name: "Research Services" }, { name: "Survey Programming" }],
    badge: "Survey Programming · Powered by Scrip8",
    heading: <>Online Survey Programming</>,
    description:
      "Create your personalized surveys. Collect data without a hitch — customized survey designing with advanced features at your fingertips.",
    primaryCta: { label: "Start Building Surveys", href: "/contact-us" },
    secondaryCta: { label: "Explore Features", href: "#methods" },
  },

  methods: {
    label: "Survey Programming",
    heading: <>Customized Survey Designing With<br />Advanced Features At Your Fingertips</>,
    description:
      "Sense the pulse of your target audience using our survey programming tool, Scrip8, while you focus on chiseling your million-dollar idea. From creating and customizing surveys to distribution and data analysis, Scrip8 can do it all for you without needing experience.",
    subheading: "Advanced Benefits With A Survey Tool",
    paragraphs: [
      "From creating and customizing surveys to distribution and data analysis, Scrip8 can do it all for you without needing experience.",
      "Create surveys, share with your panelists, collect data, and analyze results — all using Scrip8.",
    ],
    items: [
      { icon: Workflow,  label: "Dynamic Forms",      desc: "Prefetch demographic data and branch surveys on user input" },
      { icon: Gamepad2,  label: "Gamification",       desc: "Emoticons, progress bars, badges and rewards to lift engagement" },
      { icon: Languages, label: "Multilingual",       desc: "Translation and localization for unacquainted territories" },
      { icon: Brain,     label: "Sentiment Analysis", desc: "NLP and AI to read long open-ended responses" },
    ],
    radarLabel: "Survey Tool Capabilities",
    radarDims: [
      { label: "Dynamic Forms",  value: 0.90, angle: -90  },
      { label: "Gamification",   value: 0.78, angle: -30  },
      { label: "Multilingual",   value: 0.86, angle:  30  },
      { label: "Sentiment",      value: 0.74, angle:  90  },
      { label: "Reporting",      value: 0.88, angle: 150  },
      { label: "Security",       value: 0.92, angle: -150 },
    ],
  },

  advantages: {
    label: "Scrip8 Advantages",
    heading: <>Scrip8 Advantages</>,
    description:
      "Five reasons teams run their survey programming on Scrip8 — from unlimited responses to round-the-clock support.",
    cards: [
      {
        icon: Boxes,
        title: "Holistic",
        paragraphs: [
          "Create surveys with unlimited questions and seek an unlimited number of responses with real-time data. Export reports to spreadsheets and also download them in PDF formats. Manage your team members and add or remove them anytime.",
          "Create surveys, share with your panelists, collect data, and analyze results — all using Scrip8.",
        ],
      },
      {
        icon: Wallet,
        title: "Affordable",
        paragraphs: [
          "Scrip8, our in-house survey programming tool, comes with 3 pricing options. Choose one that suits your pocket and needs. Change the plan anytime based on your fluctuating project needs.",
          "Get a 7-day free trial for hands-on. Cancel whenever you want; no reasons necessary.",
        ],
      },
      {
        icon: Headphones,
        title: "Support",
        paragraphs: [
          "As an experienced survey programming agency, we understand the importance of support. We solve all your queries round-the-clock. Get personalized training and onboard Scrip8 smoothly.",
          "Need expert guidance during your surveys? We are here to help with designs, reports, and customizations.",
        ],
      },
      {
        icon: Palette,
        title: "Full Customization",
        paragraphs: [
          "Personalize your research to fit your respondents' best experience. Partner with a survey programming company like Scrip8.",
          "Use your logo and themes, color schemes and fonts. Connect with your panelists at a personal level using their first names. Distribute only surveys that they're interested in.",
        ],
      },
      {
        icon: Lock,
        title: "Security",
        paragraphs: [
          "Use secured communication in survey links with Scrip8 HTTPS encryption and never worry about malicious attacks. Make your survey programming compliant with GDPR, HIPAA, and other regulatory policies.",
          "Offer strong data security, privacy, and ethics to all the stakeholders. Empower your survey designers, report users, and other team members with the right access using authentication.",
        ],
      },
    ],
  },

  benefits: {
    label: "Why It Matters",
    heading: <>How Survey Programming<br />Benefits Your Research</>,
    paragraphs: [
      "Start your journey of creating surveys with Track Opinion, an end-to-end market research service provider. Our diverse global panel of 4.7Mn members is available to fulfill your market research quest.",
      "Connect with consumers and learn their opinions today.",
    ],
    ctaLabel: "Contact Us →",
    ctaHref: "/contact-us",
    centerLabel: "Scrip8",
    orbitNodes: [
      {
        label: ["Respondents"],
        angle: -90,
        icons: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
      },
      { label: ["Distribution"], angle: 195, icons: ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "M16 6l-4-4-4 4", "M12 2v13"] },
      { label: ["Security"],     angle: -20, icons: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"] },
      { label: ["Reporting"],    angle: 122, icons: ["M18 20V10", "M12 20V4", "M6 20v-6"] },
      {
        label: ["Insights"],
        angle: 50,
        icons: ["M21.21 15.89A10 10 0 1 1 8 2.83", "M22 12A10 10 0 0 0 12 2v10z"],
      },
    ],
  },

  whyChoose: {
    label: "What You Get",
    heading: <>Everything You Need to Field a Survey</>,
    description:
      "Six capabilities that take you from survey design through distribution to clean, analysis-ready data.",
    cards: [
      { icon: LayoutTemplate,     title: "Robust Surveys",       desc: "Design and create surveys quickly. Brand them with your logo, colors, and fonts, and distribute them to the intended audience." },
      { icon: SlidersHorizontal,  title: "Survey Programming",   desc: "Customize surveys with skip logic, input validation, branching, several question formats, and more using our in-house tool Scrip8." },
      { icon: PieChart,           title: "Reporting Capabilities", desc: "Simplify data synthesis and report distribution to stakeholders. Analyze data with drag-and-drop and DIY reporting tools." },
      { icon: Filter,             title: "Data Cleansing",       desc: "Filter out dubious survey records. Detect and eliminate redundant, illegible, or irrelevant data. Create KPIs and other derived fields for analysis and reporting." },
      { icon: Table2,             title: "Crosstab Analysis",    desc: "Amp up your market research game with crosstab reports. Examine data across multiple demographics to discover their correlation and drill down to finer details." },
      { icon: ShieldCheck,        title: "Secured Processes",    desc: "We respect your data privacy just like you do your consumers'. Get global data security standards and regulatory policies embedded with our survey tool." },
    ],
  },

  projectManagement: {
    label: "Survey Programming Lifecycle",
    heading: <>Only 6 Simple Steps From Surveys To Business Decisions</>,
    description:
      "From the first consultation to the insights your stakeholders act on — here's how a survey project runs.",
    steps: [
      { num: 1, label: "Project Consultation", title: "Share your needs.",       quote: '"Strategy, timeline, and sample"',        desc: "Share your online survey needs. Get consultation on strategy, timeline, and sample." },
      { num: 2, label: "Survey Designs",       title: "Design and brand.",       quote: '"A few clicks, not expertise"',           desc: "Design, create, and brand your forms. You only need a few clicks, not experience or expertise." },
      { num: 3, label: "Team Access",          title: "Bring in your team.",     quote: '"Add or remove members anytime"',         desc: "Get tool access for the team members. Add new members or remove them from the tool." },
      { num: 4, label: "Distribute",           title: "Reach your audience.",    quote: '"Multiple channels, one survey"',         desc: "Share your surveys with the audience via multiple channels." },
      { num: 5, label: "Collect Data",         title: "Let the data pour in.",   quote: '"Secured, refined, legit datasets only"', desc: "Sit back and let survey data pour in. Secured, refined, and legit datasets only." },
      { num: 6, label: "Generate Insights",    title: "Decide with confidence.", quote: '"Reports your stakeholders act on"',      desc: "Run easy-to-understand reports, share them with stakeholders, and make decisions." },
    ],
  },
};

export default function SurveyProgrammingPage() {
  return <ResearchDeepLayout content={content} />;
}
