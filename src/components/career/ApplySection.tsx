"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Check } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const features = [
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Fast response — within 5 days",
    desc: "Every application is reviewed by our HR team personally, not by an ATS filter.",
    active: true,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "2-round interview process",
    desc: "A brief intro call followed by a skills discussion. We respect your time.",
    active: false,
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Your data stays private",
    desc: "Application data is used solely for recruitment purposes and never shared externally.",
    active: false,
  },
];

const stepLabels = ["You", "Role", "Upload"];

/* ── Step 1: Basic info ── */
function Step1({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Full Name *</label>
          <input
            value={data.name ?? ""}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Your full name"
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Email Address *</label>
          <input
            value={data.email ?? ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@email.com"
            type="email"
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Mobile Number</label>
        <input
          value={data.phone ?? ""}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+91 98765 43210"
          className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent transition-colors"
        />
      </div>
    </div>
  );
}

/* ── Step 2: Role ── */
function Step2({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  const roles = ["Research Analyst", "Project Manager", "Marketing Executive", "Panel Executive", "Graduate Trainee", "Other"];
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Role Interested In *</label>
        <select
          value={data.role ?? ""}
          onChange={(e) => onChange("role", e.target.value)}
          className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-accent transition-colors appearance-none"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          <option value="" disabled className="text-gray-800">Select a role…</option>
          {roles.map((r) => <option key={r} value={r} className="text-gray-800">{r}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Location Preference</label>
        <input
          value={data.location ?? ""}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="e.g. Remote, Noida, Gurugram…"
          className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent transition-colors"
        />
      </div>
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Short Note</label>
        <textarea
          value={data.note ?? ""}
          onChange={(e) => onChange("note", e.target.value)}
          placeholder="Tell us a little about yourself and why you're applying…"
          rows={3}
          className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent transition-colors resize-none"
        />
      </div>
    </div>
  );
}

/* ── Step 3: Upload ── */
function Step3({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Upload CV *</label>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/15 rounded-xl py-8 px-4 cursor-pointer hover:border-accent/50 transition-colors duration-200 text-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white/30 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-white/40 text-xs">{data.fileName ? <span className="text-accent font-semibold">{data.fileName}</span> : "Click to upload PDF or DOCX (max 5MB)"}</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => onChange("fileName", e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </div>
      <div>
        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Cover Note (optional)</label>
        <textarea
          value={data.cover ?? ""}
          onChange={(e) => onChange("cover", e.target.value)}
          placeholder="Any additional context you'd like to share…"
          rows={3}
          className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent transition-colors resize-none"
        />
      </div>
    </div>
  );
}

/* ── Main ── */
export default function ApplySection() {
  const [step, setStep]   = useState(0);
  const [done, setDone]   = useState(false);
  const [data, setData]   = useState<Record<string, string>>({});

  function handleChange(k: string, v: string) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function handleContinue() {
    if (step < 2) setStep(step + 1);
    else setDone(true);
  }

  const canContinue =
    step === 0 ? !!(data.name?.trim() && data.email?.trim()) :
    step === 1 ? !!(data.role) :
    !!(data.fileName);

  return (
    <section className="bg-primary py-24">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left ── */}
          <div>

            <SectionHeader
              label="Apply Now"
              heading={<>Take the next step in your<br />research career</>}
              description="Don&apos;t see the right role? Apply anyway — we review all applications and
              reach out when a good match opens up. We typically respond within 5
              business days."
              theme="dark"
              align="left"
            />

            {/* Feature list */}
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5 ${f.active ? "bg-accent text-white" : "bg-white/8 text-white/40"}`}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{f.title}</p>
                    <p className="text-white/50 text-sm leading-6">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-5">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">Application Submitted!</h3>
                  <p className="text-white/50 text-sm leading-7">Thank you for applying. Our HR team will review your application and get back to you within 5 business days.</p>
                </motion.div>
              ) : (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {/* Form header */}
                  <h3 className="text-white font-black text-lg mb-1">Submit Your Application</h3>
                  <p className="text-white/40 text-xs mb-6">Step {step + 1} of 3 — {["Your basic info", "Role & preferences", "Upload your CV"][step]}</p>

                  {/* Step indicators */}
                  <div className="flex items-center gap-2 mb-7">
                    {stepLabels.map((label, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`flex items-center gap-1.5 text-xs font-bold transition-all duration-200
                          ${i < step ? "text-green-400" : i === step ? "text-white" : "text-white/30"}`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0
                            ${i < step ? "bg-green-500 text-white" : i === step ? "bg-accent text-white" : "bg-white/10 text-white/30"}`}>
                            {i < step ? <Check className="w-3 h-3" /> : i + 1}
                          </span>
                          {label}
                        </div>
                        {i < stepLabels.length - 1 && <span className={`flex-1 h-px w-8 ${i < step ? "bg-green-500/40" : "bg-white/10"}`} />}
                      </div>
                    ))}
                  </div>

                  {/* Step content */}
                  {step === 0 && <Step1 data={data} onChange={handleChange} />}
                  {step === 1 && <Step2 data={data} onChange={handleChange} />}
                  {step === 2 && <Step3 data={data} onChange={handleChange} />}

                  {/* Continue button */}
                  <button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className={`w-full mt-6 inline-flex items-center justify-center gap-2 font-bold py-4 rounded-lg text-sm transition-all duration-200
                      ${canContinue
                        ? "bg-accent text-white hover:opacity-90"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                  >
                    {step < 2 ? "Continue" : "Submit Application"} <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
