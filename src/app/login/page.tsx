"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Full reload to allow proxy to catch the new cookie
        window.location.href = '/';
      } else if (response.status === 401) {
        setError('Incorrect password');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen w-full px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative bg-[var(--c-card)] border border-[var(--c-border)] rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden before:absolute before:inset-0 before:border before:border-[var(--gold)]/20 before:rounded-[24px] before:animate-gold-shine before:pointer-events-none"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-52 h-14 mb-3 relative">
              <Image
                src="/sid-x_logo.png"
                alt="SIDX"
                fill
                priority
                className="object-contain drop-shadow-[0_0_20px_rgba(200,125,42,0.2)]"
              />
            </div>
            <p className="font-mono text-xs tracking-[0.25em] text-[var(--gold-text)] uppercase font-semibold">
              Members Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter access code"
                aria-label="Access password"
                autoFocus
                className="w-full bg-[var(--c-elevated)] text-[var(--c-text-h)] placeholder-[var(--c-text-muted)] border border-[var(--c-border)] rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-[var(--gold)]/50 focus:ring-1 focus:ring-[var(--gold)]/50 transition-all font-mono text-sm tracking-widest text-center"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--c-text-muted)] hover:text-[var(--c-text-h)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-6 left-0 right-0 text-center text-xs text-[var(--red-semantic)] font-mono"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="mt-2 w-full bg-gradient-to-r from-[var(--olive)] to-[var(--gold)] text-[var(--c-base)] font-bold tracking-wide py-4 rounded-xl shadow-[0_4px_16px_rgba(201,168,76,0.3)] disabled:opacity-70 flex items-center justify-center transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[var(--c-base)] border-t-transparent rounded-full animate-spin" />
              ) : (
                "ENTER"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
