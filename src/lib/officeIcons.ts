import { Building, Building2, Landmark, type LucideIcon } from "lucide-react";
import type { Office } from "@/lib/contactDetails";

/**
 * One icon per office, keyed by city.
 *
 * Kept out of `contactDetails.ts` so that file stays pure data — it is also
 * read by the Organization JSON-LD, which has no business importing an icon
 * library. Keyed by city rather than array index so the footer and the contact
 * page cannot drift apart if an office is ever reordered.
 *
 * The three are deliberately different silhouettes but the same family: a
 * tower with a wing, a single block, and a columned civic building.
 */
const OFFICE_ICONS: Record<string, LucideIcon> = {
  Gurugram: Building2,
  Noida: Building,
  Sacramento: Landmark,
};

/** Falls back to a generic office block for any city not listed above. */
export function officeIcon(office: Office): LucideIcon {
  return OFFICE_ICONS[office.city] ?? Building2;
}
