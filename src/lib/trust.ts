/**
 * Trust Centre content.
 *
 * Kept as data so the certifications, practice groups and document list can be
 * updated without touching layout — these change on their own schedule
 * (certificate renewals, new policies) and are the most likely thing to need
 * editing by someone who is not working in the components.
 */

export interface Certification {
  name: string;
  /** Short status line under the name, e.g. "Certified", "Member". */
  status: string;
  desc: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "ISO/IEC 27001",
    status: "Certified",
    desc: "Our information security management system (ISMS) is independently audited and certified to the ISO/IEC 27001 standard. Certificate available on request.",
  },
  {
    name: "GDPR",
    status: "Compliant",
    desc: "Panelist consent, data minimization, and data-subject rights requests are handled in line with the EU General Data Protection Regulation.",
  },
  {
    name: "HIPAA",
    status: "Compliant",
    desc: "Health-related research data is handled in accordance with HIPAA's administrative, physical, and technical safeguards.",
  },
  {
    name: "ESOMAR",
    status: "Member",
    desc: "Member of ESOMAR, the global association for market, opinion, and social research, and signatory to its Code of Conduct.",
  },
  {
    name: "Insights Association",
    status: "Member",
    desc: "Member of the Insights Association and adherent to its Code of Standards and Ethics for Survey Research.",
  },
  {
    name: "Quirk's",
    status: "Listed provider",
    desc: "Listed provider in the Quirk's Marketing Research directory and community.",
  },
];

export interface PracticeGroup {
  title: string;
  items: string[];
}

/** Grouped the way the ISO 27001 audit and client security reviews group them. */
export const PRACTICE_GROUPS: PracticeGroup[] = [
  {
    title: "Data & privacy",
    items: [
      "Informed consent collected before any panelist joins a study",
      "Data minimization — we collect only what a study needs",
      "Survey responses anonymized or pseudonymized before reporting",
      "Defined retention schedules with deletion on completion",
      "Data-subject access, correction, and erasure requests honored",
    ],
  },
  {
    title: "Infrastructure security",
    items: [
      "Data encrypted in transit and at rest",
      "Role-based access to production systems and panel data",
      "Regular backups with disaster-recovery testing",
      "Hosting and infrastructure vendors reviewed for security posture",
    ],
  },
  {
    title: "Organizational security",
    items: [
      "Background checks and signed confidentiality agreements",
      "Security and data-handling training for staff touching panel data",
      "Documented incident-response plan with notification timelines",
      "Least-privilege access reviewed on a regular schedule",
    ],
  },
  {
    title: "Research integrity & panel quality",
    items: [
      "Multi-step panelist verification and bot/fraud detection",
      "Duplicate and speeder/straight-liner detection in field",
      "Panel data never sold outside the scope of contracted research",
      "Ongoing panel health monitoring across all 36 countries",
    ],
  },
];

export interface TrustDocument {
  name: string;
  /** Public documents link straight through; the rest are shared on request. */
  href?: string;
}

export const TRUST_DOCUMENTS: TrustDocument[] = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "ISO 27001 Certificate" },
  { name: "Data Processing Agreement (DPA)" },
  { name: "Information Security Policy" },
  { name: "Data Retention & Deletion Policy" },
  { name: "Incident Response Policy" },
  { name: "Business Continuity & Disaster Recovery Policy" },
  { name: "Acceptable Use Policy" },
];

export const COMPLIANCE_FOOTPRINT = [
  { value: "36", label: "Countries fielded" },
  { value: "6", label: "Continents covered" },
  { value: "4.8M+", label: "Panel members under consent" },
];
