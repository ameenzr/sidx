"use client";

import { featuredItems } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { type Item } from "@/lib/mock-data";

export function EventsTab() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <>
      <div className="flex flex-col min-h-screen pt-24 px-6 pb-[100px] text-white">
        <h1 className="text-3xl font-bold tracking-tight text-[#fdfaf5] mb-2">All Events</h1>
        <p className="text-[13px] text-white/50 mb-8 font-medium">Exclusive experiences for members</p>
        
        <div className="flex flex-col gap-5">
          {featuredItems.map((item, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-left bg-[var(--bg-raised)] border border-[var(--gold)]/10 rounded-2xl overflow-hidden shadow-xl relative group active:scale-[0.98] transition-transform"
            >
              {/* Event Poster Thumbnail */}
              {item.image && (
                <div className="relative h-[140px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b07] via-[#0e0b07]/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex gap-2 flex-wrap">
                    {item.badges?.map((b, i) => <Badge key={i} label={b} />)}
                  </div>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-[16px] font-bold text-white mb-1 tracking-wide">{item.title}</h3>
                <p className="text-[12px] text-white/50 mb-3 line-clamp-1 leading-relaxed">{item.description}</p>
                <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--gold-text)]">
                  {item.date && (
                    <span className="flex items-center gap-1.5 opacity-80">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {item.date}
                    </span>
                  )}
                  {item.venue && (
                    <span className="flex items-center gap-1.5 opacity-60">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      {item.venue}
                    </span>
                  )}
                </div>
              </div>

              {/* Tap hint */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <DetailDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        type="event"
      />
    </>
  );
}
