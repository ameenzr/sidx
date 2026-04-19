"use client";

import { motion } from "framer-motion";

interface TabHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function TabHeader({ title, subtitle, className = "" }: TabHeaderProps) {
  return (
    <div className={`px-5 mb-6 pt-1 ${className}`}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-[34px] font-display font-medium text-[var(--gold-text)]/80 tracking-tight leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] font-mono text-white/30 mt-1">{subtitle}</p>
        )}
      </motion.div>
    </div>
  );
}
