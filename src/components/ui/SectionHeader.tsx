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
      <div className={`flex gap-4 mb-4 ${align === "right" ? "justify-end" : align === "left" ? "justify-start" : "justify-center"}`}>
        <span className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? "text-white/60" : "text-gray-500"}`}>
          {label}
        </span>
      </div>
      <h2 className={`text-3xl sm:text-4xl font-extrabold uppercase leading-tight mb-4 ${isDark ? "text-white" : "text-primary"}`}>
        {heading}
      </h2>
      {description && (
        <p className={`text-base leading-8 font-medium flex-1 mb-6 ${isDark ? "text-white/60" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
