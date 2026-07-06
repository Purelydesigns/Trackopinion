"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, ChevronDown, ChevronUp, Upload, Headphones, Globe, ShieldCheck, Zap, PhoneCall, MessageSquare } from "lucide-react";
import GlobalReach from "@/components/about/GlobalReach";

/* ── Data ── */
const capabilities = [
  {
    title: "Gather, Not Manage",
    desc: "Call recordings and intuitive interfaces help agents facilitate respondents' answers and focus on their cadence without managing the incoming feedback and advanced training.",
    icon: <Headphones className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Time Zones",
    desc: "No worry about calling your respondents at an ungodly hour. Allow CATI to manage various timezones based on your users' demographics.",
    icon: <Globe className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Data Security",
    desc: "With strong firewalls and secure file sharing, your call records and user data are in safe hands. No distortion, no leaks, no loss. Complete data integrity.",
    icon: <ShieldCheck className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Turnaround Efficiency",
    desc: "Save over 30% of your time by commissioning a CATI project with us and still get qualitative market research data.",
    icon: <Zap className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Predictive Dialing",
    desc: "CATI software helps establish an automatic call connection between the first available agent and your respondent.",
    icon: <PhoneCall className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
  {
    title: "Agent Assist",
    desc: "Chat with your interviewers, broadcast messages to an individual or all, and hand-hold them through the initial phase by setting program rules.",
    icon: <MessageSquare className="w-9 h-9 text-current" strokeWidth={1.5} />,
  },
];

const faqs = [
  {
    q: "What is CATI and how does it work?",
    a: "CATI (Computer Assisted Telephone Interviewing) is a survey methodology where an interviewer follows a script provided by a software application while conducting interviews over the phone. The software guides the interviewer through questions, records answers in real time, and applies skip logic automatically — eliminating manual data entry errors.",
  },
  {
    q: "What types of research are best suited for CATI?",
    a: "CATI is ideal for quantitative research such as customer satisfaction surveys, brand tracking, market segmentation, and political polling. It is especially effective when you need to reach demographics that are less digitally active, require a human touch, or when response quality and data validation are critical.",
  },
  {
    q: "How do you ensure data quality in CATI projects?",
    a: "We maintain data quality through trained interviewers, real-time supervisor monitoring, call recording, automated skip logic, duplicate detection, and back-checks on a sample of completed interviews. Our CATI software flags inconsistent responses for review before final delivery.",
  },
  {
    q: "What languages can CATI interviews be conducted in?",
    a: "Track Opinion supports CATI interviews in 50+ languages. Our multilingual interviewer network and localized scripts ensure that language barriers do not compromise data quality or respondent experience in any market.",
  },
];

/* ── Helpers ── */
function FieldError({ msg }: { msg: string }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

type FormFields = {
  name: string; company: string; location: string; email: string;
  jobTitle: string; projectLocation: string; description: string; message: string;
};
type FormErrors = Partial<Record<keyof FormFields, string>>;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── Main ── */
export default function CatiPage() {
  const [openFaq, setOpenFaq]     = useState<number | null>(0);
  const [captcha, setCaptcha]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName]   = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState<FormFields>({
    name: "", company: "", location: "", email: "",
    jobTitle: "", projectLocation: "", description: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function set(field: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!fields.name.trim())    e.name    = "Your name is required.";
    if (!fields.company.trim()) e.company = "Company name is required.";
    if (!fields.email.trim())   e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const inputClass = (field?: keyof FormErrors) =>
    `w-full rounded-xl ${field && errors[field] ? "border-red-400" : "border-white/10"} border bg-white/8 px-4 py-3 text-sm placeholder:text-white/30 outline-none focus:border-accent transition-colors text-white`;

  return (
    <main className="bg-white">

      {/* ════════ HERO ════════ */}
      <section className="-mt-[76px] pt-[76px] relative overflow-hidden min-h-[600px] flex items-center">
        {/* Video background */}
        <video src="/video/banner_recolored.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        {/* Gradient overlay — dark navy left fading to transparent right */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,62,0.95) 0%, rgba(26,47,94,0.80) 20%, rgba(26,82,118,0.55) 40%, rgba(174,214,241,0.25) 70%, rgba(255,255,255,0.05) 100%)" }} />
        <div className="relative w-full max-w-[1536px] mx-auto px-6 pt-16 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                CATI · Computer Assisted Telephone Interviewing
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              Computer Assisted<br />
              <span className="italic font-normal text-highlight">Telephone</span>{" "}
              Interviewing
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-8 mb-10 max-w-xl">
              CATI is a cost-effective online user interview process. You can collect qualitative and quantitative data fast. Fine-tune your questionnaires with logical jumps and filter outcomes with control questions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-accent text-white font-bold px-7 py-3.5 rounded-lg text-sm flex items-center gap-2 shadow-lg"
              >
                Explore More →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/30 text-white font-semibold px-7 py-3.5 rounded-lg text-sm hover:bg-white/10 transition-colors duration-200"
              >
                See Capabilities
              </motion.button>
            </div>
          </motion.div>
        </div>

      </section>

      {/* ════════ ERASE COMPLEXITIES HEADING ════════ */}
      <section className="bg-white pt-12">
        <div className="max-w-[1536px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-primary text-xl">●</span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-primary">
              Erase Complexities from Data Collection with CATI
            </h2>
            <span className="text-primary text-xl">●</span>
          </div>
          <p className="mt-4 text-gray-900 text-base max-w-2xl mx-auto leading-8 font-medium">
            Software driven calls for user feedback. Quality data with swift turnaround, anytime, from anywhere. That&apos;s what computer aided telephone interviews brings.
          </p>
          <div className="mt-6 border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ MAP CARD ════════ */}
      <section className="bg-white py-12">
        <div className="max-w-[1536px] mx-auto px-6">
          <div className="bg-gray-100 rounded-2xl border border-gray-200 px-8 pt-10 pb-6 overflow-hidden">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">CATI Reach</h2>
              <p className="text-gray-900 text-base max-w-2xl mx-auto leading-8 font-medium">
                CATI is a cost-effective online user interview process. You can collect qualitative and quantitative data fast. Fine-tune your questionnaires with logical jumps and filter outcomes with control questions.
              </p>
            </div>
            <GlobalReach hideHeading cardMode />
          </div>
        </div>
      </section>

      {/* ════════ HOW CATI WORKS ════════ */}
      <section className="bg-section py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-accent block" />
              <p className="text-accent text-xs font-bold uppercase tracking-widest">The Process</p>
              <span className="h-px w-8 bg-accent block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4">
              How <span className="italic font-normal">CATI Works</span>
            </h2>
            <p className="text-gray-900 text-base max-w-xl mx-auto leading-8 font-medium">
              A four-step framework from questionnaire design to clean data delivery — managed end-to-end by our expert team.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                num: "01",
                title: "Questionnaire Design",
                desc: "Precision questionnaires with logical jumps, skip patterns, and control questions tailored to your research goals.",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
              },
              {
                num: "02",
                title: "Agent Allocation",
                desc: "Trained interviewers assigned by demographic, timezone, and language requirements of your target audience.",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
              },
              {
                num: "03",
                title: "Live Interviews",
                desc: "Predictive dialing connects agents to respondents instantly. Calls recorded and monitored in real-time for quality.",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>,
              },
              {
                num: "04",
                title: "Data Delivery",
                desc: "Cleaned, validated datasets with analysis-ready reports — on time, every time, across formats you need.",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
              },
            ].map((step, i, arr) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group flex flex-col items-center text-center relative cursor-pointer"
              >
                {/* Dashed connector line (not on last item) */}
                {i < arr.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-[40px] z-0 border-t-2 border-dashed border-accent/40"
                    style={{ left: "calc(50% + 42px)", right: "calc(-50% - 32px + 42px)" }}
                  />
                )}

                {/* Step number circle */}
                <div className="relative z-10 w-20 h-20 rounded-full border-2 border-accent/30 bg-white group-hover:bg-accent group-hover:border-accent group-hover:-translate-y-3 flex items-center justify-center mb-4 shadow-sm transition-all duration-300">
                  <span className="text-2xl font-black text-accent group-hover:text-white transition-colors duration-300">{step.num}</span>
                </div>

                {/* Icon box */}
                <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-accent flex items-center justify-center mb-4 shadow-sm transition-colors duration-300">
                  <span className="text-accent group-hover:text-white transition-colors duration-300">{step.icon}</span>
                </div>

                <h3 className="text-primary font-bold text-base mb-2">{step.title}</h3>
                <p className="text-gray-900 text-base leading-8 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ OUR CAPABILITIES ════════ */}
      <section className="py-20">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-accent block" />
              <p className="text-accent text-xs font-bold uppercase tracking-widest">Our Capabilities</p>
              <span className="h-px w-8 bg-accent block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4">
              Built for{" "}
              <span className="italic font-normal">Scale &amp; Precision</span>
            </h2>
            <p className="text-gray-900 text-base max-w-xl mx-auto leading-8 font-medium">
              Six CATI capabilities that make Track Opinion the most reliable partner for software-driven telephone research.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(13,27,62,0.10)", borderColor: "rgba(26,111,232,0.3)" }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-8 cursor-pointer relative overflow-hidden"
              >
                {/* Bottom border animation left to right */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-accent transition-all duration-500 ease-out rounded-b-2xl" />
                {/* Hover gradient overlay — top-left blue fading to transparent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(26,111,232,0.07) 0%, rgba(221,228,240,0.10) 45%, rgba(255,255,255,0) 75%)" }} />

                <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-transparent flex items-center justify-center mb-5 transition-all duration-300 relative overflow-hidden  group-hover:scale-110">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1a6fe8 60%, #1558c0 100%)" }} />
                  <span className="relative z-10 text-accent group-hover:text-white transition-colors duration-300 inline-flex">
                    {cap.icon}
                  </span>
                </div>
                <h3 className="text-primary font-bold text-base mb-3">{cap.title}</h3>
                <p className="text-gray-900 text-base leading-8 font-medium">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTACT FORM ════════ */}
      <section className="bg-section py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp()} className="rounded-3xl p-10 sm:p-12" style={{ background: "linear-gradient(145deg, #0d2147 0%, #0d1b3e 60%, #091530 100%)" }}>

            {/* Badge + heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white/80 text-xs font-semibold">Responding within 24h</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
                Get In Touch to Execute a{" "}
                <span className="italic font-normal text-highlight">CATI Project</span>
              </h2>
              <p className="text-white/60 text-base leading-7">Generate valuable insights about your users, market, and brand. Seek online feedback affiliated with CATI for speedy quantitative market research solutions.</p>
            </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
              <p className="text-gray-500 text-sm max-w-sm">Thank you! Our team will get back to you shortly to discuss your CATI project.</p>
              <button
                onClick={() => { setSubmitted(false); setFields({ name: "", company: "", location: "", email: "", jobTitle: "", projectLocation: "", description: "", message: "" }); setFileName(""); setCaptcha(false); }}
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
                  <label className="block text-sm font-semibold text-white/70 mb-2">Your Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Name" value={fields.name} onChange={(e) => set("name", e.target.value)} className={inputClass("name")} />
                  <FieldError msg={errors.name ?? ""} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Company Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Company Name" value={fields.company} onChange={(e) => set("company", e.target.value)} className={inputClass("company")} />
                  <FieldError msg={errors.company ?? ""} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Company Location</label>
                  <input type="text" placeholder="Location" value={fields.location} onChange={(e) => set("location", e.target.value)} className={inputClass()} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Business Email ID <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="Email" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
                  <FieldError msg={errors.email ?? ""} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Job Title</label>
                  <input type="text" placeholder="Title" value={fields.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} className={inputClass()} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Project Location</label>
                  <input type="text" placeholder="Location" value={fields.projectLocation} onChange={(e) => set("projectLocation", e.target.value)} className={inputClass()} />
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-white/70 mb-2">Project Description</label>
                <textarea
                  rows={4}
                  placeholder="Description...."
                  value={fields.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm placeholder:text-white/30 outline-none focus:border-accent transition-colors text-white resize-none"
                />
              </div>


              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-white/70 mb-3">Project Upload</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="group cursor-pointer border-2 border-dashed border-white/20 rounded-2xl py-10 px-6 flex flex-col items-center justify-center gap-4 hover:border-accent/50 transition-colors duration-300"
                >
                  {/* Three stacked document icons */}
                  <div className="flex items-end justify-center gap-2 h-16">
                    <div className="w-10 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center -rotate-12 translate-y-1 group-hover:translate-y-2 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div className="w-11 h-14 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-accent/30 group-hover:border-accent/60 group-hover:-translate-y-2 transition-all duration-300 z-10">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div className="w-10 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center rotate-12 translate-y-1 group-hover:translate-y-2 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-white/80">{fileName || "Click Here to upload your Project"}</p>
                  <p className="text-xs text-white/35">PDF, DOC, DOCX, XLS, XLSX, PPT — max 25 MB</p>
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </div>
              </div>

              {/* Captcha */}
              <div className="mb-8">
                <label className="flex items-center gap-3 cursor-pointer w-fit border border-white/10 rounded-xl px-5 py-4 bg-white/5 select-none">
                  <div
                    onClick={() => setCaptcha((c) => !c)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${captcha ? "bg-primary border-primary" : "border-gray-300"}`}
                  >
                    {captcha && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-sm text-white/70 font-medium">I&apos;m not a robot</span>
                  <div className="ml-4 text-right">
                    <div className="text-[10px] text-white/40">reCAPTCHA</div>
                    <div className="text-[9px] text-white/25">Privacy - Terms</div>
                  </div>
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                <button type="submit" className="cursor-pointer text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 text-sm flex items-center gap-2 shadow-lg" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1a6fe8 60%, #1558c0 100%)" }}>
                  Send Message →
                </button>
                <p className="text-white/40 text-xs leading-5 max-w-xs">
                  By clicking &quot;Send Message&quot; you agree to our{" "}
                  <a href="/privacy" className="underline text-white/60 hover:text-white">Privacy Policy</a>
                  {" "}and consent to receive updates.
                </p>
              </div>

            </form>
          )}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
