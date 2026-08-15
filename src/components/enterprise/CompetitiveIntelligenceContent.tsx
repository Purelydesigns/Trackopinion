"use client";

import { Radar, Map, Search, Users, Scale, FileText } from "lucide-react";
import EnterprisePageLayout, { type EnterpriseContent } from "./EnterprisePageLayout";
import { CoverageGrid, ShareDonut } from "./visuals/CompetitiveVisuals";

const content: EnterpriseContent = {
  hero: {
    breadcrumb: [{ name: "Enterprise Solution" }, { name: "Competitive Intelligence & Market Mapping" }],
    badge: "Competitive Intelligence",
    heading: <>Competitive Intelligence &amp; Market Mapping</>,
    description:
      "Know exactly where you stand. Map the competitive landscape, size every segment, and find the white space your next move depends on.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "See Capabilities", href: "#capabilities" },
  },

  capabilities: {
    label: "Competitive Intelligence",
    heading: <>Numbers That Show Exactly Where You Stand</>,
    description:
      "Turn scattered signals — pricing, positioning, share of voice, customer defection — into a single, decision-ready view of your category.",
    items: [
      { icon: Radar,  title: "Competitor Benchmarking", desc: "Score every player on the same dimensions — positioning, pricing, proposition and proof — so comparisons hold up when your leadership team challenges them." },
      { icon: Map,    title: "Market Mapping",          desc: "Plot the full category: direct rivals, adjacent players and substitutes, sized by segment so you can see which parts of the market are genuinely contested." },
      { icon: Search, title: "White Space Analysis",    desc: "Identify demand that no current player serves well, quantified rather than asserted, with the buyer evidence behind each opportunity." },
      { icon: Users,  title: "Buyer Perception",        desc: "Understand how your audience actually ranks the alternatives — which is rarely how the category ranks itself — and what drives the final choice." },
      { icon: Scale,  title: "Pricing Intelligence",    desc: "Map price architecture across the category, including bundling, discounting patterns and where buyers perceive value rather than just cost." },
      { icon: FileText, title: "Decision-Ready Output", desc: "Maps, scorecards and a prioritised opportunity list built for the investment committee — not a data dump that needs a translation layer." },
    ],
  },

  sections: [
    {
      label: "Why It Matters",
      heading: "A Competitor List Is Not Intelligence",
      paragraphs: [
        "Most teams can name their direct rivals. Far fewer know how buyers actually rank the alternatives, which segments are genuinely contested, and where demand is going unserved.",
        "We combine primary research with our global panel and structured desk research to build a map of the category — who competes, on what basis, and where the gaps sit.",
      ],
      bullets: [
        "Primary evidence from verified category buyers, not scraped listings",
        "Direct rivals, adjacent players and substitutes on one map",
        "Consistent scoring dimensions across every player",
      ],
      visual: <CoverageGrid />,
    },
    {
      label: "Benefits",
      heading: "Find The Space Nobody Owns",
      paragraphs: [
        "With the category mapped, you can price with confidence, sharpen positioning against a named alternative, and put investment behind segments that are genuinely open.",
        "White space is only useful when it is sized. We quantify the demand behind each gap so you can rank opportunities rather than debate them.",
      ],
      bullets: [
        "Segment-level share and sizing you can act on",
        "Opportunities ranked by addressable demand",
        "Clear view of where you win, lose, and shouldn’t compete",
      ],
      visual: <ShareDonut />,
    },
  ],

  methods: {
    label: "How We Work",
    heading: <>Our Market Mapping Process</>,
    description: "From defining the category to handing over a prioritised opportunity list.",
    items: [
      { num: "01", title: "Define the Category", desc: "We agree the category boundary with you — direct rivals, adjacent players and substitutes — so the map answers the right question." },
      { num: "02", title: "Gather Evidence",     desc: "Structured desk research is paired with primary fieldwork among verified category buyers from our global panel." },
      { num: "03", title: "Build the Map",       desc: "Competitors are scored on consistent dimensions and plotted against each other, with share and perception broken out by segment." },
      { num: "04", title: "Prioritise",          desc: "We surface the white space, size the opportunity in each, and hand over a prioritised list with the evidence behind every call." },
    ],
  },
};

export default function CompetitiveIntelligenceContent() {
  return <EnterprisePageLayout content={content} />;
}
