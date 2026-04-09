"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { userRewards } from "@/lib/mock-data";

interface BenefitItem {
  id: string;
  title: string;
  partner: string;
  category: "travel" | "dining" | "lifestyle" | "finance";
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
    id: "priority_pass",
    title: "Unlimited Lounge Access",
    partner: "Priority Pass",
    category: "travel",
    description: "1,300+ airport lounges in 148 countries, complimentary and unlimited.",
    detail: "Your Priority Pass provides unlimited, complimentary access to over 1,300 exclusive airport lounges in 148 countries. Experience premium dining, spa, and concierge services before every flight.",
    howToRedeem: [
      "Locate your Priority Pass card in the app under 'My Privileges'",
      "Show digital card at any participating lounge entrance",
      "Access is complimentary with no daily limit",
    ],
    icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5",
    accentColor: "#1a4f8c",
    logoText: "PP",
    isActive: true,
  },
  {
    id: "taj_epicure",
    title: "25% Off + Welcome Amenities",
    partner: "Taj Epicure",
    category: "dining",
    description: "Premium Taj Epicure membership across 100+ Taj properties worldwide.",
    detail: "Enjoy a premium-tier Taj Epicure membership that grants 25% discounts across all Taj properties' restaurants, spas, and banquets. Plus, receive complimentary welcome amenities on every stay.",
    howToRedeem: [
      "Visit any Taj property restaurant or spa",
      "Present your SID-X member QR code from the app",
      "Discount is applied automatically at billing",
    ],
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    accentColor: "#7a5010",
    logoText: "TAJ",
    isActive: true,
  },
  {
    id: "exigo",
    title: "50% Off Premium Workspace",
    partner: "Exigo Cowork",
    category: "lifestyle",
    description: "200+ coworking spaces and executive suites across 40+ cities.",
    detail: "Get 50% off across 200+ premium coworking spaces and executive suites in 40+ cities globally. Access rooftop lounges, private meeting rooms, and executive concierge services.",
    howToRedeem: [
      "Open the Exigo app",
      "Log in with your SID-X member ID",
      "Select any workspace and apply member code at checkout",
    ],
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
    accentColor: "#1a3d28",
    logoText: "EXG",
    isActive: false,
  },
  {
    id: "zero_forex",
    title: "0% Forex Markup",
    partner: "Zero Forex",
    category: "finance",
    description: "Exact interbank exchange rate on all international transactions.",
    detail: "Transact internationally at the exact interbank exchange rate with zero hidden charges. Shop, dine, and invest globally without the typical 2–4% forex surcharge levied by conventional banks.",
    howToRedeem: [
      "Use your SID-X-linked card for any international transaction",
      "Zero markup is automatically applied",
      "Monthly statement shows exact savings in the app",
    ],
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accentColor: "#2d1a52",
    logoText: "FX",
    isActive: false,
  },
  {
    id: "travel_rewards",
    title: "5× Reward Points",
    partner: "Luxury Travel",
    category: "travel",
    description: "Earn 5x SID-X points on all luxury travel and hotel bookings.",
    detail: "Every rupee you spend on luxury hotels, business class flights, bespoke tours, and yacht charters earns 5x SID-X reward points. Points can be redeemed against future investments or exclusive experiences.",
    howToRedeem: [
      "Book travel through our partner portal",
      "Your SID-X account is credited within 7 working days",
      "Redeem points from the Rewards section in the app",
    ],
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    accentColor: "#3d1a1a",
    logoText: "5×",
    isActive: true,
  },
  {
    id: "concierge",
    title: "24/7 Personal Concierge",
    partner: "Global Concierge",
    category: "lifestyle",
    description: "Dedicated relationship manager available round the clock.",
    detail: "A dedicated lifestyle concierge available 24/7 for restaurant reservations, private event access, luxury transportation, ticket procurement, gift sourcing, and any bespoke needs.",
    howToRedeem: [
      "Tap 'My Concierge' in the app to start a live chat",
      "Call our exclusive concierge hotline listed in your profile",
      "Submit requests via WhatsApp to your dedicated RM",
    ],
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
    accentColor: "#1a2e3d",
    logoText: "RM",
    isActive: false,
  },
];

const CATEGORY_FILTERS = ["All", "Travel", "Dining", "Lifestyle", "Finance"] as const;

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
            className="fixed bottom-0 left-0 right-0 z-[210] bg-[#0e0b07] rounded-t-[28px] overflow-hidden max-h-[88vh] flex flex-col shadow-[0_-20px_80px_rgba(0,0,0,0.8)]"
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
                  <h2 className="text-[20px] font-bold text-[#fdfaf5] tracking-tight leading-tight">{benefit.title}</h2>
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
                Activate Benefit
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

  const tierProgress = Math.round((userRewards.points / (userRewards.points + userRewards.pointsToNextTier)) * 100);

  return (
    <>
      <div className="flex flex-col min-h-screen pt-20 pb-[110px] text-white">

        {/* Header */}
        <div className="px-6 mb-5">
          <h1 className="text-[28px] font-bold text-[#fdfaf5] tracking-tight mb-1">Member Privileges</h1>
          <p className="text-[12px] font-mono text-white/35">Exclusive perks curated for club members</p>
        </div>

        {/* Tier card */}
        <div className="px-5 mb-5">
          <div
            className="relative rounded-[24px] overflow-hidden border border-[var(--gold)]/20 p-5"
            style={{ background: "linear-gradient(135deg,#1c1508 0%,#0f0c06 60%,#0a0805 100%)" }}
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
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-0.5">Points Balance</p>
                  <p className="text-[22px] font-bold text-[#fdfaf5]">{userRewards.points.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/30 mb-2">
                <span>{userRewards.tier}</span>
                <span>{userRewards.pointsToNextTier.toLocaleString()} pts to {userRewards.nextTier}</span>
              </div>
              <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tierProgress}%` }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-400"
                />
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
                style={{ background: `linear-gradient(130deg,${benefit.accentColor}40 0%,#0e0b07 100%)` }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 80% at 5% 50%,${benefit.accentColor}28,transparent)` }} />
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
