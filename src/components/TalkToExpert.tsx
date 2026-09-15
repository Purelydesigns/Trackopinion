"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Headset, Send, X } from "lucide-react";
import HoneypotField, { useHoneypot } from "@/components/ui/HoneypotField";
import { LIMITS, submitLead, validateLead, type LeadErrors } from "@/lib/leads";

type Fields = {
  name: string;
  email: string;
  mobile: string;
  company: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", mobile: "", company: "", message: "" };

/**
 * Floating "Talk to an expert" button, bottom-right on every page, opening a
 * centred contact form.
 *
 * Submits through the same `/api/lead` route as every other form on the site,
 * so it gets the same server-side validation, rate limiting and honeypot.
 */
export default function TalkToExpert() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const honeypot = useHoneypot();

  /**
   * The button is navy and the footer is navy, so parking one over the other
   * both hid the button and covered the footer's last link. It steps aside
   * once the footer comes into view — the footer has its own contact links,
   * so nothing is lost.
   */
  const [footerVisible, setFooterVisible] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    // A passive scroll listener, reading the footer's top edge directly.
    // Deliberately not throttled through requestAnimationFrame: rAF is paused
    // in a hidden or backgrounded tab, which left the button stuck in whatever
    // state it had when the tab lost focus. One getBoundingClientRect per
    // scroll event on a single element is cheap, and React bails out of the
    // render when the boolean has not changed.
    const check = () => {
      // Step aside a little before the footer's edge reaches the button.
      setFooterVisible(footer.getBoundingClientRect().top < window.innerHeight - 80);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Send focus back where it came from, so keyboard users are not dropped
    // at the top of the document.
    triggerRef.current?.focus();
  }, []);

  /* Escape to close, and a focus trap while the dialog is open. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  /* Stop the page scrolling behind the dialog. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Focus the first field once the dialog has mounted. */
  useEffect(() => {
    if (open && !submitted) {
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [open, submitted]);

  function set(field: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const found = validateLead(fields, ["mobile", "message"]);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setSending(true);
    setApiError("");

    const result = await submitLead({
      source: "talk-to-expert",
      name: fields.name.trim(),
      email: fields.email.trim(),
      mobile: fields.mobile.trim(),
      company: fields.company.trim(),
      message: fields.message.trim(),
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
      errors[field] ? "border-red-400" : "border-gray-200"
    } bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary transition-colors`;

  const labelCls =
    "block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5";

  return (
    <>
      {/* ── Floating trigger ── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-hidden={footerVisible && !open}
        tabIndex={footerVisible && !open ? -1 : 0}
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-primary pl-5 pr-6 py-4 text-sm font-bold text-white shadow-lg ring-1 ring-white/15 transition-all duration-300 hover:opacity-95 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          footerVisible && !open
            ? "opacity-0 translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <Headset aria-hidden className="w-5 h-5" strokeWidth={1.75} />
        <span className="hidden sm:inline">Talk to an Expert</span>
        <span className="sr-only sm:hidden">Talk to an Expert</span>
      </button>

      {/* ── Dialog ── */}
      {/* Rendered conditionally rather than through AnimatePresence. With an
          exit animation the full-screen wrapper was left mounted at full
          opacity and `pointer-events: auto` after closing — an invisible layer
          swallowing every click on the page. Unmounting outright cannot do
          that; the entrance animation, which is the one you notice, stays. */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
              onClick={close}
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tte-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-7 py-5">
                <div>
                  <h2 id="tte-title" className="text-lg font-bold text-gray-900">
                    Talk to an expert
                  </h2>
                  <p className="text-sm text-gray-500 leading-6 mt-0.5">
                    Tell us what you need and we&apos;ll reply within one working day.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  <X aria-hidden className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 px-7 py-12">
                  <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                    <CheckCircle aria-hidden className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Message received</h3>
                  <p className="text-sm text-gray-500 leading-7 max-w-xs">
                    Thanks — one of our research experts will be in touch within one working day.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-2 px-8 py-3 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="relative px-7 py-6 flex flex-col gap-4">
                  <HoneypotField {...honeypot.props} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} htmlFor="tte-name">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={firstFieldRef}
                        id="tte-name"
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
                      <label className={labelCls} htmlFor="tte-company">
                        Company
                      </label>
                      <input
                        id="tte-company"
                        type="text"
                        autoComplete="organization"
                        maxLength={LIMITS.company}
                        placeholder="Acme Corp"
                        value={fields.company}
                        onChange={(e) => set("company", e.target.value)}
                        className={inputCls("company")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} htmlFor="tte-email">
                        Work email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="tte-email"
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
                      <label className={labelCls} htmlFor="tte-mobile">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="tte-mobile"
                        type="tel"
                        autoComplete="tel"
                        maxLength={LIMITS.mobile}
                        placeholder="+91 98765 43210"
                        value={fields.mobile}
                        onChange={(e) => set("mobile", e.target.value)}
                        aria-invalid={Boolean(errors.mobile)}
                        className={inputCls("mobile")}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="tte-message">
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="tte-message"
                      rows={4}
                      maxLength={LIMITS.message}
                      placeholder="Markets, audience, timings — whatever you have so far."
                      value={fields.message}
                      onChange={(e) => set("message", e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      className={`${inputCls("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {apiError && (
                    <p role="alert" className="text-red-600 text-sm">
                      {apiError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-60 disabled:active:scale-100"
                  >
                    <Send aria-hidden className="w-4 h-4" />
                    {sending ? "Sending…" : "Send message"}
                  </button>

                  <p className="text-xs text-gray-500 leading-5">
                    By submitting you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-primary hover:underline"
                      onClick={close}
                    >
                      privacy policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </motion.div>
        </div>
      )}
    </>
  );
}
