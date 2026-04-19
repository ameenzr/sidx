"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  exploreProjects,
  featuredItems,
  userPortfolio,
  userRewards,
  homePerks,
  portfolioInvestments,
  type Item,
} from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/ui/BottomNav";
import { ActionFeedback, FeedbackData } from "@/components/ActionFeedback";
import { CommunityTab } from "@/components/CommunityTab";
import { EventsScreen } from "@/components/EventsScreen";
import { BenefitsScreen } from "@/components/BenefitsScreen";
import { ProjectsTab } from "@/components/ProjectsTab";
import { TravelTab } from "@/components/TravelTab";
import { AirportsScreen } from "@/components/AirportsScreen";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { PortfolioScreen } from "@/components/PortfolioScreen";
import { DetailDrawer } from "@/components/DetailDrawer";
import { LaunchAnimation } from "@/components/LaunchAnimation";
import { InboxScreen } from "@/components/InboxScreen";

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

export default function Home() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [drawerType, setDrawerType] = useState<"event" | "project">("project");
  const [airportsNav, setAirportsNav] = useState<{ airport?: string; service?: string } | null>(null);
  const [activeOpenProjectIndex, setActiveOpenProjectIndex] = useState(0);
  const openProjectsList = exploreProjects.filter(p => !p.isLocked);
  const investedIds = new Set(portfolioInvestments.map(p => p.projectId));

  const openAirports = (airport?: string, service?: string) => {
    setAirportsNav({ airport, service });
    setActiveTab("Airports");
  };

  const open = (item: Item, type: "event" | "project") => {
    setSelectedItem(item);
    setDrawerType(type);
  };

  // Safety fallback — force-show the page if animation never completes
  useEffect(() => {
    const t = setTimeout(() => setHasLaunched(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto-switch Open Projects
  useEffect(() => {
    if (activeTab === "Home") {
      const interval = setInterval(() => {
        setActiveOpenProjectIndex(prev => (prev + 1) % openProjectsList.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [activeTab, openProjectsList.length]);

  const isSubScreen = ["Portfolio", "Airports", "Events", "Benefits", "Inbox"].includes(activeTab);

  const getScreenTitle = () => {
    switch (activeTab) {
      case "Portfolio": return "My Portfolio";
      case "Airports": return "Airport Services";
      case "Events": return "Events";
      case "Benefits": return "Member Privileges";
      case "Inbox": return "Inbox";
      default: return "";
    }
  };

  const handleBack = () => {
    if (activeTab === "Airports") setActiveTab("Travel");
    else if (activeTab === "Events" || activeTab === "Benefits") setActiveTab("Community");
    else if (activeTab === "Portfolio") setActiveTab("Home");
    else if (activeTab === "Inbox") setActiveTab("Home");
    else setActiveTab("Home");
  };

  const isAnyDrawerOpen = isProfileOpen || !!selectedItem;

  return (
    <>
      <LaunchAnimation onComplete={() => setHasLaunched(true)} />
      <div
        className="flex flex-col min-h-full pt-[56px] overflow-x-hidden"
        style={{ opacity: hasLaunched ? 1 : 0, transition: "opacity 0.5s ease-in-out", pointerEvents: hasLaunched ? "auto" : "none" }}
      >
        <ActionFeedback 
          data={feedback} 
          onClose={() => setFeedback(null)} 
        />

        {/* ── Global Navbar ── */}
        <header
          data-testid="main-header"
          className="fixed top-0 left-0 right-0 z-[150] flex items-center px-4 py-2.5 transition-all duration-300"
          style={{
            backdropFilter: isAnyDrawerOpen ? "blur(30px) saturate(180%) brightness(0.7)" : "blur(20px) saturate(160%)",
            WebkitBackdropFilter: isAnyDrawerOpen ? "blur(30px) saturate(180%) brightness(0.7)" : "blur(20px) saturate(160%)",
            backgroundColor: "color-mix(in srgb, var(--c-base) 72%, transparent)",
            borderBottom: "1px solid var(--c-border)",
          }}
        >
          <div className="flex-1 flex items-center min-w-0">
            {isSubScreen ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 w-full"
              >
                <button
                  onClick={handleBack}
                  className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center active:scale-90 transition-transform shrink-0"
                >
                  <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
                <span className="text-[20px] font-display font-medium text-[var(--gold-text)]/90 tracking-tight leading-none truncate">
                  {activeTab === "Portfolio" && "My Portfolio"}
                  {activeTab === "Airports" && "Airport Services"}
                  {activeTab === "Events" && "Events"}
                  {activeTab === "Benefits" && "Privileges"}
                  {activeTab === "Inbox" && "Inbox"}
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-6 flex items-center"
              >
                <img src="/sid-x_logo.png" alt="SID-X" className="h-full w-auto object-contain" />
              </motion.div>
            )}
          </div>

          {!isSubScreen && (
            <div className="flex items-center gap-2 shrink-0">
              {/* Inbox / Messages button — always visible on main tabs */}
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveTab("Inbox")}
                className="relative w-10 h-10 flex items-center justify-center active:scale-90 transition-transform"
              >
                <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                </svg>
                {/* Unread badge */}
                <span className="absolute top-1.5 right-1 w-3.5 h-3.5 rounded-full bg-[var(--gold)] flex items-center justify-center text-[7.5px] font-black text-black leading-none shadow-[0_0_0_1.5px_#100d08]">
                  3
                </span>
              </motion.button>

              {/* Profile avatar — only on main screens */}
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setIsProfileOpen(true)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 border-2 border-[var(--gold)]/60 flex items-center justify-center text-black font-bold text-[12px] shadow-[0_0_15px_rgba(251,191,36,0.25)] active:scale-90 transition-transform"
              >
                FA
              </motion.button>
            </div>
          )}

          {/* Optional blur overlay inside header for content but not background if needed, 
              but blur is already on the header style. 
              The user wants "blur out navbar" when details drawer pops up. 
              I've added filter to the header itself. 
          */}
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
                    <h1 className="text-[40px] font-display font-medium text-[var(--c-text-h)] tracking-tight leading-none">{fmt(userPortfolio.currentValue)}</h1>
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

            {/* ── 2. Open Projects ── */}
            <section className="relative mb-6 pt-5 pb-4">
              {/* Lighter Gradient for Entire Section Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a140a]/40 via-[#120e06]/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex justify-center mb-5">
                <button 
                  onClick={() => setActiveTab("Projects")} 
                  className="group flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <h2 className="text-[10px] font-display font-medium text-[var(--gold-text)]/60 tracking-[0.3em] uppercase">
                    Open Projects
                    <span className="inline-block ml-1.5 opacity-60 group-active:translate-x-1 transition-transform">&gt;</span>
                  </h2>
                </button>
              </div>

              <div className="mx-auto w-[82%] h-[210px] relative perspective-[1000px]">
                {openProjectsList.map((project, i) => {
                  const diff = (i - activeOpenProjectIndex + openProjectsList.length) % openProjectsList.length;
                  let position = 0;
                  if (diff === 1) position = 1; // right side
                  else if (diff === openProjectsList.length - 1) position = -1; // left side
                  else if (diff !== 0) position = 2; // hidden

                  const isVisible = Math.abs(position) <= 1;
                  const isFront = position === 0;
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={false}
                      animate={{
                        zIndex: isFront ? 10 : 5,
                        opacity: isVisible ? (isFront ? 1 : 0.4) : 0,
                        scale: isFront ? 1 : 0.86,
                        x: isVisible ? position * 45 : position * 100,
                        y: isFront ? 0 : 6,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      drag={isFront ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.8}
                      onDragEnd={(e, { offset: dragOffset, velocity }) => {
                        const swipe = dragOffset.x;
                        if (swipe < -50 || velocity.x < -300) {
                          // Swipe left - next
                          setActiveOpenProjectIndex((prev) => (prev + 1) % openProjectsList.length);
                        } else if (swipe > 50 || velocity.x > 300) {
                          // Swipe right - prev
                          setActiveOpenProjectIndex((prev) => (prev - 1 + openProjectsList.length) % openProjectsList.length);
                        }
                      }}
                      className="absolute inset-0 w-full h-full rounded-[4px] border border-[var(--gold)]/20 bg-gradient-to-br from-[#181208] to-[#0a0805] shadow-xl"
                      style={{ transformOrigin: "center" }}
                    >
                      {/* Stickers overlay */}
                      <div className="absolute top-0 right-0 z-30 flex flex-col items-end gap-2 pr-2 pt-2">
                        {project.isNew && (
                          <div
                            className="rotate-6 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-black rounded-sm shadow-lg"
                            style={{
                              background: "linear-gradient(135deg, #f0d060, #c9a84c)",
                              boxShadow: "0 2px 8px rgba(201,168,76,0.6), 0 1px 2px rgba(0,0,0,0.4)",
                            }}
                          >
                            New
                          </div>
                        )}
                        {investedIds.has(project.id) && (
                          <div
                            className="-rotate-3 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[var(--gold-text)] rounded-full border border-[var(--gold)]/40 backdrop-blur-md bg-black/40 shadow-lg"
                          >
                            Invested
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 overflow-hidden rounded-[4px]">
                      <button
                        onClick={() => {
                          if (isFront) open(project, "project");
                        }}
                        className={`w-full h-full block text-left transition-transform duration-300 ${isFront ? "cursor-pointer" : "cursor-default pointer-events-none"}`}
                      >
                        {project.image && (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                        
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {project.badges.slice(0, 2).map((b) => (
                              <Badge key={b} label={b} />
                            ))}
                          </div>
                          
                          <h3 className="text-[19px] font-display font-medium text-white tracking-tight leading-none mb-1">
                            {project.title}
                          </h3>
                          
                          <p className="text-[10.5px] text-white/50 line-clamp-1 mb-2.5 leading-snug">
                            {project.description}
                          </p>

                          <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-2.5">
                            <div>
                              <p className="text-[7.5px] font-mono text-white/30 uppercase tracking-[0.2em] mb-0.5">Target IRR</p>
                              <p className="text-[13px] font-bold text-emerald-400">{project.irr}%</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[7.5px] font-mono text-white/30 uppercase tracking-[0.2em] mb-0.5">Min Entry</p>
                              <p className="text-[13px] font-bold text-white">{fmt(project.minInvestment || 0)}</p>
                            </div>
                          </div>
                          
                          {/* Static Investment Progress */}
                          <div className="mt-2.5">
                            <div className="flex justify-between items-end mb-1">
                              <p className="text-[7.5px] font-mono text-white/40 uppercase tracking-[0.2em]">Funded</p>
                              <p className="text-[8px] font-mono text-[var(--gold-text)] font-bold">{Math.round((project.raised || 0) / (project.target || 1) * 100)}%</p>
                            </div>
                            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                              <div 
                                style={{ width: `${Math.round((project.raised || 0) / (project.target || 1) * 100)}%` }} 
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ── 3. Services ── */}
            <section className="mb-5 px-5">
              <div className="flex justify-center mb-4">
                <button 
                  onClick={() => setActiveTab("Travel")} 
                  className="group flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <h2 className="text-[10px] font-display font-medium text-[var(--gold-text)]/60 tracking-[0.3em] uppercase">
                    Services
                    <span className="inline-block ml-1.5 opacity-60 group-active:translate-x-1 transition-transform">&gt;</span>
                  </h2>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { label: "Airport\nConcierge",  color: "#5b8de8", bg: "rgba(56,100,180,0.10)",  border: "rgba(91,141,232,0.18)",  action: () => openAirports("COK", "concierge"), icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" },
                  { label: "Priority\nPickup",    color: "#a8b840", bg: "rgba(107,117,37,0.10)",  border: "rgba(168,184,64,0.18)",  action: () => openAirports("COK", "pickup"),    icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" },
                  { label: "Lounge\nAccess",      color: "#e8c97a", bg: "rgba(201,168,76,0.10)",  border: "rgba(232,201,122,0.18)", action: () => openAirports("COK", "lounge"),    icon: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" },
                  { label: "In-Flight\nServices", color: "#818cf8", bg: "rgba(129,140,248,0.10)", border: "rgba(129,140,248,0.18)", action: () => setActiveTab("Travel"),            icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" },
                  { label: "Hotels\n& Stays",     color: "#fb923c", bg: "rgba(251,146,60,0.10)",  border: "rgba(251,146,60,0.18)",  action: () => setActiveTab("Travel"),            icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" },
                  { label: "Experiences\n& More", color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.15)",  action: () => setActiveTab("Travel"),            icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" },
                ] as const).map((svc, i) => (
                  <motion.button
                    key={svc.label}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.24 }}
                    onClick={svc.action}
                    className="flex flex-col items-center justify-center gap-2 py-4 rounded-[16px] border active:scale-95 transition-transform"
                    style={{ backgroundColor: svc.bg, borderColor: svc.border }}
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${svc.color}15` }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" style={{ color: svc.color }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} />
                      </svg>
                    </div>
                    <p className="text-[10px] font-semibold text-white/65 text-center leading-tight whitespace-pre-line">{svc.label}</p>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* ── 4. Member Perks ── */}
            <section className="mb-6 mt-4 overflow-hidden relative"
              style={{
                background: "linear-gradient(150deg, #1c1205 0%, #130e04 50%, #0a0805 100%)",
                boxShadow: "0 0 60px rgba(201,168,76,0.08)",
                borderTop: "1px solid rgba(201,168,76,0.15)",
                borderBottom: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              {/* Ambient gold glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(201,168,76,0.10), transparent 65%)" }} />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-4">
                <div>
                  <p className="text-[9px] font-mono text-[var(--gold-text)]/45 uppercase tracking-[0.28em] mb-1">Exclusive Access</p>
                  <h2 className="text-[18px] font-bold text-[var(--c-text-h)] tracking-tight">Member Perks</h2>
                </div>
                {/* Glowing GOLD tier badge */}
                <button onClick={() => setActiveTab("Community")} className="active:scale-95 transition-transform">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,168,76,0.25) 0%, rgba(232,201,122,0.15) 100%)",
                      border: "1px solid rgba(201,168,76,0.45)",
                      boxShadow: "0 0 12px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    <svg className="w-3 h-3 text-[var(--gold-text)]" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                    </svg>
                    <span className="text-[11px] font-black text-[var(--gold-text)] uppercase tracking-wider">{userRewards.tier}</span>
                  </div>
                </button>
              </div>

              {/* Perk cards */}
              <div className="relative z-10 flex gap-3 overflow-x-auto scrollbar-none px-5 pb-6">
                {homePerks.map((perk, i) => (
                  <motion.button
                    key={perk.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    onClick={() => setActiveTab("Community")}
                    className="shrink-0 w-[148px] h-[158px] rounded-[20px] overflow-hidden relative active:scale-[0.95] transition-transform flex flex-col"
                    style={{
                      background: `linear-gradient(140deg,${perk.accentColor}40 0%,rgba(15,10,4,0.9) 100%)`,
                      border: "1px solid rgba(201,168,76,0.10)",
                    }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 80% at 20% 20%,${perk.accentColor}28,transparent)` }} />
                    {perk.isNew && (
                      <div className="absolute top-3 right-3 bg-[var(--gold)] text-black text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider z-10"
                        style={{ boxShadow: "0 0 8px rgba(201,168,76,0.6)" }}
                      >New</div>
                    )}
                    <div className="relative z-10 p-4 flex flex-col h-full">
                      <div className="w-10 h-8 rounded-lg flex items-center justify-center mb-auto" style={{ backgroundColor: `${perk.accentColor}50`, border: "1px solid rgba(201,168,76,0.15)" }}>
                        <span className="text-[9px] font-black text-white/85 tracking-tight">{perk.logoText}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white leading-snug mb-1 text-left">{perk.headline}</p>
                        <p className="text-[10px] font-mono text-white/35 leading-tight mb-3 text-left">{perk.sub}</p>
                        <div className="flex items-center gap-1 text-[var(--gold-text)]/55">
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


            </section>

            {/* ── 5. Upcoming Events ── */}
            <section className="mb-4">
              <div className="flex justify-center mb-4 px-5">
                <button
                  onClick={() => setActiveTab("Events")}
                  className="group flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <h2 className="text-[10px] font-display font-medium text-[var(--gold-text)]/60 tracking-[0.3em] uppercase">
                    Upcoming Events
                    <span className="inline-block ml-1.5 opacity-60 group-active:translate-x-1 transition-transform">&gt;</span>
                  </h2>
                </button>
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

        {activeTab === "Projects" && (
          <ProjectsTab 
            onOpenPortfolio={() => setActiveTab("Portfolio")} 
            onFeedback={setFeedback}
          />
        )}
        {activeTab === "Travel" && <TravelTab onOpenAirports={() => openAirports()} onFeedback={setFeedback} />}
        {activeTab === "Airports" && (
          <AirportsScreen
            onBack={() => setActiveTab("Travel")}
            initialAirport={airportsNav?.airport}
            highlightService={airportsNav?.service}
            onFeedback={setFeedback}
          />
        )}
        {activeTab === "Community" && (
          <CommunityTab
            onOpenEvents={() => setActiveTab("Events")}
            onOpenBenefits={() => setActiveTab("Benefits")}
          />
        )}
        {activeTab === "Events" && <EventsScreen onBack={() => setActiveTab("Community")} onFeedback={setFeedback} />}
        {activeTab === "Benefits" && (
          <BenefitsScreen 
            onBack={() => setActiveTab("Community")} 
            onFeedback={setFeedback}
          />
        )}
        {activeTab === "Portfolio" && <PortfolioScreen onBack={() => setActiveTab("Home")} />}
        {activeTab === "Inbox" && <InboxScreen />}

        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onOpenPortfolio={() => setActiveTab("Portfolio")}
        />
        <DetailDrawer 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          type={drawerType}
          onFeedback={setFeedback}
        />
        {!isSubScreen && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
      </div>
    </>
  );
}
