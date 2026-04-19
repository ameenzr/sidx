"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabHeader } from "@/components/ui/TabHeader";

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

interface ServiceCard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  accentColor: string;
  accentBg: string;
  badge?: string;
  features: string[];
  destinations?: string[];
  cta: string;
  note?: string;
  icon: React.ReactNode;
}

/* ═══════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════ */

const Icon = {
  plane: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  ),
  hotel: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  palm: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h1m20 0h1M4.22 19.778l.707-.707M18.364 5.636l.707-.707M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
  ),
  passport: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════
   TRAVEL SERVICE DATA
   ═══════════════════════════════════════════════════ */

const services: ServiceCard[] = [
  {
    id: "holiday",
    category: "Leisure",
    title: "Book a Holiday",
    subtitle: "Curated Kerala & international packages for NRK families",
    accentColor: "#4ade80",
    accentBg: "rgba(74,222,128,0.10)",
    badge: "Popular",
    features: [
      "Alleppey backwater houseboat stays",
      "Munnar tea estate retreats",
      "Wayanad jungle lodges",
      "Lakshadweep island packages",
      "Southeast Asia & Europe NRK specials",
    ],
    destinations: ["Alleppey", "Munnar", "Wayanad", "Lakshadweep", "Dubai", "Singapore"],
    cta: "Browse Packages",
    note: "Exclusive pricing for Sid-X members",
    icon: Icon.palm,
  },
  {
    id: "hotel",
    category: "Accommodation",
    title: "Book a Hotel / Resort",
    subtitle: "Premium stays across Kerala & Gulf cities",
    accentColor: "#c9a84c",
    accentBg: "rgba(201,168,76,0.10)",
    badge: "Best Value",
    features: [
      "Leela Kovalam & Raviz Ashtamudi",
      "Taj Gateway Calicut & Kochi",
      "CGH Earth properties across Kerala",
      "Airport-adjacent hotels near COK, CCJ, TRV",
      "NRK homecoming rates — up to 30% off",
    ],
    destinations: ["Kochi", "Calicut", "Thiruvananthapuram", "Thrissur", "Dubai", "Muscat"],
    cta: "Find Stays",
    note: "Free breakfast for Sid-X members",
    icon: Icon.hotel,
  },
  {
    id: "flight",
    category: "Flights",
    title: "Flight Ticket",
    subtitle: "Direct & connecting flights from Gulf, UK & EU to Kerala",
    accentColor: "#60a5fa",
    accentBg: "rgba(96,165,250,0.10)",
    features: [
      "Air India & IndiGo NRK special fares",
      "Emirates & Oman Air codeshares via DXB/MCT",
      "Gulf Air connections through Bahrain",
      "Direct UK–Calicut (CCJ) charter routes",
      "Group bookings for festivals & family visits",
    ],
    destinations: ["COK · Kochi", "CCJ · Calicut", "TRV · Trivandrum"],
    cta: "Search Flights",
    note: "Priority baggage for 2-piece allowance routes",
    icon: Icon.plane,
  },
  {
    id: "visa",
    category: "Documentation",
    title: "Visa Assistance",
    subtitle: "End-to-end visa support for Kerala NRIs",
    accentColor: "#f472b6",
    accentBg: "rgba(244,114,182,0.10)",
    badge: "Expert Help",
    features: [
      "India OCI/PIO card renewal guidance",
      "UAE, Qatar & Kuwait re-entry visa support",
      "Schengen & UK visa document checklist",
      "Tourist & long-stay visa for Europe & SEA",
      "Emergency 24h visa assistance service",
    ],
    destinations: ["UAE", "Qatar", "Kuwait", "UK", "Germany", "Canada"],
    cta: "Get Assistance",
    note: "Average processing: 3–5 business days",
    icon: Icon.passport,
  },
];

/* ═══════════════════════════════════════════════════
   EXPANDABLE SERVICE CARD
   ═══════════════════════════════════════════════════ */

