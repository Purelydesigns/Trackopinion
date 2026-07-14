"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

export default function CareerCta() {
  return (
    <section className="bg-[#f3efe9] py-10 px-6">
      <div className="site-container">
        <div
          className="relative overflow-hidden rounded-2xl bg-primary px-8 py-12 flex flex-col items-center text-center gap-6"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(26,111,232,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(26,111,232,0.12) 0%, transparent 60%)",
          }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <SectionHeader
            label=""
            heading={<>Not ready to apply yet?</>}
            description="Follow us on LinkedIn to stay updated on new openings, company
              news, and research insights from the Track Opinion team."
            theme="dark"
          />

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3 rounded-lg hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0a66c2]" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow on LinkedIn
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              Contact HR Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
