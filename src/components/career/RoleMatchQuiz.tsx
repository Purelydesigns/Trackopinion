"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart2, ClipboardList, Megaphone, GraduationCap, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    label: "QUESTION 1 OF 3",
    question: "What best describes your professional background?",
    options: [
      {
        icon: <BarChart2 className="w-5 h-5" />,
        title: "Data, research & analytics",
        desc: "I enjoy working with data, surveys, and insights",
      },
      {
        icon: <ClipboardList className="w-5 h-5" />,
        title: "Coordination & project management",
        desc: "I keep projects on track and teams aligned",
      },
      {
        icon: <Megaphone className="w-5 h-5" />,
        title: "Marketing, content & brand",
        desc: "I build brands, write content, and run campaigns",
      },
      {
        icon: <GraduationCap className="w-5 h-5" />,
        title: "Student or fresh graduate",
        desc: "I'm starting out and eager to learn everything",
      },
    ],
  },
  {
    label: "QUESTION 2 OF 3",
    question: "How do you prefer to spend most of your workday?",
    options: [
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
        title: "Deep in data and analysis",
        desc: "Running models, interpreting charts, finding patterns",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        title: "Coordinating people and timelines",
        desc: "Client calls, project tracking, vendor management",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ),
        title: "Creating and strategising",
        desc: "Content, campaigns, creative briefs, social media",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="13 2 13 9 20 9" /><polygon points="13 2 3 9 3 22 21 22 21 9 13 2" />
          </svg>
        ),
        title: "Learning and absorbing everything",
        desc: "Shadowing, reading, building skills rapidly",
      },
    ],
  },
  {
    label: "QUESTION 3 OF 3",
    question: "What excites you most about joining Track Opinion?",
    cta: "See My Match",
    options: [
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        ),
        title: "Influencing global decisions through insights",
        desc: "Research that shapes strategy in 60+ countries",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
        title: "Delivering projects with precision & impact",
        desc: "Owning timelines and making sure things ship",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
        title: "Growing a globally trusted research brand",
        desc: "Building our digital presence and market position",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        ),
        title: "Kickstarting my career the right way",
        desc: "Real exposure, mentors, and a global environment",
      },
    ],
  },
];

const resultMap: Record<string, { role: string; desc: string }> = {
  "0-0": { role: "Research Analyst",      desc: "Your analytical mindset and love for data make you a perfect fit for our Research team. You'll work on studies spanning healthcare, FMCG, and technology across 60+ countries." },
  "0-1": { role: "Project Manager",       desc: "Your coordination instincts and focus on delivery make you a natural leader in our research operations. You'll own projects end-to-end across global clients." },
  "0-2": { role: "Marketing Executive",   desc: "Your creative and strategic thinking is exactly what our Brand & Growth team needs. You'll shape campaigns that put Track Opinion on the global map." },
  "0-3": { role: "Graduate Trainee",      desc: "You're at the right place to start. Our structured trainee programme gives you real research exposure from day one — with mentorship at every step." },
  "1-0": { role: "Research Associate",    desc: "Your analytical mindset and love for data make you a perfect fit for our Research team. You'll work on studies spanning healthcare, FMCG, and technology across 60+ countries." },
  "1-1": { role: "Operations Coordinator", desc: "Your knack for keeping things on track makes you invaluable. You'll coordinate across teams, timelines, and clients to make every project run like clockwork." },
  "1-2": { role: "Content Strategist",    desc: "Your creative energy and strategic thinking are a match for our Brand team. You'll craft content that drives research thought leadership globally." },
  "1-3": { role: "Panel Executive",       desc: "Your drive to learn quickly is the foundation for a great career in panel management — connecting respondents to research at scale." },
  "2-0": { role: "Data Analyst",          desc: "Your brand-and-data combination is rare and valuable. You'll analyse market trends and help clients make informed, evidence-based decisions." },
  "2-1": { role: "Project Coordinator",   desc: "Your blend of marketing thinking and project discipline is what keeps our client campaigns on time and on-brief." },
  "2-2": { role: "Brand Manager",         desc: "You're built to lead. Your marketing background and creative drive will define how the world sees Track Opinion." },
  "2-3": { role: "Research Trainee",      desc: "Your fresh perspective and eagerness to grow will flourish in our research environment. We're excited to shape your career." },
  "3-0": { role: "Research Associate",    desc: "Your analytical mindset and love for data make you a perfect fit for our Research team. You'll work on studies spanning healthcare, FMCG, and technology across 60+ countries." },
  "3-1": { role: "Project Manager",       desc: "Your coordination instincts and drive for impact make you a natural fit as a research project manager." },
  "3-2": { role: "Marketing Associate",   desc: "Your creative thinking and passion for building brands will help Tell the Track Opinion story to the world." },
  "3-3": { role: "Graduate Trainee",      desc: "You're at the right place to start. Our structured trainee programme gives you real research exposure from day one — with mentorship at every step." },
};

