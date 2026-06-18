import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Track Opinion's Privacy Policy — understand how we collect, use, and protect your personal information on our platform.",
  alternates: { canonical: "https://www.trackopinion.com/privacy" },
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

export default function PrivacyPage() {
  return (
    <main>
      {/* ── Dark navy header ── */}
      <div className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
      </div>

      {/* ── Dark wrapper so rounded-top corners are visible ── */}
      <div className="bg-[#111827]">
        <div className="bg-white rounded-t-[2.5rem] shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div>

              {/* Updated date */}
              <p className="font-bold text-gray-900 text-base mb-8">Updated Date: 02-06-2026</p>

              {/* ── Intro ── */}
              <Para>
                Welcome to Track Opinion Research Private Limited, operating under the name Track
                Opinion. We appreciate your use of our platform available at{" "}
                <Link href="https://trackopinion.com/" className="text-accent underline hover:text-orange-700">
                  https://trackopinion.com
                </Link>{" "}
                (&quot;Platform&quot;) and value your privacy. This Privacy Policy (&quot;Policy&quot;) outlines how
                we handle and protect the data we collect, which we review regularly and update as
                necessary. Please be aware that we do not notify users of Policy reviews, so we
                encourage you to visit this page frequently to stay informed about any changes. This
                Policy should be read in conjunction with our{" "}
                <Link href="/terms" className="text-accent underline hover:text-orange-700">
                  Terms of Use
                </Link>{" "}
                and other applicable policies.
              </Para>
              <Para>
                At Track Opinion, we prioritize the privacy of both our users and visitors. We are
                committed to employing the best available technologies and industry standards to
                safeguard the data we collect.
              </Para>
              <Para>
                This Policy covers the collection and usage of personal information from users and
                visitors through the utilization of cookies, caches, and other methods. Throughout
                this Policy, &quot;user&quot;, &quot;users&quot;, or &quot;you,&quot; refer to both users and visitors. We
                explain how we collect, utilize, and secure personal information gathered through
                the Platform, as well as the potential sharing of such information. Additionally, we
                provide you with choices regarding the information you choose to share with us.
              </Para>
              <Para>
                By sharing your personal data with us, you gain access to targeted research
                opportunities, contribute to product and service enhancements. If you have any
                inquiries about our privacy practices or this Policy, please reach out to us at{" "}
                <Link href="mailto:updates@trackopinion.com" className="text-accent underline hover:text-orange-700">
                  updates@trackopinion.com.
                </Link>
              </Para>

              {/* ── When do we collect ── */}
              <SectionBadge text="When do we collect your Information?" />
              <Para>
                We collect your information at the time of signup and each time when a user
                interacts with our Platform in any manner.
              </Para>

              {/* ── What Information we collect ── */}
              <SectionBadge text="What Information we collect?" />
              <Para>
                At our Platform, we store the personal details that you share. However, if you
                prefer not to share this information, we kindly request that you refrain from
                submitting it at any point.
              </Para>
              <Para>We may collect and process the following information about you:</Para>
              <ul className="space-y-1 mb-4">
                <CheckItem>
                  Information provided including your name, email address, postal address, and
                  telephone number.
                </CheckItem>
                <CheckItem>
                  Information uploaded or submitted in relation to any service we offer.
                </CheckItem>
                <CheckItem>
                  Communications you send to us, such as problem reports or queries regarding the
                  Platform.
                </CheckItem>
                <CheckItem>
                  Information from surveys presented on the Platform for research purposes, should
                  you choose to respond or participate in them.
                </CheckItem>
                <CheckItem>
                  Real-time geo-location information, if you agree to provide it, to deliver
                  location-dependent content, advertising, or services. This information may be
                  combined with a device identifier to recognize your mobile browser or device when
                  you return to the Platform.
                </CheckItem>
              </ul>
              <Para>
                You may decline to provide personal data when requested. The specific data we
                collect depends on the context of your interactions with our Platform and the
                choices you make, including your privacy settings. If you do not provide us with
                all the requested information, we may not be able to provide you with the services
                or features you have requested. This is because we need certain information in order
                to process your request and ensure that you receive the best possible service.
              </Para>

              {/* ── Why do we collect ── */}
              <SectionBadge text="Why do we collect your Information?" />
              <Para>
                Our primary objective in collecting personal information from users is to ensure the
                provision of our services and enhance the overall user experience. Rest assured that
                we do not engage in selling or sharing this information with any third parties,
                except as explicitly described in our Policy or with your explicit consent.
              </Para>
              <Para>
                Your personal information is acquired through direct interactions with our website.
                This includes instances where you voluntarily provide such information while availing
                any of the services we offer or when contacting us via email. The types of
                information we may collect encompass your name, email address, and any additional
                details that you choose to disclose.
              </Para>
              <Para>
                We prioritize the protection and confidentiality of your personal information,
                employing appropriate measures to safeguard it from unauthorized access, disclosure,
                alteration, or destruction. Your information is retained only for the duration
                necessary to fulfil the intended purposes outlined in our Policy, unless a longer
                retention period is required or permitted by law.
              </Para>

              {/* ── How do we use ── */}
              <SectionBadge text="How do we use your Information?" />
              <Para>
                We understand the importance of your personal information and are committed to
                utilizing it responsibly. The following outlines how we use the information we
                collect from you:
              </Para>
              <ul className="space-y-1 mb-4">
                <CheckItem label="Service Provision:">
                  We use your personal information to enable the provision of our services and
                  fulfil any requests you make through our Platform. This includes delivering the
                  information, content, and features you seek.
                </CheckItem>
                <CheckItem label="Account Administration:">
                  Your information is utilized for the administration of your account with us. This
                  ensures smooth access to our Platform&apos;s features and maintains the security of
                  your account.
                </CheckItem>
                <CheckItem label="Improving User Experience:">
                  We may analyse the information we collect to enhance the layout and content of
                  our Platform, tailoring it to better meet the needs and preferences of our Users.
                </CheckItem>
                <CheckItem label="Visitor Identification:">
                  We utilize your information to identify and understand visitors to our Platform.
                  This helps us gain insights into user demographics and behavior, enabling us to
                  improve our services.
                </CheckItem>
                <CheckItem label="Communication:">
                  With your consent, we may use your information to send you valuable information
                  that we believe may be of interest to you. This includes updates about our
                  services or offerings from trusted partners. You have the option to opt out of
                  these communications at any time.
                </CheckItem>
                <CheckItem label="Research and Development:">
                  We may conduct research on user demographics and behaviour to better understand
                  our user base. This information is used to improve our services and develop new
                  features that cater to the needs of our Users.
                </CheckItem>
                <CheckItem label="Internal Record Keeping:">
                  Your information may be used for internal record-keeping purposes, ensuring
                  accurate and up-to-date records for our business operations.
                </CheckItem>
                <CheckItem label="Product and Service Enhancement:">
                  We may utilize the information we collect to assess and improve our products and
                  services. This includes analysing user feedback and preferences to provide a
                  better user experience.
                </CheckItem>
                <CheckItem label="Customization:">
                  We may use your information to personalize and customize your experience on our
                  Platform. This allows us to tailor the content and features to align with your
                  interests and preferences.
                </CheckItem>
              </ul>

              {/* ── Third party links ── */}
              <SectionBadge text="Does our Platforms have third party links?" />
              <Para>
                Our Platform may include links to third-party websites for your convenience and
                reference. However, please note that we do not have control over the content,
                policies, or practices of these third-party websites. The inclusion of such links
                does not imply any endorsement or responsibility on our part.
              </Para>
              <Para>
                When you access these third-party websites, you are subject to their respective
                terms of use and privacy policies. We encourage you to review and understand the
                terms and policies of these websites before engaging with them. We are not liable
                for any loss, damage, or consequences that may arise from your interactions with
                these third-party websites.
              </Para>

              {/* ── How do we store ── */}
              <SectionBadge text="How do we store your Information?" />
              <Para>
                We prioritize the secure storage of the information you provide. Your data is
                stored on secure servers, utilizing a range of security measures including
                firewalls, encryption, and physical access controls. We may also utilize trusted
                third-party platforms for storing and processing your information, subject to their
                applicable terms and policies. By using our Platform and submitting information,
                you acknowledge and consent to the storage and processing of your data. While we
                take reasonable steps to protect your privacy rights, please be aware that no
                method of storage or transmission is 100% secure.
              </Para>

              {/* ── How do we share ── */}
              <SectionBadge text="How do we share your Information?" />
              <Para>
                We value your trust and aim to provide transparency regarding the sharing of your
                information. The following outlines the instances and recipients with whom we may
                share your information:
              </Para>
              <ul className="space-y-1 mb-4">
                <CheckItem label="Authorized Third-Party Service Providers:">
                  We may share your information with trusted third-party vendors and service
                  providers who assist us with specialized services, such as billing, payment
                  processing, customer service, email deployment, analytics, marketing, advertising,
                  hosting, and data processing.
                </CheckItem>
                <CheckItem label="Corporate Affiliates:">
                  Your information may be shared with our corporate affiliates who are subject to
                  the same Policy.
                </CheckItem>
                <CheckItem label="Business Transfers:">
                  In the event of a significant corporate transaction, such as a website sale,
                  merger, consolidation, asset sale, or bankruptcy, your information may be shared
                  as part of the transfer process.
                </CheckItem>
                <CheckItem label="Legal Compliance:">
                  We may disclose information in response to legal requests, including court orders,
                  legal processes, law enforcement inquiries, government requests, or to protect and
                  defend our rights, interests, safety, security, and the rights of our Users or
                  the public.
                </CheckItem>
                <CheckItem label="Third-Party Platforms:">
                  We may utilize third-party platforms or servers, such as Microsoft Azure, for
                  storing, processing, and protecting your information. If we utilize such
                  platforms, their terms and policies will apply. For example, Microsoft Azure
                  secures and stores data in servers located in India.
                </CheckItem>
              </ul>
              <Para>
                Please note that in certain cases, we may need to share your personal information
                with law enforcement, legal authorities, or government agencies. These instances
                may arise from litigation, public or government requests, or national security
                reasons. We will disclose your information only to the relevant authorities and
                inform you of such events.
              </Para>
              <Para>
                Additionally, our products and services may contain links to third-party
                applications or resources. If you choose to visit or interact with these third
                parties and their affiliates, your data will be subject to their separate privacy
                policies. It is important to review and consider their privacy practices regarding
                the usage of your personal information. We do not have control or responsibility
                over data collected, stored, and managed by third parties.
              </Para>

              {/* ── How do we protect ── */}
              <SectionBadge text="How do we protect your Information?" />
              <Para>
                To safeguard your data, we have implemented security technologies, procedures, and
                measures. We are certified to the ISO 27001 standard, which is an international
                standard for information security management. This certification demonstrates our
                commitment to protecting your information. However, it is important to note that no
                method of data transmission or storage can guarantee absolute security. Despite our
                efforts, there are inherent risks associated with internet usage that could
                potentially compromise the security of your information. We are committed to
                regularly reviewing and enhancing our security practices to ensure the ongoing
                protection of your data.
              </Para>

              {/* ── Children ── */}
              <SectionBadge text="Do we collect Information belonging to Children?" />
              <Para>
                We do not knowingly collect personal information from children under the age of 13.
                If you are under 13, please do not provide any personal information on our
                Platform. If we discover that we have collected personal information from a child
                under 13 without parental consent, we will promptly delete that information from
                our records.
              </Para>
              <Para>
                While we make efforts to obtain parental permission before interviewing children,
                we cannot guarantee this in all cases, especially in online research where
                household email clients and internet environments may not be secured. Our Platform
                is exclusively open to individuals aged 13 and above. We do not seek direct contact
                with minors without appropriate permission from a guardian or adult.
              </Para>
              <Para>
                If you believe that we have inadvertently collected personal information from a
                child without proper consent, please contact us at{" "}
                <Link href="mailto:updates@trackopinion.com" className="text-accent underline hover:text-orange-700">
                  updates@trackopinion.com,
                </Link>{" "}
                and we will take immediate action to remove such information from our records.
              </Para>

              {/* ── Cookies ── */}
              <SectionBadge text="Do we use Cookies to track your Activity?" />
              <Para>
                To enhance and analyse our Platform, we utilize cookies and similar tracking
                technologies. These technologies, such as beacons, tags, and scripts, help us
                collect and track information for improved performance. Our use of cookies may
                include browser cookies, which are small files placed on your device. You have the
                option to configure your browser settings to refuse cookies or receive
                notifications when a cookie is being sent. However, please note that certain parts
                of our Platform may not be accessible without accepting cookies. For more
                information on our use of cookies, please refer to our Cookie Policy.
              </Para>

              {/* ── Google Tools ── */}
              <SectionBadge text="Do we use Google Tools?" />
              <Para>
                We use Google Analytics and Google Tag Manager on our Platform to gather
                information about your website usage. This includes tracking the pages you visit,
                the duration of your visit, and the links you click. The data collected helps us
                enhance our website and make it more relevant to your interests. It&apos;s important to
                note that the use of these tools is governed by Google&apos;s terms and policies. For a
                comprehensive understanding of their practices, we recommend reviewing Google&apos;s
                terms of service and privacy policy.
              </Para>

              {/* ── Data Protection Rights ── */}
              <SectionBadge text="What are your Data Protection Rights?" />
              <Para>As a user, you are entitled to the following:</Para>
              <ul className="space-y-1 mb-4">
                <CheckItem label="Right to Access:">
                  You have the right to request access to your personal data held by our Platform.
                  We may charge a small fee for this service.
                </CheckItem>
                <CheckItem label="Right to Rectification:">
                  If you believe that any of your personal data is inaccurate or incomplete, you
                  have the right to request its correction or completion.
                </CheckItem>
                <CheckItem label="Right to Erasure:">
                  Under certain conditions, you have the right to request the erasure of your
                  personal data from our Platform. Please contact us at{" "}
                  <Link href="mailto:updates@trackopinion.com" className="text-accent underline hover:text-orange-700">
                    updates@trackopinion.com
                  </Link>{" "}
                  to make this request.
                </CheckItem>
                <CheckItem label="Right to Restrict Processing:">
                  You have the right to request the restriction of processing your personal data,
                  subject to certain conditions.
                </CheckItem>
                <CheckItem label="Right to Object to Processing:">
                  You can object to the processing of your personal data by our Platform, under
                  certain conditions.
                </CheckItem>
                <CheckItem label="Right to Data Portability:">
                  You have the right to request the transfer of your collected data to another
                  organization or directly to yourself, under certain conditions.
                </CheckItem>
              </ul>
              <Para>
                If you make a request regarding any of these rights, we will respond within one
                month. To exercise these rights or seek further information, please contact us via
                our provided form or using our contact details.
              </Para>

              {/* ── Retention ── */}
              <SectionBadge text="For how long do we keep / retain the Information?" />
              <Para>
                We retain your information on our Platform for as long as necessary to provide the
                services you access and use. If a longer retention period is required by law or for
                legitimate business purposes, we will retain your personal data accordingly. Once
                the information is no longer needed for the specified purposes, it will be securely
                deleted or anonymised.
              </Para>

              {/* ── Changes to Policy ── */}
              <SectionBadge text="Changes to our Privacy Policy" />
              <Para>
                We regularly review and update our Policy, and any updates will be published on
                this webpage.
              </Para>

              {/* ── Acceptance ── */}
              <SectionBadge text="Your Acceptance of these Terms" />
              <Para>
                By accessing and using our Platform, you acknowledge and agree to abide by this
                Policy and our terms of service. If you do not agree with this Policy, we kindly
                request that you refrain from using our Platform. Your ongoing use of the Platform
                after any updates to this Policy have been posted will be considered as your
                acceptance of those changes.
              </Para>

              {/* ── Grievance Officer ── */}
              <SectionBadge text="Grievance Officer" />
              <Para>
                If you have any questions about this Policy or our practices, please contact us at:
              </Para>
              <Para>
                <Link href="mailto:updates@trackopinion.com" className="text-accent underline hover:text-orange-700">
                  updates@trackopinion.com
                </Link>
              </Para>

              {/* ── Contact Us ── */}
              <SectionBadge text="Contact Us" />
              <Para>
                If you have any questions, concerns, or requests regarding this Policy or Track
                Opinion&apos;s privacy practices, please contact us at{" "}
                <Link href="mailto:updates@trackopinion.com" className="text-accent underline hover:text-orange-700">
                  updates@trackopinion.com.
                </Link>{" "}
                We will be glad to assist you and address any issues promptly.
              </Para>
              <Para>
                Thank you for choosing Track Opinion. We are committed to maintaining the privacy
                and security of your information as we strive to provide you with valuable services
                and a trusted user experience.
              </Para>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
