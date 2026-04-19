"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NotifType = "investment" | "opportunity" | "event" | "membership" | "announcement";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  tag?: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "act_1",
    type: "opportunity",
    title: "Interest Registered",
    body: "You expressed interest in Azraya Postpartum Care. Our relationship manager will contact you soon.",
    time: "3 days ago",
    isRead: true,
    tag: "Interest",
  },
  {
    id: "act_2",
    type: "event",
    title: "Summit Registration",
    body: "You have successfully registered for the SID-X Investor Summit 2026. See you at Le Meridien!",
    time: "1 week ago",
    isRead: true,
    tag: "Event",
  },
  {
    id: "act_3",
    type: "investment",
    title: "Investment Confirmed",
    body: "Your investment of ₹50L in Elite Homes Villa Project has been successfully processed and confirmed.",
    time: "3 weeks ago",
    isRead: true,
    tag: "Portfolio",
  },
  {
    id: "act_4",
    type: "investment",
    title: "Investment Confirmed",
    body: "Your investment of ₹25L in Eala Stays has been confirmed. Welcome to the stakeholder community.",
    time: "5 weeks ago",
    isRead: true,
    tag: "Portfolio",
  },
  {
    id: "act_5",
    type: "membership",
    title: "Portfolio Milestone",
    body: "Congratulations! You've reached your first major portfolio milestone with SID-X.",
    time: "6 weeks ago",
    isRead: true,
    tag: "Milestone",
  },
  {
    id: "act_6",
    type: "membership",
    title: "Benefit Activated",
    body: "NORKA Scheme Navigator benefit is now active on your account. Access it via the Privileges tab.",
    time: "2 months ago",
    isRead: true,
    tag: "Benefit",
  },
  {
    id: "n1",
    type: "announcement",
    title: "Welcome to SID-X Exclusive",
    body: "Your membership has been activated. You now have full access to curated investment opportunities, events, and member privileges.",
    time: "Just now",
    isRead: false,
    tag: "Membership",
  },
  {
    id: "n2",
    type: "opportunity",
    title: "New Project: Azraya Healthcare",
    body: "A new investment opportunity has launched — Azraya Postpartum & Wellness, targeting 22% IRR over 36 months. Early-investor slots are limited.",
    time: "2h ago",
    isRead: false,
    tag: "New",
  },
  {
    id: "n3",
    type: "investment",
    title: "Eala Stays — Funding 84% Complete",
    body: "Your portfolio project Eala Stays Wayanad has crossed 84% of its ₹4.5Cr target. Final close expected within the next 10 days.",
    time: "Yesterday",
    isRead: false,
    tag: "Update",
  },
  {
    id: "n4",
    type: "event",
    title: "SID-X Investor Summit — RSVP Open",
    body: "Registration is now open for the SID-X Investor Summit 2026 on 18 May at Le Meridien, Kochi. Seats are limited to 120 members.",
    time: "2 days ago",
    isRead: true,
    tag: "Event",
  },
  {
    id: "n5",
    type: "opportunity",
    title: "NRK Realty Fund II — Now Live",
    body: "SID-X NRK Realty Fund II is now accepting subscriptions. Minimum investment ₹25L. Projected IRR 18–22% over 48 months.",
    time: "3 days ago",
    isRead: true,
    tag: "New",
  },
  {
    id: "n6",
    type: "investment",
    title: "Quarterly Report — Q1 2026",
    body: "Your portfolio Q1 2026 performance report is ready. Overall unrealised gain stands at +31.2% across 3 active projects.",
    time: "5 days ago",
    isRead: true,
    tag: "Report",
  },
  {
    id: "n7",
    type: "membership",
    title: "Gold Tier Upgrade Available",
    body: "Your account is active on the SID-X Gold tier. You have priority deal access, dedicated relationship manager, and concierge travel benefits.",
    time: "1 week ago",
    isRead: true,
    tag: "Membership",
  },
  {
    id: "n8",
    type: "event",
    title: "Eala Stays Site Visit — 26 Apr",
    body: "Your spot for the Eala Stays Wayanad site visit weekend is confirmed. Detailed itinerary has been shared to your registered email.",
    time: "1 week ago",
    isRead: true,
    tag: "Event",
  },
  {
    id: "n9",
    type: "announcement",
    title: "SID-X App — What's New",
    body: "Airport concierge booking, portfolio analytics, and live project updates are now available in the app. Explore all new features.",
    time: "2 weeks ago",
    isRead: true,
    tag: "Platform",
  },
  {
    id: "n10",
    type: "investment",
    title: "Green Horizons — Distribution Notice",
    body: "A distribution of ₹1.2L has been credited against your Green Horizons Agri Fund investment. This reflects Q4 2025 yield earnings.",
    time: "3 weeks ago",
    isRead: true,
    tag: "Update",
  },
];

