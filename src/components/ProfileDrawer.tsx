"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const memberStats = [
  { label: "Portfolio Value", value: "₹2.4Cr" },
  { label: "Events Attended", value: "12" },
  { label: "Rewards Points", value: "8,420" },
];

const investments = [
  { title: "Luxury Riverside Hotel", irr: "18.5%", invested: "₹25L", status: "Active", color: "bg-emerald-400" },
  { title: "Olympus Sky Residences", irr: "21.2%", invested: "₹10L", status: "Active", color: "bg-blue-400" },
  { title: "Aura Glow Skin Labs", irr: "28.5%", invested: "₹5L", status: "Active", color: "bg-amber-400" },
];

const activityLog = [
  { action: "Registered for Scale Up Conclave 2026", time: "2 days ago", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
  { action: "Investment in Luxury Riverside Hotel confirmed", time: "1 week ago", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
  { action: "Priority Pass activated for travel", time: "2 weeks ago", icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" },
  { action: "Earned 1,200 reward points", time: "3 weeks ago", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
];

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const [activeSection, setActiveSection] = useState<"portfolio" | "activity">("portfolio");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="profile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer — slides in from the right */}
          <motion.div
            key="profile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-[210] w-[88vw] max-w-[360px] bg-[#0e0b07] flex flex-col overflow-hidden shadow-[-20px_0_80px_rgba(0,0,0,0.7)]"
          >
            {/* Header Banner */}
            <div className="relative h-[130px] shrink-0 bg-gradient-to-br from-[#1a1408] via-[#0e0b07] to-[#0a0805] border-b border-[var(--gold)]/10 overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-30" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(180,130,40,0.25), transparent)" }} />

              {/* Back button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors active:scale-95 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="text-[12px] font-mono font-bold uppercase tracking-wider">Back</span>
              </button>

              {/* Avatar + Name */}
              <div className="absolute bottom-4 left-5 flex items-end gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 flex items-center justify-center text-black font-bold text-[18px] shadow-[0_0_20px_rgba(251,191,36,0.4)] border-2 border-[var(--gold)]">
                  FE
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#fdfaf5] tracking-tight leading-none mb-0.5">fazil E</h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
                    <span className="text-[10px] font-mono text-emerald-400/80 tracking-wider">COMMUNITY MEMBER</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-3 border-b border-[var(--gold)]/10 shrink-0">
              {memberStats.map((stat, i) => (
                <div key={i} className={`py-4 px-3 text-center ${i < 2 ? "border-r border-[var(--gold)]/10" : ""}`}>
                  <p className="text-[14px] font-bold text-[var(--gold-text)] mb-0.5">{stat.value}</p>
                  <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.12em] leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Section Toggle */}
            <div className="flex border-b border-[var(--gold)]/10 shrink-0">
              {(["portfolio", "activity"] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`flex-1 py-3 text-[11px] font-mono font-bold uppercase tracking-wider transition-colors ${activeSection === sec ? "text-[var(--gold-text)] border-b-2 border-[var(--gold)]" : "text-white/30"}`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-5 pb-24">
              <AnimatePresence mode="wait">
                {activeSection === "portfolio" ? (
                  <motion.div key="portfolio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Active Investments</p>
                    <div className="flex flex-col gap-3 mb-8">
                      {investments.map((inv, i) => (
                        <div key={i} className="bg-[var(--bg-raised)] rounded-xl p-4 border border-[var(--gold)]/10 flex gap-3 items-center">
                          <div className={`w-2 h-10 rounded-full ${inv.color} opacity-80 shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-bold text-white truncate mb-0.5">{inv.title}</p>
                            <p className="text-[10px] font-mono text-white/40">{inv.invested} invested</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[13px] font-bold text-emerald-400">{inv.irr}</p>
                            <p className="text-[9px] font-mono text-white/25 uppercase">IRR</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Membership card visual */}
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">Membership</p>
                    <div className="rounded-2xl p-5 bg-gradient-to-br from-[#1a1408] to-[#0a0805] border border-[var(--gold)]/20 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(180,130,40,0.4), transparent)" }} />
                      <p className="text-[10px] font-mono text-[var(--gold-text)]/50 uppercase tracking-[0.25em] mb-3">SID-X CLUB</p>
                      <p className="text-[20px] font-bold text-[#fdfaf5] tracking-[0.1em] font-mono mb-4">•••• •••• 4821</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider mb-0.5">Member Since</p>
                          <p className="text-[12px] font-bold text-white/70">JAN 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider mb-0.5">Valid Until</p>
                          <p className="text-[12px] font-bold text-white/70">DEC 2026</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Recent Activity</p>
                    <div className="flex flex-col gap-1">
                      {activityLog.map((log, i) => (
                        <div key={i} className="flex gap-3 items-start py-3 border-b border-white/5 last:border-0">
                          <div className="w-7 h-7 rounded-full bg-[var(--gold)]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5 text-[var(--gold-text)]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d={log.icon} />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[12px] text-white/70 leading-snug mb-1">{log.action}</p>
                            <p className="text-[10px] font-mono text-white/25">{log.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Logout */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <button className="flex items-center gap-2 text-[11px] font-mono text-white/25 hover:text-white/50 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                Sign out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
