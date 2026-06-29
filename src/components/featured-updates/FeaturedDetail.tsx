"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Share2, Check, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ── Share Popover ── */
const shareLinks = [
  {
    label: "LinkedIn",
    color: "hover:bg-[#0077b5] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8.5h4.5V24H.25V8.5zM8.5 8.5h4.31v2.13h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.94c0-1.89-.03-4.33-2.64-4.33-2.64 0-3.04 2.06-3.04 4.19V24H8.5V8.5z" />
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    label: "Twitter / X",
    color: "hover:bg-black hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.728-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Facebook",
    color: "hover:bg-[#1877f2] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    color: "hover:bg-[#25d366] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    label: "Email",
    color: "hover:bg-primary hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
    href: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

function SharePopover({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const url = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-900 font-medium hover:text-primary transition text-base"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-900">Share this article</p>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href(url, title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 text-gray-500 transition-all duration-200 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-xs text-gray-500 truncate flex-1">{url}</span>
              <button
                onClick={copyLink}
                className="text-xs font-bold text-primary hover:text-primary shrink-0 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Image Carousel ── */
const images = [
  "https://picsum.photos/seed/conference1/800/500",
  "https://picsum.photos/seed/meeting2/800/500",
  "https://picsum.photos/seed/event3/800/500",
  "https://picsum.photos/seed/seminar4/800/500",
  "https://picsum.photos/seed/workshop5/800/500",
];

function ImageCarousel() {
  return (
    <div className="w-full relative pb-10 overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        grabCursor
        centeredSlides
        loop
        slidesPerView={1.1}
        spaceBetween={16}
        pagination={{
          clickable: true,
          renderBullet: (_index: number, className: string) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640:  { slidesPerView: 1.8, spaceBetween: 16 },
          1024: { slidesPerView: 2.1, spaceBetween: 20 },
        }}
        className="w-full featured-carousel"
        style={{ alignItems: "flex-end" }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} style={{ height: "380px", display: "flex", alignItems: "center" }}>
            {({ isActive }) => (
              <div
                className="overflow-hidden rounded-2xl transition-all duration-500 w-full"
                style={{
                  height: isActive ? "380px" : "300px",
                  boxShadow: isActive
                    ? "0 8px 30px rgba(0,0,0,0.18)"
                    : "0 2px 10px rgba(0,0,0,0.08)",
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .featured-carousel {
          overflow: hidden !important;
          padding-bottom: 2.5rem !important;
        }
        .custom-bullet {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #d1d5db;
          border-radius: 9999px;
          opacity: 1;
          transition: all 0.3s;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active.custom-bullet {
          width: 24px;
          background: #f97316;
          border-radius: 9999px;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </div>
  );
}

/* ── Check item ── */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start py-5 border-b border-gray-100 last:border-0">
      <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
      </span>
      <span className="text-gray-900 text-base leading-8 font-medium">{children}</span>
    </li>
  );
}

const TITLE = "David Solomon: Europe Has an Opportunity to Seize";

/* ── Main ── */
export default function FeaturedDetail() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <main className="-mt-[76px] bg-white">
      <div className="max-w-[1536px] mx-auto px-6">

        {/* ── Article header ── */}
        <motion.div {...fadeUp} className="pt-[calc(76px+3rem)] pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {TITLE}
          </h1>

          {/* Date + share */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 text-gray-900 text-base font-medium">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>24.03.2026</span>
            </div>
            <SharePopover title={TITLE} />
          </div>
        </motion.div>

        {/* ── Image Carousel ── */}
        <motion.div {...fadeUp} className="mb-10">
          <ImageCarousel />
        </motion.div>

        {/* ── Source badge ── */}
        <motion.div {...fadeUp} className="mb-8">
          <span className="inline-block bg-highlight text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-lg">
            This opinion article was originally published in Les Echos on June 24, 2025
          </span>
        </motion.div>

        {/* ── Content — checkmark list ── */}
        <motion.div {...fadeUp} className="pb-16">
          <ul>
            <CheckItem>
              One of the most striking things about my conversations with CEOs at the beginning of the year was the deep pessimism about Europe. While it is important not to understate the challenges still facing the Continent, especially as conflict continues both on the Continent and in the Middle East, that negativity has undergone a remarkable reversal.
            </CheckItem>
            <CheckItem>
              As I convene our Board of Directors in Paris this week, it&apos;s clear to us that this nascent optimism presents an opportunity. European nations are making meaningful strides towards a more cohesive defence policy, and the Continent would also benefit from making more cohesive economic and financial strides—especially by reducing cross-border frictions and harnessing the power of a more integrated capital market and banking union.
            </CheckItem>
            <CheckItem>
              I see reasons to be encouraged that Europe can make progress.
            </CheckItem>
            <CheckItem>
              EU leaders clearly recognise that greater autonomy in the realm of defence and security is both a strategic and economic imperative.
            </CheckItem>
            <CheckItem>
              First, the agreement of a new spending target among NATO members, and the historic shift in Germany&apos;s positioning earlier this year, is testament to a fundamental change in mindset. As defence expenditures accelerate, the Eurozone is forecast to grow at a faster rate than predicted just a few months ago, with this fiscal expansion as a tailwind.
            </CheckItem>
            <CheckItem>
              To be clear, prolonged war benefits no one. We are hopeful for swift and peaceful resolutions to the current conflicts.
            </CheckItem>
            <CheckItem>
              Second, Europe retains important strengths. While international investors would like to see faster action, reforms in recent years by individual countries have improved tax regimes to attract talent and Europe remains one of the richest and largest economies in the world.
            </CheckItem>
            <CheckItem>
              Our experience is a case in point. Over the last few years, Goldman Sachs has significantly scaled up our operations across Europe—from Warsaw to Frankfurt, and Milan to The Hague. Here in Paris, we opened a new office to accommodate our growing footprint, with almost 500 positions now on the ground and all our business lines represented in the city. This would not have been possible without the positive reform agenda in France.
            </CheckItem>
            <CheckItem>
              Finally, Europe benefits from a rich talent pool. Its schools and universities, especially for business and engineering, are globally competitive. It does not lack for hungry and driven young professionals who are the foundation of firms like ours.
            </CheckItem>
            <CheckItem>
              ECB President Christine Lagarde and European Commission President Ursula von der Leyen have recently made the same point: Per million inhabitants, the EU produces almost as many science, technology, engineering, and mathematics graduates as the US.
            </CheckItem>
            <CheckItem>
              The open question is why these strengths have not translated to the same level of economic and entrepreneurial dynamism as in the United States.
            </CheckItem>
            <CheckItem>
              I believe Europe can achieve economic dynamism, but only if more decisive actions are taken to unlock the full potential of the European market.
            </CheckItem>
          </ul>
        </motion.div>

      </div>
    </main>
  );
}
