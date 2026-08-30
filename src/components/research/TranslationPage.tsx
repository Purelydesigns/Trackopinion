"use client";

import {
  Languages, FileText, Globe2, Users,
  ShieldCheck, Clock, Gauge, Lightbulb,
  ClipboardCheck, ScrollText, UserCheck, Landmark, Repeat2,
} from "lucide-react";
import ResearchDeepLayout, { type ResearchDeepContent } from "./ResearchDeepLayout";
import { faqs } from "./faqs/translation";

const content: ResearchDeepContent = {
  hero: {
    breadcrumb: [
      { name: "Research Services", href: "/solutions/research-services" },
      { name: "Translation" },
    ],
    badge: "Translation · 25 Countries",
    heading: <>Translation Services in Market Research</>,
    description:
      "Translate your message to connect better. Don't let your ideas and research suffer due to language barriers — seek translation services in market research to bridge the gap of words.",
    primaryCta: { label: "Talk to Our Team", href: "#enquiry" },
    secondaryCta: { label: "How It Works", href: "#methods" },
  },

  methods: {
    label: "Market Research Translation",
    heading: (
      <>
        Words That Stretch Your Reach
        <br />
        Outside Your Comfort Zone
      </>
    ),
    description:
      "Don't let your ideas and research suffer due to language barriers. Seek translation services in market research to bridge the gap of words.",
    subheading: "What Translation Covers",
    paragraphs: [
      "Sometimes, your market research project needs to go beyond regional audiences for diverse reach. And what if you don't know the language in your target territory?",
      "Translation services in market research assist you with multilingual support while creating surveys, writing questions, and interacting with the local authorities and people — and even convert the responses into your preferred language.",
    ],
    items: [
      {
        icon: Languages,
        label: "Multilingual Support",
        desc: "Quantitative and qualitative research free of distorted or missing responses",
      },
      {
        icon: FileText,
        label: "Survey Translation",
        desc: "Surveys and questionnaires rendered into the target market's language",
      },
      {
        icon: Globe2,
        label: "Cultural Appropriateness",
        desc: "Research that respects the audience's norms and stays relevant",
      },
      {
        icon: Users,
        label: "Local Connect",
        desc: "Native speakers in regions where English is not the language of business",
      },
    ],
    radarLabel: "Translation Coverage",
    radarDims: [
      { label: "Multilingual", value: 0.92, angle: -90 },
      { label: "Survey Copy", value: 0.88, angle: -30 },
      { label: "Cultural Fit", value: 0.84, angle: 30 },
      { label: "Local Connect", value: 0.9, angle: 90 },
      { label: "Confidentiality", value: 0.94, angle: 150 },
      { label: "Timeliness", value: 0.86, angle: -150 },
    ],
  },

  advantages: {
    label: "Benefits of Our Survey Translation Services",
    heading: (
      <>
        Translation Service in India
        <br />
        and 25 Other Countries
      </>
    ),
    description: "Here's what you gain when translation is handled as part of the research, not after it.",
    cards: [
      {
        icon: Gauge,
        title: "Data Quality",
        paragraphs: [
          "Whether qualitative or quantitative, your market research provides only good-quality data.",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Data Confidentiality",
        paragraphs: [
          "We adhere to regional and global data regulatory policies to safeguard your sensitive data.",
        ],
      },
      {
        icon: Clock,
        title: "Timeliness",
        paragraphs: [
          "Meet the designated project timelines, even if it involves the translation of voluminous data.",
        ],
      },
      {
        icon: Lightbulb,
        title: "Niche Insights",
        paragraphs: [
          "We don't translate only words. We translate ideas, emotions, and local consumers' thoughts.",
        ],
      },
    ],
  },

  benefits: {
    label: "Why It Matters",
    heading: (
      <>
        Why Is Market Research
        <br />
        Translation Crucial?
      </>
    ),
    paragraphs: [
      "Track Opinion's market research translation can rescue you from illegible data collection because of language barriers. We articulate your research topics in your desired language.",
      "Leave all the worries of running a survey for a global audience or in niche regions, and least explored industries or areas. Cover wide geography in 25 countries with our translation services in market research.",
    ],
    ctaLabel: "Talk to Our Team →",
    ctaHref: "#enquiry",
    centerLabel: "Translation",
    orbitNodes: [
      {
        label: ["Surveys"],
        angle: -90,
        icons: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
      },
      {
        label: ["Native", "Speakers"],
        angle: 195,
        icons: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
      },
      {
        label: ["Culture"],
        angle: -20,
        icons: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M2 12h20", "M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z"],
      },
      {
        label: ["Compliance"],
        angle: 122,
        icons: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
      },
      {
        label: ["Responses"],
        angle: 50,
        icons: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
      },
    ],
  },

  whyChoose: {
    label: "How Track Opinion Can Help",
    heading: <>Everything We Translate, End to End</>,
    description:
      "Partner with local research data providers and native speakers to enhance your market research linguistic capabilities with our help.",
    cards: [
      {
        icon: FileText,
        title: "Survey Forms",
        desc: "Translate all your surveys and questionnaires into the target market's language. Field surveys in unfamiliar territories are a breeze with our survey translation services.",
      },
      {
        icon: ScrollText,
        title: "Guidelines & Consent",
        desc: "Discussion guides, screener instructions and consent letters translated alongside the questionnaire, so respondents understand exactly what they are agreeing to.",
      },
      {
        icon: UserCheck,
        title: "Native Speakers",
        desc: "Connect with native speakers in remote areas or regions where English is not the communication language, without losing the touch of local flavors and authenticity.",
      },
      {
        icon: Landmark,
        title: "Cultural Review",
        desc: "We seek help from cultural experts to align our research alongside the societal norms, so your study respects the audience's culture and remains relevant.",
      },
      {
        icon: ClipboardCheck,
        title: "Data Cleansing",
        desc: "Content is analyzed for junk data, filler words, repetition and irrelevant data before translation — the time a document takes depends on its quality, not just its length.",
      },
      {
        icon: Repeat2,
        title: "Response Translation",
        desc: "Collected responses converted back into your preferred language, so open-ended answers reach your team ready to analyze.",
      },
    ],
  },

  projectManagement: {
    label: "The Translation Process",
    heading: <>Five Steps From Source Document to Usable Data</>,
    description:
      "How a market research translation runs at Track Opinion — from the forms you send us to the data you analyze.",
    steps: [
      {
        num: 1,
        label: "Source Material",
        title: "Send us the documents.",
        quote: '"Forms, guidelines, consent letters"',
        desc: "We translate your survey forms, guidelines, consent letters and any other research material.",
      },
      {
        num: 2,
        label: "Content Analysis",
        title: "Strip out the noise.",
        quote: '"Junk data, filler words, repetition"',
        desc: "We go through the content and analyze it for junk data, filler words, repetition, and irrelevant data.",
      },
      {
        num: 3,
        label: "Local Specialists",
        title: "Bring in the region.",
        quote: '"A local market research specialist"',
        desc: "Our translation experts get in touch with a local market research and data specialist if needed.",
      },
      {
        num: 4,
        label: "Cultural Alignment",
        title: "Check it lands.",
        quote: '"Aligned to societal norms"',
        desc: "We seek help from cultural experts to align our research alongside the societal norms.",
      },
      {
        num: 5,
        label: "Translate & Return",
        title: "Deliver the data.",
        quote: '"Forms and collected data"',
        desc: "Then, we translate the forms and collected data — and run a quality assurance check that verifies the idea carried over, not just the words.",
      },
    ],
  },
};

export default function TranslationPage() {
  return <ResearchDeepLayout content={content} faqs={faqs} />;
}
