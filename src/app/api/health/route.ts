import { NextResponse } from "next/server";

/**
 * Deployment diagnostics.
 *
 * Every API route answers the same way when `API_BASE_URL` is missing, which
 * cannot distinguish "the variable was never set" from "it was set but this
 * build predates it" or "it was set for Preview only". This route reports what
 * the running process can actually see.
 *
 * It reports presence, never values: a boolean and a length, so a trailing
 * space or a truncated paste shows up without the URL itself being exposed.
 *
 * `?upstream=1` additionally probes the CMS, bounded so it cannot hang.
 */
export const dynamic = "force-dynamic";

const UPSTREAM_PROBE_TIMEOUT_MS = 5000;

export async function GET(req: Request) {
  const base = process.env.API_BASE_URL;

  const report: Record<string, unknown> = {
    apiBaseUrl: {
      set: Boolean(base),
      length: base?.length ?? 0,
      // A value that arrived with quotes or whitespace still "exists" but
      // produces a broken URL, so surface that without printing it.
      looksTrimmed: base ? base === base.trim() : null,
      startsWithHttps: base ? base.startsWith("https://") : null,
    },
    googleSiteVerification: { set: Boolean(process.env.GOOGLE_SITE_VERIFICATION) },
    runtime: {
      node: process.version,
      // Below 22.10 the sanitizer in lib/blog.ts fails at import, which takes
      // every blog route down before its own error handling can run.
      nodeMeetsRequirement: Number(process.version.slice(1).split(".")[0]) >= 22,
    },
    deployment: {
      vercelEnv: process.env.VERCEL_ENV ?? null,
      region: process.env.VERCEL_REGION ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    },
  };

  if (new URL(req.url).searchParams.get("upstream") === "1") {
    if (!base) {
      report.upstream = { probed: false, reason: "API_BASE_URL is not set" };
    } else {
      const started = Date.now();
      try {
        const res = await fetch(`${base.replace(/\/+$/, "")}/api/Blog/blogList`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageNumber: 1, pageSize: 1 }),
          cache: "no-store",
          signal: AbortSignal.timeout(UPSTREAM_PROBE_TIMEOUT_MS),
        });
        report.upstream = { probed: true, status: res.status, ms: Date.now() - started };
      } catch (err) {
        report.upstream = {
          probed: true,
          error: err instanceof Error ? err.message : String(err),
          ms: Date.now() - started,
        };
      }
    }
  }

  return NextResponse.json(report);
}
