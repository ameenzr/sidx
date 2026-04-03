"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Item } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { useState, useRef, useEffect } from "react";

interface DetailDrawerProps {
  item: Item | null;
  onClose: () => void;
  type: "event" | "project";
}

export function DetailDrawer({ item, onClose, type }: DetailDrawerProps) {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setActiveGalleryIdx(0);
    setDirection(0);
  }, [item?.id]);

  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 300], [1, 0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y > 120 || info.velocity.y > 500) {
      onClose();
    } else {
      animate(y, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  // Allow drag only when scrolled to top
  const [canDrag, setCanDrag] = useState(true);
  const handleScroll = () => {
    if (scrollRef.current) {
      setCanDrag(scrollRef.current.scrollTop === 0);
    }
  };

  const paginate = (newDirection: number) => {
    if (!item?.gallery) return;
    const nextIdx = (activeGalleryIdx + newDirection + item.gallery.length) % item.gallery.length;
    setDirection(newDirection);
    setActiveGalleryIdx(nextIdx);
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ opacity }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          {/* Full-screen rising drawer */}
          <motion.div
            key="drawer"
            style={{ y }}
            drag={canDrag ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={handleDragEnd}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 260, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 top-[5vh] z-[210] bg-[#0e0b07] rounded-t-[28px] flex flex-col shadow-[0_-30px_100px_rgba(0,0,0,0.9)] overflow-hidden touch-none"
          >
            {/* Drag handle + Back bar */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0 border-b border-white/5 cursor-grab active:cursor-grabbing">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors active:scale-95 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="text-[12px] font-mono font-bold uppercase tracking-wider">Back</span>
              </button>
              {/* Draggable handle pill */}
              <div className="w-10 h-[4px] bg-white/20 rounded-full" />
              <div className="w-16" />
            </div>

            {/* Scrollable Content — scrolling re-enables drag when at top */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-y-auto scrollbar-none flex-1 touch-auto"
            >
              {/* Hero / Gallery */}
              {type === "project" && item.gallery && item.gallery.length > 0 ? (
                <div className="relative h-[280px] overflow-hidden shrink-0 bg-black/20">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={activeGalleryIdx}
                      src={item.gallery[activeGalleryIdx]}
                      custom={direction}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction > 0 ? "100%" : "-100%",
                          opacity: 0,
                          scale: 1.1
                        }),
                        center: {
                          zIndex: 1,
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          transition: {
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }
                        },
                        exit: (direction: number) => ({
                          zIndex: 0,
                          x: direction < 0 ? "100%" : "-100%",
                          opacity: 0,
                          scale: 0.9,
                          transition: {
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                        if (swipe) {
                          paginate(offset.x > 0 ? -1 : 1);
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                    />
                  </AnimatePresence>
                  {/* Glassy Overlay for edge fade */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0e0b07] via-transparent to-transparent z-10" />
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0e0b07]/40 to-transparent z-10" />
                  
                  {/* Gallery Controls */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {item.gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > activeGalleryIdx ? 1 : -1);
                          setActiveGalleryIdx(i);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === activeGalleryIdx ? "w-8 bg-[var(--gold)] shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                  </div>
                </div>
              ) : type === "event" && item.image ? (
                <div className="relative h-[220px] overflow-hidden shrink-0">
                  <motion.img
                    src={item.image}
                    alt=""
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b07] via-[#0e0b07]/20 to-transparent" />
                </div>
              ) : null}

              <div className="px-6 pt-5 pb-32">
                {/* Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex gap-2 flex-wrap mb-4"
                >
                  {item.badges?.map((b, i) => <Badge key={i} label={b} />)}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-[#fdfaf5] tracking-tight mb-2"
                >
                  {item.title}
                </motion.h2>

                {/* Event Meta */}
                {type === "event" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col gap-2 mb-5 font-mono text-[12px] text-[var(--gold-text)]"
                  >
                    {item.date && (
                      <span className="flex items-center gap-2 opacity-80">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                        {item.date}
                      </span>
                    )}
                    {item.venue && (
                      <span className="flex items-center gap-2 opacity-70">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        {item.venue}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Project Financial Meta */}
                {type === "project" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="grid grid-cols-3 gap-3 mb-5"
                  >
                    {[
                      { label: "IRR", value: `${item.irr}%` },
                      { label: "Raised", value: `₹${item.raised}Cr` },
                      { label: "Min. Invest", value: `₹${((item.minInvestment || 0) / 100000).toFixed(0)}L` },
                    ].map((stat, i) => (
                      <div key={i} className="bg-[var(--bg-raised)] rounded-xl p-3 border border-[var(--gold)]/10 text-center">
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-[16px] font-bold text-[var(--gold-text)]">{stat.value}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Location — projects */}
                {type === "project" && item.location && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    className="flex items-center gap-2 mb-5 font-mono text-[12px] text-[var(--gold-text)]/70"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>{item.location}</span>
                  </motion.div>
                )}

                {/* Progress bar for projects */}
                {type === "project" && item.raised && item.target && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-5"
                  >
                    <div className="flex justify-between text-[11px] font-mono text-white/40 mb-1.5">
                      <span>Funding Progress</span>
                      <span>{Math.round((item.raised / item.target) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.raised / item.target) * 100}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[14px] text-white/60 leading-relaxed mb-8"
                >
                  {item.description}
                </motion.p>

                {/* Partner Logos */}
                {item.partnerLogos && item.partnerLogos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mb-8"
                  >
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">Partners</p>
                    <div className="flex gap-4 items-center flex-wrap">
                      {item.partnerLogos.map((logo, i) => (
                        <img key={i} src={logo} alt="" className="h-8 object-contain opacity-60 filter brightness-0 invert" />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full py-4 bg-gradient-to-r from-[var(--gold)] to-amber-500 text-black font-bold text-[14px] rounded-2xl tracking-wide shadow-[0_4px_24px_rgba(251,191,36,0.25)] active:scale-95 transition-transform"
                >
                  {type === "event" ? "Register for this Event" : "Express Interest"}
                </motion.button>

                {/* Swipe hint */}
                <p className="text-center text-[10px] font-mono text-white/15 mt-5 tracking-wider">
                  SWIPE DOWN TO DISMISS
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
