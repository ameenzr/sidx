"use client";

import { motion } from "framer-motion";
import { featuredItems, userRewards } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { benefits } from "@/components/BenefitsScreen";

interface CommunityTabProps {
  onOpenEvents: () => void;
  onOpenBenefits: () => void;
}

function parseDateParts(dateStr?: string) {
  if (!dateStr) return { day: "—", month: "—" };
  const m = dateStr.match(/(\d{1,2})\s+(\w{3})/);
  return { day: m?.[1] ?? "—", month: m?.[2]?.toUpperCase() ?? "—" };
}

export function CommunityTab({ onOpenEvents, onOpenBenefits }: CommunityTabProps) {
  const tierProgress = Math.round((userRewards.points / (userRewards.points + userRewards.pointsToNextTier)) * 100);
  const activeCount = benefits.filter(b => b.isActive).length;
  const previewEvents = featuredItems.slice(0, 3);
  const previewBenefits = benefits.slice(0, 4);

  return (
    <div className="flex flex-col pt-20 pb-[110px] text-white">

      {/* ── Header ── */}
      <div className="px-6 mb-5">
        <h1 className="text-[28px] font-bold text-[var(--c-text-h)] tracking-tight leading-none">Community</h1>
        <p className="text-[11px] font-mono text-white/30 mt-1">Events · Privileges · Rewards</p>
      </div>

      {/* ── Tier status bar ── */}
      <div className="px-5 mb-6">
        <div
          className="relative rounded-[18px] overflow-hidden border border-[var(--gold)]/20 px-4 py-3.5"
          style={{ background: "linear-gradient(135deg, var(--c-elevated) 0%, var(--c-surface) 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at 0% 50%, rgba(180,130,40,0.12), transparent 60%)" }} />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-[var(--gold-text)]" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[var(--gold-text)]">{userRewards.tier}</span>
                  <span className="text-[10px] font-mono text-white/35">{userRewards.points.toLocaleString()} pts</span>
                </div>
                <span className="text-[9px] font-mono text-white/25">{userRewards.pointsToNextTier.toLocaleString()} to {userRewards.nextTier}</span>
              </div>
              <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tierProgress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Events section ── */}
      <div className="mb-6">
        <div className="px-5 flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[15px] font-bold text-[var(--c-text-h)] tracking-tight">Upcoming Events</h2>
            <p className="text-[9px] font-mono text-white/25 mt-0.5">{featuredItems.length} events · NRK members only</p>
          </div>
          <button
            onClick={onOpenEvents}
            className="flex items-center gap-1 text-[10px] font-mono text-[var(--gold-text)]/50 active:text-[var(--gold-text)] transition-colors"
          >
            <span>All Events</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Horizontal event cards */}
        <div className="flex gap-3 overflow-x-auto scrollbar-none px-5 pb-1">
          {previewEvents.map((event, i) => {
            const { day, month } = parseDateParts(event.date);
            const isClosingSoon = event.badges.some(b => b.toLowerCase().includes("closing"));
            return (
              <motion.button
                key={event.id}
                onClick={onOpenEvents}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.32 }}
                className="shrink-0 w-[175px] h-[210px] rounded-[20px] overflow-hidden relative border border-white/8 active:scale-[0.96] transition-transform"
              >
                {event.image && (
                  <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Closing soon pill */}
                {isClosingSoon && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-600/30 border border-red-500/50 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[8px] font-bold text-red-400 uppercase tracking-wide">Closing</span>
                  </div>
                )}

                {/* Date chip */}
                <div className="absolute top-3 left-3 bg-black/55 backdrop-blur-md border border-white/15 rounded-xl px-2.5 py-1.5 text-center">
                  <p className="text-[16px] font-bold text-white leading-none">{day}</p>
                  <p className="text-[8px] font-mono text-white/55 tracking-widest mt-0.5">{month}</p>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-3.5">
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {event.badges.slice(0, 1).map((b, bi) => <Badge key={bi} label={b} />)}
                  </div>
                  <p className="text-[12px] font-bold text-white leading-tight mb-0.5 line-clamp-2">{event.title}</p>
                  {event.venue && (
                    <p className="text-[9px] font-mono text-white/35 truncate">{event.venue.split(",")[0]}</p>
                  )}
                </div>
              </motion.button>
            );
          })}

          {/* See all card */}
          <motion.button
            onClick={onOpenEvents}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.32 }}
            className="shrink-0 w-[80px] h-[210px] rounded-[20px] border border-white/8 bg-white/[0.03] flex flex-col items-center justify-center gap-2 active:scale-[0.96] transition-transform"
          >
            <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <p className="text-[8px] font-mono text-white/25 uppercase tracking-wider text-center leading-tight">All<br />Events</p>
          </motion.button>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-5 mb-6 h-px bg-white/5" />

      {/* ── Benefits section ── */}
      <div className="mb-4">
        <div className="px-5 flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[15px] font-bold text-[var(--c-text-h)] tracking-tight">Member Privileges</h2>
            <p className="text-[9px] font-mono text-white/25 mt-0.5">{activeCount} active · {benefits.length} total</p>
          </div>
          <button
            onClick={onOpenBenefits}
            className="flex items-center gap-1 text-[10px] font-mono text-[var(--gold-text)]/50 active:text-[var(--gold-text)] transition-colors"
          >
            <span>All Benefits</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Compact benefit rows */}
        <div className="flex flex-col gap-1.5 px-5">
          {previewBenefits.map((benefit, i) => (
            <motion.button
              key={benefit.id}
              onClick={onOpenBenefits}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.28 }}
              className="w-full flex items-center gap-3 p-3 rounded-[14px] border border-white/5 active:scale-[0.98] transition-transform text-left"
              style={{ background: `${benefit.accentColor}0d` }}
            >
              <div
                className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border border-white/8"
                style={{ backgroundColor: `${benefit.accentColor}40` }}
              >
                <span className="text-[8px] font-black text-white/80 tracking-tight">{benefit.logoText}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-[12px] font-semibold text-white/85 leading-tight truncate">{benefit.title}</p>
                  {benefit.isActive && (
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
                <p className="text-[9px] font-mono text-white/28 truncate">{benefit.partner}</p>
              </div>
              <svg className="w-3.5 h-3.5 shrink-0 text-white/18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>
          ))}

          {/* View all row */}
          <button
            onClick={onOpenBenefits}
            className="w-full flex items-center justify-between p-3 rounded-[14px] border border-dashed border-white/8 mt-0.5 active:scale-[0.98] transition-transform"
          >
            <span className="text-[11px] font-mono text-white/25">{benefits.length - previewBenefits.length} more privileges</span>
            <div className="flex items-center gap-1 text-[var(--gold-text)]/50">
              <span className="text-[10px] font-mono">View all</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
