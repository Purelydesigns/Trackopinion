"use client";

import { HeartHandshake, TrendingUp, Gauge, Search, Award, Repeat } from "lucide-react";
import EnterprisePageLayout, { type EnterpriseContent } from "./EnterprisePageLayout";
import { NpsBreakdown, RetentionCurve } from "./visuals/LoyaltyVisuals";

const content: EnterpriseContent = {
  hero: {
    breadcrumb: [{ name: "Enterprise Solution" }, { name: "Customer Loyalty Measurement" }],
    badge: "Customer Loyalty Insights",
    heading: <>Customer Loyalty Measurement</>,
    description:
      "Find your loyal customers and reward them. Convert prospects into loyal users, and transform users into ambassadors.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "See Capabilities", href: "#capabilities" },
  },

  capabilities: {
    label: "Customer Loyalty Insights",
    heading: <>Numbers That Represent Customer&apos;s Appreciation For Your Brand</>,
    description:
      "Convert prospects into loyal users. Transforms users into ambassadors. Use the right customer loyalty measurement service in India.",
    items: [
      { icon: HeartHandshake, title: "Customer Loyalty",  desc: "Measure how loyal your regular customers are by analyzing their repeat purchases and buying journeys. Bank on your positives." },
      { icon: TrendingUp,     title: "Emerging Trends",   desc: "Spot the trends within and across the segments — market and social conditions that cause churn, promote loyalty, and encourage prospects to move ahead." },
      { icon: Gauge,          title: "NPS",               desc: "Know how many customers refer your brand and products to the world by analyzing the Net Promoter Score. One crucial marker no business should miss." },
      { icon: Search,         title: "In-Depth Analysis", desc: "Learn the why behind your NPS — what motivates users to like your brand and stick to it, or the facts behind the dissatisfaction and complaints." },
      { icon: Award,          title: "Find Champions",    desc: "Convert customers into patrons who refer to your brands in their circles or social media. Engage with them personally and honor their commitment." },
      { icon: Repeat,         title: "Customer Retention", desc: "Incentivize your potential ambassadors the right way. Reward them with vouchers or cash, share premium content, and provide early access to exclusive deals." },
    ],
  },

  sections: [
    {
      label: "Why It Matters",
      heading: "Why's Customer Loyalty Measurement Crucial?",
      paragraphs: [
        "Loyal customers don't have prejudices but trust in your brand. Also, marketing endeavors are reduced. So, retention is easier than conversion.",
        "Customer loyalty measurement in India helps you identify your loyal customers and the reasons behind their repeat purchases.",
      ],
      bullets: [
        "Know what drives your customers to buy once again",
        "Learn the low and high points in their buying journey",
        "Capture their emotions and develop a strong bond with them",
      ],
      visual: <NpsBreakdown />,
    },
    {
      label: "Benefits",
      heading: "Benefits Of Customer Loyalty Assessment",
      paragraphs: [
        "A loyal audience promotes your brand through word of mouth and brings referrals. Their recommendations on social media work like a charm.",
        "They are more likely to buy your new products and adapt to the price increase. A loyal audience shows a strong trust in your brand.",
      ],
      bullets: [
        "Reduce your marketing efforts and budget by knowing your fans",
        "Increase your brand value in the market and among peers",
        "Referrals and word of mouth that compound over time",
      ],
      visual: <RetentionCurve />,
    },
  ],

  methods: {
    label: "Use Customer Loyalty Analysis Right",
    heading: <>Perform This Three-Step Process After You Know Who Your Loyal Customers Are</>,
    description: "Engage, incentivize and seek — the sequence that turns loyal users into advocates.",
    items: [
      { num: "01", title: "Engage",     desc: "Because users like attention. Personalize your communication on all channels. Engage your users the way they'd appreciate." },
      { num: "02", title: "Incentivize", desc: "Because users deserve rewards. Reward your loyal users. Share gift cards, premium club access, and early entry to sales and fests." },
      { num: "03", title: "Seek",       desc: "Because users can influence. Ask them to refer your brand to their circles. Seek reviews and social media support for growth." },
    ],
  },
};

export default function CustomerLoyaltyContent() {
  return <EnterprisePageLayout content={content} />;
}
