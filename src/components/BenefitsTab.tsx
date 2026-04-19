"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { userRewards } from "@/lib/mock-data";

interface BenefitItem {
  id: string;
  title: string;
  partner: string;
  category: "investment" | "lifestyle" | "travel" | "finance";
  description: string;
  detail: string;
  howToRedeem: string[];
  icon: string;
  accentColor: string;
  logoText: string;
  isActive?: boolean;
}

const benefits: BenefitItem[] = [
  {
    id: "priority_deals",
    title: "First-Look Deal Access",
    partner: "SID-X Investment Club",
    category: "investment",
    description: "Priority access to new SID-X projects 2–4 weeks before public launch.",
    detail: "As a Gold member, you receive early notification and a reserved slot on every new SID-X project — typically 2–4 weeks before the deal opens to general investors. Your slot is held for 72 hours from the notification date, with no obligation to commit.",
    howToRedeem: [
      "Enable 'Deal Alerts' in your notification settings",
      "Receive early access link via WhatsApp and in-app notification",
      "Express interest within the 72-hour priority window to secure your slot",
    ],
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    accentColor: "#7a5010",
    logoText: "FLD",
    isActive: true,
  },
  {
    id: "eala_stays_perk",
    title: "20% Off Farm Stays & Dining",
    partner: "Eala Stays",
    category: "lifestyle",
    description: "Member discount on overnight stays, farm experiences, and dining at Eala Stays, Wayanad.",
    detail: "Enjoy a 20% discount on all overnight bookings, farm-stay packages, and F&B at Eala Stays resort in Wayanad. Includes a complimentary guided plantation tour and organic welcome basket for Gold members and above.",
    howToRedeem: [
      "Contact Eala Stays directly and mention your SID-X Gold membership",
      "Show your SID-X member QR code from this app at check-in",
      "Discount is applied to accommodation and dining bills at checkout",
    ],
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    accentColor: "#1a3d28",
    logoText: "ELA",
    isActive: true,
  },
  {
    id: "babel_passes",
    title: "Complimentary Event Passes",
    partner: "Babel Aspen Glow",
    category: "lifestyle",
    description: "2 complimentary passes per quarter to events at Babel Aspen Glow Convention Centre, Kannur.",
    detail: "Receive 2 complimentary entry passes every quarter to any event hosted at Babel Aspen Glow, Kannur — covering exhibitions, business conferences, cultural shows, and curated experiences. Unused passes carry over for one quarter only.",
    howToRedeem: [
      "Browse upcoming events at Babel Aspen Glow in the Events tab",
      "Tap 'Redeem Member Pass' on any eligible event listing",
      "E-ticket is generated in the app — present at venue entrance",
    ],
    icon: "M16.5 6v.75a3.75 3.75 0 01-7.5 0V6a3.75 3.75 0 017.5 0zM11.25 0a5.25 5.25 0 00-5.25 5.25v.75a5.25 5.25 0 0010.5 0V5.25A5.25 5.25 0 0011.25 0z",
    accentColor: "#1a2e4f",
    logoText: "BAG",
    isActive: false,
  },
  {
    id: "travel_concessions",
    title: "NRK Holiday & Travel Packages",
    partner: "SID-X Travel",
    category: "travel",
    description: "Curated Kerala and international holiday packages with NRK-specific concessions and deals.",
    detail: "Access member-exclusive travel packages — Kerala heritage tours, Gulf and international holiday deals, and air travel concessions negotiated for NRKs. Packages include visa advisory, accommodation, guide services, and complimentary airport transfers through SID-X's travel partners.",
    howToRedeem: [
      "Contact your SID-X relationship manager to browse current packages",
      "Travel section with self-booking will be available in a future app update",
      "Member discounts are applied automatically at partner checkout",
    ],
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    accentColor: "#2d1a3d",
    logoText: "TRV",
    isActive: false,
  },
  {
    id: "legal_review",
    title: "Free Property Legal Review",
    partner: "SID-X Legal",
    category: "finance",
    description: "Complimentary legal consultation for investment documents, sale agreements, and property due diligence.",
    detail: "Gold members receive complimentary legal review for investment and property-related paperwork — including sale agreements, partnership deeds, and investment term sheets. Up to 3 consultations per year with SID-X's empanelled legal team. Available in English and Malayalam.",
    howToRedeem: [
      "Upload your document via the secure portal in this Benefits section",
      "SID-X Legal team will contact you within 2 business days",
      "Consultations are conducted via video call or in-person at SID-X offices",
    ],
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    accentColor: "#1a2e3d",
    logoText: "LEG",
    isActive: true,
  },
  {
    id: "norka_assist",
    title: "NORKA Scheme Navigator",
    partner: "NORKA Connect",
    category: "finance",
    description: "Expert assistance with NORKA government scheme eligibility, registration, and filing for NRKs.",
    detail: "Navigate Kerala's NORKA schemes with a dedicated assistance service. Our team helps you assess eligibility and file for welfare fund benefits, re-employment programs, repatriation assistance, and NRK entrepreneur support grants — saving you time and preventing common filing errors.",
    howToRedeem: [
      "Tap 'Start NORKA Assessment' below to begin",
      "Complete the 5-minute eligibility questionnaire",
      "A NORKA advisor will contact you within 3 business days to guide the process",
    ],
    icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
    accentColor: "#1c2a1a",
    logoText: "NRK",
    isActive: false,
  },
];

