import type { Metadata } from "next";
import TrustCenter from "@/components/trust/TrustCenter";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/seo/JsonLd";
import { OG_IMAGE } from "@/lib/seo";

const PATH = "/trust";
const TITLE = "Trust Center";
const DESCRIPTION =
  "Track Opinion's certifications, security practices and compliance documentation — ISO/IEC 27001 certified, GDPR and HIPAA aligned, fielding research across 36 countries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    images: [OG_IMAGE],
    url: `${SITE_URL}${PATH}`,
    title: `${TITLE} | Track Opinion®`,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: TITLE, path: PATH }])} />
      <TrustCenter />
    </>
  );
}
