"use client";

import { motion, AnimatePresence, useAnimate, stagger } from "framer-motion";
import { useEffect, useState } from "react";

interface LaunchAnimationProps {
  onComplete: () => void;
}

// Deterministic "random" positions for the particles so SSR matches client
const PARTICLES = [
  { angle: 0,   dist: 110, size: 2.5, delay: 0.0, duration: 1.0 },
  { angle: 30,  dist: 95,  size: 1.5, delay: 0.05, duration: 0.9 },
  { angle: 60,  dist: 130, size: 2.0, delay: 0.1,  duration: 1.1 },
  { angle: 90,  dist: 105, size: 1.8, delay: 0.05, duration: 1.0 },
  { angle: 120, dist: 125, size: 2.2, delay: 0.15, duration: 0.95 },
  { angle: 150, dist: 100, size: 1.6, delay: 0.0,  duration: 1.05 },
  { angle: 180, dist: 115, size: 2.0, delay: 0.1,  duration: 1.0 },
  { angle: 210, dist: 90,  size: 1.4, delay: 0.08, duration: 0.9 },
  { angle: 240, dist: 135, size: 2.5, delay: 0.12, duration: 1.1 },
  { angle: 270, dist: 108, size: 1.7, delay: 0.0,  duration: 1.0 },
  { angle: 300, dist: 120, size: 2.1, delay: 0.06, duration: 0.95 },
  { angle: 330, dist: 98,  size: 1.5, delay: 0.14, duration: 1.05 },
  { angle: 15,  dist: 75,  size: 1.2, delay: 0.18, duration: 0.85 },
  { angle: 75,  dist: 80,  size: 1.0, delay: 0.2,  duration: 0.88 },
  { angle: 165, dist: 70,  size: 1.3, delay: 0.16, duration: 0.9  },
  { angle: 255, dist: 85,  size: 1.1, delay: 0.22, duration: 0.87 },
];

const RING_CHARS = "SID-X · EXCLUSIVE COMMUNITY · SHARED GROWTH · ".split("");

