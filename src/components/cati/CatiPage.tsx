"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, ChevronDown, ChevronUp, Upload, Headphones, Globe, ShieldCheck, Zap, PhoneCall, MessageSquare } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GlobalReach from "@/components/about/GlobalReach";
import SectionHeader from "../ui/SectionHeader";
import SiteCard from "../ui/SiteCard";
import LatestReadsSection from "../shared/LatestReadsSection";
import ProcessSteps, { ProcessStep } from "../shared/ProcessSteps";
import { FileText, Users, BarChart3, ClipboardCheck } from "lucide-react";
import { faqs } from "./faqs";

/* ── Data ── */
const catiSteps: ProcessStep[] = [
  {
    num: "01",
    label: "Project Consultation & Questionnaire Design",
    desc: "Scoping, then logical jumps and control questions",
    icon: <FileText className="w-6 h-6" />,
    detail: {
      title: "Step 01 — Project Consultation & Questionnaire Design",
      body: "We start by scoping your objectives, target audience, and markets. From there we build precision questionnaires with logical jumps, skip patterns, and control questions tailored to your research goals.",
    },
  },
  {
    num: "02",
    label: "Recruitment & Moderator Allocation",
    desc: "Matched by demographic, timezone, and language",
    icon: <Users className="w-6 h-6" />,
    detail: {
      title: "Step 02 — Recruitment & Moderator Allocation",
      body: "Respondents are recruited against your screening criteria, and trained interviewers are assigned by demographic, timezone, and language requirements of your target audience.",
    },
  },
  {
    num: "03",
    label: "Pilot Testing & Quality Validation",
    desc: "A soft launch before full fieldwork",
    icon: <ClipboardCheck className="w-6 h-6" />,
    detail: {
      title: "Step 03 — Pilot Testing & Quality Validation",
      body: "A soft launch validates the script, routing, and average interview length before full fieldwork begins — so issues are caught and corrected while the sample is still intact.",
    },
  },
  {
    num: "04",
    label: "Live CATI Fieldwork",
    desc: "Predictive dialing, monitored in real time",
    icon: <PhoneCall className="w-6 h-6" />,
    detail: {
      title: "Step 04 — Live CATI Fieldwork",
      body: "Predictive dialing connects agents to respondents instantly. Calls are recorded and monitored in real-time, with progress against quota tracked throughout fieldwork.",
    },
  },
  {
    num: "05",
    label: "Quality Assurance & Verification",
    desc: "Back-checks, audits, and open-end review",
    icon: <ShieldCheck className="w-6 h-6" />,
    detail: {
      title: "Step 05 — Quality Assurance & Verification",
      body: "Completed interviews go through back-checks, call audits, and open-end review. Anything that fails validation is removed and replaced before the dataset is signed off.",
    },
  },
  {
    num: "06",
    label: "Recordings & Data Delivery",
    desc: "Cleaned datasets, reports, and call recordings",
    icon: <BarChart3 className="w-6 h-6" />,
    detail: {
      title: "Step 06 — Recordings & Data Delivery",
      body: "Cleaned, validated datasets with analysis-ready reports and call recordings — on time, every time, across the formats you need.",
    },
  },
];


