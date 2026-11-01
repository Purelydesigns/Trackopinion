"use client";

import { TrendingUp, Flag, Eye, Building2, Megaphone, Target, Scale, ClipboardCheck } from "lucide-react";
import EnterprisePageLayout, { type EnterpriseContent } from "./EnterprisePageLayout";
import { faqs } from "@/components/brandtracker/faqs";
import { BrandFunnel, PerceptionMap } from "./visuals/BrandVisuals";

const content: EnterpriseContent = {
  hero: {
    breadcrumb: [{ name: "Enterprise Solution" }, { name: "Brand Image Study" }],
    badge: "Brand Tracker Study",
    heading: <>Track The Shifts That Shape Your Brand</>,
    description: [
      "Brand health rarely changes unilaterally. Awareness can surge while consideration drops. A campaign can advance recall numbers without preference soaring.",
      "Track Opinion enables research and marketing teams in tracking and measuring these shifts methodically across markets, audience segments, and waves, so that data fluctuations can be understood in the context of the market, not confused with changes in how the research was conducted.",
    ],
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
      ],
      visual: <BrandFunnel />,
    },
    {
      label: "Perception & Competitive Position",
      heading: "The Brand You Build May Differ From The Brand People Experience",
      paragraphs: [
        "Brand perception is shaped by product experience, communication, customer interactions, and the wider category context. Tracking helps reveal which factors are gaining weight, how those perceptions differ among audiences, and where competitors are winning or vice versa.",
        "Measure trust, quality, value, innovation, and category-specific drivers alongside competitive benchmarks. Fully understand what makes the brand distinctive, not just how it is seen.",
      ],
      visual: <PerceptionMap />,
    },
  ],

  methods: {
    label: "Audience & Sample Design",
    heading: <>The Right Trend Starts With The Right Audience</>,
    description: [
      "A tracker can look stable overall while changes—both positive and negative—are happening silently among prospects, existing users, lapsed customers, and individual markets. Your measurement should happen along the right grains for full realization.",
      "Vet the population that matters, maintain approved sample parameters across waves, and validate respondent fit so fluctuations in the trend are less likely to be driven by changes in who answered.",
    ],
    items: [
      { icon: Target,         title: "Define the right population", desc: "Align the sample with people whose perceptions are relevant to the decision—category users, prospects, customers, lapsed users, professionals, or specialist audiences." },
      { icon: Scale,          title: "Keep the sample comparable",  desc: "Maintain agreed demographic, geographic, and behavioral parameters so movement is not unintentionally created by a shift in who responded." },
      { icon: ClipboardCheck, title: "Validate respondent fit",     desc: "Use profiling, screening, and study-appropriate quality controls to support eligibility and data integrity." },
    ],
  },

  cardBands: [
    {
    label: "Wave-to-Wave Consistency",
    heading: <>Make Change in the Market Easier to Separate From Change in the Method</>,
    description: [
      "Tracking depends on comparison. If the audience mix, questionnaire, methodology, or fieldwork rules shift unintentionally, the trend becomes harder to interpret.",
      "Track Opinion supports repeatable execution around agreed parameters while allowing controlled evolution when the program genuinely needs to change.",
    ],
    // steps: ["Wave 1", "Wave 2", "Wave 3"],
    items: [
      { title: "Stable core measures",      desc: "Protect the questions, definitions, and KPIs used to read movement over time." },
      { title: "Consistent audience design", desc: "Maintain agreed target, sample, and quota parameters across waves." },
      { title: "Controlled execution",      desc: "Keep methodology and fieldwork rules aligned while monitoring sample composition and quality." },
      { title: "Documented evolution",      desc: "When the tracker needs to change, precisely record and assess the adjustment so its potential effect on comparability is understood." },
    ],
    },

    {
      label: "Global Execution & Flexible Support",
      heading: <>One Tracking Framework. Multiple Market Realities</>,
      description: [
        "Global comparability doesn't equate to identical execution in every market. It requires a common measurement logic, disciplined core specifications, and controlled local adaptation when market conditions genuinely differ.",
        "Whether you're building a new tracker or transitioning an established program, Track Opinion can support audience and sample, programming and fieldwork, data and reporting, and broader end-to-end tracking coordination.",
      ],
      items: [
        { title: "Audience & Sample",          desc: "Reach the agreed target population through appropriate audience access, screening, and sampling." },
        { title: "Programming & Fieldwork",    desc: "Get survey setup, scripting, fieldwork management, and quality control against agreed specifications." },
        { title: "Data & Reporting",           desc: "Receive processing, analysis outputs, and reporting requirements agreed for the program with Track Opinion." },
        { title: "End-to-End Tracking Support", desc: "Coordinate repeat waves, markets, and research workstreams according to your operating model and scope with our support." },
      ],
      /* Capability labels only — no figures or certifications, which the brief
         allows solely when verified and approved internally. */
      strip: [
        "Audience Access",
        "Feasibility Before Fieldwork",
        "Respondent Validation",
        "Repeatable Execution",
        "Multi-Market Coordination",
      ],
    },
  ],
};

export default function BrandImageContent() {
  return (
    <EnterprisePageLayout
      content={content}
      faqs={faqs}
      faqLabel="Brand Tracking FAQs"
      faqHeading="Questions Research Teams Often Ask"
    />
  );
}
