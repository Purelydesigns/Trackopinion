import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  heading: ReactNode;
  description?: string;
  theme?: "light" | "dark";
  align?: "center" | "left" | "right";
  className?: string;
}

export default function SectionHeader({
  label,
  heading,
  description,
  theme = "light",
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  const alignClass =
    align === "left"  ? "text-left items-start" :
    align === "right" ? "text-right items-end" :
    "text-center items-center";

  return (
    <div className={`flex flex-col mb-10 ${alignClass} ${className}`}>
      <div className={`flex ${align === "right" ? "justify-end" : align === "left" ? "justify-start" : "justify-center"}`}>
        <span className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? "text-white/60" : "text-primary"}`}>
          {label}
        </span>
      </div>
      <h2 className={`text-2xl sm:text-3xl font-extrabold uppercase ${isDark ? "text-white" : "text-primary"}`}>
        {heading}
      </h2>
      {description && (
        <p className={`text-base leading-8 font-medium flex-1 mb-6 mt-3 ${isDark ? "text-white/60" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
