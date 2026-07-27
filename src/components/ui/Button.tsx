import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "dark";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const styles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:opacity-90",
  dark:    "bg-[#0b1d3a] text-white hover:bg-[#0b1d3a]/90",
};

export default function Button({ href, children, variant = "primary", className = "", external }: ButtonProps) {
  const base = `inline-flex items-center gap-2 text-sm font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}
