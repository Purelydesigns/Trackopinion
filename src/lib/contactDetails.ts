/**
 * One source of truth for how to reach Track Opinion.
 *
 * These were previously spread across the contact page, the footer, the privacy
 * policy and the Organization JSON-LD, and had drifted apart — three different
 * email addresses and two different phone numbers, one of which appeared twice
 * on the same page with different digits. Search engines read inconsistent
 * name/address/phone data as a signal that a business is not well established,
 * so everything user-facing should come from here.
 *
 * VERIFY BEFORE LAUNCH: the India phone number below still looks like a
 * placeholder (`+91 124 456 7890`). Replace it with the real switchboard number
 * and this one change will correct every page that shows it.
 */

export const CONTACT_EMAIL = "info@trackopinion.com";

/** Careers inbox — where applicants send their resume. */
export const CAREERS_EMAIL = "info@trackopinion.com";

/** Security, compliance and document requests, as published on the Trust Centre. */
export const TRUST_EMAIL = "trust@trackopinion.com";

/** Privacy and data-subject requests, as published in the privacy policy. */
export const PRIVACY_EMAIL = "updates@trackopinion.com";

export const PHONE_IN = {
  display: "+91 124 456 7890",
  href: "tel:+911244567890",
  /** E.164, for structured data. */
  e164: "+91-124-456-7890",
};

export const PHONE_US = {
  display: "+1 916 460 9393",
  href: "tel:+19164609393",
  e164: "+1-916-460-9393",
};

export interface Office {
  city: string;
  lines: string[];
  country: "IN" | "US";
}

export const OFFICES: Office[] = [
  {
    city: "Gurugram",
    lines: ["607-608, Tower C, Nirvana Courtyard, Sector 50, Gurugram – 122018"],
    country: "IN",
  },
  {
    city: "Noida",
    lines: ["GF, Plot No. 8, Sector 125, Opp. Starbucks, Noida – 201313"],
    country: "IN",
  },
  {
    city: "Sacramento",
    lines: ["1401, 21st Street, STE R, Sacramento, CA 95811"],
    country: "US",
  },
];
