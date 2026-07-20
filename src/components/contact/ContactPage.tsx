"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Phone, Mail} from "lucide-react";
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

type Fields = { firstName: string; lastName: string; email: string; mobile: string; company: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

/* ── Main ── */
export default function ContactPage() {
  const [fields, setFields] = useState<Fields>({ firstName: "", lastName: "", email: "", mobile: "", company: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function set(field: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!fields.firstName.trim()) e.firstName = "First name is required.";
    if (!fields.lastName.trim())  e.lastName  = "Last name is required.";
    if (!fields.email.trim())     e.email     = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email address.";
    if (!fields.mobile.trim())    e.mobile    = "Mobile number is required.";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(fields.mobile)) e.mobile = "Enter a valid mobile number.";
    if (!fields.company.trim())   e.company   = "Company name is required.";
    if (!fields.message.trim())   e.message   = "Please tell us how we can help.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fields.firstName,
          lastName:  fields.lastName,
          email:     fields.email,
          mobile:    fields.mobile,
          company:   fields.company,
          message:   fields.message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
      {/* ── Banner ── */}
      <div className="-mt-[76px] bg-primary min-h-[500px] sm:min-h-[600px] flex items-center relative overflow-hidden">
        <video
          src="/video/banner.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative w-full site-container px-6 pt-[76px]">
          <p className="text-white/60 text-sm font-medium mb-6">
            Home / <span className="text-white">Contact Us</span>
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-6">
            Let&apos;s Start a{" "}
            <span className="italic font-normal">Conversation</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-8 mb-10 max-w-xl">
            Have a research question or want to explore how Track Opinion can help your business? Our experts are ready — we respond within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact-form" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Send a Message →
            </a>
            <a href="tel:+911234567890" className="inline-flex items-center gap-2 bg-transparent border border-white/50 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300">
              <Phone className="w-4 h-4 text-white" /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* ── Connect section ── */}
      <section className="bg-gray-50 py-20">
        <div className="site-container px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div {...fadeUp}>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Reach Out</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Connect with the<br />TrackOpinion Team
            </h2>
            <p className="text-gray-500 text-base leading-7 mb-8">
              Learn How TrackOpinion platform helps you continuously innovate and create the best customer experiences.
            </p>

            {/* Call & Email */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <a href="tel:+911244567890" className="flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 hover:border-primary hover:shadow-sm transition-all duration-200 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-200">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Call Us</p>
                  <p className="text-sm font-semibold text-gray-900">+91 124 456 7890</p>
                </div>
              </a>
              <a href="mailto:info@trackopinion.com" className="flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 hover:border-primary hover:shadow-sm transition-all duration-200 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-200">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Us</p>
                  <p className="text-sm font-semibold text-gray-900">info@trackopinion.com</p>
                </div>
              </a>
            </div>

            {/* Follow us */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-gray-500 mr-1">Follow us:</p>
              {[
                { href: "https://linkedin.com", icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8.5h4.5V24H.25V8.5zM8.5 8.5h4.31v2.13h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.94c0-1.89-.03-4.33-2.64-4.33-2.64 0-3.04 2.06-3.04 4.19V24H8.5V8.5z" /></svg> },
                { href: "https://twitter.com", icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.728-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                { href: "https://facebook.com", icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg> },
                { href: "https://instagram.com", icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
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
                      onClick={() => { setSubmitted(false); setFields({ firstName: "", lastName: "", email: "", mobile: "", company: "", message: "" }); }}
                      className="cursor-pointer mt-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary transition-colors"
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

                    {/* Row 2 — Email + Mobile */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" placeholder="john@company.com" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
                        <FieldError msg={errors.email ?? ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                        <input type="tel" placeholder="+91 98765 43210" value={fields.mobile} onChange={(e) => set("mobile", e.target.value)} className={inputClass("mobile")} />
                        <FieldError msg={errors.mobile ?? ""} />
                      </div>
                    </div>

                    {/* Row 3 — Company */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1.5">Company Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Your Company Ltd." value={fields.company} onChange={(e) => set("company", e.target.value)} className={inputClass("company")} />
                      <FieldError msg={errors.company ?? ""} />
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

                    {/* API error */}
                    {apiError && (
                      <p className="text-red-500 text-sm">{apiError}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="cursor-pointer bg-primary hover:bg-primary text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending…" : <>Submit &raquo;</>}
                    </button>

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-500 leading-5">
                      By Clicking &ldquo;<strong>Submit</strong>&rdquo; I agree to receive updates about Trackopinion&apos;s product and services, and our{" "}
                      <Link href="/privacy" className="font-bold text-gray-900 hover:text-primary transition-colors">
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
        <div className="site-container px-6">
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