const FILTERS = [
  { label: "All",              type: null },
  { label: "Investments",      type: "investment" as NotifType },
  { label: "Opportunities",    type: "opportunity" as NotifType },
  { label: "Events",           type: "event" as NotifType },
  { label: "Membership",       type: "membership" as NotifType },
  { label: "Announcements",    type: "announcement" as NotifType },
];

const TYPE_META: Record<NotifType, { icon: string; color: string; bg: string }> = {
  investment: {
    icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.10)",
  },
  opportunity: {
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    color: "#c9a84c",
    bg: "rgba(201,168,76,0.10)",
  },
  event: {
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.10)",
  },
  membership: {
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    color: "#e8c97a",
    bg: "rgba(232,201,122,0.10)",
  },
  announcement: {
    icon: "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.10)",
  },
};

export function InboxScreen() {
  const [activeTypeFilter, setActiveTypeFilter] = useState<NotifType | null>(null);
  const [readFilter, setReadFilter] = useState<"all" | "unread">("unread");
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(NOTIFICATIONS.filter(n => n.isRead).map(n => n.id))
  );

  const filtered = NOTIFICATIONS.filter(n => {
    if (activeTypeFilter && n.type !== activeTypeFilter) return false;
    if (readFilter === "unread" && readIds.has(n.id)) return false;
    return true;
  });

  const unreadCount = NOTIFICATIONS.filter(n => !readIds.has(n.id)).length;

  const markAllRead = () => {
    setReadIds(new Set(NOTIFICATIONS.map(n => n.id)));
  };

  const markRead = (id: string) => {
    setReadIds(prev => new Set([...prev, id]));
  };

  return (
    <div className="flex flex-col w-full pt-[56px] pb-24 relative">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-0 h-[300px]" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.12), transparent)" }} />
      </div>

      <div className="relative z-10">
        {/* ── Header Controls ── */}
        <div className="px-5 pt-4 pb-5 flex items-center justify-between">
          <p className="text-[11px] font-mono text-[var(--gold-text)]/70 uppercase tracking-[0.2em]">
            {unreadCount > 0 ? `${unreadCount} new messages` : "All caught up"}
          </p>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="px-2 py-1 text-[10px] font-mono font-bold text-[var(--gold-text)]/60 active:text-[var(--gold-text)] uppercase tracking-widest transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* ── Status Filter (All / Unread) Segmented Control ── */}
        <div className="px-5 mb-5">
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-1 flex border border-white/8 relative">
            <button
              onClick={() => setReadFilter("all")}
              className={`flex-1 py-2.5 text-[12px] font-bold rounded-lg transition-all z-10 ${readFilter === "all" ? "text-black" : "text-white/40"}`}
            >
              All Messages
            </button>
            <button
              onClick={() => setReadFilter("unread")}
              className={`flex-1 py-2.5 text-[12px] font-bold rounded-lg transition-all z-10 flex items-center justify-center gap-1.5 ${readFilter === "unread" ? "text-black" : "text-white/40"}`}
            >
              Unread
              {unreadCount > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full flex items-center justify-center text-[9px] font-black leading-none ${readFilter === "unread" ? "bg-black/20 text-black" : "bg-[var(--gold)]/20 text-[var(--gold-text)]"}`}>
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Animated slider pill */}
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-[var(--gold)] to-amber-400 transition-all duration-300 shadow-[0_2px_10px_rgba(201,168,76,0.3)]"
              style={{ left: readFilter === "all" ? "4px" : "calc(50%)" }}
            />
          </div>
        </div>

        {/* ── Type Filter (Categories) ── */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-5 pb-5">
          {FILTERS.map(f => {
            const isActive = activeTypeFilter === f.type;
            return (
              <button
                key={f.label}
                onClick={() => setActiveTypeFilter(f.type)}
                className="shrink-0 px-4 py-2 rounded-full text-[11px] font-mono font-medium transition-all duration-200 active:scale-95 flex items-center gap-2"
                style={
                  isActive
                    ? { backgroundColor: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }
                    : { backgroundColor: "transparent", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {f.type && (
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: isActive ? TYPE_META[f.type].color : "currentColor", opacity: isActive ? 1 : 0.5 }} 
                  />
                )}
                {f.label}
              </button>
            );
          })}
        </div>

        {/* ── Message List ── */}
        <div className="flex flex-col px-4 gap-3 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filtered.map((notif, i) => {
              const meta = TYPE_META[notif.type];
              const isRead = readIds.has(notif.id);
              return (
                <motion.button
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.03, duration: 0.28 }}
                  onClick={() => markRead(notif.id)}
                  className={`w-full text-left rounded-[22px] p-4.5 transition-all duration-300 active:scale-[0.98] relative border ${isRead ? "border-white/5 bg-white/[0.02]" : "border-[var(--gold)]/25 bg-white/[0.06]"}`}
                  style={{
                    boxShadow: !isRead ? "0 8px 32px rgba(201,168,76,0.08)" : "none",
                  }}
                >
                  <div className="flex gap-4 items-start">
                    {/* Icon section */}
                    <div className="relative shrink-0 mt-0.5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10"
                        style={{ backgroundColor: isRead ? "rgba(255,255,255,0.03)" : meta.bg, border: `1px solid ${isRead ? "rgba(255,255,255,0.05)" : meta.color + "30"}` }}
                      >
                        <svg className="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" style={{ color: isRead ? "rgba(255,255,255,0.3)" : meta.color }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={meta.icon} />
                        </svg>
                      </div>
                      {!isRead && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--gold)] border-2 border-black rounded-full z-20 shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`text-[15px] font-bold leading-tight truncate ${isRead ? "text-white/50" : "text-white"}`}>
                          {notif.title}
                        </p>
                        <span className={`shrink-0 text-[10px] font-mono ${isRead ? "text-white/20" : "text-[var(--gold-text)]/80"}`}>
                          {notif.time}
                        </span>
                      </div>
                      <p className={`text-[13px] leading-relaxed mb-3 line-clamp-2 ${isRead ? "text-white/30" : "text-white/70"}`}>
                        {notif.body}
                      </p>
                      
                      {/* Tag & Action */}
                      <div className="flex items-center justify-between mt-auto">
                        {notif.tag && (
                          <span
                            className="text-[9px] font-mono font-bold px-2 py-1 rounded-[6px] uppercase tracking-[0.15em] border"
                            style={{ 
                              backgroundColor: isRead ? "rgba(255,255,255,0.02)" : meta.bg, 
                              color: isRead ? "rgba(255,255,255,0.25)" : meta.color,
                              borderColor: isRead ? "transparent" : `${meta.color}25` 
                            }}
                          >
                            {notif.tag}
                          </span>
                        )}
                        {!isRead && (
                          <span className="text-[10px] font-bold text-[var(--gold-text)]/60 uppercase tracking-wider flex items-center gap-1 ml-auto">
                            Tap to read
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                </svg>
              </div>
              <p className="text-[14px] font-medium text-white/40 mb-1">No messages found</p>
              <p className="text-[12px] text-white/20">Try changing your filters to see more.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
