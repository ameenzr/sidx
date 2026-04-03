import React from 'react';

interface BadgeProps {
  label: string;
  icon?: React.ReactNode;
}

export function Badge({ label, icon }: BadgeProps) {
  const baseStyle = "inline-flex items-center gap-[4px] rounded-full px-[9px] py-[3px] text-[11px] font-semibold capitalize backdrop-blur-md";

  let bg = "bg-transparent";
  let text = "text-[var(--text-2)]";
  let border = "border border-[var(--border-em)]";

  const lower = label.toLowerCase();
  
  if (lower === "exclusive" || lower === "gold") {
    bg = "bg-[var(--gold-bg)]";
    text = "text-[var(--gold-text)]";
    border = "border border-[rgba(201,168,76,0.25)] animate-gold-shine";
  } else if (lower === "active" || lower === "current plan") {
    bg = "bg-[var(--olive-bg)]";
    text = "text-[var(--olive-text)]";
    border = "border-transparent";
  } else if (lower === "sold out" || lower === "expired" || lower === "closing soon") {
    bg = "bg-[var(--red-bg)]";
    text = "text-[var(--red-text)]";
    border = "border-transparent";
  } else if (lower === "open" || lower === "live" || lower === "milestone") {
    bg = "bg-[var(--green-bg)]";
    text = "text-[var(--green-text)]";
    border = "border-transparent";
  } else if (lower === "open for investor") {
    bg = "bg-emerald-500/20";
    text = "text-emerald-400";
    border = "border border-emerald-500/60 shadow-[0_0_8px_rgba(52,211,153,0.2)]";
  }

  return (
    <span 
      data-testid={`badge-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      className={`${baseStyle} ${bg} ${text} ${border}`}
    >
      {icon}
      {label}
    </span>
  );
}
