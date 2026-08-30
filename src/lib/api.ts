/**
 * Server-side helpers shared by every route handler in `app/api`.
 *
 * `API_BASE_URL` is read here rather than at module scope in each route so a
 * missing variable produces one clear error instead of a fetch to the literal
 * string "undefined/...".
 */

export class UpstreamError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "UpstreamError";
  }
}

/** Throws if the deployment is missing its API base URL. */
export function apiBaseUrl(): string {
  const base = process.env.API_BASE_URL;
  if (!base) {
    throw new UpstreamError(
      "API_BASE_URL is not set. Copy .env.example to .env.local and fill it in.",
      500,
    );
  }
  return base.replace(/\/+$/, "");
}

/** Coerce a query param to an integer inside [min, max], falling back to `fallback`. */
export function clampInt(
  raw: string | null,
  { min, max, fallback }: { min: number; max: number; fallback: number },
): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

/**
 * Fetch JSON from the upstream API, turning a non-2xx into an `UpstreamError`
 * that carries the real status so the route can log it before returning 502.
 */
export async function upstreamJson(
  url: string,
  init?: RequestInit,
): Promise<unknown> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new UpstreamError(`Upstream responded ${res.status} for ${url}`, res.status);
  }
  return res.json();
}

/**
 * Log the real cause server-side and return the generic message the client sees.
 * Upstream failures must never leak their URL or body to the browser.
 */
export function logAndDescribe(context: string, err: unknown): string {
  console.error(`[api/${context}]`, err instanceof Error ? err.message : err);
  return err instanceof UpstreamError && err.status === 500
    ? "This site is not configured correctly. Please try again later."
    : "Upstream request failed.";
}
