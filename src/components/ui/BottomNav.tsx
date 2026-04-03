"use client";

import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const items = [
    { label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Projects", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2-2H8L6 7H3z" },
    { label: "Benefits", icon: "M12 15l-3.5 3 1-5L6 10l5-.5L12 5l1 4.5 5 .5-3.5 3 1 5-3.5-3z" },
  ];

  return (
    <div 
      data-testid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 h-[80px] pt-4 flex items-end justify-around px-2 pb-[calc(10px+env(safe-area-inset-bottom))] z-50 bg-gradient-to-t from-[#0a0805] via-[rgba(10,8,5,0.6)] to-transparent pointer-events-none"
    >
      <div className="flex w-full items-center justify-around pointer-events-auto">
      {items.map((item, idx) => {
        const isActive = activeTab === item.label;
        return (
          <button 
            key={idx} 
            onClick={() => setActiveTab(item.label)}
            data-testid={`nav-item-${item.label.toLowerCase().replace(' ', '-')}`}
            className="flex flex-col items-center justify-center w-[64px] gap-1 focus:outline-none"
          >
            <svg 
              data-testid="nav-icon"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className={`w-[18px] h-[18px] transition-all duration-300 ${isActive ? "text-[var(--olive)] opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(107,114,48,0.5)]" : "text-[var(--text-3)] opacity-40 hover:opacity-60"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span 
              data-testid="nav-label"
              className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? "text-[var(--olive-text)]" : "text-[var(--text-3)] opacity-60"}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
