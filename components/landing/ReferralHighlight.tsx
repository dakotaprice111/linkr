"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

const referralStats = [
  { value: "$47", label: "Avg referral earns/mo extra" },
  { value: "$1.2k", label: "Top referrer from referrals" },
  { value: "2 levels", label: "Deep commissions" },
];

export function ReferralHighlight() {
  return (
    <section className="py-20 px-4">
      <GlassCard hover={false} className="max-w-4xl mx-auto p-8 md:p-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl glass border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)]">
            <Gift className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Earn Even More — Refer Friends
          </h2>
        </div>
        <p className="text-white/70 mb-8">
          Get paid when your friends get paid. Earn <strong className="text-[var(--accent-cyan)]">10%</strong> of every dollar your referrals make. Forever. No cap.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {referralStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl glass border border-white/10 p-4 text-center"
            >
              <div className="font-display text-xl font-bold text-[var(--accent-cyan)]">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm text-white/60">
          <span>You</span>
          <span className="text-[var(--accent-cyan)]">→ 10%</span>
          <span>Friend</span>
          <span className="text-[var(--accent-cyan)]">→ 3%</span>
          <span>Their Friend</span>
        </div>
        <div className="text-center">
          <NeonButton href="/register" variant="neon">
            Start Referring Today
          </NeonButton>
        </div>
      </GlassCard>
    </section>
  );
}
