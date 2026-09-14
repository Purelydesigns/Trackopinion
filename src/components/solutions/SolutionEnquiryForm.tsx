"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, CheckCircle, Send, X } from "lucide-react";
import HoneypotField, { useHoneypot } from "@/components/ui/HoneypotField";
import SelectField from "@/components/ui/SelectField";
import { LIMITS, submitLead, validateLead, type LeadErrors } from "@/lib/leads";
import { SERVICE_GROUPS, labelsFor, servicesForPath } from "@/lib/services";

const HEAR_OPTIONS = [
  "Search engine",
  "LinkedIn",
  "Colleague or referral",
  "Conference or event",
  "Social media",
  "Other",
];

type Fields = {
  name: string;
  company: string;
  designation: string;
  email: string;
  mobile: string;
  hear: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  company: "",
  designation: "",
  email: "",
  mobile: "",
  hear: "",
  message: "",
};

/**
 * The single enquiry form used across every solutions page.
 *
 * The service the visitor is currently reading about is ticked automatically
 * from the route, and they can add any number of others without leaving the
 * page — so one submission can cover a brief that spans several services.
 *
 * Pass `preselect` to override the route-derived default (useful on hub pages,
 * or anywhere the surrounding copy is about something other than the URL).
 */
export default function SolutionEnquiryForm({
  eyebrow = "Talk to us",
  heading = "Tell us what you need to find out",
  intro = "Pick the services you're interested in and share a little about the project. We reply within one working day.",
  preselect,
  className = "",
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  preselect?: string[];
  className?: string;
}) {
  const pathname = usePathname();

  const initial = useMemo(
    () => preselect ?? servicesForPath(pathname ?? ""),
    [preselect, pathname],
  );

  const [selected, setSelected] = useState<string[]>(initial);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors & { services?: string }>({});
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const honeypot = useHoneypot();

  function set(field: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
    setErrors((e) => ({ ...e, services: "" }));
  }

  function validate(): boolean {
    const shared = validateLead(
      {
        name: fields.name,
        email: fields.email,
        mobile: fields.mobile,
        company: fields.company,
        message: fields.message,
      },
      ["mobile", "company"],
    );
    const next: LeadErrors & { services?: string } = { ...shared };
    // The shared validator uses a generic message here; this form knows the field.
    if (next.company) next.company = "Company name is required.";
    if (selected.length === 0) next.services = "Choose at least one service.";

    setErrors(next);
    return Object.values(next).every((v) => !v);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setApiError("");

    const chosen = labelsFor(selected);
    const result = await submitLead({
      source: "solutions",
      name: fields.name.trim(),
      email: fields.email.trim(),
      mobile: fields.mobile.trim(),
      company: fields.company.trim(),
      message: [
        `Interested in: ${chosen.join(", ")}`,
        fields.designation.trim() ? `Designation: ${fields.designation.trim()}` : null,
        fields.hear ? `Heard about us via: ${fields.hear}` : null,
        fields.message.trim() ? `\n${fields.message.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      website: honeypot.value,
    });

    setSending(false);
    if (result.ok) {
      setSubmitted(true);
      return;
    }
    setErrors((prev) => ({ ...prev, ...result.errors }));
    setApiError(result.message);
  }

  const inputCls = (field: keyof Fields) =>
    `w-full rounded-lg border ${
      errors[field as keyof LeadErrors] ? "border-red-400" : "border-gray-200"
    } bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-accent transition-colors`;

  const labelCls =
    "block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5";

  return (
    <section className={`bg-section py-20 ${className}`} id="enquiry">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-start">
          {/* ── Left: pitch + service picker ── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3">
              {eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {heading}
            </h2>
            <p className="text-gray-600 text-base leading-8 mb-8 max-w-xl">{intro}</p>

            <fieldset>
              <legend className="sr-only">Services you are interested in</legend>
              <div className="flex flex-col gap-6">
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.title}>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                      {group.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.services.map((service) => {
                        const Icon = service.icon;
                        const on = selected.includes(service.id);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            role="checkbox"
                            aria-checked={on}
                            onClick={() => toggle(service.id)}
                            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                              on
                                ? "border-primary bg-primary text-white shadow-sm"
                                : "border-gray-200 bg-white text-gray-700 hover:border-primary/40 hover:text-primary"
                            }`}
                          >
                            {on ? (
                              <Check aria-hidden className="w-3.5 h-3.5 shrink-0" strokeWidth={3} />
                            ) : (
                              <Icon aria-hidden className="w-4 h-4 shrink-0 opacity-70" strokeWidth={1.75} />
                            )}
                            {service.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            {errors.services && (
              <p role="alert" className="text-red-600 text-sm mt-4">
                {errors.services}
              </p>
            )}
          </div>

          {/* ── Right: the form ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9 lg:sticky lg:top-28"
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-10">
                <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                  <CheckCircle aria-hidden className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-primary">Request received</h3>
                <p className="text-gray-500 text-sm leading-7 max-w-sm">
                  Thanks — we have your brief for{" "}
                  <strong className="text-gray-700">
                    {labelsFor(selected).join(", ")}
                  </strong>{" "}
                  and will reply within one working day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFields(EMPTY);
                    setSelected(initial);
                  }}
                  className="mt-2 text-sm font-semibold text-primary hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
                <HoneypotField {...honeypot.props} />

                <div>
                  <h3 className="text-lg font-bold text-gray-900">Request a proposal</h3>
                  <p className="text-sm text-gray-500 leading-6 mt-1">
                    No obligation — we&apos;ll come back with an approach and a timeline.
                  </p>
                </div>

                {/* Selected services, mirrored here so the choice is visible
                    beside the fields on a wide screen. */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <p className={labelCls}>Selected services</p>
                  {selected.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      Nothing chosen yet — pick one or more from the list.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selected.map((id) => {
                        const label = labelsFor([id])[0];
                        if (!label) return null;
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 pl-3 pr-1.5 py-1 text-xs font-semibold text-gray-700"
                          >
                            {label}
                            <button
                              type="button"
                              onClick={() => toggle(id)}
                              aria-label={`Remove ${label}`}
                              className="w-4 h-4 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                            >
                              <X aria-hidden className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} htmlFor="enq-name">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="enq-name"
                      type="text"
                      autoComplete="name"
                      maxLength={LIMITS.name}
                      placeholder="Jane Smith"
                      value={fields.name}
                      onChange={(e) => set("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      className={inputCls("name")}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="enq-company">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="enq-company"
                      type="text"
                      autoComplete="organization"
                      maxLength={LIMITS.company}
                      placeholder="Acme Corp"
                      value={fields.company}
                      onChange={(e) => set("company", e.target.value)}
                      aria-invalid={Boolean(errors.company)}
                      className={inputCls("company")}
                    />
                    {errors.company && (
                      <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} htmlFor="enq-email">
                      Work email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="enq-email"
                      type="email"
                      autoComplete="email"
                      maxLength={LIMITS.email}
                      placeholder="jane@acme.com"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      className={inputCls("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="enq-mobile">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="enq-mobile"
                      type="tel"
                      autoComplete="tel"
                      maxLength={LIMITS.mobile}
                      placeholder="+91 98765 43210"
                      value={fields.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                      aria-invalid={Boolean(errors.mobile)}
                      className={inputCls("mobile")}
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} htmlFor="enq-designation">
                      Designation
                    </label>
                    <input
                      id="enq-designation"
                      type="text"
                      autoComplete="organization-title"
                      maxLength={LIMITS.company}
                      placeholder="Research Manager"
                      value={fields.designation}
                      onChange={(e) => set("designation", e.target.value)}
                      className={inputCls("designation")}
                    />
                  </div>
                  <SelectField
                    label="How did you hear about us?"
                    labelClassName={labelCls}
                    value={fields.hear}
                    onChange={(v) => set("hear", v)}
                    options={HEAR_OPTIONS}
                  />
                </div>

                <div>
                  <label className={labelCls} htmlFor="enq-message">
                    About your project
                  </label>
                  <textarea
                    id="enq-message"
                    rows={4}
                    maxLength={LIMITS.message}
                    placeholder="Markets, audience, sample size, timings — whatever you have so far."
                    value={fields.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${inputCls("message")} resize-none`}
                  />
                </div>

                {apiError && (
                  <p role="alert" className="text-red-600 text-sm">
                    {apiError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary py-4 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-60 disabled:active:scale-100"
                >
                  <Send aria-hidden className="w-4 h-4" />
                  {sending ? "Sending…" : "Send request"}
                </button>

                <p className="text-xs text-gray-500 leading-5">
                  By submitting you agree to our{" "}
                  <Link href="/privacy" className="font-semibold text-primary hover:underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
