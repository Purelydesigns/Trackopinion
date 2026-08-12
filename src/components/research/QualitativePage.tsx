"use client";

import {
  Users, MessageSquare, BookOpen, Globe,
  PenLine, Globe2, BarChart2, CheckCircle, UsersRound,
} from "lucide-react";
import ResearchDeepLayout, { type ResearchDeepContent } from "./ResearchDeepLayout";

const content: ResearchDeepContent = {
  hero: {
    badge: "Consumer Insights · Deep Qualitative Research",
    heading: <>Qualitative Market Research</>,
    description:
      "Improve Your Offering with Qualitative Market Research. Understand the emotions, motivations, and behaviours that drive your audience — beyond what numbers can reveal.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "Explore Methods", href: "#methods" },
  },

  methods: {
    label: "Why It Matters",
    heading: <>Facts That Reveal the Reasons<br />Behind Users&apos; Emotions</>,
    description:
      "Learn your audience's opinions in depth through complex and elaborate methods like focus group interviews, diary studies, and online surveys with open-ended questions.",
    subheading: "Qualitative Market Research Methods",
    paragraphs: [
      "Qualitative research companies help you explore hidden opinions inside your users' hearts. What numbers can't reveal, we can.",
      "At Track Opinion, we use diverse methods based on your project needs. Digital discussions, physical communities, web-enabled or real-time focus groups, and in-person or CATI interviews are some primary methods qualitative research agencies in India deploy.",
    ],
    items: [
      { icon: Users,          label: "Focus Group Interviews",    desc: "In-person or virtual moderated group discussions" },
      { icon: MessageSquare,  label: "In-Depth Interviews (IDI)", desc: "One-on-one expert conversations for rich context" },
      { icon: BookOpen,       label: "Diary Studies",             desc: "Longitudinal self-reporting of user behaviour" },
      { icon: Globe,          label: "Online Communities",        desc: "Digital qualitative platforms for ongoing insight" },
    ],
    radarLabel: "Qualitative Insights Map",
    radarDims: [
      { label: "Emotion",    value: 0.82, angle: -90  },
      { label: "Motivation", value: 0.70, angle: -30  },
      { label: "Behaviour",  value: 0.88, angle:  30  },
      { label: "Culture",    value: 0.64, angle:  90  },
      { label: "Opinion",    value: 0.76, angle: 150  },
      { label: "Trust",      value: 0.85, angle: -150 },
    ],
  },

  moreThanNumbers: {
    heading: <>More Than Numbers</>,
    paragraphs: [
      "At Track Opinion, we believe market research is bigger than numbers. That's why we analyze the 'whys' and 'hows' rather than just 'what and how many' through user behavior.",
      "We only vet and onboard panelists with validated profiles and at least 6 months of experience. Our panel members' psychographic and demographic data reflects your audience segment.",
    ],
    bullets: [
      "Validated panelist profiles with a minimum of 6 months engagement history",
      "Psychographic & demographic data that truly reflects your target audience",
      "Rigorous quality checks at every stage of the research process",
    ],
    cards: [
      { eyebrow: "Research", title: "Analysis & Research..." },
      { eyebrow: "Analysis", title: "Research", sub: "Analysis & Research..." },
      { eyebrow: "Insight",  title: "Deep Consumer Insights" },
    ],
  },

  benefits: {
    label: "Benefits",
    heading: <>Benefits of Qualitative<br />Research</>,
    paragraphs: [
      "Qualitative data offers motivation behind user behavior, mindsets, and influences. These methods, alongside social media listening, help qualitative research companies learn about users' needs, demands, pain points, and underlying granular nuances.",
      "With thoughtfully curated open-ended questions, you can now extract the unexplored that quantitative data can't.",
    ],
    ctaLabel: "Discuss Your Research →",
    ctaHref: "/contact-us",
    centerLabel: "Quality",
    orbitNodes: [
      {
        label: ["User", "Behaviour"],
        angle: -90,
        icons: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
      },
      { label: ["Emotion"], angle: 195, icons: ["M22 12h-4l-3 9L9 3l-3 9H2"] },
      { label: ["Trust"],   angle: -20, icons: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"] },
      {
        label: ["Mindset"],
        angle: 122,
        icons: [
          "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z",
          "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
          "M12 17h.01",
        ],
      },
      {
        label: ["Influences"],
        angle: 50,
        icons: ["M17 8h1a4 4 0 0 1 0 8h-1", "M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z", "M6 1v3M10 1v3"],
      },
    ],
  },

  whyChoose: {
    label: "What Sets Us Apart",
    heading: <>Why Choose Track Opinion for Qualitative Research?</>,
    description:
      "Six reasons why leading brands, consulting firms, and agencies trust us for their qualitative research needs.",
    cards: [
      { icon: PenLine,       title: "End-to-End Consulting",   desc: "Right from understanding your goals to generating insights that help your business decisions, and have your back throughout the qualitative market research." },
      { icon: Globe2,        title: "Industry Agnostic",       desc: "Whichever is your industry, our experience is wide. Based on your company's size — start-up, mid-scale, or enterprise — we design our market research approach." },
      { icon: BarChart2,     title: "Deeper Data",             desc: "Qualitative research thrives on data that touches the depths. We offer that along with precision in data collection, analytics, and your business insights." },
      { icon: MessageSquare, title: "Translation Facility",    desc: "Need data collection at remote locations? Don't let regional and unfamiliar languages become a hurdle. Obtain translation services in your qualitative market research." },
      { icon: CheckCircle,   title: "Goals-Based Methodology", desc: "Your market research agenda defines which method we'd use. During our project consultation phase, we understand your needs and suggest an apt methodology." },
      { icon: UsersRound,    title: "Panel Vetting",           desc: "For qualitative market research, we demand a minimum of 6 months past participation from panelists as the industry standard. Varies from B2C to healthcare & brands." },
    ],
  },

  projectManagement: {
    label: "How We Work",
    heading: <>Project Management</>,
    description:
      "A dedicated team available around the clock — structured project delivery from consultation to execution.",
    steps: [
      { num: 1, label: "Project Consultation", title: "You speak, we listen.", quote: '"We seek a detailed discussion on your project"', desc: "We conduct a detailed discussion on your project to understand your qualitative data needs that should meet end goals." },
      { num: 2, label: "Team Allocation",      title: "You ask, we provide.",  quote: '"The right team, assembled for you"',            desc: "You get a research team with a project manager, expert research consultants, survey programmers and data analysts." },
      { num: 3, label: "Project Execution",    title: "You want, we serve.",   quote: '"Precision and punctuality, always"',            desc: "We take pride in timely delivery while aiming to collect precise data as a qualitative market research firm in India." },
    ],
  },
};

export default function QualitativePage() {
  return <ResearchDeepLayout content={content} />;
}
