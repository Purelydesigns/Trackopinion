"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const aboutLinks = [
  { label: "About Company",   href: "/about"   },
  { label: "Our Affiliates",  href: "/about"   },
  { label: "Contact Us",      href: "/contact" },
  { label: "Career",          href: "/career"  },
  { label: "Meet Our Team",   href: "/about"   },
  { label: "Terms of Services", href: "/terms" },
];

const serviceLinks = [
  { label: "Global Panel",        href: "/solutions" },
  { label: "Research Services",   href: "/solutions" },
  { label: "Enterprises Solution", href: "/solutions" },
  { label: "CATI Solutions",      href: "/solutions" },
  { label: "Healthcare Research", href: "/solutions" },
];

const certs = [
  { label: "ISO 27001",            src: "/certification/iso 27001.png"                   },
  { label: "HIPAA Compliance",     src: "/certification/hipaa.png"                       },
  { label: "ESOMAR Corporate",     src: "/certification/ESOMAR_corporate2025_RGB.png"    },
  { label: "GDPR Compliant",       src: "/certification/GDPR.png"                        },
  { label: "Insights Association", src: "/certification/insights-association-logo-v2.png" },
  { label: "MRSI",                 src: "/certification/MRSI.png"                        },
  { label: "QUIRK'S Media",        src: "/certification/Quirks.png"                      },
];

const certCards = [
  { value: "ISO 27001",   desc: "Information Security Certified" },
  { value: "HIPAA",       desc: "Healthcare Data Compliant"      },
  { value: "GDPR",        desc: "EU Data Protection Compliant"   },
  { value: "ESOMAR",      desc: "Corporate Member 2025"          },
];

const addresses = [
  "1401, 21st Street, STE R\nSacramento, CA 95811",
];

function BuildingIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9 shrink-0 mt-0.5" fill="none">
      <rect x="5" y="15" width="30" height="20" rx="1" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M5 15L20 5L35 15" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" strokeLinejoin="round" />
      <rect x="14" y="24" width="5" height="11" rx="0.5" stroke="white" strokeWidth="1.4" strokeOpacity="0.5" />
      <rect x="21" y="24" width="5" height="11" rx="0.5" stroke="white" strokeWidth="1.4" strokeOpacity="0.5" />
      <rect x="9"  y="18" width="4" height="4" rx="0.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.4" />
      <rect x="27" y="18" width="4" height="4" rx="0.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.4" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer>
      {/* ── Certifications ── */}
      <div className="bg-primary border-b border-white/10">
        <div className="site-container px-6 py-10">

          {/* Logo slider — white */}
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center mb-6">Certifications &amp; Affiliations</p>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            slidesPerView={2}
            spaceBetween={32}
            breakpoints={{
              480:  { slidesPerView: 3 },
              768:  { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="mb-10"
          >
            {certs.map((cert, i) => (
              <SwiperSlide key={i}>
                <div className="h-20 flex items-center justify-center">
                  <Image
                    src={cert.src}
                    alt={cert.label}
                    width={160}
                    height={80}
                    className="object-contain h-16 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 4 stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certCards.map((c, i) => (
              <div key={i} className="border border-white/10 rounded-xl px-5 py-4 text-center bg-white/5">
                <p className="text-white font-black text-lg mb-1">{c.value}</p>
                <p className="text-white/50 text-xs leading-5">{c.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="bg-primary text-white">
        <div className="site-container px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10">

          {/* Brand col */}
          <div>
            <div className="mb-6">
              <Image
                src="/logo-white.png"
                alt="Track Opinion"
                width={180}
                height={52}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-7 mb-8 max-w-[260px]">
              Track Opinion® is a global market research and outsourcing firm that
              provides end-to-end custom research services.
            </p>
            <Link
              href="/panel"
              className="inline-flex items-center gap-2 border border-white/80 text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-primary transition-all duration-200"
            >
              Join Our Panel »
            </Link>
          </div>

          {/* About col */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">About</h4>
            <ul className="space-y-3.5">
              {aboutLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                    » {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services col */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Our Services</h4>
            <ul className="space-y-3.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                    » {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address col */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Address</h4>
            <div className="space-y-6">
              {addresses.map((addr, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <BuildingIcon />
                  <p className="text-white/60 text-sm leading-6 whitespace-pre-line">{addr}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-[#0a1628]">
        <div className="site-container px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-sm">
            © 2026 <span className="font-bold text-white">TrackOpinion</span> | All Rights Reserved
          </p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
