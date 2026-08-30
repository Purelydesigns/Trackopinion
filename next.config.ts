import type { NextConfig } from "next";

/** Pages that moved — old URL → new URL. 308 so ranking signals transfer. */
const movedPages: [from: string, to: string][] = [
  ["/solutions/analytics", "/solutions/research-services/analytics"],
  ["/solutions/product-concept-and-ad-testing", "/solutions/enterprise-solution/product-concept-and-ad-testing"],
  ["/solutions/customer-loyalty-measurement", "/solutions/enterprise-solution/customer-loyalty-measurement"],
  ["/solutions/brand-image-study", "/solutions/enterprise-solution/brand-image-study"],
];

/**
 * Content Security Policy.
 *
 * Reported, not enforced, to begin with. The site pulls from several third
 * parties at runtime (CookieYes, Google Fonts, jsDelivr for the world atlas,
 * flagcdn, pravatar, picsum, plus whatever host serves CMS blog images), and
 * enforcing a policy that misses one of them breaks the page silently for
 * visitors. Watch the violation reports in the browser console on staging,
 * confirm the list below is complete, then rename the header to
 * `Content-Security-Policy`.
 *
 * `unsafe-inline` for styles is required by Tailwind's runtime style injection
 * and by the inline `<style>` blocks in several components. `unsafe-inline` for
 * scripts covers Next.js's own bootstrap and the inline consent-relay script in
 * the root layout.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn-cookieyes.com https://log.cookieyes.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "connect-src 'self' https://cdn-cookieyes.com https://log.cookieyes.com https://cdn.jsdelivr.net",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
  // Clickjacking. `frame-ancestors` above covers modern browsers; this is the
  // fallback for older ones.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Two years, preload-eligible. Only takes effect over HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return movedPages.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
