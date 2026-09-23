import type { MapPin } from "@/components/about/GlobalReach";

/**
 * Every country that appears as a pin on a `GlobalReach` map, in one place.
 *
 * Coordinates are [longitude, latitude] of a point inside the country — near
 * the centroid, nudged where a true centroid would land in water or across a
 * border. The key is the label shown in the tooltip; `code` is the ISO 3166-1
 * alpha-2, which is what flagcdn expects in its URL.
 *
 * Several pages field in overlapping sets of countries, so they name the ones
 * they cover and share the coordinates from here — a pin nudged for one map
 * then stays correct on the others.
 */
const COUNTRIES = {
  Australia:      { code: "au", coordinates: [134, -25] },
  Austria:        { code: "at", coordinates: [14.5, 47.6] },
  Belgium:        { code: "be", coordinates: [4.6, 50.6] },
  Brazil:         { code: "br", coordinates: [-51, -11] },
  Bulgaria:       { code: "bg", coordinates: [25.4, 42.7] },
  Canada:         { code: "ca", coordinates: [-100, 58] },
  Finland:        { code: "fi", coordinates: [26, 63.5] },
  France:         { code: "fr", coordinates: [2.4, 46.6] },
  Germany:        { code: "de", coordinates: [10.2, 51.2] },
  Greece:         { code: "gr", coordinates: [22.2, 39.3] },
  "Hong Kong":    { code: "hk", coordinates: [114.2, 22.3] },
  Hungary:        { code: "hu", coordinates: [19.4, 47.1] },
  India:          { code: "in", coordinates: [79, 22] },
  Indonesia:      { code: "id", coordinates: [117, -2] },
  Ireland:        { code: "ie", coordinates: [-8.1, 53.2] },
  Italy:          { code: "it", coordinates: [12.6, 42.6] },
  Japan:          { code: "jp", coordinates: [138.5, 36.5] },
  Kuwait:         { code: "kw", coordinates: [47.7, 29.3] },
  Malaysia:       { code: "my", coordinates: [102.2, 4.1] },
  Mexico:         { code: "mx", coordinates: [-102, 23.5] },
  Netherlands:    { code: "nl", coordinates: [5.6, 52.2] },
  "New Zealand":  { code: "nz", coordinates: [172.5, -41.5] },
  Norway:         { code: "no", coordinates: [9.5, 61.5] },
  Philippines:    { code: "ph", coordinates: [122, 12] },
  Poland:         { code: "pl", coordinates: [19.4, 52.1] },
  Qatar:          { code: "qa", coordinates: [51.2, 25.3] },
  Romania:        { code: "ro", coordinates: [25, 45.9] },
  "Saudi Arabia": { code: "sa", coordinates: [45, 24] },
  Singapore:      { code: "sg", coordinates: [103.8, 1.35] },
  "South Africa": { code: "za", coordinates: [24.5, -29.5] },
  "South Korea":  { code: "kr", coordinates: [127.8, 36.4] },
  Spain:          { code: "es", coordinates: [-3.7, 40.2] },
  Sweden:         { code: "se", coordinates: [15.5, 62.5] },
  Switzerland:    { code: "ch", coordinates: [8.2, 46.8] },
  Taiwan:         { code: "tw", coordinates: [121, 23.7] },
  Thailand:       { code: "th", coordinates: [101, 15.5] },
  Turkey:         { code: "tr", coordinates: [35, 39] },
  UAE:            { code: "ae", coordinates: [54, 24] },
  UK:             { code: "gb", coordinates: [-2, 53.5] },
  US:             { code: "us", coordinates: [-98, 39] },
  Vietnam:        { code: "vn", coordinates: [106.5, 16.5] },
} satisfies Record<string, Omit<MapPin, "name">>;

export type CountryName = keyof typeof COUNTRIES;

/** Build a pin list from country names. Unknown names fail to compile. */
export function countryPins(names: readonly CountryName[]): MapPin[] {
  return names.map((name) => ({ name, ...COUNTRIES[name] }));
}

/** Countries where Track Opinion fields CATI interviews. */
export const CATI_COUNTRIES = countryPins([
  "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "Finland",
  "France", "Germany", "Greece", "Hong Kong", "Hungary", "India", "Indonesia",
  "Ireland", "Italy", "Japan", "Kuwait", "Malaysia", "Mexico", "Netherlands",
  "New Zealand", "Norway", "Philippines", "Poland", "Qatar", "Romania",
  "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
  "Switzerland", "Taiwan", "Thailand", "Turkey", "UAE", "UK", "US", "Vietnam",
]);

/** Countries covered by the B2B and B2C global panels — the same footprint. */
export const PANEL_COUNTRIES = countryPins([
  "Australia", "Brazil", "Canada", "France", "Germany", "Hong Kong", "India",
  "Indonesia", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands",
  "New Zealand", "Philippines", "Poland", "Romania", "Saudi Arabia",
  "Singapore", "South Korea", "Spain", "Taiwan", "Thailand", "UAE", "UK", "US",
  "Vietnam",
]);

/** Countries covered by the healthcare panel. */
export const HEALTHCARE_COUNTRIES = countryPins([
  "Australia", "Brazil", "Canada", "Germany", "Hong Kong", "India", "Indonesia",
  "Italy", "Japan", "Malaysia", "Mexico", "Philippines", "Romania",
  "Saudi Arabia", "Singapore", "South Korea", "Taiwan", "Thailand", "Turkey",
  "UAE", "UK", "US", "Vietnam",
]);
