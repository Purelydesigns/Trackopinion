import Link from "next/link";
import Image from "next/image";

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

const addresses = [
  "607-608, Tower C, Nirvana Courtyard, Sector 50, Gurugram – 122018",
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
                <div key={i} className="flex gap-4 items-start">
                  <BuildingIcon />
                  <p className="text-white/60 text-sm leading-6">{addr}</p>
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