function getResult(answers: number[]) {
  const key = `${answers[0]}-${answers[1]}`;
  return resultMap[key] ?? { role: "Research Associate", desc: "Your analytical mindset and love for data make you a perfect fit for our Research team. You'll work on studies spanning healthcare, FMCG, and technology across 60+ countries." };
}

/* ── Loader ── */
function AnalysingLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center py-16"
    >
      {/* Dots */}
      <div className="flex gap-2 mb-10">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
      <p className="text-white/50 text-sm mb-6">Analysing your answers…</p>
      {/* Progress bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}

export default function RoleMatchQuiz() {
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  const total   = steps.length;
  const current = steps[step];
  const isLast  = step === total - 1;

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (!isLast) {
      setAnswers(newAnswers);
      setSelected(null);
      setStep(step + 1);
    } else {
      setAnswers(newAnswers);
      setLoading(true);
      setTimeout(() => { setLoading(false); setDone(true); }, 1800);
    }
  }

  function handleReset() {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setDone(false);
    setLoading(false);
  }

  const result = done ? getResult(answers) : null;

  return (
    <section className="bg-white py-24">
      <div className="site-container px-6">

        <SectionHeader
          label="Find Your Role"
          heading={<>Not sure where you fit?<br />Let us match you in 60 seconds.</>}
          description="Answer 3 quick questions and we'll point you to the role that suits you best."
          theme="light"
        />

        {/* Progress dots */}
        {!done && !loading && (
          <div className="flex items-center justify-center gap-2.5 mb-10">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-8 h-2.5 bg-primary"
                    : i < step
                    ? "w-2.5 h-2.5 bg-primary/50"
                    : "w-2.5 h-2.5 bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* Content area */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ── Loader ── */}
            {loading && <AnalysingLoader key="loader" />}

            {/* ── Result ── */}
            {done && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                {/* Green dots */}
                <div className="flex gap-2 justify-center mb-6">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full bg-primary" />
                  ))}
                </div>

                {/* Best match badge */}
                <div className="inline-flex items-center gap-2 border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-bold px-5 py-2 rounded-full mb-6">
                  <CheckCircle className="w-3.5 h-3.5" /> Best match found
                </div>

                {/* Role */}
                <h3 className="text-4xl sm:text-5xl font-black italic text-primary mb-6">
                  {result?.role}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm sm:text-base leading-8 max-w-lg mx-auto mb-10">
                  {result?.desc}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="/contact-us"
                    className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5 text-sm"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-sm"
                  >
                    Try Again
                  </button>
                  <a
                    href="/contact-us"
                    className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-sm"
                  >
                    See All Roles
                  </a>
                </div>
              </motion.div>
            )}

            {/* ── Quiz step ── */}
            {!loading && !done && (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <p className="text-gray-500 text-base leading-8 font-medium flex-1 text-center uppercase mb-3">
                  {current.label}
                </p>
                <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-7">
                  {current.question}
                </h3>

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {current.options.map((opt, i) => {
                    const isSelected = selected === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`group flex items-center gap-4 text-left px-5 py-4 rounded-2xl border transition-all duration-200 outline-none
                          ${isSelected
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                            : "border-gray-200 bg-gray-50 hover:border-primary/50 hover:bg-primary/5"
                          }`}
                      >
                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200
                          ${isSelected
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500 group-hover:bg-primary/20 group-hover:text-primary"
                          }`}
                        >
                          {opt.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold leading-snug mb-0.5 transition-colors duration-200 ${isSelected ? "text-primary" : "text-gray-800 group-hover:text-primary"}`}>
                            {opt.title}
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Next / See My Match button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleNext}
                    disabled={selected === null}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-sm transition-all duration-300
                      ${selected !== null
                        ? "bg-primary text-white hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                  >
                    {isLast ? "See My Match" : "Next"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
