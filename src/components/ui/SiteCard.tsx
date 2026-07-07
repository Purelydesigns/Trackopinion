"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SiteCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Standard card — white bg, navy top bar, soft shadow, lift + shadow on hover.
 * Use this for every card across the site.
 */
export default function SiteCard({ children, className = "", onClick }: SiteCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(13,27,62,0.12)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`bg-white rounded-2xl shadow-sm overflow-hidden ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Navy top accent bar */}
      <div className="h-1.5 bg-primary" />
      {children}
    </motion.div>
  );
}
