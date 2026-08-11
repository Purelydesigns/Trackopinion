/* ─────────────────────────────────────────────────────────────
   B2B panel data — transcribed from "B2B Panel Book 2026" (PDF)
   One entry per market page in the deck.
   ───────────────────────────────────────────────────────────── */

export interface Slice {
  label: string;
  pct: number;
}

export interface B2BMarket {
  id: string;
  label: string;
  code: string;
  /** Active panelists in this market */
  panelists: number;
  jobType: Slice[];       // Freelancer / Home-Based / Full time / Part time
  decisionMakers: { yes: number; no: number };
  workingClass: { blue: number; white: number };
  jobLevel: Slice[];      // Entry / Manager / Director / C-Level / Business Owners
  department: Slice[];
  industry: Slice[];
}

export const TOTAL_PANELISTS = 785500;

export const b2bMarkets: B2BMarket[] = [
  {
    id: "usa",
    label: "United States",
    code: "US",
    panelists: 60000,
    jobType: [
      { label: "Freelancer", pct: 10.66 },
      { label: "Home-Based", pct: 10.34 },
      { label: "Full time", pct: 64.55 },
      { label: "Part time", pct: 14.45 },
    ],
    decisionMakers: { yes: 68.10, no: 31.90 },
    workingClass: { blue: 8.48, white: 91.52 },
    jobLevel: [
      { label: "Entry Level", pct: 31.90 },
      { label: "Manager", pct: 38.97 },
      { label: "Director", pct: 11.93 },
      { label: "C-Level", pct: 6.95 },
      { label: "Business Owners", pct: 10.25 },
    ],
    department: [
      { label: "Others", pct: 20.28 },
      { label: "Administration", pct: 22.61 },
      { label: "Customer Support", pct: 15.14 },
      { label: "Finance", pct: 10.54 },
      { label: "Supply Chain/Procurement", pct: 10.30 },
      { label: "IT", pct: 7.57 },
      { label: "Human Resource", pct: 5.92 },
      { label: "Sales", pct: 5.06 },
      { label: "Marketing", pct: 2.58 },
    ],
    industry: [
      { label: "Wholesale/Retail", pct: 7.65 },
      { label: "Social Work", pct: 1.79 },
      { label: "Education", pct: 10.00 },
      { label: "Manufacturing", pct: 4.00 },
      { label: "IT", pct: 9.14 },
      { label: "BFI", pct: 17.14 },
      { label: "Construction", pct: 9.50 },
      { label: "Federal", pct: 2.65 },
      { label: "Hospitality", pct: 2.78 },
      { label: "Automotive", pct: 4.25 },
      { label: "Aviation", pct: 0.91 },
      { label: "Tele-communication", pct: 1.35 },
      { label: "Agriculture", pct: 3.37 },
      { label: "Healthcare/Pharmaceutical", pct: 14.43 },
      { label: "Energy", pct: 0.88 },
      { label: "Others", pct: 10.15 },
    ],
  },
  {
    id: "canada",
    label: "Canada",
    code: "CA",
    panelists: 25000,
    jobType: [
      { label: "Freelancer", pct: 10.41 },
      { label: "Home-Based", pct: 6.64 },
      { label: "Full time", pct: 63.38 },
      { label: "Part time", pct: 19.57 },
    ],
    decisionMakers: { yes: 49.98, no: 50.02 },
    workingClass: { blue: 5.47, white: 94.53 },
    jobLevel: [
      { label: "Entry Level", pct: 50.02 },
      { label: "Manager", pct: 25.30 },
      { label: "Director", pct: 16.76 },
      { label: "C-Level", pct: 2.18 },
      { label: "Business Owners", pct: 5.75 },
    ],
    department: [
      { label: "Others", pct: 24.09 },
      { label: "Administration", pct: 20.09 },
      { label: "Customer Support", pct: 15.70 },
      { label: "Supply Chain/Procurement", pct: 9.47 },
      { label: "Finance", pct: 8.52 },
      { label: "Human Resource", pct: 8.52 },
      { label: "Marketing", pct: 5.47 },
      { label: "Sales", pct: 5.21 },
      { label: "IT", pct: 2.92 },
    ],
    industry: [
      { label: "Wholesale/Retail", pct: 10.03 },
      { label: "Social Work", pct: 3.00 },
      { label: "Education", pct: 12.56 },
      { label: "Manufacturing", pct: 5.25 },
      { label: "IT", pct: 4.22 },
      { label: "BFI", pct: 8.94 },
      { label: "Construction", pct: 6.37 },
      { label: "Federal", pct: 7.22 },
      { label: "Hospitality", pct: 3.56 },
      { label: "Automotive", pct: 3.47 },
      { label: "Aviation", pct: 0.47 },
      { label: "Tele-communication", pct: 1.31 },
      { label: "Agriculture", pct: 1.97 },
      { label: "Healthcare/Pharmaceutical", pct: 16.21 },
      { label: "Energy", pct: 2.62 },
      { label: "Others", pct: 14.81 },
    ],
  },
  {
    id: "mexico",
    label: "Mexico",
    code: "MX",
    panelists: 19000,
    jobType: [
      { label: "Freelancer", pct: 18.22 },
      { label: "Home-Based", pct: 17.87 },
      { label: "Full time", pct: 47.00 },
      { label: "Part time", pct: 16.91 },
    ],
    decisionMakers: { yes: 67.27, no: 32.73 },
    workingClass: { blue: 6.25, white: 93.75 },
    jobLevel: [
      { label: "Entry Level", pct: 32.73 },
      { label: "Manager", pct: 25.21 },
      { label: "Director", pct: 36.67 },
      { label: "C-Level", pct: 2.02 },
      { label: "Business Owners", pct: 3.37 },
    ],
    department: [
      { label: "Others", pct: 24.30 },
      { label: "Administration", pct: 14.67 },
      { label: "Customer Support", pct: 13.78 },
      { label: "Marketing", pct: 11.85 },
      { label: "Human Resource", pct: 10.96 },
      { label: "Finance", pct: 10.84 },
      { label: "Supply Chain/Procurement", pct: 8.15 },
      { label: "Sales", pct: 3.81 },
      { label: "IT", pct: 1.64 },
    ],
    industry: [
      { label: "Wholesale/Retail", pct: 3.61 },
      { label: "Social Work", pct: 0.38 },
      { label: "Education", pct: 9.74 },
      { label: "Manufacturing", pct: 4.90 },
      { label: "IT", pct: 3.52 },
      { label: "BFI", pct: 6.37 },
      { label: "Construction", pct: 8.03 },
      { label: "Federal", pct: 4.52 },
      { label: "Hospitality", pct: 3.33 },
      { label: "Automotive", pct: 9.65 },
      { label: "Aviation", pct: 2.09 },
      { label: "Tele-communication", pct: 1.81 },
      { label: "Agriculture", pct: 13.93 },
      { label: "Healthcare/Pharmaceutical", pct: 7.75 },
      { label: "Energy", pct: 1.43 },
      { label: "Others", pct: 18.96 },
    ],
  },
  {
    id: "uk",
    label: "UK",
    code: "GB",
    panelists: 45000,
    jobType: [
      { label: "Freelancer", pct: 6.65 },
      { label: "Home-Based", pct: 5.69 },
      { label: "Full time", pct: 63.21 },
      { label: "Part time", pct: 24.45 },
    ],
    decisionMakers: { yes: 52.62, no: 47.38 },
    workingClass: { blue: 3.04, white: 96.96 },
    jobLevel: [
      { label: "Entry Level", pct: 47.38 },
      { label: "Manager", pct: 25.59 },
      { label: "Director", pct: 18.23 },
      { label: "C-Level", pct: 2.76 },
      { label: "Business Owners", pct: 6.03 },
    ],
    department: [
      { label: "Others", pct: 26.04 },
      { label: "Administration", pct: 23.00 },
      { label: "Customer Support", pct: 11.94 },
      { label: "Finance", pct: 10.00 },
      { label: "Supply Chain/Procurement", pct: 7.83 },
      { label: "Human Resource", pct: 7.41 },
      { label: "Marketing", pct: 5.42 },
      { label: "Sales", pct: 4.67 },
      { label: "IT", pct: 3.67 },
    ],
    industry: [
      { label: "Wholesale/Retail", pct: 8.51 },
      { label: "Social Work", pct: 1.85 },
      { label: "Education", pct: 14.90 },
      { label: "Manufacturing", pct: 4.03 },
      { label: "IT", pct: 6.74 },
      { label: "BFI", pct: 10.92 },
      { label: "Construction", pct: 5.58 },
      { label: "Federal", pct: 5.61 },
      { label: "Hospitality", pct: 4.96 },
      { label: "Automotive", pct: 4.01 },
      { label: "Aviation", pct: 1.00 },
      { label: "Tele-communication", pct: 1.18 },
      { label: "Agriculture", pct: 2.25 },
      { label: "Healthcare/Pharmaceutical", pct: 17.38 },
      { label: "Energy", pct: 1.00 },
      { label: "Others", pct: 10.09 },
    ],
  },
  {
    id: "uae",
    label: "UAE",
    code: "AE",
    panelists: 15000,
    jobType: [
      { label: "Freelancer", pct: 5.23 },
      { label: "Home-Based", pct: 9.38 },
      { label: "Full time", pct: 75.11 },
      { label: "Part time", pct: 10.28 },
    ],
    decisionMakers: { yes: 52.57, no: 47.43 },
    workingClass: { blue: 11.26, white: 88.74 },
    jobLevel: [
      { label: "Entry Level", pct: 47.38 },
      { label: "Manager", pct: 28.24 },
      { label: "Director", pct: 25.94 },
      { label: "C-Level", pct: 5.34 },
      { label: "Business Owners", pct: 6.72 },
    ],
    department: [
      { label: "Others", pct: 22.01 },
      { label: "Finance", pct: 13.04 },
      { label: "Sales", pct: 11.16 },
      { label: "Marketing", pct: 10.78 },
      { label: "IT", pct: 10.28 },
      { label: "Administration", pct: 9.34 },
      { label: "Human Resource", pct: 8.12 },
      { label: "Customer Support", pct: 8.02 },
      { label: "Supply Chain/Procurement", pct: 7.25 },
    ],
    industry: [
      { label: "Wholesale/Retail", pct: 11.37 },
      { label: "Social Work", pct: 1.28 },
      { label: "Education", pct: 5.67 },
      { label: "Manufacturing", pct: 10.82 },
      { label: "IT", pct: 8.60 },
      { label: "BFI", pct: 6.24 },
      { label: "Construction", pct: 9.68 },
      { label: "Federal", pct: 3.22 },
      { label: "Hospitality", pct: 8.46 },
      { label: "Automotive", pct: 3.04 },
      { label: "Aviation", pct: 2.13 },
      { label: "Tele-communication", pct: 3.89 },
      { label: "Agriculture", pct: 2.26 },
      { label: "Healthcare/Pharmaceutical", pct: 5.54 },
      { label: "Energy", pct: 8.69 },
      { label: "Others", pct: 9.11 },
    ],
  },
];

