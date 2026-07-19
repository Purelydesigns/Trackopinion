"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import GlobalReach from "@/components/about/GlobalReach";
import LatestReadsSection from "../shared/LatestReadsSection";
import PageHero from "../ui/PageHero";
import SiteCard from "../ui/SiteCard";
import SectionHeader from "../ui/SectionHeader";
import { ShieldCheck, Database, Languages } from "lucide-react";

/* ── Data ── */
const capabilities = [
  {
    title: "Profile Validation & Maintenance",
    desc: "Strict profiling starts right at the registration process when building a healthcare panel for online surveys. Healthcare professionals and physicians' profiles validated against NPI and AMA databases. Compulsory updates every six months for the panelists to maintain their latest data.",
    icon: ShieldCheck,
  },
  {
    title: "Data Security",
    desc: "Patients' and professionals' records are secured with top-notch data sharing policies as directed by the local government and regulatory authorities. In compliance with GDPR, we seek panelists' consent before storing healthcare data points in Europe.",
    icon: Database,
  },
  {
    title: "Coherent Data",
    desc: "Never lose the tone of a panelist's opinion and sentiments expressed in words. Accurate qualitative customer insights for your complex research. Translation experts in our team across the globe make it possible to conduct qualitative market research in all major languages.",
    icon: Languages,
  },
];

const s = { stroke: "white", strokeWidth: "1.6", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

const panelRoles = [
  {
    label: "General Physician",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Stethoscope */}
        <path d="M16 10 C16 10 10 10 10 18 C10 26 18 30 18 30 C18 30 24 34 32 30" {...s} />
        <circle cx="34" cy="28" r="5" {...s} />
        <path d="M22 10 C22 10 28 10 28 18" {...s} />
        <circle cx="16" cy="10" r="2" {...s} />
        <circle cx="22" cy="10" r="2" {...s} />
      </svg>
    ),
  },
  {
    label: "Dermatologist",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Skin layers / body silhouette */}
        <ellipse cx="24" cy="14" rx="8" ry="8" {...s} />
        <path d="M12 42 C12 32 36 32 36 42" {...s} />
        <path d="M18 28 C18 28 16 36 24 36 C32 36 30 28 30 28" {...s} />
        <path d="M20 18 Q24 22 28 18" {...s} />
      </svg>
    ),
  },
  {
    label: "Consulting Physician",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Clipboard with cross */}
        <rect x="12" y="10" width="24" height="30" rx="3" {...s} />
        <path d="M20 10 V14 H28 V10" {...s} />
        <path d="M24 20 V32 M18 26 H30" {...s} />
      </svg>
    ),
  },
  {
    label: "Cardiologist",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Heart + ECG line */}
        <path d="M24 38 C24 38 8 28 8 18 C8 12 12 8 18 8 C21 8 24 11 24 11 C24 11 27 8 30 8 C36 8 40 12 40 18 C40 28 24 38 24 38Z" {...s} />
        <path d="M10 24 L16 24 L19 18 L22 30 L25 24 L38 24" {...s} />
      </svg>
    ),
  },
  {
    label: "Gynaecologist",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Female symbol */}
        <circle cx="24" cy="18" r="10" {...s} />
        <path d="M24 28 V40" {...s} />
        <path d="M18 36 H30" {...s} />
        <path d="M19 14 Q24 10 29 14" {...s} />
      </svg>
    ),
  },
  {
    label: "Neurologist",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Brain */}
        <path d="M24 38 C24 38 12 36 10 26 C8 18 14 12 20 12 C20 12 20 8 24 8 C28 8 28 12 28 12 C34 12 40 18 38 26 C36 36 24 38 24 38Z" {...s} />
        <path d="M24 8 V38" {...s} />
        <path d="M16 18 Q20 22 16 26" {...s} />
        <path d="M32 18 Q28 22 32 26" {...s} />
      </svg>
    ),
  },
  {
    label: "Diabetologist",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Blood drop + glucose meter */}
        <path d="M24 10 C24 10 14 22 14 28 C14 34 18 38 24 38 C30 38 34 34 34 28 C34 22 24 10 24 10Z" {...s} />
        <path d="M19 28 Q24 24 29 28" {...s} />
        <path d="M24 24 V32" {...s} />
      </svg>
    ),
  },
  {
    label: "Endocrinologist",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Thyroid / glands */}
        <ellipse cx="18" cy="22" rx="7" ry="10" {...s} />
        <ellipse cx="30" cy="22" rx="7" ry="10" {...s} />
        <path d="M18 16 Q24 12 30 16" {...s} />
        <path d="M21 22 H27" {...s} />
      </svg>
    ),
  },
  {
    label: "Oncologist",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Cancer ribbon */}
        <path d="M24 10 C20 10 16 14 16 18 C16 22 20 24 24 24 C28 24 32 26 32 30 C32 34 28 38 24 38" {...s} />
        <path d="M24 10 C28 10 32 14 32 18 C32 22 28 24 24 24 C20 24 16 26 16 30 C16 34 20 38 24 38" {...s} />
        <path d="M20 36 L24 38 L28 36" {...s} />
      </svg>
    ),
  },
  {
    label: "Paediatrician",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
        {/* Child figure + toy/star */}
        <circle cx="24" cy="13" r="6" {...s} />
        <path d="M14 40 C14 30 34 30 34 40" {...s} />
        <path d="M20 24 L24 28 L28 24" {...s} />
        <path d="M36 12 L37.5 15 L41 15 L38.5 17 L39.5 21 L36 19 L32.5 21 L33.5 17 L31 15 L34.5 15 Z" {...s} />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "What is Customer satisfaction (CSAT) & how it is measured?",
    a: "CSAT is a measurement score that gauges how satisfied customers are with a product, service, or brand. It indicated the level of retention, loyalty, and happiness of customers. It is measured using simple questions like “How happy are you with our product?”. For a survey, CSAT is measured as:\n\nCSAT Score= (Number of Satisfied Responses / Total Number of Responses) ×100",
  },
  {
    q: "How can measuring customer loyalty impact business strategy?",
    a: "Measuring customer loyalty helps businesses identify their most valuable customers, understand what drives retention, and allocate resources effectively. Loyal customers tend to spend more, refer others, and stay longer — making loyalty a leading indicator of sustainable growth.",
  },
  {
    q: "How often should customer loyalty be measured?",
    a: "Customer loyalty should ideally be measured quarterly or after key touchpoints such as purchases, support interactions, or product launches. Regular measurement helps track trends and respond proactively to any decline in satisfaction.",
  },
  {
    q: "What are common challenges in measuring customer loyalty?",
    a: "Common challenges include survey fatigue, response bias, difficulty linking loyalty data to business outcomes, and inconsistent methodologies across departments. Using standardized metrics like NPS or CSAT and integrating them with CRM data can help overcome these barriers.",
  },
];

