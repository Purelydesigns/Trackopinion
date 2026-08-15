import type { NextConfig } from "next";

/** Pages that moved — old URL → new URL. 308 so ranking signals transfer. */
const movedPages: [from: string, to: string][] = [
  ["/solutions/analytics", "/solutions/research-services/analytics"],
  ["/solutions/product-concept-and-ad-testing", "/solutions/enterprise-solution/product-concept-and-ad-testing"],
  ["/solutions/customer-loyalty-measurement", "/solutions/enterprise-solution/customer-loyalty-measurement"],
  ["/solutions/brand-image-study", "/solutions/enterprise-solution/brand-image-study"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return movedPages.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
