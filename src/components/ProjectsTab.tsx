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

const FILTERS = ["Open", "All"];

const investedIds = new Set(portfolioInvestments.map(p => p.projectId));

interface Props { onOpenPortfolio: () => void; }

export function ProjectsTab({ onOpenPortfolio }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeFilter, setActiveFilter] = useState("Open");

  const list =
    activeFilter === "Open" ? exploreProjects.filter(p => !investedIds.has(p.id)) :
    exploreProjects;

  const openCount = exploreProjects.filter(p => !investedIds.has(p.id)).length;

  return (
    <>
      <div className="flex flex-col min-h-screen pt-4 pb-32 text-white">

        {/* ── Header ── */}
        <TabHeader title="Projects" subtitle={`${openCount} open`} />

        {/* ── Portfolio button row ── */}
        <div className="pt-3 pb-3">
          <button
            onClick={onOpenPortfolio}
            className="w-full flex items-center justify-center gap-2 bg-[var(--gold)]/10 border border-[var(--gold)]/25 rounded-none py-2.5 active:bg-[var(--gold)]/18 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
            </svg>
            <span className="text-[16px] font-display font-bold text-[var(--gold-text)]/90 tracking-tight">My Portfolio</span>
            <svg className="w-3 h-3 text-[var(--gold-text)]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-5 pb-4">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                activeFilter === f
                  ? "bg-[var(--gold)] text-black"
                  : "bg-white/5 text-white/40 border border-white/8"
              }`}
            >
              {f === "Open" ? `Open · ${openCount}` : f}
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

      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} type="project" />
    </>
  );
}
