"use client";

import { motion, AnimatePresence } from "framer-motion";
import { userPortfolio, userRewards } from "@/lib/mock-data";
import { useTheme } from "@/components/ThemeProvider";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPortfolio: () => void;
}

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

const activityLog = [
  {
    action: "Expressed interest in Azraya Postpartum Care",
    time: "3 days ago",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
  {
    action: "Registered for SID-X Investor Summit 2026",
    time: "1 week ago",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  },
  {
    action: "Elite Homes Villa investment confirmed — ₹50L",
    time: "3 weeks ago",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  {
    action: "Eala Stays investment confirmed — ₹25L",
    time: "5 weeks ago",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  {
    action: "Earned 3,200 points on portfolio milestone",
    time: "6 weeks ago",
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  },
  {
    action: "NORKA Scheme Navigator benefit activated",
    time: "2 months ago",
    icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
  },
];

export function ProfileDrawer({ isOpen, onClose, onOpenPortfolio }: ProfileDrawerProps) {
  const { theme, toggle } = useTheme();
  const tierProgress = Math.round(
    (userRewards.points / (userRewards.points + userRewards.pointsToNextTier)) * 100
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="profile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            key="profile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-[210] w-[88vw] max-w-[360px] flex flex-col overflow-hidden shadow-[-20px_0_80px_rgba(0,0,0,0.4)]"
            style={{ backgroundColor: "var(--c-surface)" }}
          >
            {/* ── Header ── */}
            <div
              className="relative shrink-0 overflow-hidden border-b"
              style={{
                borderColor: "var(--c-border-em)",
                background: "linear-gradient(160deg, var(--c-elevated) 0%, var(--c-surface) 70%, var(--c-base) 100%)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 20% 40%, rgba(180,130,40,0.18), transparent 65%)" }} />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/6 border border-white/10 text-white/50 active:scale-90 transition-transform"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10 px-5 pt-6 pb-5">
                {/* Avatar + Identity */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 flex items-center justify-center text-black font-bold text-[20px] shadow-[0_0_24px_rgba(251,191,36,0.35)] border-2 border-[var(--gold)]/60 shrink-0">
                    FA
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-[#fdfaf5] tracking-tight leading-none mb-1">Fazil A</h2>
                    <p className="text-[10px] font-mono text-white/35 mb-1.5">NRK · Member since Jan 2025</p>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-[var(--gold-text)]" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                      </svg>
                      <span className="text-[11px] font-bold text-[var(--gold-text)] tracking-wider">{userRewards.tier} MEMBER</span>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 rounded-2xl overflow-hidden mb-3" style={{ border: "1px solid var(--c-border)", backgroundColor: "var(--c-border)" }}>
                  <div className="py-3 px-2 text-center" style={{ backgroundColor: "var(--c-surface)" }}>
                    <p className="text-[13px] font-bold text-[var(--gold-text)]">{fmt(userPortfolio.currentValue)}</p>
                    <p className="text-[8px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "var(--c-text-muted)" }}>Portfolio</p>
                  </div>
                  <div className="py-3 px-2 text-center" style={{ backgroundColor: "var(--c-surface)", borderLeft: "1px solid var(--c-border)", borderRight: "1px solid var(--c-border)" }}>
                    <p className="text-[13px] font-bold text-emerald-500">+{userPortfolio.returnPercent}%</p>
                    <p className="text-[8px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "var(--c-text-muted)" }}>Returns</p>
                  </div>
                  <div className="py-3 px-2 text-center" style={{ backgroundColor: "var(--c-surface)" }}>
                    <p className="text-[13px] font-bold" style={{ color: "var(--c-text-h)" }}>{userRewards.points.toLocaleString("en-US")}</p>
                    <p className="text-[8px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "var(--c-text-muted)" }}>Points</p>
                  </div>
                </div>

                {/* Tier progress */}
                <div className="flex justify-between text-[9px] font-mono mb-1.5" style={{ color: "var(--c-text-dim)" }}>
                  <span>{userRewards.tier}</span>
                  <span>{userRewards.pointsToNextTier.toLocaleString("en-US")} pts to {userRewards.nextTier}</span>
                </div>
                <div className="h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "var(--c-border)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tierProgress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* ── View Portfolio Button ── */}
            <div className="px-5 py-4 shrink-0" style={{ borderBottom: "1px solid var(--c-border)" }}>
              <button
                onClick={() => { onClose(); onOpenPortfolio(); }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-[var(--gold)]/8 border border-[var(--gold)]/20 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[var(--gold)]/15 border border-[var(--gold)]/25 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-bold text-[var(--gold-text)]">My Portfolio</p>
                    <p className="text-[10px] font-mono" style={{ color: "var(--c-text-muted)" }}>{userPortfolio.activeCount} active investments</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-[var(--gold-text)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* ── Membership Card ── */}
            <div className="px-5 py-4 shrink-0" style={{ borderBottom: "1px solid var(--c-border)" }}>
              <div
                className="relative rounded-[16px] overflow-hidden p-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] border border-[var(--gold)]/15 group aspect-[1.58] flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, #141008 0%, #080603 100%)",
                }}
              >
                {/* ── Background Effects ── */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: "radial-gradient(var(--gold) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 20%, rgba(201,168,76,0.12), transparent 60%)" }} />
                
                {/* Subtle metallic diagonal shine */}
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 25%, transparent 30%)" }} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>SID-X CLUB</p>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[var(--gold-text)] drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                        </svg>
                        <span className="text-[13px] font-black text-[var(--gold-text)] tracking-widest uppercase drop-shadow-md">{userRewards.tier}</span>
                      </div>
                    </div>

                    {/* Points Overlay */}
                    <div className="bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 rounded-full px-2.5 py-1 flex items-baseline gap-1 shadow-lg">
                       <span className="text-[14px] font-bold text-white leading-none">{userRewards.points.toLocaleString("en-US")}</span>
                       <span className="text-[7px] font-mono uppercase text-[var(--gold-text)] leading-none">PTS</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  {/* EMV Chip & Contactless */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[26px] rounded-[4px] border border-[#d4af37]/40 shadow-inner overflow-hidden relative flex" style={{ background: "linear-gradient(135deg, #ffd700 0%, #cca53f 40%, #996515 100%)" }}>
                       <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                       <div className="w-full flex justify-between absolute inset-0 py-1 px-1.5 opacity-60">
                          <div className="flex flex-col justify-between w-[25%] opacity-50">
                             <div className="h-px bg-black w-full" />
                             <div className="h-px bg-black w-full" />
                             <div className="h-px bg-black w-full" />
                          </div>
                          <div className="border border-black opacity-30 w-[30%] rounded-[3px]" />
                          <div className="flex flex-col justify-between w-[25%] items-end opacity-50">
                             <div className="h-px bg-black w-full" />
                             <div className="h-px bg-black w-full" />
                             <div className="h-px bg-black w-full" />
                          </div>
                       </div>
                    </div>
                    <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                  </div>

                  <p className="text-[17px] font-mono font-bold tracking-[0.22em] text-white/90 drop-shadow-md mb-3" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
                    •••• •••• •••• 4821
                  </p>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[6px] font-mono text-white/40 uppercase tracking-widest mb-0.5">Cardholder Name</p>
                      <p className="text-[12px] font-mono font-bold tracking-[0.1em] text-[#fdfaf5] uppercase drop-shadow-md">FAZIL A</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[6px] font-mono text-white/40 uppercase tracking-widest mb-0.5">Valid Thru</p>
                       <p className="text-[12px] font-mono font-bold tracking-[0.1em] text-[#fdfaf5] drop-shadow-md">12/26</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Activity ── */}
            <div className="flex-1 overflow-y-auto scrollbar-none px-5 pt-5 pb-28">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--c-text-muted)" }}>Recent Activity</p>
              <div className="flex flex-col">
                {activityLog.map((log, i) => (
                  <div key={i} className="flex gap-3 items-start py-3.5 last:border-0" style={{ borderBottom: i < activityLog.length - 1 ? "1px solid var(--c-border)" : "none" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
                      <svg className="w-3.5 h-3.5 text-[var(--gold-text)]/55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={log.icon} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] leading-snug mb-1" style={{ color: "var(--c-text-body)" }}>{log.action}</p>
                      <p className="text-[9px] font-mono" style={{ color: "var(--c-text-dim)" }}>{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 flex items-center justify-between" style={{ background: `linear-gradient(to top, var(--c-surface) 60%, transparent)` }}>
              {/* Theme toggle */}
              <button
                onClick={toggle}
                className="flex items-center gap-2 px-3 py-2 rounded-xl active:scale-95 transition-transform"
                style={{ backgroundColor: "var(--c-border)", border: "1px solid var(--c-border-em)" }}
              >
                {theme === "dark" ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                    <span className="text-[10px] font-mono font-bold text-[var(--gold-text)]">Light</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--c-text-muted)" }}>
                      <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    <span className="text-[10px] font-mono font-bold" style={{ color: "var(--c-text-muted)" }}>Dark</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3">
                <button className="text-[10px] font-mono transition-colors" style={{ color: "var(--c-text-dim)" }}>
                  Contact RM
                </button>
                <button className="flex items-center gap-1.5 text-[10px] font-mono transition-colors" style={{ color: "var(--c-text-dim)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
