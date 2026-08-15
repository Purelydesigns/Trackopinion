"use client";

import { TrendingUp, Flag, Eye, Building2, Megaphone, Target } from "lucide-react";
import EnterprisePageLayout, { type EnterpriseContent } from "./EnterprisePageLayout";
import { BrandFunnel, PerceptionMap } from "./visuals/BrandVisuals";

const content: EnterpriseContent = {
  hero: {
    breadcrumb: [{ name: "Enterprise Solution" }, { name: "Brand Image Study" }],
    badge: "Brand Tracker Study",
    heading: <>Brand Image Study</>,
    description:
      "Mirror your mission, vision, and values in your brand's market image. Know how users, peers, vendors and employees really see you.",
    primaryCta: { label: "Start a Research Project", href: "/contact-us" },
    secondaryCta: { label: "See Capabilities", href: "#capabilities" },
  },

  capabilities: {
    label: "Brand Tracker Study",
    heading: <>Numbers That Solidify And Improve Your Brand Image</>,
    description:
      "Know your brand's image in the eyes of users, peers, vendors, and employees. To get it right, employ a good brand tracker study service in India.",
    items: [
      { icon: TrendingUp, title: "Brand Performance",  desc: "Know your brand's strengths and weaknesses from the audience's lens. Capitalize on positives and course-correct to weed out negatives. Position yourself in the market differently to build a solid image." },
      { icon: Flag,       title: "Create Benchmarks",  desc: "Create a footing in the industry using valuable insights from a brand tracker study. Know what differentiates you from peers and your relative position among them. Establish benchmarks." },
      { icon: Eye,        title: "User Perception",    desc: "Learn how users perceive your brand. Improve and amend your public brand persona to reflect your true vision, mission statement, and values. Bank on the insights to know what you're doing correctly." },
      { icon: Building2,  title: "Employer Branding",  desc: "Know your image as an employer with the help of a brand tracker study company. Work on the insights and impress employees, prospective job seekers, and recruitment partners." },
      { icon: Megaphone,  title: "Marketing Strategies", desc: "A brand image study helps tweak your brand messaging to resonate better with your users. This way, you can attract the right audience by canceling the noise of bogus and unconvertible leads." },
      { icon: Target,     title: "Competitor Comparison", desc: "Assess how users and the industry compare you with your peers and place you among the rivals — so you know exactly where you stand in the category." },
    ],
  },

  sections: [
    {
      label: "The Basics",
      heading: "What Is A Brand Tracker Study?",
      paragraphs: [
        "A brand tracker or image study helps you evaluate and understand your image among the target users, markets, and peers. It also reveals how your employees, job candidates, media channels, and partners perceive you as a company. Even people unrelated to your brand.",
        "You can learn why these entities like, dislike, prefer, or refer to your company as a whole — not any single product.",
      ],
      bullets: [
        "Perception among users, peers, partners and the media",
        "Employer image among employees and job candidates",
        "Company-level view, not a single product read",
      ],
      visual: <BrandFunnel />,
    },
    {
      label: "Why It Matters",
      heading: "Why Your Brand Image Matters",
      paragraphs: [
        "Having a great, affordable product with a good lifespan isn't sufficient anymore. Brands have cut-throat competition. Users aren't only smart and choosy, but they also judge you on several social parameters — CSR, inclusivity, and eco-friendliness.",
        "Your positive image and right communication matter in the age of social media and cancel culture. You must follow your vision, mission, and values to the core.",
      ],
      bullets: [
        "Judged on CSR, inclusivity and eco-friendliness, not just product",
        "Communication matters in the age of social media",
        "That's where a brand tracker study company benefits you",
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
  return <EnterprisePageLayout content={content} />;
}
