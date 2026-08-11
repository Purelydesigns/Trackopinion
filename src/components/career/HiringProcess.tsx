"use client";

import { FileText, Search, Phone, Monitor, CheckCircle } from "lucide-react";
import ProcessSteps, { ProcessStep } from "@/components/shared/ProcessSteps";

const steps: ProcessStep[] = [
  {
    num: 1,
    label: "Apply",
    desc: "Submit your application below",
    icon: <FileText className="w-6 h-6" />,
    detail: {
      title: "Step 1 — Submit Your Application",
      body: "Apply directly through this page — fill in your details and upload your CV. You can also submit an open application if you don't see the exact role you want. We read everything.",
      badge: "You are here — apply below!",
    },
  },
  {
    num: 2,
    label: "HR Review",
    desc: "Our team reads every application personally",
    icon: <Search className="w-6 h-6" />,
    detail: {
      title: "Step 2 — HR Review (3–5 days)",
      body: "Our HR team personally reviews every application — no ATS filters, no automated rejections. If there's a strong match, you'll hear from us within 5 working days.",
      badge: "Tip: a clear LinkedIn profile helps!",
    },
  },
  {
    num: 3,
    label: "Intro Call",
    desc: "15-min conversation with HR",
    icon: <Phone className="w-6 h-6" />,
    detail: {
      title: "Step 3 — Intro Call (15 min)",
      body: "A short, relaxed conversation with our HR team to learn about your background, salary expectations, and what you're looking for. No technical questions — just a friendly chat.",
      badge: "Tip: be yourself, we value authentic conversations",
    },
  },
  {
    num: 4,
    label: "Interview",
    desc: "Skills discussion with the hiring manager",
    icon: <Monitor className="w-6 h-6" />,
    detail: {
      title: "Step 4 — Interview (60 min)",
      body: "A focused discussion with the hiring manager around your skills, past experience, and how you approach problems. Some roles include a short take-home task — always reasonable in scope.",
      badge: "Tip: bring examples of past work you're proud of",
    },
  },
  {
    num: 5,
    label: "Offer & Welcome",
    desc: "Fast decision, warm onboarding",
    icon: <CheckCircle className="w-6 h-6" />,
    detail: {
      title: "Step 5 — Offer & Welcome",
      body: "We move quickly. If it's a match, you'll receive a written offer within 48 hours of your final interview. Our onboarding team will then make sure your first day — and first month — set you up for success.",
      badge: "Welcome to the team!",
    },
  },
];

export default function HiringProcess() {
  return (
    <ProcessSteps
      steps={steps}
      label="How We Hire"
      heading="Our hiring process, step by step"
      description="Transparent, fast, and respectful of your time. Here's exactly what to expect after you apply."
      sectionClassName="bg-[#f3efe9] py-24"
    />
  );
}
