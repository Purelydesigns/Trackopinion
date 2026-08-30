import type { HubGroup } from "@/components/solutions/SolutionsHub";

/**
 * The solution catalogue, in one place.
 *
 * Consumed by the three hub pages. Descriptions are lifted from the existing
 * mega-menu and sitemap entries so the wording stays consistent with the rest
 * of the site.
 */

export const globalPanelGroup: HubGroup = {
  title: "Global Panel",
  intro: "Reach profiled respondents across 50+ countries.",
  entries: [
    {
      label: "Global Panel Overview",
      href: "/solutions/global-panel",
      desc: "Choose between our B2C and B2B panels.",
    },
    {
      label: "B2C Panel",
      href: "/solutions/global-panel/b2c",
      desc: "50M+ profiled consumers across 10 markets.",
    },
    {
      label: "B2B Panel",
      href: "/solutions/global-panel/b2b",
      desc: "785,500 validated professionals worldwide.",
    },
  ],
};

export const researchServicesGroup: HubGroup = {
  title: "Research Services",
  intro: "Full-service qualitative and quantitative research, end to end.",
  entries: [
    {
      label: "Qualitative Research",
      href: "/solutions/research-services/qualitative",
      desc: "Focus groups, IDIs and diary studies.",
    },
    {
      label: "Quantitative Research",
      href: "/solutions/research-services/quantitative",
      desc: "Online surveys and CATI at scale.",
    },
    {
      label: "Survey Programming",
      href: "/solutions/research-services/survey-programming",
      desc: "Design, distribute and report with Scrip8.",
    },
    {
      label: "Translation",
      href: "/solutions/research-services/translation",
      desc: "Survey and questionnaire translation across 25 countries.",
    },
    {
      label: "Reporting & Analytics",
      href: "/solutions/research-services/analytics",
      desc: "Data cleansing, statistics and dashboards.",
    },
  ],
};

export const enterpriseGroup: HubGroup = {
  title: "Enterprise Solutions",
  intro: "Strategic insight programmes for large-scale businesses.",
  entries: [
    {
      label: "Product Concept & Ad Testing",
      href: "/solutions/enterprise-solution/product-concept-and-ad-testing",
      desc: "Validate ideas and creative before launch.",
    },
    {
      label: "Customer Loyalty Measurement",
      href: "/solutions/enterprise-solution/customer-loyalty-measurement",
      desc: "NPS, CSAT and retention research.",
    },
    {
      label: "Brand Image Study",
      href: "/solutions/enterprise-solution/brand-image-study",
      desc: "Track brand health across waves.",
    },
    {
      label: "Competitive Intelligence & Market Mapping",
      href: "/solutions/enterprise-solution/competitive-intelligence-and-market-mapping",
      desc: "Map rivals, segments and white space.",
    },
    {
      label: "New Market Entry Research",
      href: "/solutions/enterprise-solution/new-market-entry-research",
      desc: "Demand, pricing and barriers before you enter.",
    },
    {
      label: "Usage & Attitude Studies",
      href: "/solutions/enterprise-solution/usage-and-attitude-studies",
      desc: "Behaviour, occasions and choice drivers.",
    },
  ],
};

export const specialisedGroup: HubGroup = {
  title: "Specialised Solutions",
  intro: "Capabilities built for particular audiences and methods.",
  entries: [
    {
      label: "CATI Solutions",
      href: "/solutions/cati-solutions",
      desc: "Telephone interviewing in 50+ languages.",
    },
    {
      label: "Healthcare Research",
      href: "/solutions/healthcare",
      desc: "HCPs, patients and pharma across 30+ markets.",
    },
    {
      label: "Expert Network",
      href: "/solutions/expert-network",
      desc: "Reach vetted industry specialists.",
    },
    {
      label: "Scrip8",
      href: "/solutions/scrip8",
      desc: "Our in-house survey programming platform.",
    },
  ],
};

export const allSolutionGroups: HubGroup[] = [
  globalPanelGroup,
  researchServicesGroup,
  enterpriseGroup,
  specialisedGroup,
];