/* ── Page-level content from the deck (not market-specific) ── */

export const recruitmentStrategy = [
  { label: "Professional network targeting", desc: "We conduct specialized outreach via LinkedIn and relevant industry forums" },
  { label: "Trusted referral system",         desc: "We leverage existing relationships within business networks" },
  { label: "Industry partnerships",           desc: "We collaborate with relevant and trusted professional organizations" },
  { label: "Continuous engagement",           desc: "We provide panelists with frequent updates and active participation monitoring" },
];

export const validationCriteria = [
  {
    title: "Industry Expertise",
    criteria: "Review of professional experience, publications, patents, or industry certifications",
    validation: "Panelists provide detailed information about their work experience and qualifications, verified through LinkedIn profiles and third-party B2B databases.",
  },
  {
    title: "Company / Position & Roles",
    criteria: "Panelists are associated with reputable and known companies within their industry",
    validation: "Panelists must provide their business email, LinkedIn profile, current role and job title. We verify this information using B2B databases, including ZoomInfo and Lusha.",
  },
  {
    title: "Geo Location",
    criteria: "Confirmed business location and address",
    validation: "Panelists are required to provide their location during registration. Additional IP geolocation tools are used to verify the location of panelists' internet connections.",
  },
  {
    title: "Engagement & Responsiveness",
    criteria: "Monitoring of response times, survey completion rates, and feedback from panelists",
    validation: "We track panelist response times and completion rates for surveys to assess their level of engagement, with post-survey questionnaires and direct communication used to gather insight into responsiveness and satisfaction.",
  },
  {
    title: "Data Quality & Consistency",
    criteria: "Regular assessment of response consistency, completion rates, and attention checks within surveys",
    validation: "We monitor panelist responses for consistency and completeness during survey administration. Attention checks verify attentiveness, and statistical analysis identifies outliers or patterns of inconsistent responses.",
  },
  {
    title: "Ethical Standards",
    criteria: "Monitoring for inappropriate behavior, adherence to research guidelines and codes of conduct",
    validation: "Clear guidelines and codes of conduct govern participation. Automated checks and random manual review detect ethical breaches, and panelists have channels for reporting concerns.",
  },
  {
    title: "Diversity",
    criteria: "A balance of industry sectors and demographics, including gender, ethnicity, company size, and geographic location",
    validation: "Panelists provide demographic information during registration. We audit panel composition regularly and take targeted recruitment action to address any imbalances.",
  },
];

