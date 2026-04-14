"use client";

import { exploreProjects } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { type Item } from "@/lib/mock-data";

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

const FILTERS = ["All", "Tourism", "Residential", "Healthcare", "Commercial"];

const filterMap: Record<string, string[]> = {
  "Tourism": ["agri-tourism", "eco", "tourism", "flagship"],
  "Residential": ["residential", "premium", "villa"],
  "Healthcare": ["healthcare"],
  "Commercial": ["commercial", "convention", "retail"],
};

export function ProjectsTab() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? exploreProjects
    : exploreProjects.filter(p =>
        p.badges.some(b =>
          filterMap[activeFilter]?.some(k => b.toLowerCase().includes(k))
        ) || p.title.toLowerCase().includes(activeFilter.toLowerCase())
      );

  const avgIRR = (exploreProjects.reduce((s, p) => s + (p.irr || 0), 0) / exploreProjects.length).toFixed(1);
  const totalTarget = exploreProjects.reduce((s, p) => s + (p.target || 0), 0);

  return (
    <>
      <div className="flex flex-col min-h-screen pt-20 pb-[110px] text-white">

        {/* Header */}
        <div className="px-6 mb-5">
          <h1 className="text-[28px] font-bold text-[var(--c-text-h)] tracking-tight mb-1">Investment Deals</h1>
          <p className="text-[12px] font-mono text-white/35">
            ₹{totalTarget}Cr across {exploreProjects.length} active deals · avg {avgIRR}% IRR
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-6 mb-5 pb-1">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                activeFilter === f
                  ? "bg-[var(--gold)] text-black shadow-[0_4px_16px_rgba(251,191,36,0.3)]"
                  : "bg-white/6 text-white/45 border border-white/10 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3.5 px-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => {
              const fundedPct = item.raised && item.target ? Math.round((item.raised / item.target) * 100) : 0;
              const isHot = item.badges.some(b => b.toLowerCase().includes("hot"));
              const isClosing = fundedPct >= 70;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.08, duration: 0.38 }}
                  onClick={() => setSelectedItem(item)}
                  className="rounded-[20px] overflow-hidden border border-white/8 bg-[var(--c-card)] shadow-[0_8px_40px_rgba(0,0,0,0.5)] active:scale-[0.99] transition-transform cursor-pointer"
                >
                  {/* Image banner */}
                  <div className="relative h-[160px] overflow-hidden">
                    <img
                      src={item.gallery?.[0] || item.image || ""}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 img-fade-overlay" />

                    {/* IRR badge — top right */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-emerald-400/30 rounded-xl px-2.5 py-1.5 text-right">
                      <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest leading-none mb-0.5">IRR</p>
                      <p className="text-[18px] font-bold text-emerald-400 leading-none">{item.irr}%</p>
                    </div>

                    {/* Status indicators — top left */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {isHot && (
                        <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                          <span className="w-1 h-1 rounded-full bg-orange-400" />
                          <span className="text-[8px] font-bold text-orange-400 uppercase tracking-wider">Hot Deal</span>
                        </div>
                      )}
                      {isClosing && (
                        <div className="flex items-center gap-1 bg-red-600/20 border border-red-500/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                          <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-[8px] font-bold text-red-400 uppercase tracking-wider">Filling Fast</span>
                        </div>
                      )}
                    </div>

                    {/* Badges — bottom */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {item.badges.slice(0, 2).map((b, i) => <Badge key={i} label={b} />)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pt-3.5 pb-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-[17px] font-bold text-white tracking-tight leading-tight">{item.title}</h3>
                      {item.location && (
                        <span className="text-[10px] font-mono text-[var(--gold-text)]/50 text-right shrink-0 mt-0.5 max-w-[40%] leading-tight">{item.location.split(",")[0]}</span>
                      )}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 mb-3 rounded-xl border border-white/6 overflow-hidden bg-white/[0.02]">
                      <div className="py-2 text-center">
                        <p className="text-[14px] font-bold text-emerald-400">{item.irr}%</p>
                        <p className="text-[7px] font-mono text-white/28 uppercase tracking-wider">IRR</p>
                      </div>
                      <div className="py-2 text-center border-x border-white/6">
                        <p className="text-[14px] font-bold text-white/70">{fmt(item.minInvestment || 0)}</p>
                        <p className="text-[7px] font-mono text-white/28 uppercase tracking-wider">Min.</p>
                      </div>
                      <div className="py-2 text-center">
                        <p className="text-[14px] font-bold text-white/70">₹{item.target}Cr</p>
                        <p className="text-[7px] font-mono text-white/28 uppercase tracking-wider">Target</p>
                      </div>
                    </div>

                    {/* Funding progress */}
                    {item.raised !== undefined && item.target !== undefined && (
                      <div>
                        <div className="flex justify-between text-[9px] font-mono text-white/30 mb-1">
                          <span>₹{item.raised}Cr raised</span>
                          <span className="text-[var(--gold-text)]/60">{fundedPct}% funded</span>
                        </div>
                        <div className="h-[3px] bg-white/8 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${fundedPct}%` }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 + 0.2 }}
                            className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/25 font-mono text-[13px]">No deals in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} type="project" />
    </>
  );
}