const capabilities = [
  {
    title: "Gather, Not Manage",
    desc: "Call recordings and intuitive interfaces help agents facilitate respondents' answers and focus on their cadence without managing the incoming feedback and advanced training.",
    icon: <Headphones className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Time Zones",
    desc: "No worry about calling your respondents at an ungodly hour. Allow CATI to manage various timezones based on your users' demographics.",
    icon: <Globe className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Data Security",
    desc: "With strong firewalls and secure file sharing, your call records and user data are in safe hands. No distortion, no leaks, no loss. Complete data integrity.",
    icon: <ShieldCheck className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Turnaround Efficiency",
    desc: "Save over 30% of your time by commissioning a CATI project with us and still get qualitative market research data.",
    icon: <Zap className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Predictive Dialing",
    desc: "CATI software helps establish an automatic call connection between the first available agent and your respondent.",
    icon: <PhoneCall className="w-9 h-9 text-white" strokeWidth={1.5} />,
  },
  {
    title: "Agent Assist",
    desc: "Chat with your interviewers, broadcast messages to an individual or all, and hand-hold them through the initial phase by setting program rules.",
    icon: <MessageSquare className="w-9 h-9 text-white" strokeWidth={1.5} />,
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
    `w-full rounded-xl ${field && errors[field] ? "border-red-400" : "border-white/10"} border bg-white/8 px-4 py-3 text-sm placeholder:text-white/30 outline-none focus:border-primary transition-colors text-white`;

  return (
    <main className="bg-white">

      <PageHero
        breadcrumb={[{ name: "Solutions" }, { name: "CATI Solutions" }]}
        badge="CATI · Computer Assisted Telephone Interviewing"
        heading={
          <>
            Computer Assisted<br />
            Telephone{" "}
            Interviewing
          </>
        }
        description="CATI is a cost-effective online user interview process. You can collect qualitative and quantitative data fast. Fine-tune your questionnaires with logical jumps and filter outcomes with control questions."
        primaryCta={{ label: "Explore More", href: "/contact-us" }}
        secondaryCta={{ label: "See Capabilities", href: "#capabilities" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
      />

      {/* ════════ ERASE COMPLEXITIES HEADING ════════ */}
      <section className="bg-section pt-12">
        <div className="site-container px-6 text-center">

          <SectionHeader
            label=""
            heading={
              <>
                Erase Complexities from Data Collection with CATI
              </>
            }
            description="Software driven calls for user feedback. Quality data with swift turnaround, anytime, from anywhere. That&apos;s what computer aided telephone interviews brings."
            className="!mb-0"
          />
          <div className="border-b-2 border-gray-200" />
        </div>
      </section>

      {/* ════════ MAP ════════ */}
      <GlobalReach
        heading="CATI Reach"
        description="CATI is a cost-effective online user interview process. You can collect qualitative and quantitative data fast. Fine-tune your questionnaires with logical jumps and filter outcomes with control questions."
      />

      {/* ════════ HOW CATI WORKS ════════ */}
      <ProcessSteps
        steps={catiSteps}
        label="The Process"
        heading={<>CATI Works</>}
        description="A six-step framework from project consultation to clean data delivery — managed end-to-end by our expert team."
        sectionClassName="bg-white py-20"
      />


      {/* ════════ OUR CAPABILITIES ════════ */}
      <section className="bg-section py-20">
        <div className="site-container px-6">

          <SectionHeader
            label="Our Capabilities"
            heading={<>Scale &amp; Precision</>}
            description="Six CATI capabilities that make Track Opinion the most reliable partner for software-driven telephone research."
            theme="light"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
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
                      {cap.icon}
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">{cap.title}</h3>
                    <p className="text-gray-600 text-base leading-8 font-medium flex-1">{cap.desc}</p>
                  </div>
                </SiteCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTACT FORM ════════ */}
      <section className="bg-section">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp()} className="rounded-3xl p-10 sm:p-12" style={{ background: "linear-gradient(145deg, #0d2147 0%, #0d1b3e 60%, #091530 100%)" }}>


            <SectionHeader
              label="Responding within 24h"
              heading={
                <>
                  Get In Touch to Execute a CATI Project
                </>
              }
              description="Generate valuable insights about your users, market, and brand. Seek online feedback affiliated with CATI for speedy quantitative market research solutions."
              theme="dark"
              align="left"
              className="!mb-0"
            />

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
                  className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm placeholder:text-white/30 outline-none focus:border-primary transition-colors text-white resize-none"
                />
              </div>


              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-white/70 mb-3">Project Upload</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="group cursor-pointer border-2 border-dashed border-white/20 rounded-2xl py-10 px-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors duration-300"
                >
                  {/* Three stacked document icons */}
                  <div className="flex items-end justify-center gap-2 h-16">
                    <div className="w-10 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center -rotate-12 translate-y-1 group-hover:translate-y-2 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div className="w-11 h-14 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-primary/30 group-hover:border-primary/60 group-hover:-translate-y-2 transition-all duration-300 z-10">
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

      <LatestReadsSection />

    </main>
  );
}
