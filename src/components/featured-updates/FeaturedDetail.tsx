"use client";

import { motion } from "framer-motion";
import { Calendar, Share2, Check } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ── Image Carousel using Swiper ── */
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
    <li className="flex gap-4 items-start py-4 border-b border-gray-100 last:border-0">
      <span className="w-6 h-6 rounded-full border-2 border-[#0d1b3e] flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-[#0d1b3e]" strokeWidth={3} />
      </span>
      <span className="text-gray-700 text-sm leading-7">{children}</span>
    </li>
  );
}

/* ── Main ── */
export default function FeaturedDetail() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Article header ── */}
        <motion.div {...fadeUp} className="pt-12 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            David Solomon: Europe Has an Opportunity to Seize
          </h1>

          {/* Date + share */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>24.03.2026</span>
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-[#0d1b3e] transition text-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>

        {/* ── Image Carousel ── */}
        <motion.div {...fadeUp} className="mb-10">
          <ImageCarousel />
        </motion.div>

        {/* ── Source badge ── */}
        <motion.div {...fadeUp} className="mb-8">
          <span className="inline-block bg-[#e8ecf8] text-[#0d1b3e] text-sm font-semibold px-5 py-2.5 rounded-lg">
            This opinion article was originally published in Les Echos on June 24, 2025
          </span>
        </motion.div>

        {/* ── Content — checkmark list ── */}
        <motion.div {...fadeUp} className="pb-16">
          <ul className="divide-y divide-gray-100">
            <CheckItem>
              One of the most striking things about my conversations with CEOs at the beginning of the year was the deep pessimism about Europe. While it is important not to understate the challenges still facing the Continent, especially as conflict continues both on the Continent and in the Middle East, that negativity has undergone a remarkable reversal
            </CheckItem>
            <CheckItem>
              As I convene our Board of Directors in Paris this week, it&apos;s clear to us that this nascent optimism presents an opportunity. European nations are making meaningful strides towards a more cohesive defence policy, and the Continent would also benefit from making more cohesive economic and financial strides—especially by reducing cross-border frictions and harnessing the power of a more integrated capital market and banking union
            </CheckItem>
            <CheckItem>
              I see reasons to be encouraged that Europe can make progress.
            </CheckItem>
            <CheckItem>
              EU leaders clearly recognise that greater autonomy in the realm of defence and security is both a strategic and economic imperative
            </CheckItem>
            <CheckItem>
              First, the agreement of a new spending target among NATO members, and the historic shift in Germany&apos;s positioning earlier this year, is testament to a fundamental change in mindset. As defence expenditures accelerate, the Eurozone is forecast to grow at a faster rate than predicted just a few months ago, with this fiscal expansion as a tailwind
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
              Finally, Europe benefits from a rich talent pool. Its schools and universities, especially for business and engineering, are globally competitive. It does not lack for hungry and driven young professionals who are the foundation of firms like ours
            </CheckItem>
            <CheckItem>
              ECB President Christine Lagarde and European Commission President Ursula von der Leyen have recently made the same point: Per million inhabitants, the EU produces almost as many science, technology, engineering, and mathematics graduates as the US
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
