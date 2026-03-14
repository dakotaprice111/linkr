"use client";

import Link from "next/link";
import { Hexagon } from "lucide-react";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";

const footerLinks = {
  Product: [
    { href: "/products", label: "Products" },
    { href: "/products#niches", label: "Niches" },
    { href: "/about", label: "About" },
  ],
  Creators: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/register", label: "Join as Influencer" },
    { href: "/login", label: "Sign In" },
  ],
  Legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
  ],
};

const socials = [
  { name: "Twitter", href: "#", icon: "𝕏" },
  { name: "Instagram", href: "#", icon: "📷" },
  { name: "LinkedIn", href: "#", icon: "in" },
];

export function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Hexagon className="w-6 h-6 text-[var(--accent-cyan)]" />
              <span className="font-display font-bold text-lg gradient-text">DROPLINK</span>
            </Link>
            <p className="text-white/60 text-sm">
              The future of influencer commerce. Connect, share, earn.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/80 hover:text-[var(--accent-cyan)] transition-colors"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[var(--accent-cyan)] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} DropLink. All rights reserved.
          </p>
          <form
            className="flex gap-2 w-full sm:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 min-w-0 rounded-xl glass border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all"
            />
            <NeonButton type="submit" variant="neon">
              Subscribe
            </NeonButton>
          </form>
        </div>
      </div>
    </footer>
  );
}
