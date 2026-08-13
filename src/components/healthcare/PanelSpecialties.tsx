"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, ChevronDown, ChevronUp, X,
  Stethoscope, ClipboardPlus, Baby, Smile, Eye, Pill,
  Scissors, Bone, Droplets, Ear, Venus,
  HeartPulse, Brain, Activity, Dna, Syringe,
  Ribbon, Wind, Salad, Hand, Microscope,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

interface Specialty {
  label: string;
  desc: string;
  icon: LucideIcon;
}

interface Group {
  title: string;
  /** How many to show before the "View N More" toggle */
  visible: number;
  items: Specialty[];
}

const groups: Group[] = [
  {
    title: "Primary & Consulting",
    visible: 5,
    items: [
      { label: "General Practitioner",  desc: "First-line care across everyday conditions",        icon: Stethoscope },
      { label: "Consulting Physician",  desc: "Diagnosis & treatment of complex internal conditions", icon: ClipboardPlus },
      { label: "Paediatrician",         desc: "Child health, growth & development",                icon: Baby },
      { label: "Dentist",               desc: "Oral, dental & maxillofacial care",                 icon: Smile },
      { label: "Ophthalmologist",       desc: "Eye care, vision correction & surgery",             icon: Eye },
      { label: "Pharmacist",            desc: "Medication guidance & dispensing experts",          icon: Pill },
    ],
  },
  {
    title: "Surgical & Procedural",
    visible: 5,
    items: [
      { label: "General Surgeon", desc: "Broad surgical procedures & post-op care",     icon: Scissors },
      { label: "Orthopaedic",     desc: "Bones, joints & musculoskeletal surgery",      icon: Bone },
      { label: "Urologist",       desc: "Urinary tract & male reproductive health",     icon: Droplets },
      { label: "ENT",             desc: "Ear, nose & throat diagnosis and surgery",     icon: Ear },
      { label: "Gynaecologist",   desc: "Women's reproductive health & obstetrics",     icon: Venus },
    ],
  },
  {
    title: "Medical Specialists",
    visible: 5,
    items: [
      { label: "Cardiologist",      desc: "Heart & cardiovascular system specialists",   icon: HeartPulse },
      { label: "Neurologist",       desc: "Brain, spine & nervous system disorders",     icon: Brain },
      { label: "Nephrologist",      desc: "Kidney function, dialysis & transplant care", icon: Activity },
      { label: "Endocrinologist",   desc: "Hormones, thyroid & metabolic disorders",     icon: Dna },
      { label: "Diabetologist",     desc: "Diabetes management & glycaemic control",     icon: Syringe },
      { label: "Oncologist",        desc: "Cancer diagnosis, therapy & follow-up",       icon: Ribbon },
      { label: "Pulmonologist",     desc: "Lungs, airways & respiratory medicine",       icon: Wind },
      { label: "Gastroenterologist", desc: "Digestive tract, liver & gut health",        icon: Salad },
      { label: "Dermatologist",     desc: "Skin, hair & nail conditions",                icon: Hand },
      { label: "Pathologist",       desc: "Lab diagnostics & disease investigation",     icon: Microscope },
    ],
  },
];

const stats = [
  { value: "21",    label: "Core Specialties" },
  { value: "35+",   label: "Allied Roles" },
  { value: "711K+", label: "Verified Professionals" },
];

/* Allied & additional roles shown in the modal */
const alliedRoles = [
  "Anesthesiologists", "Radiologists", "Pathologists",
  "Emergency Medicine Physicians", "Geriatricians",
  "Rheumatologists", "Infectious Disease Specialists",
  "Physical Medicine & Rehab Specialists",
  "Occupational Medicine Specialists", "Nuclear Medicine Specialists",
  "Vascular Surgeons", "Plastic Surgeons",
  "Sports Medicine Specialists", "Nurses", "Physiotherapists",
  "Occupational Therapists", "Speech-Language Pathologists",
  "Dietitians", "Nutritionists", "Medical Lab Technologists",
  "Radiologic Technologists", "Psychologists", "Counselors",
  "Social Workers", "Audiologists", "Optometrists",
  "Podiatrists", "Chiropractors", "Paramedics",
  "Pharmacy Technicians", "Dental Hygienists", "Midwives",
  "Respiratory Therapists", "Perfusionists", "Clinical Researchers",
];

