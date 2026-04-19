"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface FeedbackData {
  title: string;
  message: string;
  type: "success" | "pending" | "info";
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

interface ActionFeedbackProps {
  data: FeedbackData | null;
  onClose: () => void;
}

export function ActionFeedback({ data, onClose }: ActionFeedbackProps) {
  // Auto-close after 5 seconds
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-[320px] bg-[#141414] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)] pointer-events-auto"
            >
              {/* Top Pattern */}
              <div className="relative h-32 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/10 to-transparent" />
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(var(--gold) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                
                {/* Animated Ring */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="w-16 h-16 rounded-full border-2 border-[var(--gold)]/30 flex items-center justify-center relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full bg-[var(--gold)]"
                  />
                  <svg className="w-8 h-8 text-[var(--gold-text)] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="px-6 pb-8 text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[20px] font-display font-bold text-white mb-2"
                >
                  {data.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[13px] text-white/50 leading-relaxed mb-6"
                >
                  {data.message}
                </motion.p>

                <div className="flex flex-col gap-3">
                  {data.primaryActionLabel && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => {
                        data.onPrimaryAction?.();
                        onClose();
                      }}
                      className="w-full py-3 bg-[var(--gold)] text-black font-bold text-[13px] rounded-2xl active:scale-[0.98] transition-transform"
                    >
                      {data.primaryActionLabel}
                    </motion.button>
                  )}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={onClose}
                    className="w-full py-3 bg-white/5 border border-white/10 text-white/70 font-bold text-[13px] rounded-2xl active:scale-[0.98] transition-transform"
                  >
                    Done
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
