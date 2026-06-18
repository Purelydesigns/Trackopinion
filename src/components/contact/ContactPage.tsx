"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

/* ── Office data ── */
const offices = [
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-14 h-14 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="28" width="48" height="32" rx="2" />
        <path d="M4 28L32 8l28 20" />
        <rect x="24" y="40" width="16" height="20" />
        <rect x="14" y="34" width="10" height="10" />
        <rect x="40" y="34" width="10" height="10" />
      </svg>
    ),
    address: "607-608, Tower C, Nirvana Courtyard, Sector 50, Gurugram – 122018",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-14 h-14 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="20" width="56" height="40" rx="2" />
        <rect x="12" y="28" width="12" height="12" />
        <rect x="40" y="28" width="12" height="12" />
        <rect x="26" y="40" width="12" height="20" />
        <path d="M4 20V14a2 2 0 012-2h52a2 2 0 012 2v6" />
        <path d="M16 12V8M32 12V8M48 12V8" />
      </svg>
    ),
    address: "91 springboard, C2, Block C, Sector 1, Noida, Uttar Pradesh 201301",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-14 h-14 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M32 4C22 4 14 12 14 22c0 14 18 38 18 38s18-24 18-38c0-10-8-18-18-18z" />
        <circle cx="32" cy="22" r="6" />
        <path d="M20 56c-8 2-14 5-14 8h52c0-3-6-6-14-8" />
      </svg>
    ),
    address: "1401, 21st Street, STE R Sacramento, CA 95811",
  },
];

/* ── Field error ── */
function FieldError({ msg }: { msg: string }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

type Fields = { firstName: string; lastName: string; mobile: string; company: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

/* ── Main ── */
export default function ContactPage() {
  const [fields, setFields] = useState<Fields>({ firstName: "", lastName: "", mobile: "", company: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!fields.firstName.trim()) e.firstName = "First name is required.";
    if (!fields.lastName.trim())  e.lastName  = "Last name is required.";
    if (!fields.mobile.trim())    e.mobile    = "Mobile number is required.";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(fields.mobile)) e.mobile = "Enter a valid mobile number.";
    if (!fields.company.trim())   e.company   = "Company name is required.";
    if (!fields.message.trim())   e.message   = "Please tell us how we can help.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const inputClass = (field: keyof Errors) =>
    `w-full rounded-lg border ${errors[field] ? "border-red-400" : "border-gray-200"} bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary transition-colors`;

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <main>
      {/* ── Connect section ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Connect with the<br />TrackOpinion Team
            </h2>
            <p className="text-gray-500 text-base leading-7">
              Learn How TrackOpinion platform helps you continuously innovate and create the best customer experiences.
            </p>
          </motion.div>

          {/* Right — form card with gradient border */}
          <motion.div {...fadeUp}>
            <div
              className="rounded-2xl p-[6px]"
              style={{ background: "linear-gradient(160deg, #93c5fd 0%, #3b82f6 40%, #1e3a8a 100%)" }}
            >
              <div className="bg-white rounded-2xl p-8">
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-10 text-center">
                    <CheckCircle className="w-14 h-14 text-green-500" />
                    <h3 className="text-lg font-bold text-gray-900">Message Sent!</h3>
                    <p className="text-gray-500 text-sm">
                      Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFields({ firstName: "", lastName: "", mobile: "", company: "", message: "" }); }}
                      className="cursor-pointer mt-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-accent transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                    {/* Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">First Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="John" value={fields.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass("firstName")} />
                        <FieldError msg={errors.firstName ?? ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Doe" value={fields.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass("lastName")} />
                        <FieldError msg={errors.lastName ?? ""} />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                        <input type="tel" placeholder="67899754567" value={fields.mobile} onChange={(e) => set("mobile", e.target.value)} className={inputClass("mobile")} />
                        <FieldError msg={errors.mobile ?? ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Company Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="JohndoeLTD" value={fields.company} onChange={(e) => set("company", e.target.value)} className={inputClass("company")} />
                        <FieldError msg={errors.company ?? ""} />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1.5">How can we Help? <span className="text-red-500">*</span></label>
                      <textarea
                        rows={4}
                        placeholder="Let us know how we can help you?"
                        value={fields.message}
                        onChange={(e) => set("message", e.target.value)}
                        className={`${inputClass("message")} resize-none`}
                      />
                      <FieldError msg={errors.message ?? ""} />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="cursor-pointer bg-primary hover:bg-accent text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 text-sm flex items-center gap-2"
                    >
                      Submit &raquo;
                    </button>

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-500 leading-5">
                      By Clicking &ldquo;<strong>Submit</strong>&rdquo; I agree to receive updates about Trackopinion&apos;s product and services, and our{" "}
                      <Link href="/privacy" className="font-bold text-gray-900 hover:text-accent transition-colors">
                        Privacy policy
                      </Link>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Our Offices ── */}
      <section className="bg-gray-50 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-3xl font-black uppercase text-gray-900 text-center mb-10"
          >
            Our Offices
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10 text-center hover:shadow-md transition-shadow duration-300"
              >
                {office.icon}
                <p className="text-gray-900 text-base font-bold leading-7">{office.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSubscribe />
    </main>
  );
}
