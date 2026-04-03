"use client";

import { exploreProjects } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { type Item } from "@/lib/mock-data";

export function ProjectsTab() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <>
      <div className="flex flex-col min-h-screen pt-24 px-6 pb-[100px] text-white">
        <h1 className="text-3xl font-bold tracking-tight text-[#fdfaf5] mb-2">Latest Projects</h1>
        <p className="text-[13px] text-white/50 mb-8 font-medium">Curated high-yield opportunities</p>
        
        <div className="flex flex-col gap-7">
          {exploreProjects.map((item, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.12 }}
              className="text-left bg-[var(--bg-raised)] border border-[var(--gold)]/10 rounded-2xl overflow-hidden shadow-xl relative group active:scale-[0.98] transition-transform"
            >
              {/* Gallery Banner */}
              {item.gallery?.[0] && (
                <div className="relative h-[185px] overflow-hidden">
                  <img
                    src={item.gallery[0]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b07] via-[#0e0b07]/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex gap-2 flex-wrap">
                    {item.badges?.slice(0, 2).map((b, i) => <Badge key={i} label={b} />)}
                  </div>
                  {/* IRR Callout */}
                  {item.irr && (
                    <div className="absolute top-3 right-3 bg-black/50 border border-[var(--gold)]/20 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-right">
                      <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest">IRR</p>
                      <p className="text-[15px] font-bold text-[var(--gold-text)]">{item.irr}%</p>
                    </div>
                  )}
                </div>
              )}

              <div className="p-4">
                <h3 className="text-[18px] font-bold text-white mb-1.5 tracking-tight">{item.title}</h3>
                <p className="text-[12px] text-white/50 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

                {/* Compact Funding Progress */}
                {item.raised && item.target && (
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1">
                      <span>₹{item.raised}Cr raised</span>
                      <span>Goal ₹{item.target}Cr</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((item.raised / item.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                  {item.minInvestment && (
                    <span className="text-[10px] font-mono text-white/30">
                      Min ₹{((item.minInvestment) / 100000).toFixed(0)}L
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="text-[10px] font-mono text-[var(--gold-text)] opacity-70">View Details</span>
                    <svg className="w-3.5 h-3.5 text-[var(--gold-text)] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <DetailDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        type="project"
      />
    </>
  );
}
