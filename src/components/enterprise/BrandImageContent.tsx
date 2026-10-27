"use client";

import { TrendingUp, Flag, Eye, Building2, Megaphone, Target } from "lucide-react";
import EnterprisePageLayout, { type EnterpriseContent } from "./EnterprisePageLayout";
import { faqs } from "@/components/brandtracker/faqs";
import { BrandFunnel, PerceptionMap } from "./visuals/BrandVisuals";

const content: EnterpriseContent = {
  hero: {
    breadcrumb: [{ name: "Enterprise Solution" }, { name: "Brand Image Study" }],
    badge: "Brand Tracker Study",
    heading: <>Track The Shifts That Shape Your Brand</>,
    description: (
      <>
        Brand health rarely changes unilaterally. Awareness can surge while consideration drops. A campaign can advance recall numbers without preference soaring.
        <br /><br />
        Track Opinion enables research and marketing teams in tracking and measuring these shifts methodically across markets, audience segments, and waves, so that data fluctuations can be understood in the context of the market, not confused with changes in how the research was conducted.
      </>
    ),
    primaryCta: { label: "Discuss Your Brand Tracking Study", href: "/contact-us" },
    secondaryCta: { label: "Request Feasibility", href: "#capabilities" },
  },

  capabilities: {
    label: "Decision-Led Brand Intelligence",
    heading: <>See The Movement. Understand What Catalyzes It</>,
    description:
      "A useful tracker does more than report scores and movements. It shows where momentum is building (or weakening), which audience is moving in which direction, and how the brand’s position is changing relative to the category.",
    items: [
      { icon: TrendingUp, title: "Brand Funnel",  desc: "Measure awareness, familiarity, consideration, preference, usage, and loyalty. Decision lens: Where are people progressing, and where are you losing the momentum?" },
      { icon: Flag,       title: "Brand Perception",  desc: "Measure associations such as trust, quality, innovation, value, and category-specific attributes. Decision lens: Are you associated with the drivers that users choose?" },
      { icon: Eye,        title: "Category & Choice Drivers",    desc: "Understand the needs and attributes shaping consumer preferences. Decision lens: Are you winning on the factors that matter most to the product category?" },
      { icon: Building2,  title: "Competitive Position",  desc: "Benchmark agreed measures against relevant competitors. Decision lens: Where are you gaining or failing to differentiate?" },
      { icon: Megaphone,  title: "Campaign & Communication", desc: "Track recognition, message takeout, and brand attribution alongside relevant brand measures. Decision lens: Is communication landing right with your target audience?" },
      { icon: Target,     title: "Audience & Market Differences", desc: "Read the trends by your segments, customer status, and markets. Decision lens: What granular shifts are happening beneath the overall score that impact revenue, retention, and brand growth?" },
    ],
  },

  sections: [
    {
      label: "From Awareness to Loyalty",
      heading: "Find The Gap Between Being Known and Being Chosen",
      paragraphs: [
        "A brand can be widely recognized but still not considered. It can attract trial without rising subscriptions. Or it can continue to impress the existing customers while losing relevance, and eventually recall, with prospects.",
        "Track your brand funnel from awareness and familiarity through intermediate stages up to usage and loyalty. Find how the users progress and where the momentum is lost.",
        "Design note: Retain/adapt the existing funnel visual. Avoid decorative percentages unless clearly labelled as illustrative.",
      ],
      bullets: [
      ],
      visual: <BrandFunnel />,
    },
    {
      label: "Perception & Competitive Position",
      heading: "The Brand You Build May Differ From The Brand People Experience",
      paragraphs: [
        "Brand perception is shaped by product experience, communication, customer interactions, and the wider category context. Tracking helps reveal which factors are gaining weight, how those perceptions differ among audiences, and where competitors are winning or vice versa.",
        "Measure trust, quality, value, innovation, and category-specific drivers alongside competitive benchmarks. Fully understand what makes the brand distinctive, not just how it is seen.",
        "Design note: Retain/adapt the existing perception map. The visual should explain brand associations and competitive differences, not repeat the funnel.",
      ],
      bullets: [
      ],
      visual: <PerceptionMap />,
    },
  ],

  methods: {
    label: "Learnings From a Brand Image Study",
    heading: <>A Brand Tracker Study Can Reveal Several Parameters About Your Brand Persona</>,
    description: "Six parameters every wave of a brand tracker should measure.",
    items: [
      { num: "01", title: "Brand Awareness",       desc: "Measure to what extent prospects, regular users, and churned customers know your brand." },
      { num: "02", title: "Brand Recall Value",    desc: "Know if users can recall and recognize your brand name from the logo or tagline and locate you among peers." },
      { num: "03", title: "Quality and Trust",     desc: "Learn how many consumers trust your offerings and brand's quality and can act as your mouthpiece." },
      { num: "04", title: "Brand Recommendations", desc: "Find out if loyal users recommend your products and mention the underlying benefits." },
      { num: "05", title: "Competitor's Comparison", desc: "Assess how users and the industry compare you with your peers and place you among the rivals." },
      { num: "06", title: "Employer's Persona",    desc: "Measure how the job market, employees, and job seekers perceive you as a workplace." },
    ],
  },
};

export default function BrandImageContent() {
  return <EnterprisePageLayout content={content} faqs={faqs} />;
}
