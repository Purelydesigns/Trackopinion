"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Calendar, Check, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Job } from "@/lib/jobs";

/* ── Helpers ── */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start py-2">
      <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
      </span>
      <span className="text-gray-900 text-base leading-7 font-medium">{children}</span>
    </li>
  );
}

function FieldError({ msg }: { msg: string }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

/* ── Form state ── */
type FormFields = {
  name: string; email: string; mobile: string;
  profile: string; linkedin: string; about: string;
};
type FormErrors = Partial<Record<keyof FormFields | "resume" | "captcha", string>>;

/* ── Main ── */
export default function CareerDetail({ job }: { job: Job }) {
  const [fileName, setFileName] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState<FormFields>({
    name: "", email: "", mobile: "", profile: job.title, linkedin: "", about: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  function set(field: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!fields.name.trim())    e.name    = "Full name is required.";
    if (!fields.email.trim())   e.email   = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                e.email   = "Enter a valid email address.";
    if (!fields.mobile.trim())  e.mobile  = "Mobile number is required.";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(fields.mobile))
                                e.mobile  = "Enter a valid mobile number.";
    if (!fields.profile.trim()) e.profile = "Please specify which profile you are applying for.";
    if (fields.linkedin.trim() && !/^https?:\/\/.+/.test(fields.linkedin))
                                e.linkedin = "Enter a valid URL starting with http(s)://";
    if (!fileName)              e.resume  = "Please upload your resume.";
    if (!fields.about.trim())   e.about   = "Please tell us a bit about yourself.";
    if (!captcha)               e.captcha = "Please confirm you are not a robot.";
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
    <main>
      {/* ── Banner ── */}
      <div className="-mt-[76px] bg-primary py-8">
        <div className="max-w-7xl mx-auto px-6 text-center pt-[76px]">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            {job.title}
          </motion.h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="bg-[#111827]">
        <div className="bg-white rounded-t-[2.5rem]">
          <div className="max-w-7xl mx-auto px-6 py-12">

            {/* Title + tags + date */}
            <motion.div {...fadeUp} className="mb-8 pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-primary" /> {job.location}
                </span>
                <span className="text-xs font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-primary" /> {job.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Last Updated: <strong className="text-gray-900">{job.updatedDate}</strong></span>
              </div>
            </motion.div>

            {/* Sections */}
            {job.sections.map((section, i) => (
              <motion.div key={i} {...fadeUp} className="mb-10">
                <p className="text-base font-bold text-gray-900 mb-4 leading-7">{section.heading}</p>
                <ul className="space-y-1">
                  {section.items.map((item, j) => (
                    <CheckItem key={j}>{item}</CheckItem>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* ── Divider ── */}
            <div id="apply" className="border-t border-gray-100 mt-4 mb-12" />

            {/* ── Application Form ── */}
            <motion.div {...fadeUp}>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-gray-900 mb-3">
                  Join Our Team
                </h2>
                <p className="text-gray-700 text-base max-w-xl mx-auto leading-7">
                  Take a next step in your career with Track Opinion, make a difference and succeed in a fast paced environment
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-20 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
                  <p className="text-gray-600 text-sm max-w-sm">
                    Thank you for applying for <strong>{job.title}</strong>. We&apos;ll review your resume and get back to you soon.
                  </p>
                  <Link
                    href="/career"
                    className="cursor-pointer mt-4 px-8 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary transition-colors"
                  >
                    ← Back to Jobs
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 pb-12" noValidate>

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Name" value={fields.name} onChange={(e) => set("name", e.target.value)} className={inputClass("name")} />
                      <FieldError msg={errors.name ?? ""} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" placeholder="Email" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
                      <FieldError msg={errors.email ?? ""} />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Mobile Number <span className="text-red-500">*</span></label>
                      <input type="tel" placeholder="Number" value={fields.mobile} onChange={(e) => set("mobile", e.target.value)} className={inputClass("mobile")} />
                      <FieldError msg={errors.mobile ?? ""} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Which Profile? <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Profile" value={fields.profile} onChange={(e) => set("profile", e.target.value)} className={inputClass("profile")} />
                      <FieldError msg={errors.profile ?? ""} />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">LinkedIn Profile Link</label>
                    <input type="url" placeholder="LinkedIn URL" value={fields.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={inputClass("linkedin")} />
                    <FieldError msg={errors.linkedin ?? ""} />
                  </div>

                  {/* Resume upload */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Upload Your Resume <span className="text-red-500">*</span></label>
                    <label className={`flex flex-col items-center justify-center gap-3 border rounded-xl bg-gray-50 py-10 cursor-pointer hover:bg-gray-100 transition-colors ${errors.resume ? "border-red-400" : "border-gray-200"}`}>
                      <Upload className="w-10 h-10 text-gray-300" />
                      <span className="text-sm text-gray-600 font-medium">
                        {fileName ? fileName : "Click Here to upload your Resume"}
                      </span>
                      <span className="text-xs text-gray-400">PDF, DOC, DOCX accepted</span>
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
                    <label className="block text-sm font-bold text-gray-900 mb-2">Tell us more about you <span className="text-red-500">*</span></label>
                    <textarea
                      rows={4}
                      placeholder="About you...."
                      value={fields.about}
                      onChange={(e) => set("about", e.target.value)}
                      className={`${inputClass("about")} resize-none`}
                    />
                    <FieldError msg={errors.about ?? ""} />
                  </div>

                  {/* reCAPTCHA */}
                  <div>
                    <div
                      className={`flex items-center gap-3 border rounded-lg px-4 py-3 w-fit bg-gray-50 cursor-pointer ${errors.captcha ? "border-red-400" : "border-gray-200"}`}
                      onClick={() => { setCaptcha((v) => !v); setErrors((e) => ({ ...e, captcha: "" })); }}
                    >
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 transition-colors ${captcha ? "bg-primary border-primary" : "border-gray-400"}`}>
                        {captcha && <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white"><path d="M1 4l3 3 5-6"/></svg>}
                      </div>
                      <span className="text-sm text-gray-700 font-medium select-none">I&apos;m not a robot</span>
                      <div className="ml-4 text-right">
                        <div className="text-[10px] text-gray-400 leading-tight">reCAPTCHA</div>
                        <div className="text-[9px] text-gray-300 leading-tight">Privacy – Terms</div>
                      </div>
                    </div>
                    <FieldError msg={errors.captcha ?? ""} />
                  </div>

                  {/* Submit + Back */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Link
                      href="/career"
                      className="cursor-pointer px-8 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
                    >
                      ← Back to Jobs
                    </Link>
                    <button
                      type="submit"
                      className="cursor-pointer bg-primary hover:bg-primary text-white font-semibold px-10 py-3.5 rounded-lg transition-colors duration-300 text-sm"
                    >
                      Send your Resume »
                    </button>
                  </div>

                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
