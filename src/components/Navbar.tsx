"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, ChevronDown, Globe, FlaskConical, Building2,
  PhoneCall, HeartPulse, FileCode2, ArrowRight,
  BarChart3, Users, Layers, Languages, PieChart,
  ShieldCheck, Microscope, TrendingUp,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ── Solutions mega-menu data ── */
const solutions = [
  {
    label: "Global Panel",
    icon: Globe,
    href: "/contact-us",
    desc: "Reach respondents across 50+ countries",
    color: "bg-blue-50 text-blue-600",
    children: [],
  },
  {
    label: "Research Services",
    icon: FlaskConical,
    href: "/contact-us",
    desc: "Full-service qualitative & quantitative research",
    color: "bg-purple-50 text-purple-600",
    children: [
      { label: "Qualitative",           icon: Users,    desc: "Focus groups & IDIs",         href: "/solutions/research-services/qualitative"  },
      { label: "Quantitative",          icon: BarChart3, desc: "Surveys & statistical data",  href: "/solutions/research-services/quantitative" },
      { label: "Survey Programming",    icon: Layers,   desc: "Multi-platform deployment",    href: "/solutions/scrip8" },
      { label: "Translation",           icon: Languages, desc: "50+ language support",        href: "/contact-us" },
      { label: "Reporting & Analytics", icon: PieChart,  desc: "Insight dashboards & reports",href: "/solutions/analytics" },
    ],
  },
  {
    label: "Enterprise Solution",
    icon: Building2,
    href: "/contact-us",
    desc: "Strategic insights for large-scale businesses",
    color: "bg-blue-50 text-primary",
    children: [
      { label: "Product Concept & Creative Ad Testing", icon: Microscope,  desc: "Validate ideas before launch",  href: "/solutions/product-concept-and-ad-testing" },
      { label: "Customer Loyalty Measurement",          icon: ShieldCheck, desc: "Measure & grow retention",      href: "/solutions/customer-loyalty-measurement" },
      { label: "Brand Image Study",                     icon: TrendingUp,  desc: "Track brand health over time",  href: "/solutions/brand-image-study" },
    ],
  },
  {
    label: "CATI Solutions",
    icon: PhoneCall,
    href: "/solutions/cati-solutions",
    desc: "Computer-assisted telephone interviewing",
    color: "bg-green-50 text-green-600",
    children: [],
  },
  {
    label: "Healthcare Research",
    icon: HeartPulse,
    href: "/solutions/healthcare",
    desc: "Medical & pharma audience research",
    color: "bg-red-50 text-red-600",
    children: [],
  },
  {
    label: "Scrip8",
    icon: FileCode2,
    href: "/solutions/scrip8",
    desc: "Scripting & programming platform",
    color: "bg-slate-50 text-slate-600",
    children: [],
  },
];

const navLinks = [
  { label: "HOME",         href: "/"               },
  { label: "ABOUT US",     href: "/about"           },
  { label: "RESOURCES",    href: "/resources"},
  { label: "CAREER",       href: "/career"          },
  { label: "CONTACT US",   href: "/contact-us"      },
];

const pathToLabel: Record<string, string> = {
  "/":                 "HOME",
  "/about":            "ABOUT US",
  "/resources":        "RESOURCES",
  "/career":           "CAREER",
  "/contact-us":       "CONTACT US",
};