export function LaunchAnimation({ onComplete }: LaunchAnimationProps) {
  const [phase, setPhase] = useState<"in" | "burst" | "reveal" | "out">("in");
  const [scope, animate] = useAnimate();

  // Drive the whole timeline imperatively for precise control
  useEffect(() => {
    const run = async () => {
      try {
        // Phase 1 — brief hold so framer mounts smoothly
        await new Promise((r) => setTimeout(r, 200));

        // Phase 2 — burst particles + logo scale-up
        setPhase("burst");
        await new Promise((r) => setTimeout(r, 900));

        // Phase 3 — membership text + tagline reveal
        setPhase("reveal");
        await new Promise((r) => setTimeout(r, 1600));

        // Phase 4 — fade everything out
        setPhase("out");
        await new Promise((r) => setTimeout(r, 700));
      } catch {
        // silently skip animation on error
      } finally {
        onComplete();
      }
    };
    run();
  }, []);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="launch"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse 120% 60% at 50% 0%, #1c1508 0%, #0a0805 55%, #060402 100%)",
          }}
        >
          {/* ── Ambient radial glow behind logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              phase === "burst" || phase === "reveal"
                ? { opacity: 0.35, scale: 2.2 }
                : { opacity: 0, scale: 0.4 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{
              width: 420,
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,168,76,0.55) 0%, rgba(180,130,40,0.18) 40%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          {/* ── Orbiting ring of text ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={
              phase === "reveal"
                ? { opacity: 0.25, scale: 1, rotate: 360 }
                : { opacity: 0, scale: 0.6, rotate: 0 }
            }
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              rotate: { duration: 28, ease: "linear", repeat: Infinity },
            }}
            className="absolute pointer-events-none"
            style={{ width: 280, height: 280 }}
          >
            <svg viewBox="0 0 280 280" className="w-full h-full">
              <defs>
                <path id="ringPath" d="M 140,140 m -110,0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0" />
              </defs>
              <text
                fontFamily="'DM Mono', monospace"
                fontSize="9"
                letterSpacing="4"
                fill="rgba(201,168,76,0.9)"
              >
                <textPath href="#ringPath">{RING_CHARS.join("")}</textPath>
              </text>
            </svg>
          </motion.div>

          {/* ── Particle burst ── */}
          {(phase === "burst" || phase === "reveal") &&
            PARTICLES.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const tx = Math.cos(rad) * p.dist;
              const ty = Math.sin(rad) * p.dist;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: tx,
                    y: ty,
                    opacity: [1, 0.8, 0],
                    scale: [1, 1.4, 0.4],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: `rgba(201,168,76,${0.7 + (i % 3) * 0.1})`,
                    boxShadow: `0 0 ${p.size * 3}px rgba(201,168,76,0.8)`,
                  }}
                />
              );
            })}

          {/* ── Horizontal crosshair lines ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === "burst" || phase === "reveal"
                ? { scaleX: 1, opacity: 0.15 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.9, ease: "circOut", delay: 0.1 }}
            className="absolute pointer-events-none"
            style={{
              width: "60vw",
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.8) 30%, rgba(232,201,122,1) 50%, rgba(201,168,76,0.8) 70%, transparent 100%)",
              transformOrigin: "center",
            }}
          />
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              phase === "burst" || phase === "reveal"
                ? { scaleY: 1, opacity: 0.15 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ duration: 0.9, ease: "circOut", delay: 0.1 }}
            className="absolute pointer-events-none"
            style={{
              width: 1,
              height: "40vh",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.8) 30%, rgba(232,201,122,1) 50%, rgba(201,168,76,0.8) 70%, transparent 100%)",
              transformOrigin: "center",
            }}
          />

          {/* ── Corner brackets — top-left, top-right, bottom-left, bottom-right ── */}
          {[
            { top: "calc(50% - 90px)", left: "calc(50% - 90px)", rotate: 0 },
            { top: "calc(50% - 90px)", left: "calc(50% + 70px)", rotate: 90 },
            { top: "calc(50% + 70px)", left: "calc(50% - 90px)", rotate: 270 },
            { top: "calc(50% + 70px)", left: "calc(50% + 70px)", rotate: 180 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                phase === "burst" || phase === "reveal"
                  ? { opacity: 0.4, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.5, delay: 0.25 + i * 0.04 }}
              className="absolute pointer-events-none"
              style={{
                top: pos.top,
                left: pos.left,
                width: 18,
                height: 18,
                borderTop: "1.5px solid rgba(201,168,76,0.8)",
                borderLeft: "1.5px solid rgba(201,168,76,0.8)",
                transform: `rotate(${pos.rotate}deg)`,
              }}
            />
          ))}

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.img
              src="/sid-x_logo.png"
              alt="SID-X"
              animate={
                phase === "burst" || phase === "reveal"
                  ? {
                      filter: [
                        "brightness(1) drop-shadow(0 0 0px rgba(201,168,76,0))",
                        "brightness(1.4) drop-shadow(0 0 18px rgba(201,168,76,0.8))",
                        "brightness(1.1) drop-shadow(0 0 8px rgba(201,168,76,0.4))",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="w-[160px] object-contain"
            />

            {/* ── Tagline reveal ── */}
            <AnimatePresence>
              {phase === "reveal" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="mt-4 flex flex-col items-center gap-2"
                >
                  {/* Gold rule */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="w-24 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(201,168,76,0.9), transparent)",
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.6em" }}
                    animate={{ opacity: 0.7, letterSpacing: "0.35em" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    className="text-[9px] font-mono uppercase text-[#E8C97A]"
                  >
                    Exclusive Community
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Bottom status ticker ── */}
          <AnimatePresence>
            {phase === "reveal" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 0.3, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-12 flex items-center gap-2"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]"
                />
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/50">
                  Initializing
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
