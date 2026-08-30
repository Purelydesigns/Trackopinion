"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const certs = [
  { label: "ESOMAR Corporate", src: "/certification/ESOMAR_corporate2025_RGB.png" },
  { label: "GDPR Compliant", src: "/certification/GDPR.png" },
  { label: "Insights Association", src: "/certification/insights-association-logo-v2.png" },
  { label: "ISO 27001 Intercert", src: "/certification/iso 27001.png" },
  { label: "MRSI", src: "/certification/MRSI.png" },
  { label: "QUIRK'S Media", src: "/certification/Quirks.png" },
  { label: "HIPAA Compliance", src: "/certification/HIPAA.png" },
];

/**
 * Autoplaying certification logos.
 *
 * Split out of `Footer` so the footer itself — which is nothing but links and
 * text — can be a server component. Swiper was the only reason the whole
 * footer, on all 34 pages, was shipping as client JavaScript.
 */
export default function CertificationSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop
      slidesPerView={2}
      spaceBetween={32}
      breakpoints={{
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
      a11y={{ enabled: true }}
    >
      {certs.map((cert) => (
        <SwiperSlide key={cert.label}>
          <div className="h-20 flex items-center justify-center">
            <Image
              src={cert.src}
              alt={cert.label}
              width={160}
              height={80}
              sizes="160px"
              className="object-contain h-16 w-auto brightness-0 invert opacity-70 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