export default function Navbar() {
  const pathname = usePathname();
  const active = pathToLabel[pathname] ??
    (pathname.startsWith("/solutions") ? "SOLUTIONS" : "");
  const [menuOpen, setMenuOpen]             = useState(false);
  const [dropOpen, setDropOpen]             = useState(false);
  const [hoveredIdx, setHoveredIdx]         = useState(1);
  const [scrolled, setScrolled]             = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const [bellOpen, setBellOpen]             = useState(false);
  const dropRef                             = useRef<HTMLLIElement>(null);
  const bellRef                             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isTransparent = !scrolled;

  const linkCls = (label: string) =>
    `text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap ${
      active === label
        ? isTransparent
          ? "text-white [box-shadow:0_2px_0_0_white]"
          : "text-[#1a1a4e] [box-shadow:0_2px_0_0_#1a1a4e]"
        : isTransparent
          ? "text-white/90 hover:text-white"
          : "text-gray-600 hover:text-[#1a1a4e]"
    }`;

  const hovered   = solutions[hoveredIdx];
  const HovIcon   = hovered?.icon ?? Globe;

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 py-3 px-6 transition-all duration-300">
      <div className={`max-w-[1536px] mx-auto px-4 py-2 flex items-center justify-between transition-all duration-300 ${isTransparent ? "" : "bg-white rounded-full shadow-xl"}`}>

        {/* ── Logo ── */}
        <Link href="/">
          <img
            src={isTransparent ? "/logo-white.png" : "/logo.png"}
            alt="Track Opinion"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <ul className="hidden xl:flex items-center gap-5 ml-auto mr-4">
          <li><Link href="/" className={linkCls("HOME")}>HOME</Link></li>
          <li><Link href="/about" className={linkCls("ABOUT US")}>ABOUT US</Link></li>

          {/* ── SOLUTIONS mega-menu ── */}
          <li ref={dropRef} className="relative">
            <button
              onClick={() => setDropOpen((p) => !p)}
              className={`cursor-pointer flex items-center gap-1 text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap ${
                active === "SOLUTIONS"
                  ? isTransparent
                    ? "text-white [box-shadow:0_2px_0_0_white]"
                    : "text-[#1a1a4e] [box-shadow:0_2px_0_0_#1a1a4e]"
                  : isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-gray-600 hover:text-[#1a1a4e]"
              }`}
            >
              SOLUTIONS
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`} />
            </button>

            {/* ── Mega-menu panel ── */}
            <div
              className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-[45%] w-[760px] bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden transition-all duration-250 origin-top ${
                dropOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-[0.97] -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="flex">

                {/* ── Left sidebar — categories ── */}
                <div className="w-[260px] shrink-0 bg-gray-50 border-r border-gray-100 p-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-3 py-2">
                    All Solutions
                  </p>
                  {solutions.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = hoveredIdx === idx;
                    return (
                      <button
                        key={item.label}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onClick={() => setDropOpen(false)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "hover:bg-white hover:shadow-sm text-gray-700"
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 ${
                          isActive ? "bg-white/20" : item.color
                        }`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold leading-tight ${isActive ? "text-white" : "text-gray-800"}`}>
                            {item.label}
                          </p>
                        </div>
                        {item.children.length > 0 && (
                          <ChevronRight className={`w-4 h-4 shrink-0 ml-1 ${isActive ? "text-white" : "text-primary"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ── Right panel — sub-items or feature card ── */}
                <div className="flex-1 flex flex-col">

                  {/* Right header */}
                  <div className={`px-6 pt-5 pb-4 border-b border-gray-100`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${hovered?.color}`}>
                        <HovIcon className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-primary font-bold text-sm">{hovered?.label}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{hovered?.desc}</p>
                      </div>
                      <Link
                        href={hovered?.href ?? "/solutions"}
                        onClick={() => setDropOpen(false)}
                        className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary transition-colors"
                      >
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Sub-items grid */}
                  <div className="p-4 flex-1">
                    {hovered?.children.length > 0 ? (
                      <div className="grid grid-cols-1 gap-1">
                        {hovered.children.map((child) => {
                          const CIcon = child.icon;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setDropOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 group transition-colors duration-150"
                            >
                              <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-200">
                                <CIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-200" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-150 leading-tight">
                                  {child.label}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">{child.desc}</p>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary ml-auto opacity-0 group-hover:opacity-100 transition-all duration-150" />
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      /* No sub-items — show a CTA card */
                      <div className="h-full flex flex-col items-center justify-center text-center px-6 py-6">
                        <span className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${hovered?.color}`}>
                          <HovIcon className="w-7 h-7" />
                        </span>
                        <p className="text-primary font-bold text-sm mb-1">{hovered?.label}</p>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4">{hovered?.desc}</p>
                        <Link
                          href={hovered?.href ?? "/solutions"}
                          onClick={() => setDropOpen(false)}
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-white text-xs font-semibold px-5 py-2 rounded-full transition-colors duration-200"
                        >
                          Learn More <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Bottom CTA strip */}
                  <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between bg-gray-50/50">
                    <p className="text-xs text-gray-400">Need a tailored solution?</p>
                    <Link
                      href="/contact-us"
                      onClick={() => setDropOpen(false)}
                      className="text-xs font-bold text-primary hover:text-primary flex items-center gap-1 transition-colors"
                    >
                      Talk to an expert <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </li>

          <li><Link href="/resources" className={linkCls("RESOURCES")}>RESOURCES</Link></li>
          <li><Link href="/career" className={linkCls("CAREER")}>CAREER</Link></li>
          <li><Link href="/contact-us" className={linkCls("CONTACT US")}>CONTACT US</Link></li>
        </ul>

        {/* ── Bell + Hamburger group ── */}
        <div className="flex items-center gap-2">
        <div ref={bellRef} className="relative">
          <button
            onClick={() => setBellOpen((p) => !p)}
            className={`cursor-pointer relative p-2 rounded-full border-2 transition-all duration-200 ${bellOpen ? "bg-white border-white" : isTransparent ? "border-white/60 hover:border-white bg-white/10" : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"}`}
          >
            <Bell className={`w-4 h-4 transition-colors ${bellOpen ? "text-[#1a1a4e]" : isTransparent ? "text-white" : "text-gray-600"}`} strokeWidth={bellOpen ? 2.5 : 1.8} />
            <span className={`absolute -top-1.5 -right-1.5 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ${isTransparent ? "bg-primary ring-white/20" : "bg-[#1a1a4e] ring-white"}`}>
              0
            </span>
          </button>

          {/* Notification panel */}
          <div className={`absolute right-0 top-[calc(100%+10px)] w-[290px] sm:w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right ${
            bellOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary">Notifications</span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">0 new</span>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-500 mb-1">No notifications yet</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                We&apos;ll notify you when something important happens.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-3 bg-gray-50/50 flex items-center justify-between">
              <span className="text-xs text-gray-400">Stay tuned for updates</span>
              <button
                onClick={() => setBellOpen(false)}
                className="text-xs font-semibold text-primary hover:text-primary transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="xl:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(true)}
        >
          <span className={`w-6 h-0.5 rounded-full transition-all ${isTransparent ? "bg-white" : "bg-gray-600"}`} />
          <span className={`w-5 h-0.5 rounded-full transition-all ${isTransparent ? "bg-white" : "bg-gray-600"}`} />
          <span className={`w-6 h-0.5 rounded-full transition-all ${isTransparent ? "bg-white" : "bg-gray-600"}`} />
        </button>
        </div>
      </div>

      {/* ── Mobile Drawer — slides in from left ── */}
      <>
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`xl:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Drawer panel */}
        <div
          className={`xl:hidden fixed top-0 left-0 h-full w-[min(360px,85vw)] z-50 flex flex-col transition-transform duration-300 ease-in-out
            bg-white/60 backdrop-blur-2xl backdrop-saturate-150
            border-r border-white/40
            shadow-[4px_0_40px_rgba(0,0,0,0.3)]
            ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/30 bg-white/30">
            <img src="/logo.png" alt="Track Opinion" className="h-10 w-auto object-contain transition-none" />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-gray-800 transition-colors border border-white/30"
            >
              <span className="text-lg leading-none">✕</span>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">

            {[
              { label: "HOME",       href: "/" },
              { label: "ABOUT US",   href: "/about" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-semibold transition-colors ${
                  active === link.label
                    ? "text-primary font-bold border-l-4 border-primary pl-3"
                    : "text-black hover:text-primary hover:bg-white/30 hover:rounded-xl"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Solutions accordion */}
            <div>
              <button
                onClick={() => setMobileDropOpen((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-black hover:bg-white/30 hover:text-primary transition-colors"
              >
                SOLUTIONS
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${mobileDropOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="ml-3 border-l-2 border-primary pl-3 mt-1 flex flex-col gap-1">
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => { setMobileDropOpen(false); setMenuOpen(false); }}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-black hover:bg-white/30 hover:text-primary transition-colors"
                        >
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          {item.label}
                        </Link>
                        {item.children.length > 0 && (
                          <ul className="ml-9 mb-1 flex flex-col gap-0.5">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => { setMobileDropOpen(false); setMenuOpen(false); }}
                                  className="block px-3 py-1.5 text-sm text-black hover:text-primary transition-colors"
                                >
                                  › {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {[
              { label: "RESOURCES",   href: "/resources" },
              { label: "CAREER",      href: "/career"           },
              { label: "CONTACT US",  href: "/contact-us"       },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-semibold transition-colors ${
                  active === link.label
                    ? "text-primary font-bold border-l-4 border-primary pl-3"
                    : "text-black hover:text-primary hover:bg-white/30 hover:rounded-xl"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer footer */}
          <div className="px-5 py-4 border-t border-white/30 bg-white/30">
            <p className="text-xs text-black text-center">Track Opinion® — Global Market Research</p>
          </div>
        </div>
      </>
    </nav>
  );
}
