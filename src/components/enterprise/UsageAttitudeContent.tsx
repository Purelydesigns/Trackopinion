"use client";

import { Repeat, Clock, HeartHandshake, Layers, ShoppingCart, LineChart } from "lucide-react";
import EnterprisePageLayout, { type EnterpriseContent } from "./EnterprisePageLayout";
import { OccasionWheel, SegmentBubbles } from "./visuals/UsageVisuals";

const content: EnterpriseContent = {
  hero: {
    breadcrumb: [{ name: "Enterprise Solution" }, { name: "Usage & Attitude Studies" }],
    badge: "Usage & Attitude Studies",
    heading: <>Usage &amp; Attitude Studies</>,
    description:
      "Understand what your category actually does — and why. Map real behaviour, occasions and attitudes across the people who buy and use your product.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "See Capabilities", href: "#capabilities" },
  },

  capabilities: {
    label: "Usage & Attitude Studies",
    heading: <>Numbers That Explain What People Do And Why</>,
    description:
      "A U&A study is the foundation document for a category — how often people buy, in what context, what drives choice, and how attitudes differ across segments.",
    items: [
      { icon: Repeat,         title: "Usage Frequency",   desc: "Penetration, frequency and repertoire — how often the category is bought and how many brands sit in the consideration set alongside yours." },
      { icon: Clock,          title: "Occasion Mapping",  desc: "When, where and why the category gets used, anchored to specific occasions rather than asking people to average their own behaviour." },
      { icon: HeartHandshake, title: "Attitude Drivers",  desc: "The beliefs and values shaping the decision, and which of those beliefs actually move choice rather than simply being agreed with." },
      { icon: Layers,         title: "Segment Profiling", desc: "Distinct behavioural groups within your audience, built from behaviour and attitude together so the segments are actionable." },
      { icon: ShoppingCart,   title: "Category Fluency",  desc: "Instruments designed by researchers who know the category, so questions reflect how buyers actually talk about it." },
      { icon: LineChart,      title: "Built To Track",    desc: "Designed from wave one for comparability, so re-running the study measures genuine change rather than methodology drift." },
    ],
  },

  sections: [
    {
      label: "Why It Matters",
      heading: "Behaviour, In Context",
      paragraphs: [
        "Claimed behaviour and actual behaviour rarely match. People under-report frequency, forget occasions, and rationalise choices after the fact.",
        "We design U&A instruments around recall anchors and specific occasions, so the behavioural picture holds up when you build a strategy on it.",
      ],
      bullets: [
        "Occasion-based recall rather than vague frequency questions",
        "Day-part and context mapping across the category",
        "Repertoire measured, not just brand preference",
      ],
      visual: <OccasionWheel />,
    },
    {
      label: "Benefits",
      heading: "Segments Your Teams Will Actually Use",
      paragraphs: [
        "A well-built U&A becomes the reference document for the whole category — informing innovation, portfolio decisions, communications planning and segmentation for years, not months.",
        "It shows where growth actually sits: more users, more occasions, or more value per occasion — and which attitudes you would need to shift to unlock each one.",
      ],
      bullets: [
        "Attitudinal segments that map onto real behaviour",
        "Segment sizing with pen portraits your teams can act on",
        "A clear read on where category growth is available",
      ],
      visual: <SegmentBubbles />,
    },
  ],

  methods: {
    label: "How We Work",
    heading: <>Our U&amp;A Process</>,
    description: "From category framing to a segmentation your teams will actually use.",
    items: [
      { num: "01", title: "Frame the Category",   desc: "We define the category boundary, the occasions in scope and the audience to be represented before a single question is written." },
      { num: "02", title: "Design the Instrument", desc: "The questionnaire is built around occasion recall and validated attitude batteries, then piloted before full field." },
      { num: "03", title: "Field & Validate",     desc: "Quota-controlled fieldwork runs across your markets, with attention checks and quality screening applied throughout." },
      { num: "04", title: "Segment & Deliver",    desc: "We build the segmentation, size each group, and deliver pen portraits alongside an opportunity framework for growth." },
    ],
  },
};

export default function UsageAttitudeContent() {
  return <EnterprisePageLayout content={content} />;
}
