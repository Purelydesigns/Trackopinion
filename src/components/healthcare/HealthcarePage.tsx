"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import GlobalReach from "@/components/about/GlobalReach";
import PanelSpecialties from "./PanelSpecialties";
import LatestReadsSection from "../shared/LatestReadsSection";
import PageHero from "../ui/PageHero";
import SiteCard from "../ui/SiteCard";
import SectionHeader from "../ui/SectionHeader";
import { ShieldCheck, Database, Languages } from "lucide-react";
import { faqs } from "./faqs";

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
          breadcrumb={[{ name: "Solutions" }, { name: "Healthcare" }]}
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


      {/* ════════ WHO'S IN OUR PANEL ════════ */}
      <PanelSpecialties />

      {/* ════════ STATS BANNER ════════ */}
      <section className="py-16 site-container px-6">
        <motion.div
          {...fadeUp()}
          className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1b3e 50%, #112254 100%)" }}
        >

          <div className="px-10 py-12">

            <SectionHeader
              label="Healthcare Panel Network"
              heading={
                <>
                  Elevate your research with our comprehensive healthcare solutions and cutting-edge methodologies
                </>
              }
              description=""
              className=""
              theme="dark"
            />

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

      {/* ════════ DIG DEEPER HEADING ════════ */}
      <section className="bg-section pt-12">
        <div className="site-container px-6 text-center">

          <SectionHeader
            label=""
            heading={
              <>
                Dig Deeper into Patient&apos;s and Practitioners Experience
              </>
            }
            description=""
            className="!mb-6"
          />
          <div className="border-b-2 border-gray-200" />
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
                        className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4"
                      >
                        <Icon size={26} strokeWidth={1.5} style={{ color: "white" }} />
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

      

      

      {/* ════════ PANEL BOOK FORM ════════ */}
      <section className="bg-section py-16">
        <div className="site-container px-6">
          <motion.div {...fadeUp()} className="rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">

            {/* Left — navy info panel */}
            <div
              className="md:w-[340px] shrink-0 flex flex-col justify-between p-10"
              style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d1b3e 60%, #112254 100%)" }}
            >

              <SectionHeader
                label="Free Download"
                heading={
                  <>
                    Our HCP&apos;s Panel Book
                  </>
                }
                description="For a comprehensive breakdown, complete the form to receive your free Healthcare Professionals Panel Book."
                theme="dark"
                align="left"
              />
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
