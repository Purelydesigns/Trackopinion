# Track Opinion

Marketing site for Track Opinion®, a global market research and outsourcing firm.
Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in API_BASE_URL
npm run dev
```

The site runs at http://localhost:3000.

### Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `API_BASE_URL` | Yes | Base URL of the Track Opinion backend. Blog posts, job openings and every form submission go through it. Server-side only — deliberately **not** `NEXT_PUBLIC_`, so the upstream host never reaches the client bundle. |
| `GOOGLE_SITE_VERIFICATION` | No | Search Console token. The `<meta>` tag is omitted entirely when unset. |

Without `API_BASE_URL` the site still builds and every page renders — the blog
index comes back empty and forms return a clear error, with the cause logged
server-side. Nothing fails silently.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (**not** run by `next build` in Next 16 — CI runs it separately) |
| `npm run typecheck` | `tsc --noEmit` |

## Layout

```
src/
  app/                 Routes. Each page owns its metadata and JSON-LD.
    api/
      lead/            Every form on the site posts here.
      blogs/, careers/ Read-through proxies to the upstream API.
  components/          UI, grouped by the page or feature that owns it.
  lib/                 Data access and shared domain logic.
```

### Things worth knowing before editing

**Page titles.** `app/layout.tsx` sets `title.template = "%s | Track Opinion®"`.
Write page titles *without* the brand — `title: "Contact Us"`, not
`"Contact Us | Track Opinion"` — or it renders twice. `openGraph.title` takes no
template, so that one keeps the brand.

**Forms.** All of them go through `submitLead()` (`lib/leads.ts`) to
`/api/lead`, which validates server-side, rate-limits per IP, checks the
honeypot and forwards to the upstream `saveContactUs` endpoint. `source`
identifies which form a lead came from. To add a form: add a `LeadSource`, list
its required fields in the route, and call `submitLead`.

**Contact details.** Phone numbers, email addresses and office addresses live in
`lib/contactDetails.ts` and nowhere else — the contact page, the footer and the
Organization JSON-LD all read from it.

**Blog.** Fetched and rendered on the server (`lib/blog.ts`), revalidated hourly.
CMS HTML is sanitised there before it reaches `dangerouslySetInnerHTML`.

**FAQ schema.** A route that emits `faqSchema(faqs)` must also render those FAQs
— use `<FaqAccordion faqs={faqs} />`. FAQPage markup for content that isn't
visible violates Google's structured data policy.

**Routes list.** `lib/siteLinks.ts` feeds both the HTML sitemap at `/sitemap`
and `sitemap.xml`. Add new static routes there.

## Deployment notes

- Security headers are configured in `next.config.ts`. The CSP currently ships
  as `Content-Security-Policy-Report-Only` — verify the violation reports on
  staging, then rename the header to enforce it.
- `next build` does not run ESLint in Next 16. The CI workflow in
  `.github/workflows/ci.yml` runs lint, typecheck and build on every push.
