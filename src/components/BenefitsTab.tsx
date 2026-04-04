"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface BenefitItem {
  title: string;
  description: string;
  detail: string;
  howToRedeem: string[];
  icon: string;
  accent: string;
}

const benefits: BenefitItem[] = [
  {
    title: "Exigo Access",
    description: "Avail 50% off on premium coworking spaces and executive suites globally.",
    detail: "Get 50% off across 200+ premium coworking spaces and executive suites in 40+ cities globally. Access rooftop lounges, private meeting rooms, and executive concierge services — all as a SID-X member.",
    howToRedeem: ["Open the Exigo app", "Log in with your SID-X member ID", "Select any workspace and apply member code at checkout"],
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
    accent: "from-amber-500/20 to-yellow-600/5"
  },
  {
    title: "Priority Pass",
    description: "Unlimited complimentary access to 1300+ luxury airport lounges worldwide.",
    detail: "Your Priority Pass provides unlimited, complimentary access to over 1,300 exclusive airport lounges in 148 countries. Experience premium dining, spa, and concierge services before every flight.",
    howToRedeem: ["Locate your Priority Pass card in the app under 'My Privileges'", "Show digital card at any participating lounge entrance", "Access is complimentary with no daily limit"],
    icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5",
    accent: "from-blue-500/20 to-indigo-600/5"
  },
  {
    title: "5x Travel Rewards",
    description: "Earn 5x reward points on all luxury travel and high-end hotel bookings.",
    detail: "Every rupee you spend on luxury hotels, business class flights, bespoke tours, and yacht charters earns 5x SID-X reward points. Points can be redeemed against future investments or exclusive experiences.",
    howToRedeem: ["Book travel through our partner portal", "Your SID-X account is automatically credited within 7 working days", "Redeem points from the Rewards section in the app"],
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    accent: "from-emerald-500/20 to-green-600/5"
  },
  {
    title: "Zero Forex Markup",
    description: "Experience 0% markup on all global transactions without any hidden fees.",
    detail: "Transact internationally at the exact interbank exchange rate with zero hidden charges. Shop, dine, and invest globally without the typical 2–4% forex surcharge levied by conventional banks.",
    howToRedeem: ["Use your SID-X-linked card for any international transaction", "Zero markup is automatically applied", "Monthly statement shows exact savings in the app"],
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "from-fuchsia-500/20 to-purple-600/5"
  },
  {
    title: "Taj Epicure Premium",
    description: "Complimentary premium-tier Taj Epicure membership with 25% off F&B and spa.",
    detail: "Enjoy a premium-tier Taj Epicure membership that grants 25% discounts across all Taj properties' restaurants, spas, and banquets. Plus, receive complimentary welcome amenities on every stay across 100+ Taj hotels.",
    howToRedeem: ["Visit any Taj property restaurant or spa", "Present your SID-X member QR code from the app", "Discount is applied automatically at billing"],
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    accent: "from-orange-500/20 to-red-600/5"
  },
  {
    title: "24/7 Global Concierge",
    description: "Your personal concierge for reservations, event tickets, and lifestyle needs.",
    detail: "A dedicated lifestyle concierge available 24 hours a day, 7 days a week for restaurant reservations, private event access, luxury transportation, ticket procurement, gift sourcing, and any other bespoke needs.",
    howToRedeem: ["Tap 'My Concierge' in the app to start a live chat", "Call our exclusive concierge hotline (listed in your profile)", "Submit requests via WhatsApp to your dedicated relationship manager"],
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
    accent: "from-sky-500/20 to-cyan-600/5"
  }
];

function BenefitDrawer({ benefit, onClose }: { benefit: BenefitItem | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {benefit && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm" />
          <motion.div key="drawer"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[210] bg-[#0e0b07] rounded-t-[28px] overflow-hidden max-h-[85vh] flex flex-col shadow-[0_-20px_80px_rgba(0,0,0,0.8)]"
          >
            {/* Header bar with back button */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0 border-b border-white/5">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors active:scale-95 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="text-[12px] font-mono font-bold uppercase tracking-wider">Back</span>
              </button>
              <div className="w-8 h-[3px] bg-white/15 rounded-full" />
              <div className="w-16" />
            </div>
            <div className="overflow-y-auto scrollbar-none px-6 pb-32 pt-4">
              {/* Icon & Title */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.accent} border border-[var(--gold)]/10 flex items-center justify-center mb-5`}>
                <svg className="w-7 h-7 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={benefit.icon} />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#fdfaf5] tracking-tight mb-2">{benefit.title}</h2>
              <p className="text-[14px] text-white/60 leading-relaxed mb-7">{benefit.detail}</p>

              {/* How to Redeem */}
              <div className="bg-[var(--bg-raised)] rounded-2xl border border-[var(--gold)]/10 p-5 mb-7">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">How to Redeem</p>
                <ol className="flex flex-col gap-3">
                  {benefit.howToRedeem.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/20 flex items-center justify-center text-[10px] font-mono font-bold text-[var(--gold-text)]">{i + 1}</span>
                      <span className="text-[13px] text-white/60 leading-relaxed">{step}</span>
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

  return (
    <>
      <div className="flex flex-col min-h-screen pt-24 px-6 pb-[100px] text-white">
        <h1 className="text-3xl font-bold tracking-tight text-[#fdfaf5] mb-2">Member Privileges</h1>
        <p className="text-[13px] text-white/50 mb-8 font-medium">Exclusive perks curated for club members</p>
        
        <div className="grid grid-cols-1 gap-4">
          {benefits.map((benefit, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelected(benefit)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              className={`text-left bg-gradient-to-br ${benefit.accent} bg-[var(--bg-raised)] border border-[var(--gold)]/10 rounded-2xl p-5 shadow-xl group relative overflow-hidden active:scale-[0.98] transition-transform`}
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-[var(--gold)]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[var(--gold)]/15 transition-colors duration-500" />
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/15 flex items-center justify-center text-[var(--gold-text)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={benefit.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-white mb-1 tracking-wide">{benefit.title}</h3>
                  <p className="text-[12px] text-white/55 leading-relaxed line-clamp-2">{benefit.description}</p>
                </div>
                <svg className="w-4 h-4 shrink-0 text-white/30 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BenefitDrawer benefit={selected} onClose={() => setSelected(null)} />
    </>
  );
}
