"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const logos = [
  { name: "Google",   text: "text-[#4285F4] font-bold",              label: "Google"  },
  { name: "Netflix",  text: "text-[#E50914] font-extrabold",          label: "NETFLIX" },
  { name: "CEAT",     text: "text-[#003087] font-bold tracking-wide", label: "C≡AT"    },
  { name: "Google2",  text: "text-[#4285F4] font-bold",              label: "Google"  },
  { name: "CEAT2",    text: "text-[#003087] font-bold tracking-wide", label: "C≡AT"    },
  { name: "Netflix2", text: "text-[#E50914] font-extrabold",          label: "NETFLIX" },
];

export default function TrustedBy({
  heading = "Trusted By",
  navPrefix = "trusted",
  showWorldTagline = true,
  containerPadding = "px-8 sm:px-16",
}: {
  heading?: string;
  navPrefix?: string;
  showWorldTagline?: boolean;
  containerPadding?: string;
}) {
  const prevId = `${navPrefix}-prev`;
  const nextId = `${navPrefix}-next`;

  return (
    <section className="bg-section py-16">

      {/* ── Heading ── */}
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-center text-gray-900 mb-10">
        {heading}
      </h2>

      {/* ── Slider ── */}
      <div className="max-w-7xl mx-auto px-6 relative">

        <button
          id={prevId}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          id={nextId}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className={`${containerPadding} [overflow-x:clip]`}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          centeredSlides
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640:  { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
          className="py-4 trusted-swiper"
        >
          {logos.map((logo, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div
                  className="w-full h-24 flex items-center justify-center bg-white rounded-2xl transition-all duration-500"
                  style={{
                    boxShadow: isActive
                      ? "4px 6px 0px rgba(0,0,0,0.18)"
                      : "4px 6px 0px rgba(0,0,0,0.08)",
                    opacity: isActive ? 1 : 0.8,
                  }}
                >
                  <span className={`${logo.text} select-none transition-all duration-500 ${isActive ? "text-3xl scale-125" : "text-lg scale-100"}`}>
                    {logo.label}
                  </span>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>

      {/* ── World tagline ── */}
      {showWorldTagline && <div className="mt-12 relative overflow-hidden bg-section">
        <img
          src="/images/map.png"
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] pointer-events-none select-none"
        />
        <div className="relative max-w-7xl mx-auto px-6 py-14 text-center">
          <p className="text-primary font-extrabold uppercase mb-4 text-lg">
            We Work for Clients Around the World
          </p>
          <p className="text-gray-500 font-bold mx-auto leading-8 text-lg sm:text-xl md:text-2xl">
            Global reach for market research in all major languages
            <br /> with translation facilities.
          </p>
        </div>
      </div>}

    </section>
  );
}
