"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

const tiers = [
  {
    name: "Free",
    price: "$0",
    desc: "For creators getting started",
    features: ["Unlimited tracking links", "All niches", "Standard commission rates", "Dashboard & analytics", "Referral program (10% / 3%)"],
    cta: "Get Started Free",
    href: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    desc: "For serious creators",
    features: ["Everything in Free", "Custom referral code", "Priority support", "Higher commission on select products"],
    cta: "Go Pro",
    href: "/register",
    featured: true,
  },
  {
    name: "Elite",
    price: "$49",
    period: "/mo",
    desc: "For top performers",
    features: ["Everything in Pro", "Dedicated account manager", "Early access to new products", "Elite badge"],
    cta: "Contact Sales",
    href: "/register",
    featured: false,
  },
];

export function PricingContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.h1
        className="font-display text-4xl md:text-5xl font-bold text-white text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Simple, Transparent <span className="gradient-text">Pricing</span>
      </motion.h1>
      <p className="text-white/70 text-center text-lg mb-12 max-w-2xl mx-auto">
        Start free. Upgrade when you&apos;re ready to grow.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className={`p-8 h-full flex flex-col ${tier.featured ? "border-[var(--accent-cyan)]/50 ring-1 ring-[var(--accent-cyan)]/30" : ""}`}>
              <div className="font-display text-xl font-semibold text-white mb-1">{tier.name}</div>
              <div className="text-3xl font-bold text-white mb-1">
                {tier.price}
                {tier.period && <span className="text-lg font-normal text-white/60">{tier.period}</span>}
              </div>
              <p className="text-white/60 text-sm mb-6">{tier.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-[var(--accent-mint)] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <NeonButton href={tier.href} variant={tier.featured ? "neon" : "glass"} className="w-full py-3">
                {tier.cta}
              </NeonButton>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard hover={false} className="p-8 md:p-10 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl glass border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)]">
            <Gift className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Refer Friends. Earn Forever.</h2>
        </div>
        <p className="text-white/70 mb-6">
          Earn <strong className="text-[var(--accent-cyan)]">10%</strong> of everything your Level 1 referrals make, and{" "}
          <strong className="text-[var(--accent-cyan)]">3%</strong> from Level 2. There&apos;s no limit.
        </p>
        <p className="text-white/50 text-sm mb-6">
          Example: If you refer 10 friends who each earn $200/month, you earn $200/month extra — forever.
        </p>
        <NeonButton href="/dashboard/referrals" variant="neon">
          Get Your Referral Link
        </NeonButton>
      </GlassCard>
    </div>
  );
}
