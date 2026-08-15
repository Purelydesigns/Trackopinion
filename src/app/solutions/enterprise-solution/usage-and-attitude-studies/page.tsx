import type { Metadata } from "next";
import UsageAttitudeContent from "@/components/enterprise/UsageAttitudeContent";
import JsonLd, { breadcrumbSchema, serviceSchema } from "@/components/seo/JsonLd";

const PATH = "/solutions/enterprise-solution/usage-and-attitude-studies";
const TITLE = "Usage & Attitude Studies";
const DESCRIPTION =
  "Understand what your category actually does and why. U&A studies mapping penetration, frequency, occasions and the attitudes that drive choice.";

export const metadata: Metadata = {
  title: "Usage & Attitude Studies | Track Opinion",
  description: DESCRIPTION,
  alternates: { canonical: `https://www.trackopinion.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Enterprise Solution", path: "/solutions/enterprise-solution" },
            { name: TITLE, path: PATH },
          ]),
          serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
        ]}
      />
      <UsageAttitudeContent />
    </>
  );
}
