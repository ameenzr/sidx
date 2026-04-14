"use client";

import { motion } from "framer-motion";
import { portfolioInvestments, userPortfolio, userRewards, hotProjects } from "@/lib/mock-data";

interface Props {
  onBack: () => void;
}

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

const SPARKLINES: Record<string, string> = {
  eala_stays:   "M0,38 C15,36 25,40 40,32 C55,24 65,28 80,18 C90,12 100,14 120,8",
  elite_homes:  "M0,40 C15,38 25,42 45,30 C60,20 72,26 90,14 C105,6 115,9 120,5",
  azraya:       "M0,42 C10,40 22,44 38,34 C52,26 66,30 82,20 C96,12 108,16 120,6",
};

export function PortfolioScreen({ onBack }: Props) {
  const tierProgress = Math.round(
    (userRewards.points / (userRewards.points + userRewards.pointsToNextTier)) * 100
  );

  return (
    <div className="flex flex-col min-h-screen pt-0 pb-[110px] text-white relative">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, var(--c-elevated) 0%, var(--c-surface) 40%, var(--c-base) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 15% 10%, rgba(96,165,250,0.06), transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 85% 80%, rgba(201,168,76,0.05), transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(74,222,128,0.03), transparent 60%)" }} />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>


      <div className="flex flex-col gap-5 px-5 pt-6 relative z-10">

        {/* ── 1. Portfolio Hero Card (compact) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-[24px] overflow-hidden border border-[var(--gold)]/20 p-5"
          style={{ background: "linear-gradient(140deg, var(--c-elevated) 0%, var(--c-card) 60%, var(--c-base) 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 110% 80% at 10% 20%,rgba(180,130,40,0.14),transparent 60%)" }} />
          {/* Sparkline */}
          <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none opacity-15">
            <svg viewBox="0 0 300 50" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="pf-sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,42 C20,38 40,45 70,34 C95,26 115,38 150,26 C175,18 200,28 240,12 C265,4 285,8 300,3"
                fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0,42 C20,38 40,45 70,34 C95,26 115,38 150,26 C175,18 200,28 240,12 C265,4 285,8 300,3 L300,50 L0,50 Z"
                fill="url(#pf-sparkFill)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-end justify-between mb-1">
              <div>
                <p className="text-[9px] font-mono text-[var(--gold-text)]/40 uppercase tracking-[0.25em] mb-1.5">Portfolio Value</p>
                <h2 className="text-[36px] font-bold tracking-tight leading-none" style={{ color: "var(--c-text-h)" }}>{fmt(userPortfolio.currentValue)}</h2>
              </div>
              <div className="flex items-center gap-1 mb-1 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                <span className="text-[11px] font-bold text-emerald-400">+{userPortfolio.returnPercent}%</span>
              </div>
            </div>
            <p className="text-[11px] text-white/25 mb-4">+{fmt(userPortfolio.returns)} unrealised gain</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5 text-center">
                <p className="text-[14px] font-bold text-white/80">{fmt(userPortfolio.totalInvested)}</p>
                <p className="text-[8px] font-mono text-white/25 uppercase mt-0.5">Deployed</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5 text-center">
                <p className="text-[14px] font-bold text-white/80">{userPortfolio.activeCount}</p>
                <p className="text-[8px] font-mono text-white/25 uppercase mt-0.5">Active</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5 text-center">
                <p className="text-[14px] font-bold text-emerald-400">{userPortfolio.avgIRR}%</p>
                <p className="text-[8px] font-mono text-white/25 uppercase mt-0.5">Avg IRR</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. Allocation Bar (inline) ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--c-text-muted)" }}>Allocation</p>
          </div>
          <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-2">
            {portfolioInvestments.map((inv, i) => {
              const pct = Math.round((inv.invested / userPortfolio.totalInvested) * 100);
              return (
                <motion.div key={i} initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.12 }}
                  className="h-full rounded-full" style={{ backgroundColor: inv.color }}
                />
              );
            })}
          </div>
          <div className="flex gap-4 flex-wrap">
            {portfolioInvestments.map((inv, i) => {
              const pct = Math.round((inv.invested / userPortfolio.totalInvested) * 100);
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: inv.color }} />
                  <span className="text-[10px] font-mono text-white/40">{inv.shortTitle} · {pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. Investment Cards (compact — no image banners) ── */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: "var(--c-text-muted)" }}>Active Investments</p>
          <div className="flex flex-col gap-3">
            {portfolioInvestments.map((inv, idx) => {
              const project = hotProjects.find(p => p.id === inv.projectId);
              const gain = inv.currentValue - inv.invested;
              const gainPct = ((gain / inv.invested) * 100).toFixed(1);
              const fundedPct = project?.raised && project?.target
                ? Math.round((project.raised / project.target) * 100) : 0;
              const sparkPath = SPARKLINES[inv.projectId] ?? SPARKLINES["eala_stays"];

              return (
                <motion.div
                  key={inv.projectId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.34 }}
                  className="rounded-[20px] overflow-hidden border border-white/8 relative"
                  style={{ background: `linear-gradient(135deg, ${inv.color}15 0%, var(--c-card) 100%)` }}
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-r-full" style={{ backgroundColor: `${inv.color}60` }} />

                  <div className="p-4 pl-5">
                    {/* Row 1: Title + status + IRR */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-[14px] font-bold text-white leading-tight">{project?.title ?? inv.shortTitle}</h3>
                          <div className="flex items-center gap-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-1.5 py-0.5 shrink-0">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#4ade80]" />
                            <span className="text-[7px] font-bold text-emerald-400 uppercase">{inv.status}</span>
                          </div>
                        </div>
                        {project?.location && (
                          <p className="text-[9px] font-mono text-white/25">{project.location}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-[18px] font-bold text-emerald-400 leading-none">{inv.irr}%</p>
                        <p className="text-[7px] font-mono text-white/25 uppercase mt-0.5">IRR</p>
                      </div>
                    </div>

                    {/* Row 2: Compact value grid + sparkline */}
                    <div className="flex gap-3">
                      {/* Values */}
                      <div className="flex-1 grid grid-cols-3 gap-1.5">
                        <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2 text-center">
                          <p className="text-[12px] font-bold text-white/65">{fmt(inv.invested)}</p>
                          <p className="text-[7px] font-mono text-white/20 uppercase">Invested</p>
                        </div>
                        <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2 text-center">
                          <p className="text-[12px] font-bold text-white/80">{fmt(inv.currentValue)}</p>
                          <p className="text-[7px] font-mono text-white/20 uppercase">Current</p>
                        </div>
                        <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2 text-center">
                          <p className="text-[12px] font-bold" style={{ color: inv.color }}>+{fmt(gain)}</p>
                          <p className="text-[7px] font-mono text-white/20 uppercase">+{gainPct}%</p>
                        </div>
                      </div>

                      {/* Mini sparkline */}
                      <div className="w-16 h-10 shrink-0 self-center">
                        <svg viewBox="0 -5 120 55" preserveAspectRatio="none" className="w-full h-full">
                          <defs>
                            <linearGradient id={`spark-fill-${idx}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={inv.color} stopOpacity="0.25" />
                              <stop offset="100%" stopColor={inv.color} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d={sparkPath} fill="none" stroke={inv.color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                          <path d={`${sparkPath} L120,60 L0,60 Z`} fill={`url(#spark-fill-${idx})`} />
                        </svg>
                      </div>
                    </div>

                    {/* Row 3: Funding progress */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-[2.5px] bg-white/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${fundedPct}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.15 + 0.3 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: inv.color }}
                        />
                      </div>
                      <span className="text-[9px] font-mono font-bold shrink-0" style={{ color: inv.color }}>{fundedPct}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── 4. Membership (compact) ── */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: "var(--c-text-muted)" }}>Membership</p>
          <div
            className="rounded-[20px] p-4 relative overflow-hidden border border-[var(--gold)]/18"
            style={{ background: "linear-gradient(145deg, var(--c-elevated) 0%, var(--c-card) 50%, var(--c-base) 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 70% at 80% 20%, rgba(180,130,40,0.18), transparent)" }} />
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, #e8c97a, transparent)" }} />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[var(--gold-text)]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1l1.9 4.1L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1-3-2.9 4.1-.5z" />
                  </svg>
                  <span className="text-[14px] font-bold text-[var(--gold-text)] tracking-wide">{userRewards.tier}</span>
                </div>
                <p className="text-[18px] font-bold text-[var(--c-text-h)]">{userRewards.points.toLocaleString()}<span className="text-[9px] font-mono text-white/25 ml-1">pts</span></p>
              </div>
              <div className="flex justify-between text-[8px] font-mono text-white/22 mb-1.5">
                <span>{userRewards.tier}</span>
                <span>{userRewards.pointsToNextTier.toLocaleString()} to {userRewards.nextTier}</span>
              </div>
              <div className="h-[2.5px] bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tierProgress}%` }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-400"
                />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-white/15 mt-2">
                <span>Member since Jan 2025</span>
                <span>Valid until Dec 2026</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