function ServiceCardItem({ svc }: { svc: ServiceCard }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[22px] overflow-hidden border border-white/8"
      style={{ background: `linear-gradient(145deg, ${svc.accentBg} 0%, var(--c-card) 100%)` }}
    >
      <div className="h-[2.5px] w-full" style={{ background: `linear-gradient(90deg, ${svc.accentColor}, transparent)` }} />
      <button
        className="w-full text-left p-4 flex items-start gap-3.5 active:opacity-80 transition-opacity"
        onClick={() => setOpen(o => !o)}
      >
        <div
          className="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center border"
          style={{ backgroundColor: svc.accentBg, borderColor: `${svc.accentColor}35`, color: svc.accentColor }}
        >
          {svc.icon}
        </div>
        <div className="flex-1 min-w-0">
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-[16px] font-display font-bold text-white/90 tracking-tight leading-none">{svc.title}</p>
        </div>
        </div>
        <svg
          className="shrink-0 w-4 h-4 text-white/25 mt-0.5 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4">
              <div className="w-full h-[1px] bg-white/6 mb-3" />
              <div className="flex flex-col gap-1.5 mb-3.5">
                {svc.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: `${svc.accentColor}90` }} />
                    <span className="text-[10px] text-white/55 leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
              {svc.destinations && (
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {svc.destinations.map(d => (
                    <span key={d} className="text-[8px] font-mono px-2 py-0.5 rounded-full border"
                      style={{ color: `${svc.accentColor}cc`, borderColor: `${svc.accentColor}30`, backgroundColor: `${svc.accentColor}10` }}
                    >{d}</span>
                  ))}
                </div>
              )}
              {svc.note && <p className="text-[8px] font-mono text-white/25 mb-3">{svc.note}</p>}
              <button
                className="w-full py-2.5 rounded-[14px] text-[10px] font-bold tracking-wide transition-opacity active:opacity-75"
                style={{ backgroundColor: `${svc.accentColor}18`, color: svc.accentColor, border: `1px solid ${svc.accentColor}35` }}
              >
                {svc.cta} →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN TAB
   ═══════════════════════════════════════════════════ */

interface TravelTabProps {
  onOpenAirports?: () => void;
}

export function TravelTab({ onOpenAirports }: TravelTabProps) {
  return (
    <div className="flex flex-col w-full pb-32 pt-4">
      {/* ── Header ── */}
      <TabHeader title="Travel Services" />

      {/* ── Airport Services Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35 }}
        className="px-5 mb-6"
      >
        <button
          onClick={onOpenAirports}
          className="w-full rounded-[20px] border border-white/10 overflow-hidden relative active:scale-[0.98] transition-transform"
          style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(201,168,76,0.06) 50%, rgba(74,222,128,0.05) 100%)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #60a5fa, #c9a84c, #4ade80)" }} />
          <div className="flex items-center gap-4 p-4">
            {/* Single Airport icon */}
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0"
              style={{ borderColor: "rgba(96,165,250,0.3)", backgroundColor: "rgba(96,165,250,0.15)", color: "#60a5fa" }}
            >
              {Icon.plane}
            </div>
            <div className="flex-1 text-left flex flex-col justify-center">
              <p className="text-[16px] font-display font-bold text-white/90 tracking-tight leading-none">Airport Services</p>
            </div>
            <svg className="w-5 h-5 text-white/25 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </button>
      </motion.div>

      {/* ── Travel Service Cards ── */}
      <div className="px-5 flex flex-col gap-3">
        {services.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 + 0.15, duration: 0.36 }}
          >
            <ServiceCardItem svc={svc} />
          </motion.div>
        ))}
      </div>

      {/* ── Bottom note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mx-5 mt-6 rounded-2xl border border-white/6 bg-white/[0.02] p-4 flex items-start gap-3"
      >
        <svg className="w-4 h-4 text-[var(--gold-text)]/50 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-[10px] text-white/30 leading-relaxed">
          All bookings are managed by Sid-X concierge partners. Prices and availability are indicative. A concierge will confirm within 2 hours of inquiry.
        </p>
      </motion.div>
    </div>
  );
}
