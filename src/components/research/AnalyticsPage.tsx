"use client";

import {
  Brush, Sigma, LayoutDashboard, LineChart,
  Users, ShieldCheck, AlignLeft, Layers, PieChart, Gauge, Clock, DollarSign,
  Table2, TrendingUp, FlaskConical, Percent,
  BellRing, FileSpreadsheet, Target, Search,
  Flame, BarChart3, Activity, Image as ImageIcon,
} from "lucide-react";
import ResearchDeepLayout, { type ResearchDeepContent } from "./ResearchDeepLayout";
import { AnalyticsDashboard, AnalyticsPipeline } from "./visuals/AnalyticsVisuals";

const content: ResearchDeepContent = {
  hero: {
    breadcrumb: [
      { name: "Research Services", href: "/solutions/research-services" },
      { name: "Reporting & Analytics" },
    ],
    badge: "Analytics & Reporting",
    heading: <>Analytics and Reporting</>,
    description:
      "From opinions to decisions with clarity. Data cleansing, statistics, dashboards and visualisation — turning the data you collect into the numbers your stakeholders act on.",
    primaryCta: { label: "Talk to Our Team", href: "#enquiry" },
    secondaryCta: { label: "See What We Do", href: "#methods" },
  },

  methods: {
    label: "Numbers That Lead to Strategies",
    heading: (
      <>
        From Raw Responses
        <br />
        to Reports That Decide Things
      </>
    ),
    description:
      "Learn your audience's opinions in depth through complex and elaborate methods like focus group interviews, diary studies, and online surveys with open-ended questions.",
    subheading: "Four Stages of Analysis",
    paragraphs: [
      "Collect data, cleanse it for clarity and meaningful values, create visualisations, and make faster decisions — handled end to end by research consultants and data specialists in one team.",
      "Change filters in the reports and dashboards to synthesise data from various facets and analyse from diverse perspectives.",
    ],
    items: [
      {
        icon: Brush,
        label: "Data Cleansing",
        desc: "Filter illegible, irrelevant and inconsistent records, then extract meaningful numbers",
      },
      {
        icon: Sigma,
        label: "Statistics",
        desc: "Tabulate data and mine the stats on the fly for quick, crisp insights",
      },
      {
        icon: LayoutDashboard,
        label: "Dashboards",
        desc: "Crucial metrics on one screen, pulling real-time data for comparison",
      },
      {
        icon: LineChart,
        label: "Visualisation",
        desc: "Heat maps, charts and graphs that make complex data easy to infer",
      },
    ],
    radarLabel: "What You Get Back",
    visual: <AnalyticsDashboard />,
    radarDims: [
      { label: "Cleansing", value: 0.94, angle: -90 },
      { label: "Statistics", value: 0.9, angle: -30 },
      { label: "Dashboards", value: 0.88, angle: 30 },
      { label: "Visualisation", value: 0.92, angle: 90 },
      { label: "Text Analysis", value: 0.8, angle: 150 },
      { label: "Data Security", value: 0.95, angle: -150 },
    ],
  },

  moreThanNumbers: {
    heading: (
      <>
        The Tech Stack Behind
        <br />
        Your Reports
      </>
    ),
    paragraphs: [
      "Your project runs on the tools your team already trusts — from survey scripting through processing to the dashboard your stakeholders open on a Monday morning.",
      "Fifteen years of running analytics for clients across thirty markets, with consultants who have seen the failure modes before you hit them.",
    ],
    // The pipeline graphic beside this already names the tools, so these say
    // what the stack buys you rather than repeating it.
    bullets: [
      "Work in the tools you already license — no forced migration",
      "Crosstabs at the lowest dimension, across every demographic you collected",
      "Open-ended text, voice inputs, slang and emoticons all analysed",
      "Regional and global data regulations handled as part of the process",
    ],
    visual: <AnalyticsPipeline />,
    cards: [
      { eyebrow: "Years of Expertise", title: "15+", sub: "running analytics projects" },
      { eyebrow: "Markets Covered", title: "30+", sub: "across our client base" },
      { eyebrow: "Active Panellists", title: "4.7M", sub: "feeding the datasets" },
    ],
  },

  advantages: {
    label: "Benefits",
    heading: (
      <>
        Benefits of Track Opinion&apos;s
        <br />
        Analytics and Reporting
      </>
    ),
    description:
      "Track Opinion's reporting and analytics service in India and the global market has manifold benefits.",
    cards: [
      {
        icon: Users,
        title: "Expertise",
        paragraphs: [
          "Get expert research consultants and data specialists to handle your project and data analysis.",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Data Security",
        paragraphs: [
          "With our data analysis services, never worry about regional or global data regulatory policies.",
        ],
      },
      {
        icon: AlignLeft,
        title: "Text Analysis",
        paragraphs: [
          "Analyse long texts from open-ended questions and voice inputs, including slang and emoticons.",
        ],
      },
      {
        icon: Layers,
        title: "Insight Management",
        paragraphs: [
          "Change filters in the reports and dashboards to synthesise data from various facets and analyse from diverse perspectives.",
        ],
      },
      {
        icon: PieChart,
        title: "Crosstab Analysis",
        paragraphs: [
          "Plot data into tabular format at the lowest dimensions to understand the inputs across all demographics.",
        ],
      },
      {
        icon: Gauge,
        title: "Full-Service",
        paragraphs: [
          "Collect data, cleanse it for clarity and meaningful values, create visualisations, and make faster decisions.",
        ],
      },
      {
        icon: Clock,
        title: "Quick Turnaround",
        paragraphs: [
          "Save time to arrive at better business plans with skilled consultants and easy reporting and distribution.",
        ],
      },
      {
        icon: DollarSign,
        title: "Competitive Pricing",
        paragraphs: [
          "Use budget-friendly solutions with the guidance of highly skilled research consultants and data experts in one team.",
        ],
      },
    ],
  },

  benefits: {
    label: "Why It Matters",
    heading: (
      <>
        Why Analytics Decides
        <br />
        What Your Research Was Worth
      </>
    ),
    paragraphs: [
      "Data you cannot read is data you cannot act on. Cleansing, statistics and visualisation are what turn a completed fieldwork exercise into a decision your stakeholders can defend.",
      "Collect data from panel members via surveys, focus groups and CATI — then get it back as reports, dashboards and crosstabs built for the people who have to choose.",
    ],
    ctaLabel: "Talk to Our Team →",
    ctaHref: "#enquiry",
    centerLabel: "Analytics",
    orbitNodes: [
      {
        label: ["Collection"],
        angle: -90,
        icons: ["M3 3v18h18", "M18 17V9", "M13 17V5", "M8 17v-3"],
      },
      {
        label: ["Cleansing"],
        angle: 195,
        icons: ["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
      },
      {
        label: ["Statistics"],
        angle: -20,
        icons: ["M18 20V10", "M12 20V4", "M6 20v-6"],
      },
      {
        label: ["Dashboards"],
        angle: 122,
        icons: ["M3 3h7v9H3z", "M14 3h7v5h-7z", "M14 12h7v9h-7z", "M3 16h7v5H3z"],
      },
      {
        label: ["Decisions"],
        angle: 50,
        icons: ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4L12 14.01l-3-3"],
      },
    ],
  },

  whyChoose: {
    label: "What You Get",
    heading: <>Every Output, Broken Down</>,
    description:
      "The specific deliverables behind each stage — from the statistics we run to the visuals your stakeholders read.",
    cards: [
      // Statistics
      { icon: Percent, title: "Descriptive Stats", desc: "Summarise and describe your data with mean, median, variance, and standard deviation for clear insights." },
      { icon: Target, title: "Inferential Stats", desc: "Draw conclusions from sample data and generalise findings to the broader population with confidence." },
      { icon: TrendingUp, title: "Regression Analysis", desc: "Identify relationships between variables and forecast future trends with predictive modelling." },
      { icon: FlaskConical, title: "Hypothesis Testing", desc: "Validate assumptions with statistical tests and confirm if your data results are significant." },
      // Dashboards
      { icon: LayoutDashboard, title: "Real-time Dashboards", desc: "Generate high-quality dashboards to represent crucial metrics on one screen for better comparison and analysis." },
      { icon: FileSpreadsheet, title: "Custom Reports", desc: "Pull real-time data for a comprehensive understanding and share them with your stakeholders seamlessly." },
      { icon: BellRing, title: "KPI Tracking", desc: "Monitor your key performance indicators at a glance with interactive, filterable dashboard panels." },
      { icon: Search, title: "Data Drill-down", desc: "Explore specific data points deeper within your dashboard for granular insights and better decisions." },
      // Visualisation
      { icon: Flame, title: "Heat Maps", desc: "Make complex data easy to infer with our data analysis services and heat maps highlighting patterns." },
      { icon: BarChart3, title: "Charts & Graphs", desc: "Present sophisticated numbers through beautifully designed charts, graphs, and visual reports." },
      { icon: Activity, title: "Trend Analysis", desc: "Highlight patterns, trends, anomalies, and outliers across your datasets with visual storytelling." },
      { icon: ImageIcon, title: "Infographics", desc: "Convert raw data into visually engaging infographics your stakeholders can understand at a glance." },
      // Cleansing
      { icon: Table2, title: "Crosstab Reports", desc: "Examine data across multiple demographics to discover correlations and drill down to finer details." },
    ],
  },

  projectManagement: {
    label: "Lifecycle of an Analytics Project",
    heading: <>From Raw Data to Helpful Ideas</>,
    description:
      "Six stages take your fieldwork from collected responses through to the reports your stakeholders make decisions on.",
    steps: [
      { num: 1, label: "Data Collection", title: "Gather the responses.", quote: '"Surveys, focus groups, CATI"', desc: "Collect data from panel members via surveys, focus group meetings, and CATI." },
      { num: 2, label: "Data Cleansing", title: "Strip out the noise.", quote: '"Illegible, irrelevant, inconsistent"', desc: "Filter illegible, irrelevant, inconsistent, and incorrect data. Extract meaningful numbers." },
      { num: 3, label: "KPIs and Stats", title: "Derive the measures.", quote: '"Indicators and supporting values"', desc: "Derive key performance indicators, supporting statistical values, and other useful fields." },
      { num: 4, label: "Insights", title: "Find what it means.", quote: '"For analysis and decision-making"', desc: "Generate insights from the data sources for analysis and decision-making." },
      { num: 5, label: "Presentation", title: "Make it readable.", quote: '"Patterns in colour and format"', desc: "Visually display data and their correlations, depicting patterns with colors and formatting." },
      { num: 6, label: "Decision", title: "Hand it to the room.", quote: '"Reports, dashboards, crosstabs"', desc: "Distribute reports, dashboards, and crosstabs with stakeholders for making decisions." },
    ],
  },
};

export default function AnalyticsPage() {
  return <ResearchDeepLayout content={content} />;
}