export const fraudDetection = [
  { title: "Global Compliance: Data Privacy & Ethics", desc: "Ethical standards in line with international market research guidelines, ensuring strict compliance with GDPR, HIPAA, and ISO 27001." },
  { title: "Research Defender",       desc: "Advanced search and activity tools ensure the authenticity and reliability of research outcomes." },
  { title: "Survey Link Protection",  desc: "We proactively detect and prevent tampering with survey URLs, a common tactic used to bypass questions or improperly access incentives." },
  { title: "Digital Fingerprint Analysis", desc: "Examination of device type, browser version, operating system, and IP address generates a unique fingerprint that identifies duplicate or fraudulent entries." },
  { title: "CAPTCHA Integration",     desc: "CAPTCHA distinguishes between human and automated responses, preventing bots from submitting fraudulent entries." },
  { title: "Network Behavioral Analysis", desc: "Response timing, interaction patterns, and network anomalies are monitored to identify and prevent fraudulent behavior." },
  { title: "Server-to-Server (S2S) Integration", desc: "S2S integration securely exchanges data between servers, reducing the risk of data breaches." },
  { title: "Two-Factor Authentication (2FA)", desc: "2FA ensures that only authorized respondents can access and complete surveys." },
  { title: "IP Address Analysis",     desc: "IP addresses are monitored to detect and block multiple responses from the same location." },
  { title: "Geolocation Verification", desc: "We verify the geographic location of respondents, ensuring responses come from the locations we expect." },
];

