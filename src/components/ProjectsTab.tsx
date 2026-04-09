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

const FILTERS = ["All", "Real Estate", "Startups", "Consumer"];

const filterMap: Record<string, string[]> = {
  "Real Estate": ["real estate", "hotel", "apartment", "residences"],
  "Startups": ["startup", "tech", "consumer tech", "skincare"],
  "Consumer": ["consumer", "consumer tech", "brand"],
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
          <h1 className="text-[28px] font-bold text-[#fdfaf5] tracking-tight mb-1">Investment Deals</h1>
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
        <div className="flex flex-col gap-5 px-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => {
              const fundedPct = item.raised && item.target ? Math.round((item.raised / item.target) * 100) : 0;
              const isHot = item.badges.some(b => b.toLowerCase() === "hot");
              const isClosing = fundedPct >= 70;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.08, duration: 0.38 }}
                  className="rounded-[24px] overflow-hidden border border-white/8 bg-[#0f0c06] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                >
                  {/* Image banner */}
                  <div className="relative h-[210px] overflow-hidden">
                    <img
                      src={item.gallery?.[0] || item.image || ""}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(15,12,6,0.95) 100%)" }} />

                    {/* IRR badge — top right */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-emerald-400/30 rounded-2xl px-3.5 py-2 text-right">
                      <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">IRR</p>
                      <p className="text-[24px] font-bold text-emerald-400 leading-none">{item.irr}%</p>
                    </div>

                    {/* Status indicators — top left */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      {isHot && (
                        <div className="flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-wider">Hot Deal</span>
                        </div>
                      )}
                      {isClosing && (
                        <div className="flex items-center gap-1.5 bg-red-600/20 border border-red-500/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Filling Fast</span>
                        </div>
                      )}
                    </div>

                    {/* Badges — bottom */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {item.badges.slice(0, 2).map((b, i) => <Badge key={i} label={b} />)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Partner logos */}
                    {item.partnerLogos && item.partnerLogos.length > 0 && (
                      <div className="flex gap-2 mb-3 items-center flex-wrap">
                        {item.partnerLogos.map((logo, lIdx) => (
                          <div key={lIdx} className="h-7 bg-white/8 rounded-lg px-2.5 border border-white/10 flex items-center">
                            <img src={logo} alt="Partner" className="h-5 w-auto object-contain opacity-80" />
                          </div>
                        ))}
                      </div>
                    )}

                    <h3 className="text-[20px] font-bold text-white tracking-tight mb-1 leading-tight">{item.title}</h3>

                    {item.location && (
                      <div className="flex items-center gap-1.5 mb-3 text-[11px] font-mono text-[var(--gold-text)]/55">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {item.location}
                      </div>
                    )}

                    <p className="text-[12px] text-white/40 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 mb-4 rounded-2xl border border-white/6 overflow-hidden bg-white/[0.02]">
                      <div className="p-3 text-center">
                        <p className="text-[16px] font-bold text-emerald-400">{item.irr}%</p>
                        <p className="text-[8px] font-mono text-white/28 uppercase tracking-wider mt-0.5">IRR</p>
                      </div>
                      <div className="p-3 text-center border-x border-white/6">
                        <p className="text-[16px] font-bold text-white/70">{fmt(item.minInvestment || 0)}</p>
                        <p className="text-[8px] font-mono text-white/28 uppercase tracking-wider mt-0.5">Min. Invest</p>
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-[16px] font-bold text-white/70">₹{item.target}Cr</p>
                        <p className="text-[8px] font-mono text-white/28 uppercase tracking-wider mt-0.5">Target</p>
                      </div>
                    </div>

                    {/* Funding progress */}
                    {item.raised !== undefined && item.target !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1.5">
                          <span>₹{item.raised}Cr raised</span>
                          <span className="font-bold text-[var(--gold-text)]/60">{fundedPct}% funded</span>
                        </div>
                        <div className="h-[4px] bg-white/8 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${fundedPct}%` }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 + 0.2 }}
                            className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full py-3.5 bg-gradient-to-r from-[var(--gold)] to-amber-500 text-black font-bold text-[13px] rounded-2xl tracking-wide shadow-[0_4px_24px_rgba(251,191,36,0.2)] active:scale-[0.98] transition-transform"
                    >
                      Express Interest
                    </button>
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
