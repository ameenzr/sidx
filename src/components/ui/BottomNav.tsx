"use client";

import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const items = [
    { label: "Home",      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Projects",  icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2-2H8L6 7H3z" },
    { label: "Travel",    icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" },
    { label: "Community", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  ];

  return (
    <div 
      data-testid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Fade bleed above the pill */}
      <div className="absolute bottom-full left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--c-base) 80%, transparent))" }} />

      {/* Glass pill */}
      <div
        className="mx-4 mb-2 rounded-[22px] pointer-events-auto overflow-hidden"
        style={{
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          backgroundColor: "color-mix(in srgb, var(--c-surface) 75%, transparent)",
          border: "1px solid var(--c-border-em)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
      <div className="flex w-full items-center justify-around px-2 py-2">
      {items.map((item, idx) => {
        const isActive = activeTab === item.label;
        return (
          <button 
            key={idx} 
            onClick={() => setActiveTab(item.label)}
            data-testid={`nav-item-${item.label.toLowerCase().replace(' ', '-')}`}
            className="flex flex-col items-center justify-center w-[60px] gap-1 focus:outline-none"
          >
            <svg 
              data-testid="nav-icon"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className={`w-[18px] h-[18px] transition-all duration-300 ${isActive ? "text-[var(--olive)] opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(107,114,48,0.5)]" : "text-[var(--text-3)] opacity-70"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span 
              data-testid="nav-label"
              className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? "text-[var(--olive-text)]" : "text-[var(--text-3)] opacity-80"}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
      </div>
      </div>
    </div>
  );
}
