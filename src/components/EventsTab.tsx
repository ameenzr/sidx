"use client";

import { featuredItems } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { type Item } from "@/lib/mock-data";

const FILTERS = ["All", "Networking", "Investment", "Education"];

const filterMap: Record<string, string[]> = {
  "Networking": ["networking", "summit", "conclave", "meet"],
  "Investment": ["investment", "investor", "partner"],
  "Education": ["education", "edu", "women", "startup"],
};

function parseDateParts(dateStr?: string): { day: string; month: string; time: string } {
  if (!dateStr) return { day: "—", month: "—", time: "" };
  const dayM = dateStr.match(/(\d{1,2})\s+(\w{3})/);
  const timeM = dateStr.match(/·\s*(.+)/);
  return {
    day: dayM?.[1] ?? "—",
    month: dayM?.[2]?.toUpperCase() ?? "—",
    time: timeM?.[1]?.trim() ?? "",
  };
}

export function EventsTab() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? featuredItems
    : featuredItems.filter(e =>
        e.badges.some(b => filterMap[activeFilter]?.some(k => b.toLowerCase().includes(k))) ||
        e.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
        e.description?.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <>
      <div className="flex flex-col min-h-screen pt-20 pb-[110px] text-white">

        {/* Header */}
        <div className="px-6 mb-5">
          <h1 className="text-[28px] font-bold text-[#fdfaf5] tracking-tight mb-1">Events</h1>
          <p className="text-[12px] font-mono text-white/35">{featuredItems.length} exclusive events · members only</p>
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
                  : "bg-white/6 text-white/45 border border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4 px-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => {
              const { day, month, time } = parseDateParts(item.date);
              const isClosingSoon = item.title.toLowerCase().includes("dubai") || item.badges.some(b => b.toLowerCase().includes("closing"));
              const isExclusive = item.badges.some(b => b.toLowerCase().includes("exclusive"));

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.08, duration: 0.36 }}
                  className="rounded-[24px] overflow-hidden border border-white/8 bg-[#0f0c06] shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                >
                  {/* Poster */}
                  {item.image && (
                    <div className="relative h-[190px] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(15,12,6,0.95) 100%)" }} />

                      {/* Date chip */}
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 py-2.5 text-center min-w-[52px]">
                        <p className="text-[22px] font-bold text-white leading-none">{day}</p>
                        <p className="text-[9px] font-mono text-white/55 tracking-[0.18em] mt-0.5">{month}</p>
                      </div>

                      {/* Status badges — top right */}
                      <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
                        {isClosingSoon && (
                          <div className="flex items-center gap-1.5 bg-red-600/25 border border-red-500/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                            <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Closing Soon</span>
                          </div>
                        )}
                        {isExclusive && (
                          <div className="flex items-center gap-1.5 bg-[var(--gold)]/15 border border-[var(--gold)]/35 backdrop-blur-sm rounded-full px-2.5 py-1">
                            <span className="text-[9px] font-bold text-[var(--gold-text)] uppercase tracking-wider">Members Only</span>
                          </div>
                        )}
                      </div>

                      {/* Badges — bottom */}
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                        {item.badges.slice(0, 2).map((b, i) => <Badge key={i} label={b} />)}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-[18px] font-bold text-white tracking-tight mb-1 leading-tight">{item.title}</h3>
                    <p className="text-[12px] text-white/40 mb-3 line-clamp-1 leading-relaxed">{item.description}</p>

                    <div className="flex flex-col gap-1.5 mb-4">
                      {time && (
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--gold-text)]/65">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          {day} {month} · {time}
                        </div>
                      )}
                      {item.venue && (
                        <div className="flex items-center gap-2 text-[11px] font-mono text-white/35">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          {item.venue}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full py-3.5 bg-gradient-to-r from-[var(--gold)] to-amber-500 text-black font-bold text-[13px] rounded-2xl tracking-wide shadow-[0_4px_24px_rgba(251,191,36,0.2)] active:scale-[0.98] transition-transform"
                    >
                      Register Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/25 font-mono text-[13px]">No events in this category.</p>
            </div>
          )}
        </div>
      </div>

      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} type="event" />
    </>
  );
}
