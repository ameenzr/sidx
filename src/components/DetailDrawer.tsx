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
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl"
          />

          {/* Drawer */}
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
            className="fixed inset-x-0 bottom-0 top-[5vh] z-[210] bg-[var(--c-card)] rounded-t-[28px] flex flex-col shadow-[0_-30px_100px_rgba(0,0,0,0.9)] overflow-hidden touch-none"
          >
            {/* Drag pill — floats above everything */}
            <div className="absolute top-2.5 inset-x-0 flex justify-center z-40 pointer-events-none">
              <div className="w-9 h-[3.5px] bg-white/20 rounded-full" />
            </div>

            {/* Back button — glassy pill floating over hero image */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, type: "spring", stiffness: 300 }}
              className="absolute top-5 left-4 z-40 flex items-center gap-1.5 bg-black/45 backdrop-blur-md border border-white/12 rounded-full pl-2 pr-3 py-1.5 active:scale-95 transition-transform"
            >
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="text-[12px] font-semibold text-white/80 tracking-wide">Back</span>
            </motion.button>

            {/* Scrollable body */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-y-auto scrollbar-none flex-1 touch-auto"
            >

              {/* ── PROJECT HERO GALLERY ── */}
              {type === "project" && item.gallery && item.gallery.length > 0 ? (
                <div className="relative h-[340px] overflow-hidden shrink-0 bg-black/20">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={activeGalleryIdx}
                      src={item.gallery[activeGalleryIdx]}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 1.08 }),
                        center: {
                          zIndex: 1, x: 0, opacity: 1, scale: 1,
                          transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }
                        },
                        exit: (d: number) => ({
                          zIndex: 0, x: d < 0 ? "100%" : "-100%", opacity: 0, scale: 0.94,
                          transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(_, { offset, velocity }) => {
                        if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
                          paginate(offset.x > 0 ? -1 : 1);
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                    />
                  </AnimatePresence>

                  {/* Top scrim for back button legibility */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent z-10 pointer-events-none" />
                  {/* Bottom fade into card bg */}
                  <div className="absolute inset-0 img-fade-bottom z-10 pointer-events-none" />

                  {/* Title + badges + location overlay */}
                  <div className="absolute bottom-0 inset-x-0 z-20 px-5 pb-5 pt-16">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-1.5 flex-wrap mb-2.5"
                    >
                      {item.badges?.map((b, i) => <Badge key={i} label={b} />)}
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 }}
                      className="text-[26px] font-bold text-white tracking-tight leading-tight"
                    >
                      {item.title}
                    </motion.h2>
                    {item.location && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.28 }}
                        className="flex items-center gap-1.5 mt-1.5"
                      >
                        <svg className="w-3 h-3 text-white/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span className="text-[11px] font-mono text-white/50">{item.location}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Gallery dots — bottom-right */}
                  {item.gallery.length > 1 && (
                    <div className="absolute bottom-5 right-5 flex gap-1.5 z-20">
                      {item.gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setDirection(i > activeGalleryIdx ? 1 : -1); setActiveGalleryIdx(i); }}
                          className={`h-1.5 rounded-full transition-all duration-400 ${i === activeGalleryIdx ? "w-6 bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "w-1.5 bg-white/30 hover:bg-white/55"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

              ) : type === "event" && item.image ? (
                /* ── EVENT HERO ── */
                <div className="relative h-[280px] overflow-hidden shrink-0">
                  <motion.img
                    src={item.image}
                    alt=""
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent" />
                  <div className="absolute inset-0 img-fade-bottom" />
                  <div className="absolute bottom-0 inset-x-0 px-5 pb-5 pt-16">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-1.5 flex-wrap mb-2.5"
                    >
                      {item.badges?.map((b, i) => <Badge key={i} label={b} />)}
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 }}
                      className="text-[24px] font-bold text-white tracking-tight leading-tight"
                    >
                      {item.title}
                    </motion.h2>
                  </div>
                </div>
              ) : null}

              {/* ── CONTENT ── */}
              <div className="px-5 pt-5 pb-32">

                {/* Event date / venue pills */}
                {type === "event" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="flex flex-col gap-2 mb-5"
                  >
                    {item.date && (
                      <div className="flex items-center gap-3 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3">
                        <svg className="w-4 h-4 text-[var(--gold-text)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span className="text-[13px] font-mono text-white/70">{item.date}</span>
                      </div>
                    )}
                    {item.venue && (
                      <div className="flex items-center gap-3 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3">
                        <svg className="w-4 h-4 text-[var(--gold-text)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="text-[13px] font-mono text-white/70">{item.venue}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Project stat tiles */}
                {type === "project" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="grid grid-cols-3 gap-2.5 mb-4"
                  >
                    {[
                      { label: "IRR", value: `${item.irr}%`, color: "text-emerald-400" },
                      { label: "Raised", value: `₹${item.raised}Cr`, color: "text-white/80" },
                      { label: "Min. Invest", value: `₹${((item.minInvestment || 0) / 100000).toFixed(0)}L`, color: "text-white/80" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white/[0.04] rounded-2xl px-2 py-3.5 border border-white/8 text-center">
                        <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">{s.label}</p>
                        <p className={`text-[20px] font-bold leading-none ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Funding progress */}
                {type === "project" && item.raised !== undefined && item.target !== undefined && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.22 }}
                    className="mb-5 bg-white/[0.03] border border-white/6 rounded-2xl px-4 py-3.5"
                  >
                    <div className="flex justify-between items-baseline mb-2.5">
                      <span className="text-[10px] font-mono text-white/35 uppercase tracking-wider">Funding Progress</span>
                      <span className="text-[12px] font-bold text-[var(--gold-text)]/70">
                        {Math.round((item.raised / item.target) * 100)}% · ₹{item.target}Cr target
                      </span>
                    </div>
                    <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.raised / item.target) * 100}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.35 }}
                        className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-[14px] text-white/55 leading-relaxed mb-6"
                >
                  {item.description}
                </motion.p>

                {/* Key Highlights */}
                {type === "project" && item.highlights && item.highlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    className="mb-5"
                  >
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] mb-3">Key Highlights</p>
                    <div className="flex flex-col gap-2.5">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                          <p className="text-[13px] text-white/60 leading-snug">{h}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Deal Structure */}
                {type === "project" && (item.tenure || item.structure || item.exitRoute) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.31 }}
                    className="mb-6 rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden"
                  >
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] px-4 pt-4 pb-3 border-b border-white/6">
                      Deal Structure
                    </p>
                    <div className="divide-y divide-white/6">
                      {item.tenure && (
                        <div className="flex justify-between items-center px-4 py-3">
                          <span className="text-[12px] font-mono text-white/35">Tenure</span>
                          <span className="text-[13px] font-semibold text-white/80">{item.tenure}</span>
                        </div>
                      )}
                      {item.structure && (
                        <div className="flex justify-between items-center px-4 py-3">
                          <span className="text-[12px] font-mono text-white/35">Structure</span>
                          <span className="text-[13px] font-semibold text-white/80 text-right max-w-[55%]">{item.structure}</span>
                        </div>
                      )}
                      {item.exitRoute && (
                        <div className="flex justify-between items-center px-4 py-3">
                          <span className="text-[12px] font-mono text-white/35">Exit Route</span>
                          <span className="text-[13px] font-semibold text-white/80 text-right max-w-[55%]">{item.exitRoute}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Partners */}
                {item.partnerLogos && item.partnerLogos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.33 }}
                    className="mb-7"
                  >
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] mb-3">Partners</p>
                    <div className="flex gap-3 items-center flex-wrap">
                      {item.partnerLogos.map((logo, i) => (
                        <div key={i} className="h-9 bg-white/8 rounded-xl px-3 border border-white/10 flex items-center">
                          <img src={logo} alt="" className="h-5 w-auto object-contain" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                  className="w-full py-4 bg-gradient-to-r from-[var(--gold)] to-amber-500 text-black font-bold text-[14px] rounded-2xl tracking-wide shadow-[0_4px_24px_rgba(251,191,36,0.25)] active:scale-[0.98] transition-transform"
                >
                  {type === "event" ? "Register for this Event" : "Express Interest"}
                </motion.button>

                <p className="text-center text-[10px] font-mono text-white/12 mt-5 tracking-wider">
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
