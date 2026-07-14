"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface Cta {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface PageHeroProps {
  badge: string;
  heading: ReactNode;          // supports <span> for italic/colored word
  description: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  video?: string;              // defaults to /video/banner.mp4
  minHeight?: string;          // tailwind class e.g. "min-h-[680px]"
  breadcrumb?: string;         // e.g. "About Us"
}

export default function PageHero({
  badge,
  heading,
  description,
  primaryCta,
  secondaryCta,
  video = "/video/banner.mp4",
  minHeight = "min-h-[600px] sm:min-h-[720px]",
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className={`-mt-[76px] relative ${minHeight} flex items-center overflow-hidden`}>

      {/* Video background */}
      <video
        src={video}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Directional overlay — deep navy left → transparent right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(13,27,62,0.96) 0%, rgba(13,27,62,0.85) 30%, rgba(13,27,62,0.60) 55%, rgba(13,27,62,0.20) 80%, rgba(13,27,62,0.05) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative w-full site-container px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Breadcrumb */}
          {breadcrumb && (
            <p className="text-white/50 text-sm font-medium mb-5">
              Home / <span className="text-white/80">{breadcrumb}</span>
            </p>
          )}

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-7">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
              {badge}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            {heading}
          </h1>

          {/* Description */}
          <p className="text-white/70 text-base sm:text-lg leading-8 mb-10 max-w-xl">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            {primaryCta.href ? (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5 text-sm"
              >
                {primaryCta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={primaryCta.onClick}
                className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5 text-sm"
              >
                {primaryCta.label} <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {secondaryCta && (
              secondaryCta.href ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-sm"
                >
                  {secondaryCta.label}
                </Link>
              ) : (
                <button
                  onClick={secondaryCta.onClick}
                  className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-sm"
                >
                  {secondaryCta.label}
                </button>
              )
            )}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
