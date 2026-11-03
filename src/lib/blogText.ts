/**
 * Text helpers for blog data.
 *
 * Split out of `lib/blog` so a caller can shape a post without importing that
 * module, which pulls in isomorphic-dompurify and therefore jsdom. That import
 * is needed to sanitise article HTML, but it is heavy, it requires Node
 * >= 22.10, and dragging it into a route that only needs a title and an
 * excerpt makes that route fail for reasons it has nothing to do with.
 */

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function limitWords(text: string, max: number): string {
  const words = text.split(" ").filter(Boolean);
  return words.length <= max ? text : words.slice(0, max).join(" ") + "…";
}

/** Render an ISO date as dd.mm.yyyy, matching the design. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, ".");
}
