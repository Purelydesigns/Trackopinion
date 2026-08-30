import type { Metadata } from "next";
import TranslationPage from "@/components/research/TranslationPage";
import { faqs } from "@/components/research/faqs/translation";
import JsonLd, {
  SITE_URL,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/components/seo/JsonLd";
import { OG_IMAGE } from "@/lib/seo";

const PATH = "/solutions/research-services/translation";
const TITLE = "Translation Services in Market Research";
const DESCRIPTION =
  "Translate your message to connect better. Survey and questionnaire translation, cultural review and native-speaker recruitment across 25 countries — so language barriers never distort your data.";

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
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Solutions", path: "/solutions" },
            { name: "Research Services", path: "/solutions/research-services" },
            { name: "Translation", path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          faqSchema(faqs),
        ]}
      />
      <TranslationPage />
    </>
  );
}
