import React from 'react';

export function SearchBar() {
  return (
    <div data-testid="search-bar-wrapper" className="mx-4 mt-4 mb-2">
      <div data-testid="search-input-container" className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-em)] rounded-full px-4 py-[10px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-3)] text-opacity-80">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="Search for 'Aether Propulsion'" 
          className="bg-transparent border-none outline-none w-full text-[14px] font-sans text-[var(--text-1)] placeholder-[var(--text-3)]" 
        />
      </div>
    </div>
  );
}
