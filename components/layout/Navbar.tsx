"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Hexagon } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Creators" },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY && y > 80) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass glass-strong rounded-b-2xl border-t-0" : ""
      }`}
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span
              className="text-[var(--accent-cyan)]"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Hexagon className="w-7 h-7" strokeWidth={2} />
            </motion.span>
            <span className="font-display font-bold text-xl gradient-text">LINKR</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-cyan)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {status === "loading" ? (
              <div className="h-9 w-20 rounded-lg skeleton" />
            ) : session ? (
              <NeonButton href="/dashboard" variant="neon">
                Dashboard
              </NeonButton>
            ) : (
              <>
                <NeonButton href="/login" variant="glass">
                  Sign In
                </NeonButton>
                <NeonButton href="/register" variant="neon">
                  Join Now
                </NeonButton>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg glass text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-white/90 hover:text-white font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 flex gap-3">
                {!session && (
                  <>
                    <NeonButton href="/login" variant="glass" className="flex-1">
                      Sign In
                    </NeonButton>
                    <NeonButton href="/register" variant="neon" className="flex-1">
                      Join Now
                    </NeonButton>
                  </>
                )}
                {session && (
                  <NeonButton href="/dashboard" variant="neon" className="w-full">
                    Dashboard
                  </NeonButton>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
