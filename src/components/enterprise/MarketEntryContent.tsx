"use client";

import { Globe, Scale, Users, ClipboardCheck, Map, FileText } from "lucide-react";
import EnterprisePageLayout, { type EnterpriseContent } from "./EnterprisePageLayout";
import { EntryReadiness, PriceSensitivity } from "./visuals/EntryVisuals";

const content: EnterpriseContent = {
  hero: {
    breadcrumb: [{ name: "Enterprise Solution" }, { name: "New Market Entry Research" }],
    badge: "Market Entry Research",
    heading: <>New Market Entry Research</>,
    description:
      "Enter with evidence, not optimism. Test demand, sizing, pricing and route-to-market before you commit budget to a new country, category or segment.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "See Capabilities", href: "#capabilities" },
  },

  capabilities: {
    label: "Market Entry Research",
    heading: <>Numbers That De-Risk The Biggest Decision You Make</>,
    description:
      "Market entry is the most expensive decision a business makes on the least evidence. We give you the demand, pricing and barrier picture before the budget is spent.",
    items: [
      { icon: Globe,          title: "Demand Validation",  desc: "Test whether genuine appetite exists in the target market, among the exact audience you intend to serve — in country and in their own language." },
      { icon: Scale,          title: "Price Sensitivity",  desc: "Structured willingness-to-pay testing rather than a single ‘would you buy this’ question, giving you a defensible price corridor to plan against." },
      { icon: Users,          title: "Audience Profiling", desc: "Who buys, how often, what triggers the decision, and which segment is worth leading with when you stage your entry." },
      { icon: ClipboardCheck, title: "Barrier Assessment", desc: "Regulatory, cultural and distribution friction surfaced early — the reasons entries fail long after the demand case looked sound." },
      { icon: Map,            title: "Route-to-Market",    desc: "Channel preference, purchase habits and discovery behaviour mapped for your target buyer, so you know how to reach them, not just whether to." },
      { icon: FileText,       title: "Go / No-Go Clarity",  desc: "A clear recommendation with the evidence behind it, structured for the investment committee rather than the research team." },
    ],
  },

  sections: [
    {
      label: "Why It Matters",
      heading: "Feasibility, Not Forecasts",
      paragraphs: [
        "A spreadsheet forecast will tell you what a market could be worth. It will not tell you whether local buyers understand your proposition, trust an unfamiliar brand, or can reach it through the channels you plan to use.",
        "We test those assumptions directly with in-market respondents, so the go / no-go decision rests on evidence from the people you intend to sell to.",
      ],
      bullets: [
        "In-market, in-language fieldwork across 30+ countries",
        "Concept and proposition testing adapted for local context",
        "Barriers assessed alongside demand, not after it",
      ],
      visual: <EntryReadiness />,
    },
    {
      label: "Benefits",
      heading: "Know What They Will Actually Pay",
      paragraphs: [
        "Pricing is where most entry plans quietly fail. A proposition that lands in one market can be read as overpriced or suspiciously cheap in another.",
        "We establish a price corridor using structured sensitivity testing, so launch pricing is set against evidence from local buyers rather than converted from your home market.",
      ],
      bullets: [
        "Defensible price corridor, not a single guessed number",
        "Perceived-value read alongside the price point",
        "Segment-level differences surfaced before launch",
      ],
      visual: <PriceSensitivity />,
    },
  ],

  methods: {
    label: "How We Work",
    heading: <>Our Entry Research Process</>,
    description: "From framing the entry question to a staged, evidence-backed recommendation.",
    items: [
      { num: "01", title: "Frame the Question", desc: "We agree the market, target segment and proposition being tested, plus the thresholds that would make this a go or a no-go." },
      { num: "02", title: "Field In-Market",    desc: "Primary fieldwork runs among profiled buyers in the target country, in their own language, using our in-country panel." },
      { num: "03", title: "Model the Case",     desc: "Demand is sized by segment, price corridors established, and competitive position assessed against local incumbents." },
      { num: "04", title: "Recommend",          desc: "We deliver a staged entry recommendation — lead segment, proposition, channel and the barriers to plan for." },
    ],
  },
};

export default function MarketEntryContent() {
  return <EnterprisePageLayout content={content} />;
}