const CATEGORY_FILTERS = ["All", "Investment", "Lifestyle", "Travel", "Finance"] as const;

function BenefitDrawer({ benefit, onClose }: { benefit: BenefitItem | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {benefit && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm" />
          <motion.div key="bdr"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[210] bg-[var(--c-card)] rounded-t-[28px] overflow-hidden max-h-[88vh] flex flex-col shadow-[0_-20px_80px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0 border-b border-white/5">
              <button onClick={onClose} className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors active:scale-95 group">
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="text-[12px] font-mono font-bold uppercase tracking-wider">Back</span>
              </button>
              <div className="w-8 h-[3px] bg-white/15 rounded-full" />
              <div className="w-16" />
            </div>
            <div className="overflow-y-auto scrollbar-none px-6 pb-32 pt-5">
              {/* Brand header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shrink-0"
                  style={{ backgroundColor: `${benefit.accentColor}50` }}
                >
                  <span className="text-[13px] font-black text-white tracking-tight">{benefit.logoText}</span>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-white/35 uppercase tracking-wider mb-0.5">{benefit.partner}</p>
                  <h2 className="text-[20px] font-bold text-[var(--c-text-h)] tracking-tight leading-tight">{benefit.title}</h2>
                  {benefit.isActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-400">Active on your account</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[14px] text-white/55 leading-relaxed mb-7">{benefit.detail}</p>

              <div className="bg-white/[0.03] rounded-2xl border border-white/6 p-5 mb-6">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">How to Redeem</p>
                <ol className="flex flex-col gap-3">
                  {benefit.howToRedeem.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/25 flex items-center justify-center text-[10px] font-mono font-bold text-[var(--gold-text)]">{i + 1}</span>
                      <span className="text-[13px] text-white/55 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-[var(--gold)] to-amber-500 text-black font-bold text-[14px] rounded-2xl tracking-wide shadow-[0_4px_24px_rgba(251,191,36,0.25)] active:scale-95 transition-transform">
                {benefit.isActive ? "View Details" : "Activate Benefit"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function BenefitsTab() {
  const [selected, setSelected] = useState<BenefitItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORY_FILTERS[number]>("All");

  const filtered = activeCategory === "All"
    ? benefits
    : benefits.filter(b => b.category === activeCategory.toLowerCase());

  return (
    <>
      <div className="flex flex-col min-h-screen pt-20 pb-[110px] text-white">

        {/* Header */}
        <div className="px-6 mb-5">
          <h1 className="text-[28px] font-bold text-[var(--c-text-h)] tracking-tight mb-1">Member Privileges</h1>
          <p className="text-[12px] font-mono text-white/35">Exclusive perks for SID-X club members</p>
        </div>

        {/* Tier card */}
        <div className="px-5 mb-5">
          <div
            className="relative rounded-[24px] overflow-hidden border border-[var(--gold)]/20 p-5"
            style={{ background: "linear-gradient(135deg, var(--c-elevated) 0%, var(--c-surface) 60%, var(--c-base) 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at 10% 20%,rgba(180,130,40,0.14),transparent 60%)" }} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-mono text-[var(--gold-text)]/40 uppercase tracking-[0.25em] mb-1">SID-X CLUB</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--gold-text)]" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                    </svg>
                    <span className="text-[20px] font-bold text-[var(--gold-text)] tracking-wider">{userRewards.tier}</span>
                  </div>
                </div>
                <div className="text-right">
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-6 mb-5 pb-1">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveCategory(f)}
              className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === f
                  ? "bg-[var(--gold)] text-black shadow-[0_4px_16px_rgba(251,191,36,0.3)]"
                  : "bg-white/6 text-white/45 border border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Benefit cards */}
        <div className="flex flex-col gap-3 px-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((benefit, idx) => (
              <motion.button
                key={benefit.id}
                layout
                onClick={() => setSelected(benefit)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: idx * 0.07, duration: 0.34 }}
                className="text-left rounded-[20px] overflow-hidden border border-white/8 active:scale-[0.98] transition-transform relative"
                style={{ background: `linear-gradient(130deg,${benefit.accentColor}28 0%, var(--c-card) 100%)` }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 80% at 5% 50%,${benefit.accentColor}18,transparent)` }} />
                <div className="relative z-10 flex items-center gap-4 p-4">
                  {/* Logo block */}
                  <div
                    className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${benefit.accentColor}55` }}
                  >
                    <span className="text-[10px] font-black text-white/90 tracking-tight">{benefit.logoText}</span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[10px] font-mono text-white/35 uppercase tracking-wider">{benefit.partner}</p>
                      {benefit.isActive && (
                        <div className="flex items-center gap-1 bg-emerald-400/15 border border-emerald-400/25 rounded-full px-1.5 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[8px] font-bold text-emerald-400 uppercase">Active</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[13px] font-bold text-white leading-tight mb-0.5">{benefit.title}</p>
                    <p className="text-[11px] text-white/38 leading-tight line-clamp-1">{benefit.description}</p>
                  </div>

                  {/* Arrow */}
                  <svg className="w-4 h-4 shrink-0 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <BenefitDrawer benefit={selected} onClose={() => setSelected(null)} />
    </>
  );
}
