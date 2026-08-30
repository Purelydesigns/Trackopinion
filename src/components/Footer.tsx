import Link from "next/link";
import Image from "next/image";
import CertificationSlider from "@/components/CertificationSlider";
import { OFFICES } from "@/lib/contactDetails";
import { officeIcon } from "@/lib/officeIcons";

const aboutLinks = [
  { label: "About Company",     href: "/about"      },
  { label: "Contact Us",        href: "/contact-us" },
  { label: "Career",            href: "/career"     },
  { label: "Case Studies",      href: "/case-studies" },
  { label: "Featured Updates",  href: "/featured-updates" },
  { label: "Terms of Services", href: "/terms"      },
];

const serviceLinks = [
  { label: "Global Panel",         href: "/solutions/global-panel"         },
  { label: "Research Services",    href: "/solutions/research-services"    },
  { label: "Enterprise Solutions", href: "/solutions/enterprise-solution"  },
  { label: "CATI Solutions",       href: "/solutions/cati-solutions"       },
  { label: "Healthcare Research",  href: "/solutions/healthcare"           },
];

export default function Footer() {
  return (
    <footer>
      {/* ── Certifications ── */}
      <div className="bg-primary border-b border-white/10">
        <div className="site-container px-6 py-10">

          {/* Logo slider — white */}
          <CertificationSlider />

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
              href="/solutions/global-panel"
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
              {OFFICES.map((office) => {
                const Icon = officeIcon(office);
                return (
                <div key={office.city} className="flex gap-3 items-start">
                  <Icon
                    aria-hidden
                    strokeWidth={1.5}
                    className="w-7 h-7 shrink-0 text-white/50 mt-0.5"
                  />
                  <p className="text-white/60 text-sm leading-6">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
                );
              })}
            </div>
          </div>

        </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-[#0a1628]">
        <div className="site-container px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-white">TrackOpinion</span> | All Rights Reserved
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
