"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-14" style={{ backgroundColor: "#dde4f0" }}>
      <div className="max-w-7xl mx-auto px-6">
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
              Subscribe for Updates: Stay informed about the latest investor
              updates, financial results, and announcements by subscribing to
              our newsletter.
            </p>
          </div>

          {/* Right — form */}
          <div className="w-full md:w-auto md:min-w-[500px]">
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-600 font-semibold text-center py-4"
              >
                ✅ Thank you for subscribing!
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex rounded-xl overflow-hidden shadow-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-5 text-base text-gray-700 bg-white outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-accent text-white text-base font-bold px-10 py-5 transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
