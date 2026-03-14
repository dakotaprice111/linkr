"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Store } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

export function DualValueProp() {
  return (
    <section className="py-20 px-4">
      <motion.h2
        className="font-display text-3xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Who Are You?
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/register">
            <GlassCard className="p-8 h-full hover:border-[var(--accent-cyan)]/30 transition-colors">
              <div className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-cyan)] mb-6">
                <User className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">I&apos;m a Creator</h3>
              <ul className="text-white/70 text-sm space-y-2 mb-6">
                <li>• Get unique tracking links for any product</li>
                <li>• Earn commission on every sale</li>
                <li>• Refer friends and earn 10% of their earnings</li>
                <li>• Zero inventory, zero risk</li>
              </ul>
              <span className="inline-flex items-center justify-center rounded-xl btn-neon px-5 py-2.5 font-semibold text-white">
                Get Started Free
              </span>
            </GlassCard>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/register">
            <GlassCard className="p-8 h-full hover:border-[var(--accent-purple)]/30 transition-colors">
              <div className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-purple)] mb-6">
                <Store className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">I Have a Product</h3>
              <ul className="text-white/70 text-sm space-y-2 mb-6">
                <li>• List your product on DropLink</li>
                <li>• Thousands of creators promote for you</li>
                <li>• Pay only when you make a sale</li>
                <li>• Scale with affiliate marketing</li>
              </ul>
              <span className="inline-flex items-center justify-center rounded-xl btn-glass px-5 py-2.5 font-semibold text-white/90">
                List Your Product
              </span>
            </GlassCard>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
