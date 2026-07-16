"use client";

import { useState } from "react";
import { Download, Users, ShoppingBag, Activity, Phone, Globe } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

/* ─────────────── Book list ─────────────── */
const books = [
  { id: "b2b",        icon: Users,       label: "B2B Panel Book",      desc: "Decision-makers across 40+ industries and seniority levels" },
  { id: "b2c",        icon: ShoppingBag, label: "B2C Panel Book",      desc: "Consumer profiles with rich psychographic and behavioral data" },
  { id: "healthcare", icon: Activity,    label: "Healthcare Deck",     desc: "HCPs, patients, and caregivers across 25+ therapeutic areas" },
  { id: "cati",       icon: Phone,       label: "CATI Deck",           desc: "Phone-based recruitment specs for hard-to-reach segments" },
  { id: "global",     icon: Globe,       label: "Global Panel Books",  desc: "Country-level breakdowns for 60+ markets in one document" },
];

const hearOptions = [
  "Search Engine",
  "LinkedIn",
  "Colleague / Referral",
  "Conference / Event",
  "Social Media",
  "Other",
];

/* ─────────────── Main ─────────────── */
export default function PanelBooks() {
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm]         = useState({ name: "", company: "", designation: "", email: "", hear: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = "rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none border border-gray-200 bg-white focus:border-blue-400 transition-colors w-full";
  const labelCls = "text-xs font-semibold uppercase text-gray-600";

  return (
    <section className="py-20 bg-white">
      <div className="site-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ── Left ── */}
          <div>
            <SectionHeader
              label="Panel Books"
              heading={<>Send Request</>}
              description="Get detailed demographic, income, and methodology data for our verified panels across global markets."
              theme="light"
              align="left"
              className="!mb-2"
            />

            <div className="flex flex-col gap-3">
              {books.map((b, i) => {
                const active = selected.includes(b.id);
                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => toggle(b.id)}
                    className="flex items-center gap-4 rounded-xl px-2 py-2 cursor-pointer border transition-all duration-200 select-none"
                    style={{
                      background: active ? "rgba(26,111,232,0.06)" : "#f8f9fb",
                      borderColor: active ? "rgba(26,111,232,0.4)" : "#e5e7eb",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{ background: active ? "rgba(26,111,232,0.12)" : "#eef0f5" }}
                    >
                      <b.icon size={16} style={{ color: active ? "#1a6fe8" : "#6b7280" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md font-semibold leading-tight transition-colors duration-200"
                         style={{ color: active ? "#0d1b3e" : "#111827" }}>
                        {b.label}
                      </p>
                      <p className="text-sm leading-8 font-medium flex-1 text-gray-600">{b.desc}</p>
                    </div>
                    <div
                      className="w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all duration-150"
                      style={{
                        background: active ? "#1a6fe8" : "white",
                        borderColor: active ? "#1a6fe8" : "#d1d5db",
                      }}
                    >
                      {active && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="rounded-2xl p-8 border border-gray-100 shadow-sm bg-gray-50">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <Download size={24} className="text-blue-600" />
                </div>
                <p className="text-lg font-semibold text-gray-800">Request Received!</p>
                <p className="text-sm text-gray-500 font-normal max-w-xs">
                  We&apos;ll send the selected panel books to your inbox within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSelected([]); setForm({ name:"",company:"",designation:"",email:"",hear:"" }); }}
                  className="mt-4 text-xs text-blue-600 underline underline-offset-2"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Request Panel Books</h3>
                  <p className="text-base leading-8 font-medium flex-1 text-gray-600">Fill in your details and we&apos;ll send the decks straight to your inbox.</p>
                </div>

                {/* Name + Company */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelCls}>Full Name <span className="text-blue-500">*</span></span>
                    <input required value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Jane Smith" className={inputCls} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelCls}>Company Name <span className="text-blue-500">*</span></span>
                    <input required value={form.company}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      placeholder="Acme Corp" className={inputCls} />
                  </label>
                </div>

                {/* Designation + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelCls}>Designation</span>
                    <input value={form.designation}
                      onChange={(e) => setForm((p) => ({ ...p, designation: e.target.value }))}
                      placeholder="Research Manager" className={inputCls} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelCls}>Email <span className="text-blue-500">*</span></span>
                    <input required type="email" value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="jane@acme.com" className={inputCls} />
                  </label>
                </div>

                {/* How did you hear */}
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>How did you hear about us?</span>
                  <select value={form.hear}
                    onChange={(e) => setForm((p) => ({ ...p, hear: e.target.value }))}
                    className={`${inputCls} appearance-none`}
                    style={{ color: form.hear ? "#1f2937" : "#9ca3af" }}
                  >
                    <option value="" disabled>Select an option</option>
                    {hearOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>

                {/* What to download */}
                <div className="flex flex-col gap-2">
                  <span className={labelCls}>What to download?</span>
                  <div className="flex flex-col gap-2">
                    {books.map((b) => {
                      const active = selected.includes(b.id);
                      return (
                        <label key={b.id} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => toggle(b.id)}>
                          <div
                            className="w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all duration-150"
                            style={{
                              background: active ? "#1a6fe8" : "white",
                              borderColor: active ? "#1a6fe8" : "#d1d5db",
                            }}
                          >
                            {active && (
                              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-normal select-none transition-colors duration-150"
                                style={{ color: active ? "#0d1b3e" : "#374151" }}>
                            {b.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-1 w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #1a6fe8 0%, #1458c8 100%)" }}
                >
                  <Download size={16} />
                  Download Panel Books
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
