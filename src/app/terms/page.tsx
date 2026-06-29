import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read Track Opinion's Terms of Service — understand your rights and responsibilities when using our platform.",
  alternates: { canonical: "https://www.trackopinion.com/terms" },
};

/* ── Reusable components ── */
function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-block bg-[#e8ecf8] text-primary text-sm font-bold px-4 py-2 rounded-lg mb-6 mt-10">
      {text}
    </div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-900 text-base leading-8 mb-3 font-medium">{children}</p>;
}

function CheckItem({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start py-1.5">
      <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-1">
        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
      </span>
      <span className="text-gray-900 text-base leading-8 font-medium">
        {label && <strong className="text-gray-900 font-bold">{label} </strong>}
        {children}
      </span>
    </li>
  );
}

export default function TermsPage() {
  return (
    <main>
      {/* ── Dark navy header ── */}
      <div className="-mt-[76px] bg-primary py-8">
        <div className="max-w-[1536px] mx-auto px-6 text-center pt-[76px]">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Terms of Service</h1>
        </div>
      </div>

      {/* ── Dark wrapper so rounded-top corners are visible ── */}
      <div className="bg-[#111827]">
        <div className="bg-white rounded-t-[2.5rem] shadow-2xl">
          <div className="max-w-[1536px] mx-auto px-6 py-12">
          <div>

            {/* Updated date */}
            <p className="font-bold text-gray-900 text-base mb-8">Updated Date: 02-06-2026</p>

            {/* Intro */}
            <Para>
              Please read the following Terms of Use carefully. Track Opinion, including its
              subsidiaries and affiliates (&quot;Track Opinion&quot;), requires that all visitors to the
              website available at{" "}
              <Link href="https://trackopinion.com/" className="text-primary underline hover:text-primary">
                https://trackopinion.com/
              </Link>{" "}
              (the &quot;Platform&quot;) adhere to the following Terms of Use. By accessing and using
              the Platform, you indicate your acknowledgement and acceptance of these Terms of Use.
              If you do not agree with these Terms of Use, you should not use the Platform. The
              term &quot;you&quot;, &quot;your&quot; or &quot;user&quot; refers to the user or viewer of the Platform.
            </Para>
            <Para>
              Track Opinion may change, suspend, or discontinue any aspect of the Platform at any
              time, including the availability of any feature, database, or content. Track Opinion
              may also impose limits on certain features and services and/or restrict your access to
              parts or all of the Platform without notice or liability of any kind. The terms and
              conditions of a Track Opinion client&apos;s service agreement for any portion of the
              Platform will control in the event of any provisions that may conflict with these
              Terms of Use.
            </Para>
            <Para>
              The term &quot;Track Opinion&quot; or &quot;us&quot; or &quot;we&quot; or &quot;our&quot; refers to Track Opinion and
              its affiliates, the owner of the Platform. Headings are for reference purposes only
              and in no way define, limit, construe, or describe the scope or extent of such
              sections. Our failure to act with respect to a breach by you or others does not waive
              our rights to act with respect to subsequent or similar breaches. This document sets
              forth the entire understanding and agreement between Track Opinion and you with
              respect to the subject matter contained herein.
            </Para>

            {/* ── Eligibility ── */}
            <SectionBadge text="Eligibility" />
            <Para>
              To access and use the Platform, you must meet certain eligibility criteria. These
              criteria are as follows:
            </Para>
            <ul className="space-y-1 mb-4">
              <CheckItem label="Legal Capacity:">
                The Platform and its services are intended for individuals or entities who can form
                legally binding contracts under the Indian law. By using the Platform, you represent
                that you possess the legal capacity to enter into such contracts.
              </CheckItem>
              <CheckItem label="Age Requirement:">
                The Platform is only available to individuals who are 18 years of age or older. If
                you are under 18 years of age, you may use the Platform only with the involvement
                and consent of a parent or legal guardian.
              </CheckItem>
              <CheckItem label="Authorized Entities:">
                Duly incorporated or authorized entities, along with their authorized individuals or
                representatives, may access and use the Platform. If you are accessing the Platform
                on behalf of an entity, you represent and warrant that you have the necessary
                authority to act on behalf of that entity and to bind it to these Terms of Use.
              </CheckItem>
              <CheckItem label="Compliance with Laws:">
                By accessing and using the Platform, you agree to comply with all applicable laws,
                regulations, and legal obligations. You represent and warrant that your use of the
                Platform is in strict compliance with all applicable laws and regulations.
              </CheckItem>
            </ul>
            <Para>
              It is your responsibility to ensure that you meet the above eligibility criteria
              before accessing and using the Platform. If you do not meet these criteria, you should
              refrain from using the Platform. Track Opinion reserves the right to terminate or
              suspend your access to the Platform if it is discovered that you do not meet the
              eligibility requirements.
            </Para>
            <Para>
              By accessing and using the Platform, you acknowledge and confirm that you meet the
              eligibility criteria stated above and that you have read, understood, and agreed to
              comply with these Terms of Use.
            </Para>

            {/* ── Use of the Platform ── */}
            <SectionBadge text="Use of the platform" />
            <Para>
              Subject to the provisions outlined in these terms, we grant you a limited,
              terminable, non-transferable, personal, and non-exclusive license to access and use
              the Platform and its services as provided herein. You may download materials displayed
              on the Platform for personal, non-commercial use only, provided that you do not remove
              any copyright or proprietary notices from the materials. However, you are strictly
              prohibited from distributing, modifying, broadcasting, publicly performing,
              transmitting, reusing, reposting, or using the content of the Platform, including
              text, images, audio, and video, for public or commercial purposes without prior
              written permission from the Company.
            </Para>

            {/* ── Relationship ── */}
            <SectionBadge text="Relationship between User and Track Opinion" />
            <Para>
              The user acknowledges and agrees that they are an independent third-party entity and
              that their use of the Platform does not establish any association or affiliation with
              Track Opinion. The user expressly acknowledges that they are a user of the Platform
              and its offerings.
            </Para>
            <Para>
              The user understands that their relationship with Track Opinion is solely that of a
              user and does not create any form of partnership, joint venture, employment, agency,
              or other similar relationship. The user acknowledges that they have no authority to
              act on behalf of Track Opinion or bind Track Opinion in any manner.
            </Para>
            <Para>
              The user&apos;s access and use of the Platform signify their acceptance of these terms
              and the understanding that they are an independent user of the Platform&apos;s offerings.
            </Para>

            {/* ── User Representation ── */}
            <SectionBadge text="User Representation and Warranties" />
            <Para>By accessing and using the Platform, you represent and warrant that you:</Para>
            <ul className="space-y-1 mb-4">
              <CheckItem>Possess the legal authority to enter into and be bound by these Terms;</CheckItem>
              <CheckItem>
                Are at least eighteen (18) years of age or older, or of the legally required age in
                your jurisdiction, to form a binding contract with us;
              </CheckItem>
              <CheckItem>
                Will utilize the Platform in compliance with these Terms and any applicable laws or
                regulations, not for any unlawful purposes.
              </CheckItem>
              <CheckItem label="Compliance with Laws:">
                By accessing and using the Platform, you agree to comply with all applicable laws,
                regulations, and legal obligations. You represent and warrant that your use of the
                Platform is in strict compliance with all applicable laws and regulations.
              </CheckItem>
            </ul>
            <Para>
              It is your responsibility to ensure that you meet the above eligibility criteria
              before accessing and using the Platform. If you do not meet these criteria, you should
              refrain from using the Platform. Track Opinion reserves the right to terminate or
              suspend your access to the Platform if it is discovered that you do not meet the
              eligibility requirements.
            </Para>
            <Para>
              By accessing and using the Platform, you acknowledge and confirm that you meet the
              eligibility criteria stated above and that you have read, understood, and agreed to
              comply with these Terms of Use.
            </Para>

            {/* ── Intellectual Property ── */}
            <SectionBadge text="Intellectual Property Rights" />
            <Para>
              By accessing and using the Platform, you agree and understand that Track Opinion
              retains sole ownership of all rights, titles, and interests in the Platform, including
              but not limited to any underlying technology, software, algorithms, and proprietary
              methodologies (collectively referred to as &apos;Intellectual Property&apos;), whether they are
              protected or unprotected under current laws, and irrespective of their geographical
              recognition. Your use of the Platform does not grant you any ownership in the
              Intellectual Property, but rather a limited license to use the Platform in accordance
              with these terms.
            </Para>
            <Para>
              Additionally, you acknowledge that certain information available on the Platform may
              be classified as confidential by Track Opinion. You commit not to disclose such
              information without securing a written consent from Track Opinion beforehand.
            </Para>

            {/* ── Confidentiality ── */}
            <SectionBadge text="Confidentiality" />
            <Para>
              As a user of the Platform, you agree to maintain the utmost confidentiality and not
              disclose, use, or derive any benefit from any confidential or non-public information
              obtained from Track Opinion or its affiliates. This information includes, but is not
              limited to, details regarding Track Opinion&apos;s products, services, customers,
              employees, financial performance, strategic plans, and intellectual property. You
              acknowledge that this obligation of confidentiality extends beyond your period of
              using Track Opinion&apos;s services and remains in effect even after you cease to be a
              user of the Platform.
            </Para>
            <Para>
              The information obtained from Track Opinion and its affiliates is deemed confidential
              if it is not publicly known or has not been disclosed by authorized parties. It is
              imperative that you uphold the confidentiality of such information and refrain from
              any unauthorized disclosure or use that may compromise the privacy and interests of
              Track Opinion.
            </Para>
            <Para>
              By agreeing to these terms, you acknowledge the importance of maintaining
              confidentiality and agree to be bound by this obligation. Any violation of this
              confidentiality clause may result in legal consequences and the termination of your
              access to the Platform.
            </Para>

          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
