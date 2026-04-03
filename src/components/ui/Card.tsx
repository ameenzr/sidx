import React from 'react';
import { Badge } from './Badge';

interface CardProps {
  type: 'event' | 'project';
  title: string;
  description?: string;
  date?: string;
  venue?: string;
  image?: string;
  isLocked?: boolean;
  badges?: string[];
  raised?: number;
  target?: number;
  irr?: number;
  isHero?: boolean;
}

export function Card({ type, title, description, date, venue, image, isLocked, badges = [], raised, irr, isHero }: CardProps) {
  const isEvent = type === 'event';
  const radius = isHero ? 'rounded-[var(--r-xl)]' : 'rounded-[var(--r-lg)]';
  const isExclusive = badges.some(b => b.toLowerCase() === 'exclusive');
  const border = isExclusive 
    ? 'border-[var(--gold)] shadow-[0_0_15px_rgba(201,168,76,0.15)]' 
    : (isHero ? 'border-[var(--border-em)]' : 'border-[var(--border-default)]');
  const cardHeight = isHero ? 'h-[280px]' : 'h-[320px]';
  
  return (
    <div 
      data-testid={`card-${type}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      className={`relative bg-[var(--bg-surface)] border ${border} ${radius} overflow-hidden flex flex-col shrink-0 ${isHero ? 'w-full' : 'w-[280px]'} ${cardHeight}`}
    >
      {/* Background Image - Covers Entire Card */}
      {image && (
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105 ${isLocked ? 'blur-[2px] opacity-40' : 'opacity-90'}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Shadow/Overlay to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />

      {/* Lock Icon overlay if locked */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[var(--text-3)] opacity-60">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
      )}

      {/* Content Area - Overlayed at bottom with a smooth gradient fade-away shadow */}
      <div 
        data-testid="card-content-area"
        className={`relative z-[3] mt-auto w-full p-4 pt-10 flex flex-col gap-1.5 bg-gradient-to-t from-black/90 via-black/70 to-transparent`}
      >
        <div className="flex flex-wrap gap-1.5" data-testid="card-badges">
           {badges.map((b, i) => <Badge key={i} label={b} />)}
        </div>

        <div>
           <h3 
             data-testid="card-title"
             className={`${isHero ? 'text-[15px]' : 'text-[14px]'} font-bold text-[var(--text-0)] leading-tight`}
           >
             {title}
           </h3>
           {description && (
             <p 
               data-testid="card-description"
               className={`text-[11px] text-[var(--text-2)] line-clamp-2 mt-0.5 leading-snug ${isLocked ? 'opacity-40 tracking-widest' : ''}`}
             >
               {isLocked ? '████████ █████' : description}
             </p>
           )}
        </div>
        
        {isEvent && (
          <div className="pt-0.5 flex flex-col gap-0.5 text-[10px] font-medium text-[var(--text-3)]" data-testid="card-event-info">
             {date && <span data-testid="card-date" className="flex items-center gap-1.5"><svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>{date}</span>}
             {venue && <span data-testid="card-venue" className="flex items-center gap-1.5"><svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>{venue}</span>}
          </div>
        )}

        {!isEvent && raised !== undefined && (
          <div className="pt-1.5" data-testid="card-project-stats">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-[var(--text-1)] font-semibold" data-testid="card-raised-percent">{raised}% Raised</span>
              {irr && <span className="text-[var(--gold-text)] font-mono font-bold" data-testid="card-irr">{irr}% IRR</span>}
            </div>
            <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--gold)] rounded-full" style={{ width: `${raised}%` }} data-testid="card-progress-bar"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
