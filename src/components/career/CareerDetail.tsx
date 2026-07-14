"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, Calendar, Check, Upload, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import PageHero from "@/components/ui/PageHero";

/* ── Helpers ── */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start py-2">
      <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-accent" strokeWidth={3} />
      </span>
      <span className="text-gray-700 text-sm leading-7">{children}</span>
    </li>
  );
}

function FieldError({ msg }: { msg: string }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

type FormFields = {
  name: string; email: string; mobile: string;
  profile: string; linkedin: string; about: string;
};
type FormErrors = Partial<Record<keyof FormFields | "resume" | "captcha", string>>;

export default function CareerDetail({ job }: { job: Job }) {
  const [fileName, setFileName] = useState("");
  const [captcha, setCaptcha]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields]     = useState<FormFields>({
    name: "", email: "", mobile: "", profile: job.title, linkedin: "", about: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function set(field: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!fields.name.trim())   e.name   = "Full name is required.";
    if (!fields.email.trim())  e.email  = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                               e.email  = "Enter a valid email address.";
    if (!fields.mobile.trim()) e.mobile = "Mobile number is required.";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(fields.mobile))
                               e.mobile = "Enter a valid mobile number.";
    if (!fields.profile.trim()) e.profile = "Please specify which profile you are applying for.";
    if (fields.linkedin.trim() && !/^https?:\/\/.+/.test(fields.linkedin))
                               e.linkedin = "Enter a valid URL starting with http(s)://";
    if (!fileName)             e.resume  = "Please upload your resume.";
    if (!fields.about.trim())  e.about   = "Please tell us a bit about yourself.";
    if (!captcha)              e.captcha = "Please confirm you are not a robot.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const inputCls = (field: keyof FormErrors) =>
    `w-full border ${errors[field] ? "border-red-400" : "border-gray-200"} rounded-xl bg-gray-50 px-4 py-3 text-sm placeholder:text-gray-400 outline-none focus:border-accent focus:bg-white transition-colors text-gray-900`;

  return (
    <main>
      {/* ── Banner ── */}
      <PageHero
        badge={`${job.type} · ${job.location}`}
        heading={<>{job.title}</>}
        description={job.sections[0]?.items[0] ?? "Join our team and make an impact across global research projects."}
        primaryCta={{ label: "Apply Now", href: "#apply" }}
        secondaryCta={{ label: "Back to Careers", href: "/career" }}
        minHeight="min-h-[600px] sm:min-h-[720px] lg:min-h-[840px]"
        breadcrumb={`Careers / ${job.title}`}
      />

      {/* ── Body ── */}
      <section className="bg-[#f3efe9] py-16">
        <div className="site-container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Left: Job detail ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Meta card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6"
              >
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-accent" /> {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Updated: {job.updatedDate}
                  </span>
                </div>
                <h1 className="text-xl font-black text-primary">{job.title}</h1>
              </motion.div>

              {/* Sections */}
              {job.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6"
                >
                  <h2 className="text-sm font-bold text-primary mb-4 leading-6">{section.heading}</h2>
                  <ul className="space-y-0.5">
                    {section.items.map((item, j) => (
                      <CheckItem key={j}>{item}</CheckItem>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* ── Right: Sticky sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Quick apply CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
                  className="bg-primary rounded-2xl p-6 text-center"
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 mb-4">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Actively Hiring</span>
                  </div>
                  <h3 className="text-white font-black text-lg mb-2">Ready to apply?</h3>
                  <p className="text-white/60 text-xs leading-6 mb-5">Fill the form below and our HR team will get back within 5 business days.</p>
                  <a
                    href="#apply"
                    className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:opacity-90 text-white font-bold px-6 py-3.5 rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/career"
                    className="inline-flex items-center justify-center gap-1 w-full mt-3 text-white/50 hover:text-white text-xs font-medium transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 rotate-180" /> Back to all jobs
                  </Link>
                </motion.div>

                {/* Share / info card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5"
                >
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Job Summary</p>
                  <div className="space-y-3">
                    {[
                      { label: "Location", value: job.location },
                      { label: "Job Type", value: job.type },
                      { label: "Department", value: job.sections[0] ? "Research & Projects" : "General" },
                      { label: "Experience", value: "0–5 years" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-400 font-medium">{row.label}</span>
                        <span className="text-gray-800 font-bold">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="apply" className="bg-white py-20">
        <div className="site-container px-6 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-5">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Apply Now</span>
            </div>
            <h2 className="text-3xl font-black uppercase text-primary mb-3">Join Our Team</h2>
            <p className="text-gray-500 text-sm leading-7 max-w-md mx-auto">
              Take the next step in your career with Track Opinion — make a difference in a fast-paced global research environment.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-2">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-black text-primary">Application Submitted!</h3>
                <p className="text-gray-500 text-sm max-w-sm leading-7">
                  Thank you for applying for <strong>{job.title}</strong>. We&apos;ll review your resume and get back to you within 5 business days.
                </p>
                <Link
                  href="/career"
                  className="mt-4 inline-flex items-center gap-2 px-8 py-3 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-all"
                >
                  Back to Jobs
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6"
                noValidate
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Your full name" value={fields.name} onChange={(e) => set("name", e.target.value)} className={inputCls("name")} />
                    <FieldError msg={errors.name ?? ""} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="you@email.com" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputCls("email")} />
                    <FieldError msg={errors.email ?? ""} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="+91 98765 43210" value={fields.mobile} onChange={(e) => set("mobile", e.target.value)} className={inputCls("mobile")} />
                    <FieldError msg={errors.mobile ?? ""} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Applying For <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Role / Profile" value={fields.profile} onChange={(e) => set("profile", e.target.value)} className={inputCls("profile")} />
                    <FieldError msg={errors.profile ?? ""} />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">LinkedIn Profile <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                  <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={fields.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={inputCls("linkedin")} />
                  <FieldError msg={errors.linkedin ?? ""} />
                </div>

                {/* Resume upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Upload Resume <span className="text-red-500">*</span></label>
                  <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl bg-gray-50 py-8 cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors ${errors.resume ? "border-red-400" : "border-gray-200"}`}>
                    <Upload className="w-8 h-8 text-gray-300" />
                    <span className="text-sm text-gray-500 font-medium">
                      {fileName
                        ? <span className="text-accent font-bold">{fileName}</span>
                        : "Click to upload your resume"}
                    </span>
                    <span className="text-xs text-gray-400">PDF, DOC, DOCX — max 5 MB</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const name = e.target.files?.[0]?.name ?? "";
                        setFileName(name);
                        setErrors((err) => ({ ...err, resume: "" }));
                      }}
                    />
                  </label>
                  <FieldError msg={errors.resume ?? ""} />
                </div>

                {/* About */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">About You <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    placeholder="Tell us a little about yourself and why you're a great fit…"
                    value={fields.about}
                    onChange={(e) => set("about", e.target.value)}
                    className={`${inputCls("about")} resize-none`}
                  />
                  <FieldError msg={errors.about ?? ""} />
                </div>

                {/* Captcha */}
                <div>
                  <div
                    className={`inline-flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 cursor-pointer select-none transition-colors ${errors.captcha ? "border-red-400" : "border-gray-200 hover:border-gray-300"}`}
                    onClick={() => { setCaptcha((v) => !v); setErrors((e) => ({ ...e, captcha: "" })); }}
                  >
                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 transition-colors ${captcha ? "bg-accent border-accent" : "border-gray-300"}`}>
                      {captcha && <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white"><path d="M1 4l3 3 5-6" /></svg>}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">I&apos;m not a robot</span>
                    <div className="ml-6 text-right">
                      <div className="text-[10px] text-gray-400">reCAPTCHA</div>
                      <div className="text-[9px] text-gray-300">Privacy · Terms</div>
                    </div>
                  </div>
                  <FieldError msg={errors.captcha ?? ""} />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:border-primary/40 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Back to Jobs
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-white font-bold px-10 py-3.5 rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  >
                    Send Application <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

    </main>
  );
}
