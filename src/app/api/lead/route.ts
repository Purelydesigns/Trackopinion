import { NextResponse } from "next/server";
import { apiBaseUrl, logAndDescribe } from "@/lib/api";
import { LEAD_SOURCES, validateLead, type LeadPayload, type LeadSource } from "@/lib/leads";

/**
 * Single entry point for every lead-capture form on the site.
 *
 * Validation here is authoritative — the client-side checks exist for feedback
 * only and are trivially bypassed by posting directly to this route.
 */

/* ── Rate limiting ──────────────────────────────────────────────────────────
   In-memory and therefore per-instance: it stops casual scripted spam, not a
   distributed flood. Move to a shared store (Redis, Upstash) if the site ever
   runs on more than one instance.

   Only submissions that pass validation are counted. Counting rejected ones
   too would let a visitor with a typo in their phone number lock themselves
   out before they ever managed to send the form. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  let body: Partial<LeadPayload> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  // Honeypot: a field hidden from humans via CSS. Bots fill it, people cannot.
  // Answer 200 so the bot believes it succeeded and does not retry.
  if (body.website) return NextResponse.json({ ok: true });

  const source = body.source as LeadSource;
  if (!source || !(source in LEAD_SOURCES)) {
    return NextResponse.json({ error: "Unknown form source." }, { status: 400 });
  }

  // Which fields are mandatory depends on the form. The newsletter only has an
  // email; the contact form wants everything.
  const requiredBySource: Partial<Record<LeadSource, Array<keyof LeadPayload>>> = {
    contact: ["mobile", "company", "message"],
    cati: ["company", "message"],
    healthcare: ["company"],
    "expert-network": ["company", "message"],
    "panel-sample": ["company"],
    solutions: ["mobile", "company"],
    "talk-to-expert": ["mobile", "message"],
    career: ["mobile", "company", "message"],
    newsletter: [],
  };

  const errors = validateLead(body, requiredBySource[source] ?? []);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the form.", errors }, { status: 422 });
  }

  // Counted here, so only submissions that would actually reach the upstream
  // consume the allowance.
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  try {
    // NOTE: the upstream `saveContactUs` endpoint takes its fields as query
    // parameters with an empty body — that is its published contract, not a
    // choice made here. Personal data in a query string is logged by proxies
    // more readily than a request body would be; moving these into the body
    // needs a matching change on the API side and is worth raising with them.
    const params = new URLSearchParams({
      FullName: (body.name ?? "").trim(),
      MobileNumber: (body.mobile ?? "").trim(),
      EmailAddress: (body.email ?? "").trim(),
      Subject: `${LEAD_SOURCES[source]}${body.company ? ` — ${body.company.trim()}` : ""}`,
      Description: (body.message ?? "").trim(),
      IsActive: "true",
    });

    const res = await fetch(`${apiBaseUrl()}/saveContactUs?${params.toString()}`, {
      method: "POST",
      headers: { accept: "*/*" },
      body: "",
    });

    if (!res.ok) {
      console.error(`[api/lead] upstream ${res.status} for source "${source}"`);
      return NextResponse.json(
        { error: "We could not record your enquiry. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: logAndDescribe("lead", err) }, { status: 502 });
  }
}
