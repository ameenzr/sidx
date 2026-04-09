"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  exploreProjects,
  hotProjects,
  featuredItems,
  portfolioInvestments,
  userPortfolio,
  userRewards,
  homePerks,
  type Item,
} from "@/lib/mock-data";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/ui/BottomNav";
import { CommunityTab } from "@/components/CommunityTab";
import { ProjectsTab } from "@/components/ProjectsTab";
import { TravelTab } from "@/components/TravelTab";
import { AirportsScreen } from "@/components/AirportsScreen";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { PortfolioScreen } from "@/components/PortfolioScreen";
import { DetailDrawer } from "@/components/DetailDrawer";
import { LaunchAnimation } from "@/components/LaunchAnimation";

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

export default function Home() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [drawerType, setDrawerType] = useState<"event" | "project">("project");
  const [activeOppsIndex, setActiveOppsIndex] = useState(0);
  const [activeInvIndex, setActiveInvIndex] = useState(0);
  const [airportsNav, setAirportsNav] = useState<{ airport?: string; service?: string } | null>(null);
  const oppsScrollRef = useRef<HTMLDivElement>(null);

  const openAirports = (airport?: string, service?: string) => {
    setAirportsNav({ airport, service });
    setActiveTab("Airports");
  };

  // Auto-advance opportunities every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOppsIndex(prev => {
        const next = (prev + 1) % exploreProjects.length;
        oppsScrollRef.current?.scrollTo({ left: next * (oppsScrollRef.current.offsetWidth), behavior: "smooth" });
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const open = (item: Item, type: "event" | "project") => {
    setSelectedItem(item);
    setDrawerType(type);
  };

  // Safety fallback — force-show the page if animation never completes
  useEffect(() => {
    const t = setTimeout(() => setHasLaunched(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LaunchAnimation onComplete={() => setHasLaunched(true)} />
      <div
        className="flex flex-col min-h-full pt-[56px] overflow-x-hidden"
        style={{ opacity: hasLaunched ? 1 : 0, transition: "opacity 0.5s ease-in-out", pointerEvents: hasLaunched ? "auto" : "none" }}
      >
        {/* ── Header ── */}
        <header
          data-testid="main-header"
          className="fixed top-0 left-0 right-0 z-[150] flex justify-between items-center px-4 py-2.5"
          style={{
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            backgroundColor: "color-mix(in srgb, var(--c-base) 72%, transparent)",
            borderBottom: "1px solid var(--c-border)",
          }}
        >
          <div className="h-6 flex items-center">
            <img src="/sid-x_logo.png" alt="SID-X" className="h-full w-auto object-contain" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[var(--gold)]/10 border border-[var(--gold)]/25 rounded-full px-3 py-1.5">
              <svg className="w-3 h-3 text-[var(--gold-text)]" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
              </svg>
              <span className="text-[11px] font-mono font-bold text-[var(--gold-text)]">{userRewards.points.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 border-2 border-[var(--gold)]/60 flex items-center justify-center text-black font-bold text-[12px] shadow-[0_0_15px_rgba(251,191,36,0.25)] active:scale-90 transition-transform"
            >
              FA
            </button>
          </div>
        </header>

        {/* ════════ HOME ════════ */}
        {activeTab === "Home" && (
          <div className="flex flex-col w-full pb-32">

            {/* ── 1. Portfolio Hero ── */}
            <section className="px-5 mt-5 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="relative rounded-[28px] overflow-hidden border border-[var(--gold)]/20 p-6"
                style={{ background: "linear-gradient(140deg,#1c1508 0%,#0f0c06 60%,#0a0805 100%)" }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 110% 80% at 10% 20%,rgba(180,130,40,0.14),transparent 60%)" }} />
                {/* Sparkline */}
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none opacity-20">
                  <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,52 C20,48 35,55 60,44 C80,36 95,50 120,36 C140,26 155,40 180,24 C200,14 215,22 240,12 C258,6 272,10 300,4"
                      fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,52 C20,48 35,55 60,44 C80,36 95,50 120,36 C140,26 155,40 180,24 C200,14 215,22 240,12 C258,6 272,10 300,4 L300,60 L0,60 Z"
                      fill="url(#sparkFill)" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-mono text-[var(--gold-text)]/40 uppercase tracking-[0.28em]">Portfolio Value</p>
                    <button
                      onClick={() => setActiveTab("Portfolio")}
                      className="flex items-center gap-1 text-[10px] font-mono text-[var(--gold-text)]/50 active:text-[var(--gold-text)]"
                    >
                      <span>Details</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-end gap-3 mb-1">
                    <h1 className="text-[40px] font-bold text-[var(--c-text-h)] tracking-tight leading-none">{fmt(userPortfolio.currentValue)}</h1>
                    <div className="flex items-center gap-1 mb-2 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                      <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                      <span className="text-[11px] font-bold text-emerald-400">+{userPortfolio.returnPercent}%</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-white/30 mb-5">+{fmt(userPortfolio.returns)} unrealised gain</p>
                  <div className="h-px bg-[var(--gold)]/10 mb-4" />
                  <div className="grid grid-cols-3">
                    <div>
                      <p className="text-[15px] font-bold text-white/85">{fmt(userPortfolio.totalInvested)}</p>
                      <p className="text-[9px] font-mono text-white/28 uppercase tracking-wider mt-0.5">Deployed</p>
                    </div>
                    <div className="border-x border-[var(--gold)]/10 px-4">
                      <p className="text-[15px] font-bold text-white/85">{userPortfolio.activeCount}</p>
                      <p className="text-[9px] font-mono text-white/28 uppercase tracking-wider mt-0.5">Active</p>
                    </div>
                    <div className="pl-4">
                      <p className="text-[15px] font-bold text-white/85">{userPortfolio.avgIRR}%</p>
                      <p className="text-[9px] font-mono text-white/28 uppercase tracking-wider mt-0.5">Avg IRR</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* ── 2 & 3. Investments + Opportunities ── */}
            <section className="mb-6 px-5">
              <div className="flex gap-2.5">

                {/* ── Left: My Investments ── */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-2.5">
                    <p className="text-[11px] font-bold text-[var(--c-text-h)] tracking-tight">Investments</p>
                  </div>

                  {/* Cards */}
                  <div
                    className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory"
                    onScroll={e => {
                      const el = e.currentTarget;
                      const idx = Math.round(el.scrollLeft / el.offsetWidth);
                      if (idx !== activeInvIndex) setActiveInvIndex(idx);
                    }}
                  >
                    {portfolioInvestments.map((inv, i) => {
                      const project = hotProjects.find(p => p.id === inv.projectId);
                      const progress = project?.raised && project?.target ? Math.round((project.raised / project.target) * 100) : 0;
                      const gain = inv.currentValue - inv.invested;
                      return (
                        <motion.div
                          key={inv.projectId}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.36 }}
                          className="w-full shrink-0 snap-center"
                        >
                          <button
                            onClick={() => project && open(project, "project")}
                            className="w-full h-[190px] rounded-[20px] overflow-hidden border border-white/8 bg-[#0f0c06] relative active:scale-[0.97] transition-transform block"
                          >
                            {project?.image && <div className="absolute inset-0 bg-cover bg-center opacity-[0.20]" style={{ backgroundImage: `url("${project.image}")` }} />}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080604] via-[#0a0805]/85 to-transparent" />
                            <div className="relative z-10 p-3.5 flex flex-col h-full">
                              {/* IRR pill */}
                              <div className="self-start rounded-full px-2 py-0.5 border" style={{ backgroundColor: `${inv.color}18`, borderColor: `${inv.color}35` }}>
                                <span className="text-[9px] font-bold" style={{ color: inv.color }}>{inv.irr}% IRR</span>
                              </div>
                              <div className="mt-auto text-left">
                                <p className="text-[12px] font-bold text-white leading-tight mb-0.5">{inv.shortTitle}</p>
                                <p className="text-[9px] font-mono text-white/32 mb-1">{fmt(inv.invested)}</p>
                                <p className="text-[12px] font-bold mb-2" style={{ color: inv.color }}>+{fmt(gain)}</p>
                                <div className="w-full h-[2px] rounded-full bg-white/10 overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: inv.color }} />
                                </div>
                                <p className="text-[7px] font-mono text-white/18 mt-1">{progress}% project funded</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-1.5 mt-2">
                    {portfolioInvestments.map((_, i) => (
                      <div key={i} className={`h-[3px] rounded-full transition-all duration-300 ${i === activeInvIndex ? "w-4 bg-[var(--gold)]" : "w-[3px] bg-white/18"}`} />
                    ))}
                  </div>

                  {/* Manage Link */}
                  <div className="flex justify-center mt-3">
                    <button 
                      onClick={() => setActiveTab("Portfolio")}
                      className="text-[9px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]"
                    >
                      manage →
                    </button>
                  </div>
                </div>

                {/* ── Right: New Opportunities ── */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-2.5">
                    <p className="text-[11px] font-bold text-[var(--c-text-h)] tracking-tight">Opportunities</p>
                  </div>

                  {/* Cards */}
                  <div
                    ref={oppsScrollRef}
                    className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory"
                    onScroll={e => {
                      const el = e.currentTarget;
                      const idx = Math.round(el.scrollLeft / el.offsetWidth);
                      if (idx !== activeOppsIndex && idx < exploreProjects.length) setActiveOppsIndex(idx);
                    }}
                  >
                    {exploreProjects.map((item, i) => {
                      const fundedPct = item.raised && item.target ? Math.round((item.raised / item.target) * 100) : 0;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.36 }}
                          className="w-full shrink-0 snap-center"
                        >
                          <button
                            onClick={() => open(item, "project")}
                            className="w-full h-[190px] rounded-[20px] overflow-hidden border border-white/8 relative active:scale-[0.97] transition-transform block bg-[#0f0c06]"
                          >
                            {item.gallery?.[0] && (
                              <img src={item.gallery[0]} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(8,6,4,0.92) 100%)" }} />

                            {/* IRR badge */}
                            <div className="absolute top-3 right-3 bg-black/55 backdrop-blur-sm border border-emerald-400/30 rounded-lg px-2 py-1 text-right">
                              <p className="text-[7px] font-mono text-white/35 uppercase tracking-widest leading-none mb-0.5">IRR</p>
                              <p className="text-[15px] font-bold text-emerald-400 leading-none">{item.irr}%</p>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-3.5">
                              <p className="text-[12px] font-bold text-white leading-tight mb-1 line-clamp-1">{item.title}</p>
                              {/* Progress */}
                              <div className="w-full h-[2px] rounded-full bg-white/12 overflow-hidden mb-1">
                                <div className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full" style={{ width: `${fundedPct}%` }} />
                              </div>
                              <p className="text-[7px] font-mono text-white/25">{fundedPct}% funded · ₹{item.target}Cr target</p>
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-1.5 mt-2">
                    {exploreProjects.map((_, i) => (
                      <div key={i} className={`h-[3px] rounded-full transition-all duration-300 ${i === activeOppsIndex ? "w-4 bg-[var(--gold)]" : "w-[3px] bg-white/18"}`} />
                    ))}
                  </div>

                  {/* See All Link */}
                  <div className="flex justify-center mt-3">
                    <button 
                      onClick={() => setActiveTab("Projects")}
                      className="text-[9px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]"
                    >
                      see all →
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* ── 3.5. Airports & Flights ── */}
            <section className="mb-6">
              <div className="px-5 mb-3 flex justify-between items-baseline">
                <div>
                  <h2 className="text-[17px] font-bold text-[var(--c-text-h)] tracking-tight">Airports & Flights</h2>
                  <p className="text-[10px] font-mono text-white/30 mt-0.5">Exclusive NRK travel services</p>
                </div>
                <button onClick={() => openAirports()} className="text-[9px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]">explore →</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-none px-5 pb-1">

                {/* 1 — Concierge */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.36 }}
                  onClick={() => openAirports("COK", "concierge")}
                  className="shrink-0 w-[155px] h-[155px] rounded-[22px] overflow-hidden border border-blue-400/12 relative active:scale-[0.95] transition-transform"
                  style={{ background: "linear-gradient(155deg, rgba(56,100,180,0.12) 0%, #080a0e 100%)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #3864b4, #5b8de8, transparent)" }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 25%, rgba(56,100,180,0.15), transparent 60%)" }} />
                  <div className="relative z-10 p-4 flex flex-col h-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-blue-400/20 mb-auto" style={{ backgroundColor: "rgba(56,100,180,0.15)" }}>
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white leading-tight mb-1">Airport Concierge</p>
                      <p className="text-[9px] font-mono text-white/30">COK · CCJ · TRV</p>
                    </div>
                  </div>
                </motion.button>

                {/* 2 — Priority Pickup */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.36 }}
                  onClick={() => openAirports("COK", "pickup")}
                  className="shrink-0 w-[155px] h-[155px] rounded-[22px] overflow-hidden border border-[var(--olive)]/12 relative active:scale-[0.95] transition-transform"
                  style={{ background: "linear-gradient(155deg, rgba(138,149,48,0.10) 0%, #090a06 100%)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #6b7530, #a8b840, transparent)" }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 25%, rgba(138,149,48,0.12), transparent 60%)" }} />
                  <div className="relative z-10 p-4 flex flex-col h-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--olive)]/20 mb-auto" style={{ backgroundColor: "rgba(138,149,48,0.12)" }}>
                      <svg className="w-4 h-4 text-[var(--olive-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white leading-tight mb-1">Priority Pickup</p>
                      <p className="text-[9px] font-mono text-white/30">Chauffeur transfers</p>
                    </div>
                  </div>
                </motion.button>

                {/* 3 — Lounge Access */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.19, duration: 0.36 }}
                  onClick={() => openAirports("COK", "lounge")}
                  className="shrink-0 w-[155px] h-[155px] rounded-[22px] overflow-hidden border border-[var(--gold)]/12 relative active:scale-[0.95] transition-transform"
                  style={{ background: "linear-gradient(155deg, rgba(201,168,76,0.08) 0%, #0a0805 100%)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #c9a84c, #e8c97a, transparent)" }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 25%, rgba(201,168,76,0.10), transparent 60%)" }} />
                  <div className="relative z-10 p-4 flex flex-col h-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--gold)]/20 mb-auto" style={{ backgroundColor: "rgba(201,168,76,0.10)" }}>
                      <svg className="w-4 h-4 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white leading-tight mb-1">Lounge Access</p>
                      <p className="text-[9px] font-mono text-white/30">CIAL · CCJ · TRV</p>
                    </div>
                  </div>
                </motion.button>

              </div>
            </section>

            {/* ── 4. Member Perks ── */}
            <section className="mb-6">
              <div className="px-5 mb-3.5 flex justify-between items-center">
                <div>
                  <h2 className="text-[17px] font-bold text-[var(--c-text-h)] tracking-tight">Member Perks</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <svg className="w-3 h-3 text-[var(--gold-text)]/60" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                    </svg>
                    <span className="text-[11px] font-mono text-[var(--gold-text)]/60">{userRewards.points.toLocaleString()} pts · {userRewards.tier}</span>
                  </div>
                </div>
                <button onClick={() => setActiveTab("Community")} className="text-[11px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]">see all</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-none px-5 pb-1">
                {homePerks.map((perk, i) => (
                  <motion.button
                    key={perk.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    onClick={() => setActiveTab("Community")}
                    className="shrink-0 w-[148px] h-[158px] rounded-[22px] overflow-hidden relative border border-white/8 active:scale-[0.95] transition-transform flex flex-col"
                    style={{ background: `linear-gradient(140deg,${perk.accentColor}55 0%,#0d0a06 100%)` }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 80% at 20% 20%,${perk.accentColor}35,transparent)` }} />
                    {perk.isNew && <div className="absolute top-3 right-3 bg-[var(--gold)] text-black text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider z-10">New</div>}
                    <div className="relative z-10 p-4 flex flex-col h-full">
                      <div className="w-10 h-8 rounded-lg flex items-center justify-center mb-auto border border-white/10" style={{ backgroundColor: `${perk.accentColor}60` }}>
                        <span className="text-[9px] font-black text-white/90 tracking-tight">{perk.logoText}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white leading-snug mb-1 text-left">{perk.headline}</p>
                        <p className="text-[10px] font-mono text-white/38 leading-tight mb-3 text-left">{perk.sub}</p>
                        <div className="flex items-center gap-1 text-[var(--gold-text)]/50">
                          <span className="text-[9px] font-mono">activate</span>
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              {/* Tier progress */}
              <div className="mx-5 mt-3 rounded-2xl border border-[var(--gold)]/12 bg-[#0f0c06] p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-[var(--gold-text)]/60 uppercase tracking-wider">{userRewards.tier}</span>
                  <span className="text-[10px] font-mono text-white/25">{userRewards.pointsToNextTier.toLocaleString()} pts to {userRewards.nextTier}</span>
                </div>
                <div className="w-full h-[3px] rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((userRewards.points / (userRewards.points + userRewards.pointsToNextTier)) * 100)}%` }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-400"
                  />
                </div>
              </div>
            </section>

            {/* ── 5. Upcoming Events ── */}
            <section className="mb-4">
              <div className="px-5 mb-3.5 flex justify-between items-baseline">
                <h2 className="text-[17px] font-bold text-[var(--c-text-h)] tracking-tight">Upcoming Events</h2>
                <button onClick={() => setActiveTab("Community")} className="text-[11px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]">see all</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-none px-5 pb-1">
                {featuredItems.map((event, i) => {
                  const [dayNum, monthName] = (() => {
                    const m = event.date?.match(/(\d{1,2})\s+(\w{3})/);
                    return m ? [m[1], m[2].toUpperCase()] : ["—", "—"];
                  })();
                  return (
                    <motion.button
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.36 }}
                      onClick={() => open(event, "event")}
                      className="shrink-0 w-[172px] h-[216px] rounded-[22px] overflow-hidden relative border border-white/8 active:scale-[0.95] transition-transform"
                    >
                      {event.image && <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-[#050302]/55 to-black/20" />
                      <div className="relative z-10 p-4 flex flex-col h-full">
                        <div className="self-start bg-black/55 backdrop-blur-md border border-white/15 rounded-xl px-2.5 py-1.5 text-center">
                          <p className="text-[16px] font-bold text-white leading-none">{dayNum}</p>
                          <p className="text-[8px] font-mono text-white/60 tracking-widest mt-0.5">{monthName}</p>
                        </div>
                        <div className="mt-auto text-left">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {event.badges.slice(0, 1).map((b, bi) => <Badge key={bi} label={b} />)}
                          </div>
                          <p className="text-[12px] font-bold text-white leading-tight mb-1">{event.title}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-mono text-white/35 truncate max-w-[100px]">{event.venue?.split(",")[0]}</p>
                            <div className="bg-white/12 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1">
                              <span className="text-[9px] font-mono font-bold text-white/80">View</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {activeTab === "Projects" && <ProjectsTab />}
        {activeTab === "Travel" && <TravelTab onOpenAirports={() => openAirports()} />}
        {activeTab === "Airports" && (
          <AirportsScreen
            onBack={() => setActiveTab("Travel")}
            initialAirport={airportsNav?.airport}
            highlightService={airportsNav?.service}
          />
        )}
        {activeTab === "Community" && <CommunityTab />}
        {activeTab === "Portfolio" && <PortfolioScreen onBack={() => setActiveTab("Home")} />}

        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onOpenPortfolio={() => setActiveTab("Portfolio")}
        />
        <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} type={drawerType} />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}
