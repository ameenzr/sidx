"use client";

import { exploreProjects, portfolioInvestments } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { type Item } from "@/lib/mock-data";
import { TabHeader } from "@/components/ui/TabHeader";

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

const FILTERS = ["All", "Open For Investment"];
const investedIds = new Set(portfolioInvestments.map(p => p.projectId));

interface Props { 
  onOpenPortfolio: () => void; 
  onFeedback?: (data: any) => void;
}

export function ProjectsTab({ onOpenPortfolio, onFeedback }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const list =
    activeFilter === "Open For Investment" ? exploreProjects.filter(p => !investedIds.has(p.id)) :
    exploreProjects;

  const openCount = exploreProjects.filter(p => !investedIds.has(p.id)).length;

  return (
    <>
      <div className="flex flex-col min-h-screen text-white overflow-x-hidden">

        {/* ── Lighter Header Section ── */}
        <div 
          className="relative pt-4 pb-8" 
          style={{ 
            background: "linear-gradient(180deg, var(--c-elevated) 0%, var(--c-surface) 100%)",
            borderBottom: "1px solid var(--c-border)"
          }}
        >
          <TabHeader title="Projects" className="mb-3" />

          {/* ── Portfolio button row ── */}
          <div className="px-5">
            <button
              onClick={onOpenPortfolio}
              className="w-full h-[52px] flex items-center justify-between px-5 rounded-2xl bg-[var(--gold)]/8 border border-[var(--gold)]/15 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[var(--gold)]/15 border border-[var(--gold)]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <span className="text-[14px] font-bold text-[var(--gold-text)]">My Portfolio</span>
              </div>
              <svg className="w-4 h-4 text-[var(--gold-text)]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Main Content Area (Rounded Top) ── */}
        <div 
          className="flex-1 bg-[var(--c-base)] rounded-t-[32px] mt-[-22px] pt-7 relative z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.5)] border-t border-white/5 pb-32"
        >
          {/* ── Filter pills ── */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none px-5 pb-5">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-[var(--gold)] text-black shadow-[0_4px_12px_rgba(201,168,76,0.3)]"
                    : "bg-white/5 text-white/40 border border-white/8"
                }`}
              >
                {f === "Open For Investment" ? `Open · ${openCount}` : f}
              </button>
            ))}
          </div>

          {/* ── List ── */}
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {list.map((item, idx) => {
                const fundedPct = item.raised && item.target ? Math.round((item.raised / item.target) * 100) : 0;
                const isHot = item.badges.some(b => b.toLowerCase().includes("hot"));
                const isInvested = investedIds.has(item.id);
                const isLast = idx === list.length - 1;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.28 }}
                    className="relative"
                  >
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full text-left px-5 py-4 active:bg-white/3 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">

                        {/* Left: title + meta */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <p className="text-[15px] font-semibold text-white/90 leading-snug">{item.title}</p>
                            {item.isNew && (
                              <span
                                className="text-[8px] font-black uppercase tracking-wider text-black px-1.5 py-0.5 rounded-sm rotate-[-1deg] shrink-0"
                                style={{
                                  background: "linear-gradient(135deg, #f0d060, #c9a84c)",
                                  boxShadow: "0 1px 4px rgba(201,168,76,0.5)",
                                }}
                              >New</span>
                            )}
                            {isInvested && (
                              <span className="text-[8px] font-bold text-[var(--gold-text)] border border-[var(--gold)]/30 px-1.5 py-0.5 rounded-full shrink-0">Invested</span>
                            )}
                            {isHot && !isInvested && (
                              <span className="text-[8px] font-bold text-orange-400 shrink-0 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-orange-400 inline-block" />Hot
                              </span>
                            )}
                          </div>

                          {/* Meta line */}
                          <p className="text-[10px] font-mono text-white/30 leading-snug">
                            {[
                              item.location?.split(",")[0],
                              item.tenure,
                              item.minInvestment ? `Min ${fmt(item.minInvestment)}` : null,
                            ].filter(Boolean).join(" · ")}
                          </p>

                          {/* Deadline */}
                          {item.deadline && (
                            <p className="text-[9px] font-mono text-red-400/80 mt-1 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse inline-block" />
                              Closes {item.deadline}
                            </p>
                          )}

                          {/* Progress bar */}
                          {item.raised !== undefined && item.target !== undefined && (
                            <div className="mt-2.5 flex items-center gap-2">
                              <div className="flex-1 h-[2px] bg-white/8 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${fundedPct}%` }}
                                  transition={{ duration: 1, ease: "easeOut", delay: idx * 0.07 + 0.1 }}
                                  className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                                />
                              </div>
                              <span className="text-[8px] font-mono text-white/30 shrink-0">{fundedPct}%</span>
                            </div>
                          )}
                        </div>

                        {/* Right: IRR */}
                        <div className="text-right shrink-0">
                          <p className="text-[22px] font-bold text-emerald-400 leading-none">{item.irr}%</p>
                          <p className="text-[7px] font-mono text-white/25 uppercase tracking-widest mt-0.5">IRR</p>
                        </div>
                      </div>
                    </button>

                    {/* Fading divider */}
                    {!isLast && (
                      <div
                        className="mx-5 h-px"
                        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 100%)" }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {list.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/22 font-mono text-[13px]">No projects in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} type="project" onFeedback={onFeedback} />
    </>
  );
}
