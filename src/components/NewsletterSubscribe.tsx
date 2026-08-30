"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import HoneypotField, { useHoneypot } from "@/components/ui/HoneypotField";
import { EMAIL_RE, submitLead } from "@/lib/leads";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const honeypot = useHoneypot();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_RE.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }

    setSending(true);
    setError("");

    const result = await submitLead({
      source: "newsletter",
      // The upstream record needs a name; the address is the only thing asked for.
      name: trimmed.split("@")[0],
      email: trimmed,
      message: "Newsletter subscription request.",
      website: honeypot.value,
    });

    setSending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.errors.email ?? result.message);
  }

  return (
    <section className="py-16 bg-highlight">
      <div className="site-container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left — text */}
          <div className="md:max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Subscribe to our Newsletter
            </h3>
            <p className="text-gray-500 text-base leading-8">
              Subscribe for Updates: Stay informed about the latest investor updates,
              financial results, and announcements by subscribing to our newsletter.
            </p>
          </div>

          {/* Right — form */}
          <div className="w-full md:w-auto md:min-w-[500px]">
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                className="text-green-700 font-semibold text-center py-4"
              >
                Thank you for subscribing — we&apos;ll be in touch.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative">
                <HoneypotField {...honeypot.props} />
                <div className="flex rounded-xl overflow-hidden shadow-md">
                  <label className="sr-only" htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-5 text-base text-gray-700 bg-white outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-primary text-white text-base font-bold px-10 py-5 transition-opacity duration-300 whitespace-nowrap disabled:opacity-60"
                  >
                    {sending ? "Subscribing…" : "Subscribe"}
                  </button>
                </div>
                {error && (
                  <p id="newsletter-error" role="alert" className="text-red-600 text-sm mt-2">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
