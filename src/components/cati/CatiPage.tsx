"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, ChevronDown, ChevronUp, Upload } from "lucide-react";
import GlobalReach from "@/components/about/GlobalReach";

/* ── Data ── */
const capabilities = [
  {
    title: "Gather, Not Manage",
    desc: "Call recordings and intuitive interfaces help agents facilitate respondents' answers and focus on their cadence without managing the incoming feedback and advanced training.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8 C10 8 8 14 8 18 C8 26 16 30 16 30 C16 30 22 34 30 30" />
        <circle cx="34" cy="28" r="6" />
        <path d="M20 8 C26 8 28 14 28 18" />
        <circle cx="16" cy="8" r="2.5" />
        <circle cx="20" cy="8" r="2.5" />
        <path d="M34 25 V31 M31 28 H37" />
      </svg>
    ),
  },
  {
    title: "Time Zones",
    desc: "No worry about calling your respondents at an ungodly hour. Allow CATI to manage various timezones based on your users' demographics.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 8 V24 L32 32" />
        <path d="M8 24 H40" strokeDasharray="3 3" />
        <path d="M24 8 C28 12 30 18 30 24 C30 30 28 36 24 40 C20 36 18 30 18 24 C18 18 20 12 24 8Z" />
      </svg>
    ),
  },
  {
    title: "Data Security",
    desc: "With strong firewalls and secure file sharing, your call records and user data are in safe hands. No distortion, no leaks, no loss. Complete data integrity.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6 L38 12 V24 C38 33 31 40 24 42 C17 40 10 33 10 24 V12 Z" />
        <path d="M18 24 L22 28 L30 20" />
      </svg>
    ),
  },
  {
    title: "Turnaround Efficiency",
    desc: "Save over 30% of your time by commissioning a CATI project with us and still get qualitative market research data.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 14 V24 L30 30" />
        <path d="M14 8 L10 4 M34 8 L38 4" />
        <path d="M8 24 H4 M44 24 H40" />
      </svg>
    ),
  },
  {
    title: "Predictive Dialing",
    desc: "CATI software helps establish an automatic call connection between the first available agent and your respondent.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 8 C14 8 10 10 10 16 C10 30 18 38 32 38 C38 38 40 34 40 34 L34 28 L28 30 C28 30 26 28 22 24 C18 20 16 18 16 18 L18 12 Z" />
        <path d="M30 8 C34 8 40 14 40 20" />
        <path d="M30 14 C32 14 36 18 36 20" />
      </svg>
    ),
  },
  {
    title: "Agent Assist",
    desc: "Chat with your interviewers, broadcast messages to an individual or all, and hand-hold them through the initial phase by setting program rules.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="8" />
        <path d="M10 40 C10 32 16 28 24 28 C32 28 38 32 38 40" />
        <path d="M30 20 L36 14 M36 14 L42 20 M36 14 V28" />
      </svg>
    ),
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
    `w-full border-b ${field && errors[field] ? "border-red-400" : "border-gray-200"} bg-gray-50 px-4 py-3 text-sm placeholder:text-gray-500 outline-none focus:border-primary transition-colors text-gray-900`;

  return (
    <main className="bg-white">

      {/* ════════ HERO — video banner ════════ */}
      <section className="-mt-[76px] relative min-h-[500px] sm:min-h-[700px] lg:h-[840px] flex items-center overflow-hidden">
        <video src="/video/banner.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative w-full max-w-[1536px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Computer Assisted Telephone Interviewing
            </h1>
            <p className="text-white/75 text-sm sm:text-base md:text-lg leading-8 mb-10">
              CATI is a cost-effective online user interview process. You can collect qualitative and quantitative data fast. Fine-tune your questionnaires with logical jumps and filter outcomes with control questions.
            </p>
            <button className="cursor-pointer bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-sm flex items-center gap-2">
              Explore More <span className="text-lg">»</span>
            </button>
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

      {/* ════════ OUR CAPABILITIES ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">Our Capabilities</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  {cap.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{cap.title}</h3>
                <p className="text-gray-900 text-base leading-8 font-medium">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQS ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-primary font-semibold uppercase text-sm mb-2">FAQs</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Have a Question? Contact Us</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)}>
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
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-2 px-6 py-5 border border-gray-200 rounded-2xl bg-white text-gray-900 text-base leading-8 font-medium"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTACT FORM ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1536px] mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-3">
              Get in Touch to Execute a CATI Project
            </h2>
            <p className="text-gray-900 text-base max-w-2xl mx-auto leading-8 font-medium">
              Generate valuable insights about your users, market, and brand. Seek online feedback affiliated with CATI for speedy quantitative market research solutions.
            </p>
          </motion.div>

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
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Company Location</label>
                  <input type="text" placeholder="Location" value={fields.location} onChange={(e) => set("location", e.target.value)} className={inputClass()} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Business Email ID <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="Email" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
                  <FieldError msg={errors.email ?? ""} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Job Title</label>
                  <input type="text" placeholder="Title" value={fields.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} className={inputClass()} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Project Location</label>
                  <input type="text" placeholder="Location" value={fields.projectLocation} onChange={(e) => set("projectLocation", e.target.value)} className={inputClass()} />
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Project Description</label>
                <textarea
                  rows={4}
                  placeholder="Description...."
                  value={fields.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="w-full border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm placeholder:text-gray-500 outline-none focus:border-primary transition-colors text-gray-900 resize-none"
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Message...."
                  value={fields.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="w-full border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm placeholder:text-gray-500 outline-none focus:border-primary transition-colors text-gray-900 resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Project Upload</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">{fileName || "Click to upload your project files"}</p>
                  <p className="text-xs text-gray-400">PDF, DOC, XLS up to 10MB</p>
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
                <button type="submit" className="cursor-pointer bg-primary hover:bg-primary text-white font-bold px-14 py-3.5 rounded-xl transition-colors duration-300 text-sm flex items-center gap-2">
                  Request A Proposal <span className="text-base">»</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </section>

    </main>
  );
}