export const panelAttributes = [
  {
    group: "Basic Attributes",
    items: ["Business Type", "Industry Segment", "Annual Revenue", "Number of Employees at all Locations", "Title", "Function/Department", "Decision Makers", "Job Category"],
  },
  {
    group: "Industry Segment Type",
    items: ["Computer Hardware", "Computer Software", "Consulting", "Consumer Products", "Consumer Services", "Entertainment/Sports", "Energies & Utilities/Oil & Gas", "Food/Beverages/Restaurants", "Media/Publishing/Advertising", "Non-Profit", "Retail", "Telecommunication", "Equipment", "Travel/Hospitality/Leisure", "E-commerce", "Beauty/Fashion", "Construction", "Finance + Insurance", "Automotive", "Aviation", "Manufacturing", "Healthcare", "Professional Services", "Real Estate", "Transport & Logistics", "Hospitality"],
  },
  {
    group: "Profession Targeting",
    items: ["Digital Marketers", "Insurance Agents", "Lawyers", "CPA", "Stylists", "Machinist", "Chemist/Scientist", "Graphic Designer", "Social Media", "Influencer", "Plumber", "Carpenter", "General Contractor", "Auto Mechanic", "Driver", "Electrician", "Factory/Warehouse Worker"],
  },
  {
    group: "Government / Military",
    items: ["Law Enforcement", "Military/Defence", "National Guard", "Medical", "Indian Foreign Service"],
  },
  {
    group: "ITDM / IT Roles",
    items: ["Developer", "Data Centre", "Cloud Computing", "Business Intelligence", "Big Data Analytics"],
  },
];
