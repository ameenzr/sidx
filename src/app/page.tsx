"use client";

import { useState, useEffect } from "react";
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
import { EventsTab } from "@/components/EventsTab";
import { ProjectsTab } from "@/components/ProjectsTab";
import { BenefitsTab } from "@/components/BenefitsTab";
import { ProfileDrawer } from "@/components/ProfileDrawer";
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

  const open = (item: Item, type: "event" | "project") => {
    setSelectedItem(item);
    setDrawerType(type);
  };

  useEffect(() => {
    const handleScroll = () => {}; // kept for future use
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <LaunchAnimation onComplete={() => setHasLaunched(true)} />
      <div
        className="flex flex-col min-h-full pt-[82px] overflow-x-hidden"
        style={{ opacity: hasLaunched ? 1 : 0, transition: "opacity 0.5s ease-in-out", pointerEvents: hasLaunched ? "auto" : "none" }}
      >
        {/* ── Header ── */}
        <header className="fixed top-0 left-0 right-0 z-[150] flex justify-between items-center px-5 pt-8 pb-4 bg-gradient-to-b from-[#0a0805] via-[#0a0805]/95 to-transparent">
          <div className="h-7 flex items-center">
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
                  <p className="text-[10px] font-mono text-[var(--gold-text)]/40 uppercase tracking-[0.28em] mb-3">Portfolio Value</p>
                  <div className="flex items-end gap-3 mb-1">
                    <h1 className="text-[40px] font-bold text-[#fdfaf5] tracking-tight leading-none">{fmt(userPortfolio.currentValue)}</h1>
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

            {/* ── 2. My Investments ── */}
            <section className="mb-6">
              <div className="px-5 mb-3.5 flex justify-between items-baseline">
                <h2 className="text-[17px] font-bold text-[#fdfaf5] tracking-tight">My Investments</h2>
                <button onClick={() => setActiveTab("Projects")} className="text-[11px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]">manage →</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-none px-5 pb-1">
                {portfolioInvestments.map((inv, i) => {
                  const project = hotProjects.find(p => p.id === inv.projectId);
                  const progress = project?.raised && project?.target ? Math.round((project.raised / project.target) * 100) : 0;
                  const gain = inv.currentValue - inv.invested;
                  return (
                    <motion.button
                      key={inv.projectId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.09, duration: 0.38 }}
                      onClick={() => project && open(project, "project")}
                      className="shrink-0 w-[158px] h-[168px] rounded-[22px] overflow-hidden border border-white/8 bg-[#0f0c06] relative active:scale-[0.95] transition-transform"
                    >
                      {project?.image && <div className="absolute inset-0 bg-cover bg-center opacity-[0.22]" style={{ backgroundImage: `url("${project.image}")` }} />}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0805] via-[#0a0805]/80 to-transparent" />
                      <div className="relative z-10 p-4 flex flex-col h-full">
                        <div className="flex justify-between items-start">
                          <div className="rounded-full px-2 py-0.5 border" style={{ backgroundColor: `${inv.color}18`, borderColor: `${inv.color}38` }}>
                            <span className="text-[10px] font-bold" style={{ color: inv.color }}>{inv.irr}% IRR</span>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: inv.color, boxShadow: `0 0 6px ${inv.color}` }} />
                        </div>
                        <div className="mt-auto text-left">
                          <p className="text-[11px] font-bold text-white leading-tight mb-0.5">{inv.shortTitle}</p>
                          <p className="text-[10px] font-mono text-white/35 mb-1">{fmt(inv.invested)} invested</p>
                          <p className="text-[11px] font-bold mb-2.5" style={{ color: inv.color }}>+{fmt(gain)}</p>
                          <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: inv.color }} />
                          </div>
                          <p className="text-[8px] font-mono text-white/20 mt-1">{progress}% funded</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* ── 3. New Opportunities ── */}
            <section className="mb-6">
              <div className="px-5 mb-3.5 flex justify-between items-baseline">
                <div>
                  <h2 className="text-[17px] font-bold text-[#fdfaf5] tracking-tight">New Opportunities</h2>
                  <p className="text-[11px] text-[var(--text-2)] mt-0.5">Open for investment now</p>
                </div>
                <button onClick={() => setActiveTab("Projects")} className="text-[11px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]">see all</button>
              </div>

              <div
                className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory"
                onScroll={e => {
                  const el = e.currentTarget;
                  const idx = Math.round(el.scrollLeft / el.offsetWidth);
                  if (idx !== activeOppsIndex && idx < exploreProjects.length) setActiveOppsIndex(idx);
                }}
              >
                {exploreProjects.map((item) => {
                  const fundedPct = item.raised && item.target ? Math.round((item.raised / item.target) * 100) : 0;
                  return (
                    <div
                      key={item.id}
                      className="w-full shrink-0 snap-center px-5"
                    >
                      <div className="w-full max-w-[480px] mx-auto relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                        {/* Image */}
                        <div className="relative h-[240px] overflow-hidden">
                          {item.gallery?.[0] && (
                            <img src={item.gallery[0]} alt={item.title} className="w-full h-full object-cover" />
                          )}
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 60%, rgba(10,8,5,1) 100%)" }} />
                          {/* Top badges */}
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <div className="flex flex-wrap gap-1.5">
                              {item.badges.slice(0, 2).map((b, i) => <Badge key={i} label={b} />)}
                            </div>
                            {/* IRR callout */}
                            <div className="bg-black/50 backdrop-blur-md border border-emerald-400/30 rounded-xl px-3 py-1.5 text-right">
                              <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest leading-none mb-0.5">IRR</p>
                              <p className="text-[20px] font-bold text-emerald-400 leading-none">{item.irr}%</p>
                            </div>
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="bg-[#0a0805] px-5 pb-5 pt-3">
                          {item.partnerLogos && item.partnerLogos.length > 0 && (
                            <div className="flex gap-2 mb-3 items-center">
                              {item.partnerLogos.map((logo, lIdx) => (
                                <div key={lIdx} className="h-6 bg-white/8 rounded-md px-2 border border-white/10 flex items-center">
                                  <img src={logo} alt="Partner" className="h-5 w-auto object-contain opacity-80" />
                                </div>
                              ))}
                            </div>
                          )}
                          <h3 className="text-[22px] font-bold text-white tracking-tight mb-1 leading-tight">{item.title}</h3>
                          {item.location && (
                            <div className="flex items-center gap-1.5 mb-4 text-[11px] font-mono text-[var(--gold-text)]/55">
                              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              {item.location}
                            </div>
                          )}

                          {/* Metrics */}
                          <div className="grid grid-cols-3 mb-3 rounded-2xl border border-white/6 overflow-hidden">
                            <div className="p-3 text-center">
                              <p className="text-[16px] font-bold text-emerald-400">{item.irr}%</p>
                              <p className="text-[8px] font-mono text-white/30 uppercase tracking-wider mt-0.5">IRR</p>
                            </div>
                            <div className="p-3 text-center border-x border-white/6">
                              <p className="text-[16px] font-bold text-white/70">{fmt(item.minInvestment || 0)}</p>
                              <p className="text-[8px] font-mono text-white/30 uppercase tracking-wider mt-0.5">Min. Invest</p>
                            </div>
                            <div className="p-3 text-center">
                              <p className="text-[16px] font-bold text-white/70">{fundedPct}%</p>
                              <p className="text-[8px] font-mono text-white/30 uppercase tracking-wider mt-0.5">Funded</p>
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="mb-4">
                            <div className="flex justify-between text-[9px] font-mono text-white/25 mb-1.5">
                              <span>₹{item.raised}Cr raised</span>
                              <span>of ₹{item.target}Cr target</span>
                            </div>
                            <div className="h-[3px] bg-white/8 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full" style={{ width: `${fundedPct}%` }} />
                            </div>
                          </div>

                          <button
                            onClick={() => open(item, "project")}
                            className="w-full py-3.5 bg-gradient-to-r from-[var(--gold)] to-amber-500 text-black font-bold text-[13px] rounded-2xl tracking-wide shadow-[0_4px_24px_rgba(251,191,36,0.2)] active:scale-[0.98] transition-transform"
                          >
                            Express Interest
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {exploreProjects.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-400 ${i === activeOppsIndex ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-white/20"}`} />
                ))}
              </div>
            </section>

            {/* ── 4. Member Perks ── */}
            <section className="mb-6">
              <div className="px-5 mb-3.5 flex justify-between items-center">
                <div>
                  <h2 className="text-[17px] font-bold text-[#fdfaf5] tracking-tight">Member Perks</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <svg className="w-3 h-3 text-[var(--gold-text)]/60" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                    </svg>
                    <span className="text-[11px] font-mono text-[var(--gold-text)]/60">{userRewards.points.toLocaleString()} pts · {userRewards.tier}</span>
                  </div>
                </div>
                <button onClick={() => setActiveTab("Benefits")} className="text-[11px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]">see all</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-none px-5 pb-1">
                {homePerks.map((perk, i) => (
                  <motion.button
                    key={perk.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    onClick={() => setActiveTab("Benefits")}
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
                <h2 className="text-[17px] font-bold text-[#fdfaf5] tracking-tight">Upcoming Events</h2>
                <button onClick={() => setActiveTab("Events")} className="text-[11px] font-mono text-[var(--gold-text)]/40 active:text-[var(--gold-text)]">see all</button>
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

        {activeTab === "Events" && <EventsTab />}
        {activeTab === "Projects" && <ProjectsTab />}
        {activeTab === "Benefits" && <BenefitsTab />}

        <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} type={drawerType} />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}