export default function PanelSpecialties() {
  const [active, setActive] = useState<{ g: number; i: number }>({ g: 0, i: 0 });
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [query, setQuery] = useState("");
  const [showAllied, setShowAllied] = useState(false);

  const q = query.trim().toLowerCase();

  /* Close on Escape + lock body scroll while the modal is open */
  useEffect(() => {
    if (!showAllied) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAllied(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [showAllied]);

  const filtered = useMemo(
    () =>
      groups.map((g) => ({
        ...g,
        items: q
          ? g.items.filter(
              (it) =>
                it.label.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
            )
          : g.items,
      })),
    [q]
  );

  const current = groups[active.g].items[active.i];
  const currentGroup = groups[active.g].title;
  const CurrentIcon = current.icon;

  const totalMatches = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="bg-section py-16">
      <div className="site-container px-6">

        <SectionHeader
          label="Our Panel"
          heading={<>Who&apos;s in Our Panel?</>}
          description="Verified healthcare professionals across 21 core specialties and 35+ allied roles — profiled, credential-checked and ready to field."
          theme="light"
          align="center"
          className="!mb-0"
        />

        {/* Stat chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100"
            >
              <span className="text-primary font-extrabold text-base">{s.value}</span>
              <span className="text-gray-500 text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_320px] gap-8 lg:gap-10">

            {/* ── Specialty columns ── */}
            {filtered.map((group, gi) => {
              const isOpen = expanded[gi] || Boolean(q);
              const shown = isOpen ? group.items : group.items.slice(0, group.visible);
              const hidden = group.items.length - group.visible;

              return (
                <div key={group.title}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-4">
                    {group.title}
                  </p>

                  <ul>
                    {shown.map((item) => {
                      const realIndex = groups[gi].items.findIndex((x) => x.label === item.label);
                      const isActive = active.g === gi && active.i === realIndex;
                      return (
                        <li key={item.label}>
                          <button
                            onMouseEnter={() => setActive({ g: gi, i: realIndex })}
                            onFocus={() => setActive({ g: gi, i: realIndex })}
                            className={`w-full text-left flex items-center justify-between gap-3 py-3 border-b transition-colors duration-200 group ${
                              isActive
                                ? "border-primary text-primary"
                                : "border-gray-200 text-primary hover:text-primary"
                            }`}
                          >
                            <span className="font-bold text-base leading-snug">{item.label}</span>
                            <ArrowRight
                              className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                                isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                              }`}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {!q && hidden > 0 && (
                    <button
                      onClick={() => setExpanded((e) => ({ ...e, [gi]: !e[gi] }))}
                      className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-bold hover:opacity-80 transition-opacity"
                    >
                      {isOpen ? "Show Less" : `View ${hidden} More`}
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}

                  {q && group.items.length === 0 && (
                    <p className="text-sm text-gray-400 py-3">No matches</p>
                  )}
                </div>
              );
            })}

            {/* ── Search + preview card ── */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 border border-gray-200 shadow-sm focus-within:border-primary transition-colors">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a specialty..."
                  className="bg-transparent text-sm text-primary placeholder:text-gray-400 outline-none w-full"
                />
              </div>

              {q && (
                <p className="text-xs text-gray-400 -mt-2 px-1">
                  {totalMatches} {totalMatches === 1 ? "match" : "matches"}
                </p>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-2xl p-7 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(150deg, #0a1628 0%, #0d1b3e 55%, #16305e 100%)",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl"
                    style={{ background: "rgba(26,111,232,0.25)" }}
                  />

                  <div className="relative">
                    <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                      <CurrentIcon className="w-6 h-6 text-white" strokeWidth={1.6} />
                    </span>

                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-2">
                      {currentGroup}
                    </p>
                    <h3 className="text-white font-extrabold text-2xl leading-tight mb-3">
                      {current.label}
                    </h3>
                    <p className="text-white/70 text-sm leading-7 font-medium">
                      {current.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Allied roles CTA */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAllied(true)}
            className="inline-flex items-center gap-2.5 bg-white rounded-full px-7 py-3.5 shadow-sm border border-gray-100 text-primary text-sm font-bold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            +35 More Allied Roles — Nursing, Therapy, Diagnostics &amp; More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ── Allied roles modal ── */}
      {/* Rendered conditionally without AnimatePresence so it always unmounts —
          an exit-animated backdrop can linger at opacity 0 and swallow clicks. */}
      <>
        {showAllied && (
          <motion.div
            key="allied-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowAllied(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Allied and additional specialties"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-6 px-8 pt-7 pb-5 border-b border-gray-100">
                <div>
                  <h3 className="text-primary font-extrabold text-2xl leading-tight mb-1.5">
                    Allied &amp; Additional Specialties
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Beyond our 21 core specialties, our 711K+ strong panel also includes:
                  </p>
                </div>
                <button
                  onClick={() => setShowAllied(false)}
                  aria-label="Close"
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable pill list */}
              <div className="overflow-y-auto px-8 py-7">
                <div className="flex flex-wrap gap-3">
                  {alliedRoles.map((role, i) => (
                    <motion.span
                      key={role}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.015, 0.4), duration: 0.25 }}
                      className="bg-section border border-gray-200 text-primary text-sm font-semibold rounded-full px-4 py-2.5 hover:border-primary/40 hover:bg-highlight transition-colors duration-200"
                    >
                      {role}
                    </motion.span>
                  ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </>
    </section>
  );
}
