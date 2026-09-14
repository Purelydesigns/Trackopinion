import Link from "next/link";
import {
  Award,
  Check,
  ExternalLink,
  FileText,
  Lock,
  Mail,
  Server,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteCard from "@/components/ui/SiteCard";
import { TRUST_EMAIL } from "@/lib/contactDetails";
import {
  CERTIFICATIONS,
  COMPLIANCE_FOOTPRINT,
  PRACTICE_GROUPS,
  TRUST_DOCUMENTS,
} from "@/lib/trust";

/** Icons keyed by name so the data file stays free of component imports. */
const CERT_ICONS: Record<string, LucideIcon> = {
  "ISO/IEC 27001": ShieldCheck,
  GDPR: Lock,
  HIPAA: Stethoscope,
  ESOMAR: Award,
  "Insights Association": Users,
  "Quirk's": FileText,
};

const PRACTICE_ICONS: Record<string, LucideIcon> = {
  "Data & privacy": Lock,
  "Infrastructure security": Server,
  "Organizational security": UserCheck,
  "Research integrity & panel quality": ShieldCheck,
};

/**
 * Trust Centre — the page procurement and security reviewers are sent to.
 *
 * Every card uses the shared `SiteCard` (navy top bar, lift on hover) so this
 * page reads as part of the same set as the solutions pages.
 *
 * A server component: all the content is static.
 */
export default function TrustCenter() {
  const requestHref = `mailto:${TRUST_EMAIL}?subject=${encodeURIComponent(
    "Document request — Track Opinion Trust Centre",
  )}`;

  return (
    <main>
      <PageHero
        breadcrumb="Trust Center"
        badge="Security & Compliance"
        heading={<>Trust Center</>}
        description="Track Opinion connects global brands and research agencies with real people across 36 countries. Handling that scale of personal data responsibly is core to how we operate — this page covers the certifications we hold, the policies we follow, and how panel and client data is protected on every project."
        primaryCta={{ label: "Request documents", href: requestHref }}
        secondaryCta={{ label: "Ask a question", href: "/contact-us" }}
        minHeight="min-h-[560px] sm:min-h-[660px]"
      />

      {/* ════════ CERTIFICATIONS ════════ */}
      <section className="bg-white py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Certifications & Affiliations"
            heading={<>Independently certified, industry affiliated</>}
            description="Our information security management system is independently certified. Our data handling practices are aligned to GDPR and HIPAA. We hold membership in the research industry's leading standards bodies."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {CERTIFICATIONS.map((cert) => {
              const Icon = CERT_ICONS[cert.name] ?? ShieldCheck;
              return (
                <SiteCard key={cert.name} className="flex flex-col h-full">
                  <div className="p-7 flex flex-col flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
                      <Icon aria-hidden className="w-9 h-9 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg leading-snug mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-4">
                      {cert.status}
                    </p>
                    <p className="text-gray-600 text-base leading-8 font-medium flex-1">
                      {cert.desc}
                    </p>
                  </div>
                </SiteCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ PRACTICES ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="How We Protect Your Data"
            heading={
              <>
                Practices, grouped the way
                <br />
                our auditors group them
              </>
            }
            description="The same categories our ISO 27001 audit and client security reviews use — data & privacy, infrastructure, people, and research integrity."
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            {PRACTICE_GROUPS.map((group) => {
              const Icon = PRACTICE_ICONS[group.title] ?? ShieldCheck;
              return (
                <SiteCard key={group.title} className="flex flex-col h-full">
                  <div className="p-7 flex flex-col flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
                      <Icon aria-hidden className="w-9 h-9 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">
                      {group.title}
                    </h3>
                    <ul className="flex-1 divide-y divide-gray-100">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                          <Check
                            aria-hidden
                            className="w-4 h-4 text-primary shrink-0 mt-1.5"
                            strokeWidth={3}
                          />
                          <span className="text-gray-600 text-base leading-8 font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SiteCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ DOCUMENTS ════════ */}
      <section className="bg-white py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Policies & Documents"
            heading={<>Documentation for procurement &amp; security review</>}
            description="Public documents are linked directly. Sensitive documents are shared on request so we know who's asking."
            align="left"
          />

          {/* A plain bordered list, not a SiteCard — a navy accent bar over
              eight unrelated documents reads as a heading for them, which it
              is not. The rows are the content here. */}
          <div className="mt-10 rounded-2xl border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {TRUST_DOCUMENTS.map((doc) => {
                const isPublic = Boolean(doc.href);
                const href = isPublic
                  ? doc.href!
                  : `${requestHref}%3A%20${encodeURIComponent(doc.name)}`;
                const inner = (
                  <>
                    <span className="flex items-center gap-3 min-w-0">
                      <FileText
                        aria-hidden
                        className="w-4 h-4 text-gray-400 shrink-0"
                        strokeWidth={1.75}
                      />
                      <span className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors duration-150">
                        {doc.name}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        isPublic
                          ? "bg-highlight text-primary"
                          : "border border-gray-200 text-gray-500"
                      }`}
                    >
                      {isPublic ? "Public" : "On request"}
                    </span>
                  </>
                );
                const cls =
                  "flex items-center justify-between gap-4 px-7 py-4 hover:bg-gray-50 transition-colors duration-150 group";

                return (
                  <li key={doc.name}>
                    {isPublic ? (
                      <Link href={href} className={cls}>
                        {inner}
                      </Link>
                    ) : (
                      <a href={href} className={cls}>
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="text-gray-600 text-base leading-8 font-medium mt-5">
            Need something not listed? Email{" "}
            <a
              href={requestHref}
              className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              {TRUST_EMAIL}
              <ExternalLink aria-hidden className="w-3.5 h-3.5" />
            </a>{" "}
            and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      {/* ════════ COMPLIANCE FOOTPRINT ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">
          <SectionHeader
            label="Global Compliance Footprint"
            heading={<>Compliance that travels with the fieldwork</>}
            align="left"
          />

          {/* A plain bordered panel, matching the documents list above: no
              card accent bar and no per-stat icons — the numbers are the
              content and anything else competes with them. */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white px-8 py-9 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {COMPLIANCE_FOOTPRINT.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-black text-primary tracking-tight tabular-nums leading-none">
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-sm font-medium mt-2.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-base leading-8 font-medium mt-9 pt-8 border-t border-gray-200">
              Track Opinion fields research across 36 countries. GDPR is our baseline for handling
              EU/UK respondent data, and data-handling practices are adapted to meet local privacy
              requirements wherever a project is fielded.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section className="py-14 bg-highlight">
        <div className="site-container px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Running a security review?
            </h2>
            <p className="text-gray-900 text-base leading-8 font-medium">
              Send us your questionnaire or request the documents you need — we&apos;ll turn it
              around with the evidence attached.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-3">
            <a
              href={requestHref}
              className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-white text-base font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Mail aria-hidden className="w-4 h-4" />
              Request documents
            </a>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 border border-primary/20 text-primary text-base font-bold px-8 py-4 rounded-lg hover:bg-white transition-all duration-300 whitespace-nowrap"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
