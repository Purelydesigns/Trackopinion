"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

/**
 * Track Opinion's customer id on D&B's seal service.
 *
 * `1` is the placeholder from the snippet this was built from, and D&B answers
 * it with a 500, so the seal renders as an empty tile until the real id goes
 * in here. Find it in the embed code on the D&B dashboard — it is the `Cid`
 * query parameter.
 */
const DUNS_CID = "1";

/** A logo we host, or a seal the issuer serves itself and must render intact. */
type Cert =
  | { label: string; src: string }
  | { label: string; embed: string; width: number; height: number };

const certs: Cert[] = [
  { label: "ESOMAR Corporate", src: "/certification/esomar_corporate2026.png" },
  { label: "Insights Association", src: "/certification/insights_association.png" },
  { label: "GDPR Compliant", src: "/certification/GDPR1.png" },
  { label: "ISO 27001 Intercert", src: "/certification/iso_27001.png" },
  { label: "MRSI", src: "/certification/MRSI_corporate_member.png" },
  { label: "QUIRK'S Media", src: "/certification/Quirks.png" },
  { label: "HIPAA Compliance", src: "/certification/hipaa_compliant.png" },
  {
    label: "D-U-N-S Registered",
    embed: `https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=${DUNS_CID}`,
    width: 114,
    height: 97,
  },
];

/* The seal is scaled to the height of the logo row and boxed at its scaled
   size, so it lines up with the others instead of overflowing the slide. */
const SEAL_SCALE = 0.78;

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
            {"embed" in cert ? (
              /* Left in its own colours on a white tile: it is an authentication
                 seal served by the issuer, not a logo to restyle, and the
                 silhouette treatment below would render it unreadable. */
              <div
                className="overflow-hidden rounded-md bg-white"
                style={{
                  width: Math.round(cert.width * SEAL_SCALE),
                  height: Math.round(cert.height * SEAL_SCALE),
                }}
              >
                <iframe
                  title={cert.label}
                  src={cert.embed}
                  width={cert.width}
                  height={cert.height}
                  loading="lazy"
                  scrolling="no"
                  className="block border-0 origin-top-left"
                  style={{ transform: `scale(${SEAL_SCALE})` }}
                />
              </div>
            ) : (
              <Image
                src={cert.src}
                alt={cert.label}
                width={160}
                height={80}
                sizes="160px"
                className="object-contain h-16 w-auto brightness-0 invert opacity-70 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300"
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