/* ── Helpers ── */
function FieldError({ msg }: { msg: string }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

function IconBox() {
  return (
    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shrink-0">
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="9" r="3.5" />
        <path d="M18 20c0-3.314-2.686-6-6-6s-6 2.686-6 6" />
        <path d="M17 7a2 2 0 110-4 2 2 0 010 4M7 7a2 2 0 110-4 2 2 0 010 4" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

type FormFields = { name: string; company: string; designation: string; email: string; };
type FormErrors = Partial<Record<keyof FormFields, string>>;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── Main ── */
export default function HealthcarePage() {
  const [openFaq, setOpenFaq]   = useState<number | null>(0);
  const [fileName, setFileName] = useState("");
  const [captcha, setCaptcha]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState<FormFields>({ name: "", company: "", designation: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  function set(field: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!fields.name.trim())    e.name    = "Your name is required.";
    if (!fields.company.trim()) e.company = "Company name is required.";
    if (!fields.email.trim())   e.email   = "Email ID is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const inputClass = (field: keyof FormErrors) =>
    `w-full border-b ${errors[field] ? "border-red-400" : "border-gray-200"} bg-gray-50 px-4 py-3 text-sm placeholder:text-gray-500 outline-none focus:border-primary transition-colors text-gray-900`;

  return (
    <main className="bg-white">

      <PageHero
          badge="Healthcare"
          heading={
            <>
              Healthcare{" "}
            </>
          }
          description="A carefully curated panel of thousands of patients, healthcare practitioners, and pharma employees for genuine data. Reach wide and deep in 30+ Countries. All your Medical research fulfilled right at Track Opinion."
          primaryCta={{ label: "Start a Research Project", href: "/contact-us" }}
          secondaryCta={{ label: "Explore Methods", href: "#methods" }}
          minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
        />

      {/* ════════ DIG DEEPER HEADING ════════ */}
      <section className="bg-section pt-12">
        <div className="site-container px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
              Dig Deeper into Patient&apos;s and Practitioners Experience
            </h2>
          </div>
          <div className="mt-6 border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ MAP CARD ════════ */}
      <GlobalReach
        heading="30+ Countries in Our Global Reach"
        description="Panel members available in all major countries and continents for healthcare market research. Partnership with local panel providers increases our bandwidth and diversifies online market research."
      />

      {/* ════════ CAPABILITIES ════════ */}
      <section className="py-20 bg-white">
        <div className="site-container px-6">
          <SectionHeader
            label="Our Capabilities"
            heading={<>What Sets Our Healthcare Research Apart</>}
            description="Validated panels, secure data practices, and multilingual expertise — built for the complexity of healthcare research."
            theme="light"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <SiteCard className="flex flex-col h-full">
                    <div className="p-7 flex flex-col flex-1">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mb-5"
                        style={{ background: "rgba(13,27,62,0.07)" }}
                      >
                        <Icon size={26} strokeWidth={1.5} style={{ color: "#0d1b3e" }} />
                      </div>
                      <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">{cap.title}</h3>
                      <p className="text-gray-600 text-base leading-8 font-medium flex-1">{cap.desc}</p>
                    </div>
                  </SiteCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ STATS BANNER ════════ */}
      <section className="py-6 pb-16 site-container px-6">
        <motion.div
          {...fadeUp()}
          className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1b3e 50%, #112254 100%)" }}
        >
          {/* Top accent line */}
          <div className="h-1" style={{ background: "linear-gradient(90deg, #1a6fe8, #60a5fa, #1a6fe8)" }} />

          <div className="px-10 py-12">
            {/* Headline */}
            <div className="text-center mb-10">
              <span className="inline-block text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Healthcare Panel Network</span>
              <h2 className="text-white font-extrabold text-2xl sm:text-3xl leading-snug max-w-2xl mx-auto">
                Elevate your research with our comprehensive healthcare solutions and cutting-edge methodologies
              </h2>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "711K+", label: "Healthcare Professionals" },
                { value: "30+",   label: "Countries Covered"        },
                { value: "98%",   label: "Profile Accuracy Rate"    },
                { value: "48h",   label: "Average Turnaround"       },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex flex-col items-center text-center rounded-2xl py-7 px-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="text-white font-black text-3xl sm:text-4xl mb-2">{stat.value}</p>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider leading-5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ WHO'S IN OUR PANEL ════════ */}
      <section className="bg-gray-50 py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">Who&apos;s in Our Panel?</h2>
          </motion.div>

          <div className="relative">
            {/* Dashed line through circle centers */}
            <div className="absolute top-10 left-0 right-0 border-t-2 border-dashed border-gray-300 z-0" />

            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop
              slidesPerView={4}
              spaceBetween={0}
              breakpoints={{
                480:  { slidesPerView: 4 },
                768:  { slidesPerView: 6 },
                1024: { slidesPerView: 8 },
              }}
              className="relative z-10"
            >
              {panelRoles.map((role, i) => (
                <SwiperSlide key={i}>
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.12}}
                      className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-300 border-4 border-gray-50"
                    >
                      {role.icon}
                    </motion.div>
                    <p className="text-xs sm:text-sm font-bold text-gray-700 text-center leading-5 mt-1">
                      {role.label}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ════════ PANEL BOOK FORM ════════ */}
      <section className="bg-section py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">

            {/* Left — navy info panel */}
            <div
              className="md:w-[340px] shrink-0 flex flex-col justify-between p-10"
              style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d1b3e 60%, #112254 100%)" }}
            >
              <div>
                <span className="inline-block text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">Free Download</span>
                <h2 className="text-white font-extrabold text-2xl leading-snug mb-4">
                  Our HCP&apos;s Panel Book
                </h2>
                <p className="text-white/60 text-sm leading-7">
                  For a comprehensive breakdown, complete the form to receive your free Healthcare Professionals Panel Book.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                {["711K+ Verified HCPs", "30+ Countries", "HIPAA & GDPR Compliant", "NPI & AMA Validated"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-white/70 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="flex-1 bg-white p-10">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <CheckCircle className="w-14 h-14 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">Request Submitted!</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Thank you! We&apos;ll send your free HCP Panel Book to your email shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFields({ name: "", company: "", designation: "", email: "" }); setFileName(""); setCaptcha(false); }}
                className="cursor-pointer mt-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Name" value={fields.name} onChange={(e) => set("name", e.target.value)} className={inputClass("name")} />
                  <FieldError msg={errors.name ?? ""} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Company Name" value={fields.company} onChange={(e) => set("company", e.target.value)} className={inputClass("company")} />
                  <FieldError msg={errors.company ?? ""} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Designation</label>
                  <input type="text" placeholder="Your Designation" value={fields.designation} onChange={(e) => set("designation", e.target.value)} className={inputClass("designation")} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email ID <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="Email" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
                  <FieldError msg={errors.email ?? ""} />
                </div>
              </div>

              {/* Captcha + Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-6">
                <label className="flex items-center gap-3 cursor-pointer border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 select-none">
                  <div
                    onClick={() => setCaptcha((c) => !c)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${captcha ? "bg-primary border-primary" : "border-gray-300"}`}
                  >
                    {captcha && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">I&apos;m not a robot</span>
                  <div className="ml-3 text-right">
                    <div className="text-[10px] text-gray-400">reCAPTCHA</div>
                    <div className="text-[9px] text-gray-300">Privacy · Terms</div>
                  </div>
                </label>

                <button type="submit" className="cursor-pointer bg-primary text-white font-bold px-10 py-3 rounded-xl text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Submit <span className="text-base">»</span>
                </button>
              </div>
            </form>
          )}
            </div>{/* right form panel */}
          </motion.div>{/* card */}
        </div>
      </section>


      <LatestReadsSection />

    </main>
  );
}
