"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

interface AirportService {
  id: string;
  title: string;
  tagline: string;
  accentColor: string;
}

interface Airport {
  code: string;
  name: string;
  fullName: string;
  region: "kerala" | "gcc" | "international";
  color: string;
  services: AirportService[];
}

/* ═══════════════════════════════════════════════════
   AIRPORT DATABASE
   ═══════════════════════════════════════════════════ */

const airports: Airport[] = [
  /* ── Kerala ── */
  {
    code: "COK", name: "Kochi", fullName: "Cochin International Airport (CIAL)", region: "kerala", color: "#60a5fa",
    services: [
      { id: "concierge", title: "Personal Airport Concierge", tagline: "Meet-and-assist, fast-track immigration, VIP escort", accentColor: "#60a5fa" },
      { id: "lounge", title: "CIAL Executive Lounge", tagline: "Complimentary meals, Wi-Fi, shower & rest area", accentColor: "#c9a84c" },
      { id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "All Kerala districts — pre-scheduled for arrival", accentColor: "#4ade80" },
      { id: "porter", title: "Priority Porter Service", tagline: "Dedicated baggage handling curb-to-check-in", accentColor: "#a78bfa" },
      { id: "forex", title: "Forex & SIM Counter", tagline: "Pre-ordered currency & Jio/Airtel NRK SIMs at gate", accentColor: "#fb923c" },
    ],
  },
  {
    code: "CCJ", name: "Calicut", fullName: "Calicut International Airport (Karipur)", region: "kerala", color: "#4ade80",
    services: [
      { id: "concierge", title: "Personal Airport Concierge", tagline: "Meet-and-greet, wheelchair assist, fast-track", accentColor: "#4ade80" },
      { id: "lounge", title: "CCJ Café Lounge", tagline: "Snacks, beverages & quiet rest zone before boarding", accentColor: "#c9a84c" },
      { id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "Malappuram, Kannur, Wayanad & all north Kerala", accentColor: "#60a5fa" },
      { id: "cargo", title: "Excess Baggage Cargo", tagline: "Door-delivery for unaccompanied luggage & gifts", accentColor: "#f472b6" },
    ],
  },
  {
    code: "TRV", name: "Trivandrum", fullName: "Trivandrum International Airport", region: "kerala", color: "#c9a84c",
    services: [
      { id: "concierge", title: "Personal Airport Concierge", tagline: "VIP meet-and-assist for Gulf & UK arrivals", accentColor: "#c9a84c" },
      { id: "lounge", title: "TRV Premier Lounge", tagline: "Premium lounge with Kerala cuisine & shower", accentColor: "#60a5fa" },
      { id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "Kollam, Pathanamthitta, Kottayam & south Kerala", accentColor: "#4ade80" },
      { id: "medical", title: "Medical Escort Service", tagline: "Paramedic-assisted transit for elderly passengers", accentColor: "#f87171" },
      { id: "dutyfree", title: "Duty-Free Pre-Order", tagline: "Reserve & collect at departure — member pricing", accentColor: "#a78bfa" },
    ],
  },
  {
    code: "CNN", name: "Kannur", fullName: "Kannur International Airport", region: "kerala", color: "#34d399",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Meet-and-assist for Malabar NRK arrivals", accentColor: "#34d399" },
      { id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "Kannur, Kasaragod, Wayanad districts", accentColor: "#60a5fa" },
      { id: "cargo", title: "Excess Baggage Cargo", tagline: "Gulf return baggage delivery to doorstep", accentColor: "#f472b6" },
    ],
  },
  /* ── GCC ── */
  {
    code: "DXB", name: "Dubai", fullName: "Dubai International Airport", region: "gcc", color: "#f59e0b",
    services: [
      { id: "concierge", title: "Premium Concierge", tagline: "Fast-track immigration & dedicated escort", accentColor: "#f59e0b" },
      { id: "lounge", title: "Marhaba Lounge Access", tagline: "Complimentary entry for Sid-X Gold members", accentColor: "#c9a84c" },
      { id: "pickup", title: "Airport Transfer", tagline: "Sedan & SUV transfers across Dubai & Sharjah", accentColor: "#60a5fa" },
      { id: "cargo", title: "Cargo & Courier", tagline: "Unaccompanied baggage to Kerala — door delivery", accentColor: "#4ade80" },
      { id: "forex", title: "Forex Pre-Order", tagline: "INR at competitive rates — collect at terminal", accentColor: "#fb923c" },
    ],
  },
  {
    code: "AUH", name: "Abu Dhabi", fullName: "Zayed International Airport", region: "gcc", color: "#818cf8",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Meet-and-assist at Terminal A & departures", accentColor: "#818cf8" },
      { id: "lounge", title: "Al Dhabi Lounge", tagline: "Buffet dining, shower suites & prayer room", accentColor: "#c9a84c" },
      { id: "pickup", title: "Airport Transfer", tagline: "Abu Dhabi, Al Ain & Dubai cross-emirate transfers", accentColor: "#60a5fa" },
    ],
  },
  {
    code: "SHJ", name: "Sharjah", fullName: "Sharjah International Airport", region: "gcc", color: "#f472b6",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Air Arabia & charter flight assistance", accentColor: "#f472b6" },
      { id: "pickup", title: "Airport Transfer", tagline: "Sharjah, Ajman & northern emirates coverage", accentColor: "#60a5fa" },
      { id: "cargo", title: "Cargo & Courier", tagline: "Excess baggage shipping to Kerala addresses", accentColor: "#4ade80" },
    ],
  },
  {
    code: "DOH", name: "Doha", fullName: "Hamad International Airport", region: "gcc", color: "#e879f9",
    services: [
      { id: "concierge", title: "Premium Concierge", tagline: "Qatar Airways premium check-in & escort", accentColor: "#e879f9" },
      { id: "lounge", title: "Al Mourjan Lounge", tagline: "World-class lounge with à la carte dining", accentColor: "#c9a84c" },
      { id: "pickup", title: "Airport Transfer", tagline: "Doha, Al Khor & Industrial Area coverage", accentColor: "#60a5fa" },
    ],
  },
  {
    code: "MCT", name: "Muscat", fullName: "Muscat International Airport", region: "gcc", color: "#2dd4bf",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Oman Air priority check-in & meet-and-greet", accentColor: "#2dd4bf" },
      { id: "pickup", title: "Airport Transfer", tagline: "Muscat, Sohar, Salalah & all Oman governorates", accentColor: "#60a5fa" },
      { id: "cargo", title: "Cargo & Courier", tagline: "Household & personal items to Kerala — sea & air", accentColor: "#f472b6" },
    ],
  },
  {
    code: "BAH", name: "Bahrain", fullName: "Bahrain International Airport", region: "gcc", color: "#fb7185",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Gulf Air priority boarding & meet-and-assist", accentColor: "#fb7185" },
      { id: "lounge", title: "Pearl Lounge", tagline: "Complimentary access with meal & Wi-Fi", accentColor: "#c9a84c" },
      { id: "pickup", title: "Airport Transfer", tagline: "Sedan transfers across Bahrain island", accentColor: "#60a5fa" },
    ],
  },
  {
    code: "KWI", name: "Kuwait", fullName: "Kuwait International Airport", region: "gcc", color: "#38bdf8",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Terminal 4 & 1 meet-and-assist service", accentColor: "#38bdf8" },
      { id: "pickup", title: "Airport Transfer", tagline: "Kuwait City, Fahaheel, Jahra & Ahmadi", accentColor: "#60a5fa" },
      { id: "cargo", title: "Cargo & Courier", tagline: "Household shifting & excess baggage to Kerala", accentColor: "#4ade80" },
    ],
  },
  {
    code: "RUH", name: "Riyadh", fullName: "King Khalid International Airport", region: "gcc", color: "#a3e635",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Saudia & flynas premium check-in assist", accentColor: "#a3e635" },
      { id: "pickup", title: "Airport Transfer", tagline: "Riyadh metro area & KAFD district transfers", accentColor: "#60a5fa" },
    ],
  },
  {
    code: "JED", name: "Jeddah", fullName: "King Abdulaziz International Airport", region: "gcc", color: "#fbbf24",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Hajj/Umrah special assist & priority lanes", accentColor: "#fbbf24" },
      { id: "pickup", title: "Airport Transfer", tagline: "Jeddah, Makkah & Madinah — sedan & MPV", accentColor: "#60a5fa" },
      { id: "cargo", title: "Cargo & Courier", tagline: "Zamzam & personal cargo to Kerala doorstep", accentColor: "#4ade80" },
    ],
  },
  {
    code: "DMM", name: "Dammam", fullName: "King Fahd International Airport", region: "gcc", color: "#67e8f9",
    services: [
      { id: "concierge", title: "Airport Concierge", tagline: "Meet-and-assist for Eastern Province NRKs", accentColor: "#67e8f9" },
      { id: "pickup", title: "Airport Transfer", tagline: "Dammam, Khobar, Dhahran & Jubail", accentColor: "#60a5fa" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   PROPS
   ═══════════════════════════════════════════════════ */

interface AirportsScreenProps {
  onBack: () => void;
  initialAirport?: string;
  highlightService?: string;
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

export function AirportsScreen({ onBack, initialAirport = "COK", highlightService }: AirportsScreenProps) {
  const [selectedCode, setSelectedCode] = useState(initialAirport);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const activeAirport = airports.find(a => a.code === selectedCode) ?? airports[0];

  // Auto-scroll to highlighted service
  useEffect(() => {
    if (highlightService && highlightRef.current) {
      setTimeout(() => highlightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    }
  }, [highlightService, selectedCode]);

  // Focus search input when opened
  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  // Filter airports by search
  const filtered = searchQuery.trim()
    ? airports.filter(a =>
        a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : airports;

  const keralaAirports = filtered.filter(a => a.region === "kerala");
  const gccAirports = filtered.filter(a => a.region === "gcc");

  return (
    <div className="flex flex-col min-h-screen pt-[56px] pb-32 text-white relative">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, #0d0f14 0%, #080a0c 40%, #0a0908 70%, #060504 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 15% 10%, rgba(96,165,250,0.06), transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 85% 80%, rgba(201,168,76,0.05), transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(74,222,128,0.03), transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ── Header ── */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 active:text-white transition-colors active:scale-95 group">
          <svg className="w-5 h-5 group-active:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-[22px] font-bold text-[var(--c-text-h)] tracking-tight">Airport Services</h1>
          <p className="text-[10px] font-mono text-white/28">Kerala & GCC airport concierge</p>
        </div>
      </div>

      {/* ── Airport Selector (current) ── */}
      <div className="px-5 mb-4 relative z-10">
        <button
          onClick={() => setShowSearch(s => !s)}
          className="w-full rounded-[18px] border border-white/8 p-3.5 flex items-center gap-3 active:scale-[0.99] transition-transform"
          style={{ background: `${activeAirport.color}0a` }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
            style={{ borderColor: `${activeAirport.color}30`, backgroundColor: `${activeAirport.color}15` }}
          >
            <span className="text-[13px] font-black" style={{ color: activeAirport.color }}>{activeAirport.code}</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[14px] font-bold text-white">{activeAirport.name}</p>
            <p className="text-[10px] font-mono text-white/30 truncate">{activeAirport.fullName}</p>
          </div>
          <svg className={`w-4 h-4 text-white/25 transition-transform duration-200 ${showSearch ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ── Search / Airport List Dropdown ── */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            key="search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="relative z-10"
          >
            <div className="px-5 pb-4">
              {/* Search bar */}
              <div className="relative mb-3">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search airport code or city…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/8 rounded-[14px] py-2.5 pl-10 pr-4 text-[13px] text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors"
                />
              </div>

              {/* Airport list */}
              <div className="max-h-[300px] overflow-y-auto scrollbar-none flex flex-col gap-3">
                {keralaAirports.length > 0 && (
                  <div>
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1.5 px-1">Kerala</p>
                    <div className="flex flex-col gap-1">
                      {keralaAirports.map(apt => (
                        <button
                          key={apt.code}
                          onClick={() => { setSelectedCode(apt.code); setShowSearch(false); setSearchQuery(""); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-colors text-left ${selectedCode === apt.code ? "bg-white/[0.06]" : "active:bg-white/[0.04]"}`}
                        >
                          <span className="text-[13px] font-black w-10" style={{ color: apt.color }}>{apt.code}</span>
                          <span className="text-[12px] text-white/60 flex-1">{apt.name}</span>
                          <span className="text-[9px] font-mono text-white/20">{apt.services.length} services</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {gccAirports.length > 0 && (
                  <div>
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1.5 px-1">GCC</p>
                    <div className="flex flex-col gap-1">
                      {gccAirports.map(apt => (
                        <button
                          key={apt.code}
                          onClick={() => { setSelectedCode(apt.code); setShowSearch(false); setSearchQuery(""); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-colors text-left ${selectedCode === apt.code ? "bg-white/[0.06]" : "active:bg-white/[0.04]"}`}
                        >
                          <span className="text-[13px] font-black w-10" style={{ color: apt.color }}>{apt.code}</span>
                          <span className="text-[12px] text-white/60 flex-1">{apt.name}</span>
                          <span className="text-[9px] font-mono text-white/20">{apt.services.length} services</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {filtered.length === 0 && (
                  <p className="text-center text-white/20 text-[12px] py-6">No airports found</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Services for Selected Airport ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAirport.code}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="px-5 relative z-10"
        >
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-3">
            {activeAirport.services.length} services available
          </p>

          <div className="flex flex-col gap-2.5">
            {activeAirport.services.map((svc, i) => {
              const isHighlighted = highlightService === svc.id;
              return (
                <motion.div
                  key={svc.id}
                  ref={isHighlighted ? highlightRef : undefined}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.28 }}
                >
                  <button
                    className={`w-full text-left rounded-[18px] overflow-hidden border active:scale-[0.98] transition-all relative ${
                      isHighlighted ? "border-white/20 ring-1 ring-white/10" : "border-white/6"
                    }`}
                    style={{ background: `linear-gradient(135deg, ${svc.accentColor}${isHighlighted ? "18" : "0c"} 0%, #0a0906 100%)` }}
                  >
                    {/* Left accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-r-full" style={{ backgroundColor: `${svc.accentColor}60` }} />
                    <div className="flex items-center gap-3.5 p-4 pl-5">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-white leading-tight">{svc.title}</p>
                        <p className="text-[10px] text-white/35 mt-0.5 leading-snug">{svc.tagline}</p>
                      </div>
                      <div
                        className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border"
                        style={{ borderColor: `${svc.accentColor}25`, backgroundColor: `${svc.accentColor}12` }}
                      >
                        <svg className="w-3.5 h-3.5" style={{ color: svc.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                    {isHighlighted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-[18px] pointer-events-none"
                        style={{ boxShadow: `inset 0 0 20px ${svc.accentColor}20` }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
