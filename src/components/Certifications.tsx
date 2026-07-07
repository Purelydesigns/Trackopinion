"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

const certs = [
  { label: "ISO 27001",            src: "/certification/iso 27001.png"                  },
  { label: "HIPAA Compliance",     src: "/certification/hipaa.png"                      },
  { label: "ESOMAR Corporate",     src: "/certification/ESOMAR_corporate2025_RGB.png"   },
  { label: "GDPR Compliant",       src: "/certification/GDPR.png"                       },
  { label: "Insights Association", src: "/certification/insights-association-logo-v2.png" },
  { label: "MRSI",                 src: "/certification/MRSI.png"                       },
  { label: "QUIRK'S Media",        src: "/certification/Quirks.png"                     },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-8">
      <div className="site-container px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
            Certification &amp; Affiliations
          </h2>
        </motion.div>

        <div className="relative px-8 sm:px-12">

          <button
            id="cert-prev"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            id="cert-next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: "#cert-prev", nextEl: "#cert-next" }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            slidesPerView={2}
            spaceBetween={24}
            breakpoints={{
              640:  { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
            }}
            className="py-4"
          >
            {certs.map((cert, i) => (
              <SwiperSlide key={i}>
                <div className="h-20 flex items-center justify-center">
                  <Image
                    src={cert.src}
                    alt={cert.label}
                    width={140}
                    height={80}
                    className="object-contain h-16 w-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
