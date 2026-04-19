"use client";

import { featuredItems } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { type Item } from "@/lib/mock-data";
import { FeedbackData } from "@/components/ActionFeedback";

const FILTERS = ["All", "Networking", "Investment", "Exclusive"];

const filterMap: Record<string, string[]> = {
  Networking: ["networking", "summit", "conclave", "meet"],
  Investment: ["investment", "investor", "partner", "healthcare"],
  Exclusive: ["exclusive", "members", "site visit"],
};

function parseDateParts(dateStr?: string) {
  if (!dateStr) return { day: "—", month: "—", weekday: "", time: "" };
  const dayM = dateStr.match(/(\w{3}),\s*(\d{1,2})\s+(\w{3})/);
  const dayM2 = dateStr.match(/(\d{1,2})\s+(\w{3})/);
  const timeM = dateStr.match(/·\s*(.+)/);
  return {
    weekday: dayM?.[1] ?? "",
    day: dayM?.[2] ?? dayM2?.[1] ?? "—",
    month: (dayM?.[3] ?? dayM2?.[2] ?? "—").toUpperCase(),
    time: timeM?.[1]?.trim() ?? "",
  };
}

interface Props { 
  onBack: () => void;
  onFeedback?: (data: FeedbackData) => void;
}

export function EventsScreen({ onBack, onFeedback }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? featuredItems
    : featuredItems.filter(e =>
        e.badges.some(b => filterMap[activeFilter]?.some(k => b.toLowerCase().includes(k))) ||
        e.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
        e.description?.toLowerCase().includes(activeFilter.toLowerCase())
      );

  const [hero, ...rest] = filtered;

  return (
    <>
      <div className="flex flex-col min-h-screen pt-[56px] pb-24 text-white relative">

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, var(--c-elevated) 0%, var(--c-surface) 40%, var(--c-base) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 20% 5%, rgba(201,168,76,0.07), transparent 55%)" }} />
        </div>

        <div className="relative z-10">

          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none px-5 pt-4 mb-5 pb-1">
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

          <AnimatePresence mode="popLayout">

            {/* ── Hero featured event ── */}
            {hero && (
              <motion.div
                key={hero.id + "-hero"}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.38 }}
                className="mx-5 mb-4"
              >
                {/* Tall cinematic image */}
                <button
                  onClick={() => setSelectedItem(hero)}
                  className="w-full h-[300px] rounded-[24px] overflow-hidden relative border border-white/8 active:scale-[0.99] transition-transform block mb-0"
                >
                  {hero.image && (
                    <img src={hero.image} alt={hero.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(4,2,1,0.45) 50%, rgba(4,2,1,0.97) 100%)" }} />

                  {/* Top row */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    {/* Date pill */}
                    {(() => { const { day, month, weekday } = parseDateParts(hero.date); return (
                      <div className="bg-black/55 backdrop-blur-md border border-white/15 rounded-2xl px-3 py-2 text-center min-w-[48px]">
                        {weekday && <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-0.5">{weekday}</p>}
                        <p className="text-[24px] font-bold text-white leading-none">{day}</p>
                        <p className="text-[9px] font-mono text-white/50 tracking-[0.18em] mt-0.5">{month}</p>
                      </div>
                    ); })()}
                    {/* Badges top-right */}
                    <div className="flex flex-col gap-1 items-end">
                      {hero.badges.some(b => b.toLowerCase().includes("closing")) && (
                        <div className="flex items-center gap-1.5 bg-red-600/25 border border-red-500/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Closing Soon</span>
                        </div>
                      )}
                      {hero.badges.some(b => b.toLowerCase().includes("exclusive")) && (
                        <div className="bg-[var(--gold)]/15 border border-[var(--gold)]/35 backdrop-blur-sm rounded-full px-2.5 py-1">
                          <span className="text-[9px] font-bold text-[var(--gold-text)] uppercase tracking-wider">Members Only</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[9px] font-mono text-[var(--gold-text)]/55 uppercase tracking-[0.28em] mb-1.5">Featured Event</p>
                    <h2 className="text-[21px] font-bold text-white leading-tight mb-2.5">{hero.title}</h2>
                    <p className="text-[11px] text-white/45 leading-relaxed mb-3 line-clamp-2">{hero.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        {hero.date && (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-[var(--gold-text)]/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="text-[10px] font-mono text-[var(--gold-text)]/60">{hero.date}</span>
                          </div>
                        )}
                        {hero.venue && (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span className="text-[10px] font-mono text-white/35 truncate max-w-[180px]">{hero.venue}</span>
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 bg-[var(--gold)] text-black text-[11px] font-bold px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(201,168,76,0.35)] active:scale-95 transition-transform">
                        Register
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            )}

            {/* ── Remaining events — compact rows ── */}
            {rest.length > 0 && (
              <motion.div
                key="rest-list"
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mx-5 rounded-[20px] overflow-hidden border border-white/7 bg-[#0c0905]"
              >
                {rest.map((ev, i) => {
                  const { day, month, time } = parseDateParts(ev.date);
                  const isClosing = ev.badges.some(b => b.toLowerCase().includes("closing"));
                  const isExclusive = ev.badges.some(b => b.toLowerCase().includes("exclusive"));
                  const accentColor = isClosing ? "#f87171" : isExclusive ? "#e8c97a" : "#818cf8";

                  return (
                    <motion.button
                      key={ev.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.26 }}
                      onClick={() => setSelectedItem(ev)}
                      className={`w-full flex items-stretch text-left active:bg-white/4 transition-colors ${i < rest.length - 1 ? "border-b border-white/5" : ""}`}
                    >
                      {/* Left accent bar */}
                      <div className="w-[3px] shrink-0 my-3 ml-4 rounded-full" style={{ backgroundColor: accentColor }} />

                      {/* Thumbnail */}
                      <div className="shrink-0 w-[72px] h-[72px] my-3 ml-3 rounded-[14px] overflow-hidden bg-white/5">
                        {ev.image && <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 py-3.5 pl-3 pr-2">
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <p className="text-[13px] font-bold text-white/88 leading-tight line-clamp-1 flex-1">{ev.title}</p>
                          {/* Date */}
                          <div className="shrink-0 text-right ml-2">
                            <p className="text-[14px] font-bold text-white/70 leading-none">{day}</p>
                            <p className="text-[8px] font-mono text-white/30 tracking-wider">{month}</p>
                          </div>
                        </div>
                        {ev.description && (
                          <p className="text-[10px] text-white/35 leading-snug line-clamp-1 mb-1.5">{ev.description}</p>
                        )}
                        <div className="flex items-center gap-3">
                          {ev.venue && (
                            <div className="flex items-center gap-1 min-w-0">
                              <svg className="w-2.5 h-2.5 text-white/25 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              <span className="text-[9px] font-mono text-white/28 truncate">{ev.venue.split(",")[0]}</span>
                            </div>
                          )}
                          {time && (
                            <span className="text-[9px] font-mono shrink-0" style={{ color: accentColor + "cc" }}>{time}</span>
                          )}
                          {isClosing && (
                            <span className="text-[8px] font-bold text-red-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse inline-block" />Closing
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Chevron */}
                      <div className="flex items-center pr-4 pl-1">
                        <svg className="w-3 h-3 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}

            {filtered.length === 0 && (
              <motion.div key="empty" className="text-center py-20 px-5">
                <p className="text-white/25 font-mono text-[13px]">No events in this category.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} type="event" onFeedback={onFeedback} />
    </>
  );
}
