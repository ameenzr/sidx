"use client";

import { motion, AnimatePresence } from "framer-motion";
import { userRewards } from "@/lib/mock-data";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPortfolio: () => void;
}

export function ProfileDrawer({ isOpen, onClose, onOpenPortfolio }: ProfileDrawerProps) {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

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
            {/* ── Scrollable Content ── */}
            <div className="flex-1 overflow-y-auto scrollbar-none">
              {/* ── Header ── */}
              <div
                className="relative overflow-hidden border-b"
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

                <div className="relative z-10 px-5 pt-8 pb-6">
                  {/* Avatar + Identity */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 flex items-center justify-center text-black font-bold text-[20px] shadow-[0_0_24px_rgba(251,191,36,0.35)] border-2 border-[var(--gold)]/60 shrink-0">
                      FA
                    </div>
                    <div>
                      <h2 className="text-[18px] font-bold text-[#fdfaf5] tracking-tight leading-none mb-1.5">Fazil A</h2>
                      <p className="text-[10px] font-mono text-white/35 mb-2">NRK · Member since Jan 2025</p>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-[var(--gold-text)]" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                        </svg>
                        <span className="text-[11px] font-bold text-[var(--gold-text)] tracking-wider uppercase">{userRewards.tier} MEMBER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── View Portfolio Button ── */}
              <div className="px-5 py-4">
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
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-[var(--gold-text)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

              {/* ── Membership Card ── */}
              <div className="px-5 py-5 border-y border-[var(--c-border)]">
                <div
                  className="relative rounded-[20px] overflow-hidden p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] border border-[var(--gold)]/15 group flex flex-col justify-between"
                  style={{
                    background: "linear-gradient(135deg, #141008 0%, #080603 100%)",
                    minHeight: "185px"
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: "radial-gradient(var(--gold) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 20%, rgba(201,168,76,0.12), transparent 60%)" }} />
                  
                  <div className="relative z-10 flex flex-col">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>SID-X CLUB</p>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[var(--gold-text)] drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                      </svg>
                      <span className="text-[14px] font-black text-[var(--gold-text)] tracking-widest uppercase drop-shadow-md">{userRewards.tier}</span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 md:mt-8">
                    {/* Chip & Logo Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-[26px] rounded-[4px] border border-[#d4af37]/40 shadow-inner overflow-hidden relative flex" style={{ background: "linear-gradient(135deg, #ffd700 0%, #cca53f 40%, #996515 100%)" }}>
                         <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                      </div>
                      <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                      </svg>
                    </div>

                    <p className="text-[18px] font-mono font-bold tracking-[0.22em] text-white/90 drop-shadow-md mb-4" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
                      •••• •••• •••• 4821
                    </p>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mb-0.5">Cardholder</p>
                        <p className="text-[12px] font-mono font-bold tracking-[0.1em] text-[#fdfaf5] uppercase">FAZIL A</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mb-0.5">Expiry</p>
                         <p className="text-[12px] font-mono font-bold tracking-[0.1em] text-[#fdfaf5]">12/26</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 px-5 pb-8 pt-4" style={{ background: "var(--c-surface)" }}>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-[var(--red-semantic)]/20 hover:border-[var(--red-semantic)]/35 bg-[var(--red-semantic)]/8 hover:bg-[var(--red-semantic)]/15 active:scale-[0.98] transition-all text-[var(--red-text)] text-[12px] font-mono tracking-wider uppercase font-bold cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Sign out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
