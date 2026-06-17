"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop + centering wrapper — click outside closes */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
          {/* Modal card — stop propagation so clicking inside doesn't close */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            <div className="bg-primary rounded-2xl w-full p-8 md:p-10 shadow-2xl relative">

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-8">Contact us !</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center text-white"
                >
                  <p className="text-4xl mb-3">✅</p>
                  <p className="text-lg font-semibold">Thank you! We&apos;ll be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-semibold mb-2">
                        First Name<span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/30 text-white text-sm py-2 placeholder:text-white/30 outline-none focus:border-orange-400 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-semibold mb-2">
                        Last Name<span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/30 text-white text-sm py-2 placeholder:text-white/30 outline-none focus:border-orange-400 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-semibold mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Name"
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/30 text-white text-sm py-2 placeholder:text-white/30 outline-none focus:border-orange-400 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-semibold mb-2">
                        Company Name<span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Company Name"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/30 text-white text-sm py-2 placeholder:text-white/30 outline-none focus:border-orange-400 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/80 text-sm font-semibold mb-2">
                      How can we Help?
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Let us know how we can help you?"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/30 text-white text-sm py-2 placeholder:text-white/30 outline-none focus:border-orange-400 transition-colors duration-300 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="bg-white text-primary font-bold text-sm px-8 py-3 rounded-lg hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    Submit <span className="text-base">»</span>
                  </button>

                  {/* Disclaimer */}
                  <p className="text-white/40 text-xs leading-6">
                    By Clicking &ldquo;<strong className="text-white/60">Submit</strong>&rdquo; I agree to receive updates
                    about Trackopinion&apos;s product and services, and our{" "}
                    <Link href="/privacy" className="text-white/60 underline hover:text-white transition">
                      Privacy policy
                    </Link>
                    .
                  </p>

                </form>
              )}
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
