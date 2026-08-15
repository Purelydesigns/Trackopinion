/**
 * Single source of truth for the site's static routes.
 *
 * Consumed by the HTML sitemap page (/sitemap) and by app/sitemap.ts
 * (/sitemap.xml) so the two can never drift apart.
 */

export interface SiteLink {
  label: string;
  href: string;
  /** Shown under the link on the HTML sitemap */
  desc?: string;
  changeFrequency?: "weekly" | "monthly" | "yearly";
  priority?: number;
}

export interface SiteGroup {
  title: string;
  links: SiteLink[];
}

export const siteGroups: SiteGroup[] = [
  {
    title: "Company",
    links: [
      { label: "Home",       href: "/",           desc: "Global market research and online panel",     changeFrequency: "weekly",  priority: 1.0 },
      { label: "About Us",   href: "/about",      desc: "Who we are and how we work",                  changeFrequency: "monthly", priority: 0.8 },
      { label: "Contact Us", href: "/contact-us", desc: "Talk to our research team",                   changeFrequency: "monthly", priority: 0.6 },
      { label: "Careers",    href: "/career",     desc: "Open roles and our hiring process",           changeFrequency: "weekly",  priority: 0.6 },
    ],
  },
  {
    title: "Global Panel",
    links: [
      { label: "Global Panel Overview", href: "/solutions/global-panel",     desc: "Choose between our B2C and B2B panels", changeFrequency: "monthly", priority: 0.9 },
      { label: "B2C Panel",             href: "/solutions/global-panel/b2c", desc: "50M+ profiled consumers across 10 markets", changeFrequency: "monthly", priority: 0.8 },
      { label: "B2B Panel",             href: "/solutions/global-panel/b2b", desc: "785,500 validated professionals worldwide",  changeFrequency: "monthly", priority: 0.8 },
    ],
  },
  {
    title: "Research Services",
    links: [
      { label: "Qualitative Research",  href: "/solutions/research-services/qualitative",        desc: "Focus groups, IDIs and diary studies",       changeFrequency: "monthly", priority: 0.8 },
      { label: "Quantitative Research", href: "/solutions/research-services/quantitative",       desc: "Online surveys and CATI at scale",           changeFrequency: "monthly", priority: 0.8 },
      { label: "Survey Programming",    href: "/solutions/research-services/survey-programming", desc: "Scrip8 — design, distribute and report",     changeFrequency: "monthly", priority: 0.8 },
      { label: "Reporting & Analytics", href: "/solutions/research-services/analytics",           desc: "Data cleansing, statistics and dashboards",  changeFrequency: "monthly", priority: 0.7 },
    ],
  },
  {
    title: "Enterprise Solutions",
    links: [
      { label: "Product Concept & Ad Testing",             href: "/solutions/enterprise-solution/product-concept-and-ad-testing",             desc: "Validate ideas and creative before launch",   changeFrequency: "monthly", priority: 0.8 },
      { label: "Customer Loyalty Measurement",             href: "/solutions/enterprise-solution/customer-loyalty-measurement",               desc: "NPS, CSAT and retention research",            changeFrequency: "monthly", priority: 0.8 },
      { label: "Brand Image Study",                        href: "/solutions/enterprise-solution/brand-image-study",                          desc: "Track brand health across waves",             changeFrequency: "monthly", priority: 0.8 },
      { label: "Competitive Intelligence & Market Mapping", href: "/solutions/enterprise-solution/competitive-intelligence-and-market-mapping", desc: "Map rivals, segments and white space",        changeFrequency: "monthly", priority: 0.8 },
      { label: "New Market Entry Research",                href: "/solutions/enterprise-solution/new-market-entry-research",                   desc: "Demand, pricing and barriers before you enter", changeFrequency: "monthly", priority: 0.8 },
      { label: "Usage & Attitude Studies",                 href: "/solutions/enterprise-solution/usage-and-attitude-studies",                  desc: "Behaviour, occasions and choice drivers",     changeFrequency: "monthly", priority: 0.8 },
    ],
  },
  {
    title: "Specialised Solutions",
    links: [
      { label: "CATI Solutions",  href: "/solutions/cati-solutions",  desc: "Telephone interviewing in 50+ languages",     changeFrequency: "monthly", priority: 0.8 },
      { label: "Healthcare",      href: "/solutions/healthcare",      desc: "HCPs, patients and pharma across 30+ markets", changeFrequency: "monthly", priority: 0.8 },
      { label: "Scrip8",          href: "/solutions/scrip8",          desc: "Our in-house survey programming platform",     changeFrequency: "monthly", priority: 0.7 },
      { label: "Expert Network",  href: "/solutions/expert-network",  desc: "Reach vetted industry specialists",            changeFrequency: "monthly", priority: 0.7 },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog",             href: "/resources",        desc: "Articles on research and consumer insight", changeFrequency: "weekly", priority: 0.7 },
      { label: "Case Studies",     href: "/case-studies",     desc: "Research that moved the needle",            changeFrequency: "weekly", priority: 0.7 },
      { label: "Featured Updates", href: "/featured-updates", desc: "Company news and announcements",            changeFrequency: "weekly", priority: 0.6 },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms",   desc: "Your rights and responsibilities", changeFrequency: "yearly", priority: 0.3 },
      { label: "Privacy Policy",   href: "/privacy", desc: "How we handle your data",          changeFrequency: "yearly", priority: 0.3 },
      { label: "Sitemap",          href: "/sitemap", desc: "Every page on this website",       changeFrequency: "monthly", priority: 0.3 },
    ],
  },
];

/** Flat list of every route, for the XML sitemap. */
export const allSiteLinks: SiteLink[] = siteGroups.flatMap((g) => g.links);
