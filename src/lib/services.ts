import {
  BarChart3,
  Building2,
  Compass,
  FileCode2,
  Globe,
  HeartPulse,
  Languages,
  Layers,
  Microscope,
  PhoneCall,
  PieChart,
  Radar,
  Repeat,
  ShieldCheck,
  TrendingUp,
  Users,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import { allSolutionGroups } from "@/lib/solutionGroups";

/**
 * The service catalogue the enquiry form offers.
 *
 * Derived from `allSolutionGroups` — the same list the hub pages render — so a
 * service can never appear on a hub page but be missing from the form, or vice
 * versa. Only the icons are added here.
 */

export interface Service {
  /** Stable value submitted with the form. */
  id: string;
  label: string;
  /** The page this service is sold on. Used to preselect it. */
  href: string;
  group: string;
  icon: LucideIcon;
}

/** Icon per service route. Mirrors the mega-menu so the site stays consistent. */
const ICONS: Record<string, LucideIcon> = {
  "/solutions/global-panel": Globe,
  "/solutions/global-panel/b2c": Users,
  "/solutions/global-panel/b2b": Building2,
  "/solutions/research-services/qualitative": Users,
  "/solutions/research-services/quantitative": BarChart3,
  "/solutions/research-services/survey-programming": Layers,
  "/solutions/research-services/translation": Languages,
  "/solutions/research-services/analytics": PieChart,
  "/solutions/enterprise-solution/product-concept-and-ad-testing": Microscope,
  "/solutions/enterprise-solution/customer-loyalty-measurement": ShieldCheck,
  "/solutions/enterprise-solution/brand-image-study": TrendingUp,
  "/solutions/enterprise-solution/competitive-intelligence-and-market-mapping": Radar,
  "/solutions/enterprise-solution/new-market-entry-research": Compass,
  "/solutions/enterprise-solution/usage-and-attitude-studies": Repeat,
  "/solutions/cati-solutions": PhoneCall,
  "/solutions/healthcare": HeartPulse,
  "/solutions/expert-network": UserSearch,
  "/solutions/scrip8": FileCode2,
};

/** Route → service id. A slug of the path, so ids stay readable in the inbox. */
function idFor(href: string): string {
  return href.replace(/^\/solutions\//, "").replace(/\//g, "-");
}

export const SERVICES: Service[] = allSolutionGroups.flatMap((group) =>
  group.entries.map((entry) => ({
    id: idFor(entry.href),
    label: entry.label,
    href: entry.href,
    group: group.title,
    icon: ICONS[entry.href] ?? Globe,
  })),
);

/** The catalogue grouped for rendering, preserving the hub page order. */
export const SERVICE_GROUPS: { title: string; services: Service[] }[] =
  allSolutionGroups.map((group) => ({
    title: group.title,
    services: SERVICES.filter((s) => s.group === group.title),
  }));

/**
 * The services a given route should preselect.
 *
 * An exact route match selects that one service. A hub route (`/solutions/...`
 * with children below it) selects nothing — the visitor has not narrowed down
 * yet, and pre-ticking six boxes for them would be noise, not a shortcut.
 */
export function servicesForPath(pathname: string): string[] {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const exact = SERVICES.find((s) => s.href === clean);
  return exact ? [exact.id] : [];
}

/** Human-readable labels for the ids a form submits. */
export function labelsFor(ids: string[]): string[] {
  return ids
    .map((id) => SERVICES.find((s) => s.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}
