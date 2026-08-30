"use client";

/**
 * Page artwork for /solutions/scrip8 — a compact preview of the survey builder,
 * which is what the product actually is. Drawn statically: nested in-view
 * reveals inside a card like this do not reliably fire, and a chart that
 * sometimes renders blank is worse than one that never animates.
 */

const NAVY = "#0d1b3e";
const BLUE = "#1a6fe8";

const questionTypes = [
  { label: "Multiple Choice", active: true },
  { label: "Rating Scale", active: false },
  { label: "NPS Score", active: false },
  { label: "Open Text", active: false },
];

const answers = [
  { label: "Excellent — exceeded expectations", pct: 42, active: true },
  { label: "Good — met most expectations", pct: 31, active: false },
  { label: "Fair — met some expectations", pct: 18, active: false },
  { label: "Poor — did not meet expectations", pct: 9, active: false },
];

export function Scrip8Builder() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-lg">
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Scrip8 · Builder
        </span>
      </div>

      {/* Question type picker */}
      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-2">
        Question type
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {questionTypes.map((q) => (
          <span
            key={q.label}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              q.active
                ? "bg-primary text-white"
                : "border border-gray-200 bg-white text-gray-500"
            }`}
          >
            {q.label}
          </span>
        ))}
      </div>

      {/* The question being edited */}
      <div className="rounded-xl border border-gray-100 p-3.5 mb-4">
        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-2">
          Q3 of 12
        </p>
        <p className="text-sm font-bold text-gray-900 mb-3 leading-snug">
          How would you rate your experience?
        </p>
        <div className="flex flex-col gap-1.5">
          {answers.map((a) => (
            <div
              key={a.label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${
                a.active ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full shrink-0 border-2 ${
                  a.active ? "border-accent bg-accent" : "border-gray-300 bg-white"
                }`}
              />
              <span className="text-[11px] font-medium text-gray-600 truncate">
                {a.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live results for the same question */}
      <div className="rounded-xl border border-gray-100 p-3.5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Live responses
          </p>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-green-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            1,204 in
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {answers.map((a, i) => (
            <div key={a.label} className="flex items-center gap-2.5">
              <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${a.pct}%`,
                    background: i === 0 ? NAVY : i === 1 ? BLUE : "#bfdbfe",
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 tabular-nums w-7 text-right">
                {a.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
