/**
 * Shared shape for every lead-capture form on the site.
 *
 * All of them — contact, newsletter, CATI, healthcare, expert network, panel
 * sample requests and job applications — funnel into the same upstream
 * `saveContactUs` endpoint. `source` is what tells them apart once they land in
 * the inbox, so it is always sent and never comes from user input.
 */

export const LEAD_SOURCES = {
  contact: "Contact form",
  newsletter: "Newsletter signup",
  cati: "CATI enquiry",
  healthcare: "Healthcare enquiry",
  "expert-network": "Expert Network enquiry",
  "panel-sample": "Panel sample request",
  solutions: "Solutions enquiry",
  "talk-to-expert": "Talk to an expert",
  career: "Job application",
} as const;

export type LeadSource = keyof typeof LEAD_SOURCES;

export interface LeadPayload {
  source: LeadSource;
  name: string;
  email: string;
  /** Optional for forms that only ask for an email (newsletter). */
  mobile?: string;
  /** Company, role applied for, or whatever the form's context field is. */
  company?: string;
  message?: string;
  /** Honeypot. Always sent, always empty for a real person. */
  website?: string;
}

/** Field length caps, enforced on both sides so the upstream never sees a huge payload. */
export const LIMITS = {
  name: 120,
  email: 160,
  mobile: 32,
  company: 160,
  message: 4000,
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MOBILE_RE = /^\+?[\d\s-]{7,15}$/;

export type LeadErrors = Partial<Record<keyof LeadPayload, string>>;

/**
 * Validate a lead. Used by the route handler (authoritative) and re-used by the
 * client forms so both sides agree on what is acceptable.
 *
 * `require` lists the fields this particular form treats as mandatory; `name`
 * and `email` are always required.
 */
export function validateLead(
  input: Partial<LeadPayload>,
  require: Array<keyof LeadPayload> = [],
): LeadErrors {
  const errors: LeadErrors = {};
  const required = new Set<keyof LeadPayload>(["name", "email", ...require]);

  const name = (input.name ?? "").trim();
  if (required.has("name") && !name) errors.name = "Name is required.";
  else if (name.length > LIMITS.name) errors.name = "That name is too long.";

  const email = (input.email ?? "").trim();
  if (!email) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (email.length > LIMITS.email) errors.email = "That email address is too long.";

  const mobile = (input.mobile ?? "").trim();
  if (required.has("mobile") && !mobile) errors.mobile = "Mobile number is required.";
  else if (mobile && !MOBILE_RE.test(mobile)) errors.mobile = "Enter a valid mobile number.";

  const company = (input.company ?? "").trim();
  if (required.has("company") && !company) errors.company = "This field is required.";
  else if (company.length > LIMITS.company) errors.company = "That entry is too long.";

  const message = (input.message ?? "").trim();
  if (required.has("message") && !message) errors.message = "Please tell us how we can help.";
  else if (message.length > LIMITS.message)
    errors.message = `Please keep this under ${LIMITS.message} characters.`;

  return errors;
}

/** Submit a lead from the browser. Resolves to a field-error map, or null on success. */
export async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: true } | { ok: false; errors: LeadErrors; message: string }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { ok: true };

    const body = await res.json().catch(() => ({}));
    return {
      ok: false,
      errors: (body as { errors?: LeadErrors }).errors ?? {},
      message:
        res.status === 429
          ? "Too many submissions from this network. Please try again in a minute."
          : (body as { error?: string }).error ??
            "Something went wrong. Please try again.",
    };
  } catch {
    return {
      ok: false,
      errors: {},
      message: "Could not reach the server. Check your connection and try again.",
    };
  }
}
