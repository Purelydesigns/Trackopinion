"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import GlobalReach from "@/components/about/GlobalReach";

/* ── Data ── */
const capabilities = [
  {
    title: "Profile Validation & Maintenance",
    desc: "Strict profiling starts right at the registration process when building a healthcare panel for online surveys. Healthcare professionals and physicians' profiles validated against NPI and AMA databases. Compulsory updates every six months for the panelists to maintain their latest data.",
  },
  {
    title: "Data Security",
    desc: "Patients' and professionals' records are secured with top-notch data sharing policies as directed by the local government and regulatory authorities. In compliance with GDPR, we seek panelists' consent before storing healthcare data points in Europe.",
  },
  {
    title: "Coherent Data",
    desc: "Never lose the tone of a panelist's opinion and sentiments expressed in words. Accurate qualitative customer insights for your complex research. Translation experts in our team across the globe make it possible to conduct qualitative market research in all major languages.",
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

      {/* ════════ HERO BANNER — same as About Us ════════ */}
      <section className="-mt-[76px] relative min-h-[500px] sm:min-h-[700px] lg:h-[840px] flex items-center overflow-hidden">
        <video src="/video/banner.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative w-full site-container px-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Healthcare
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-8 mb-8">
              A carefully curated panel of thousands of patients, healthcare practitioners, and pharma employees for genuine data. Reach wide and deep in 30+ Countries. All your Medical research fulfilled right at Track Opinion.
            </p>
            <button className="cursor-pointer bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-sm flex items-center gap-2">
              Explore More <span className="text-lg">»</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════ DIG DEEPER HEADING ════════ */}
      <section className="bg-white pt-12">
        <div className="site-container px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-primary text-xl">●</span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-primary">
              Dig Deeper into Patient&apos;s and Practitioners Experience
            </h2>
            <span className="text-primary text-xl">●</span>
          </div>
          <div className="mt-6 border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ MAP CARD ════════ */}
      <section className="bg-white py-12">
        <div className="site-container px-6">
          <div className="bg-gray-100 rounded-2xl border border-gray-200 px-8 pt-10 pb-6 overflow-hidden">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">30+ countries in our global reach</h2>
              <p className="text-gray-900 text-base max-w-2xl mx-auto leading-8 font-medium">
                Panel members available in all major countries and continents for healthcare market research. Partnership with local panel providers increases our bandwidth and diversifies online market research.
              </p>
            </div>
            <GlobalReach hideHeading cardMode />
          </div>
        </div>
      </section>

      {/* ════════ CAPABILITIES ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">Our Capabilities</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <IconBox />
                <h3 className="text-lg font-bold text-gray-900 mb-3">{cap.title}</h3>
                <p className="text-gray-900 text-base leading-8 font-medium">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 711K BANNER ════════ */}
      <section className="site-container px-6 pb-16">
        <motion.div {...fadeUp()} className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80"
            alt="Healthcare professionals"
            className="w-full h-72 md:h-96 object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-primary/90 py-5 px-8 text-center">
            <p className="text-white font-bold text-lg mb-1">711k Healthcare professionals</p>
            <p className="text-white/90 text-base font-medium">
              Elevate your research experience to new heights with our comprehensive solutions, cutting-edge methodologies, and unwavering commitment
            </p>
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
                      whileHover={{ scale: 1.12, backgroundColor: "#f97316" }}
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

      {/* ════════ FAQS ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-primary font-semibold uppercase text-sm mb-2">FAQs</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Have a Question? Contact Us</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)}>
                {/* Question row — always its own card */}
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="cursor-pointer w-full flex items-center justify-between px-6 py-5 text-left border border-gray-200 rounded-2xl bg-white hover:border-gray-300 transition-colors"
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  }
                </button>
                {/* Answer — separate card below */}
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-2 px-6 py-5 border border-gray-200 rounded-2xl bg-white text-gray-900 text-base leading-8 font-medium whitespace-pre-line"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PANEL BOOK FORM — Career Detail style ════════ */}
      <section className="bg-white py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-3">Our HCP&apos;s Panel Book</h2>
            <p className="text-gray-900 text-base max-w-xl mx-auto leading-8 font-medium">
              For a comprehensive breakdown, complete the form below to receive your free Healthcare Professionals Panel Book
            </p>
          </motion.div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">Request Submitted!</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Thank you! We&apos;ll send your free HCP Panel Book to your email shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFields({ name: "", company: "", designation: "", email: "" }); setFileName(""); setCaptcha(false); }}
                className="cursor-pointer mt-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Name" value={fields.name} onChange={(e) => set("name", e.target.value)} className={inputClass("name")} />
                  <FieldError msg={errors.name ?? ""} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Company Name" value={fields.company} onChange={(e) => set("company", e.target.value)} className={inputClass("company")} />
                  <FieldError msg={errors.company ?? ""} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Designation</label>
                  <input type="text" placeholder="Location" value={fields.designation} onChange={(e) => set("designation", e.target.value)} className={inputClass("designation")} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email ID <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="Email" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
                  <FieldError msg={errors.email ?? ""} />
                </div>
              </div>

              {/* Captcha */}
              <div className="mb-8">
                <label className="flex items-center gap-3 cursor-pointer w-fit border border-gray-200 rounded-xl px-5 py-4 bg-white shadow-sm select-none">
                  <div
                    onClick={() => setCaptcha((c) => !c)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${captcha ? "bg-primary border-primary" : "border-gray-300"}`}
                  >
                    {captcha && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">I&apos;m not a robot</span>
                  <div className="ml-4 text-right">
                    <div className="text-[10px] text-gray-400">reCAPTCHA</div>
                    <div className="text-[9px] text-gray-300">Privacy - Terms</div>
                  </div>
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button type="submit" className="cursor-pointer bg-primary hover:bg-primary text-white font-bold px-12 py-3.5 rounded-xl transition-colors duration-300 text-sm flex items-center gap-2">
                  Submit <span className="text-base">»</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </main>
  );
}
