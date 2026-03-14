"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Users, DollarSign, Package } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";

type Props = {
  referrer: {
    name: string;
    image: string | null;
    code: string;
    linksCount: number;
    referralsCount: number;
    earningsEstimate: number;
  };
  creatorCount: number;
};

export function RefLandingClient({ referrer, creatorCount }: Props) {
  const registerUrl = `/register?ref=${referrer.code}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <GlassCard hover={false} className="p-8 md:p-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass border border-[var(--accent-cyan)]/30 px-4 py-2 text-sm text-[var(--accent-cyan)] mb-6">
            <Gift className="w-4 h-4" />
            You&apos;ve been invited
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            You&apos;ve been invited by <span className="gradient-text">{referrer.name}</span>!
          </h1>
          <p className="text-white/70 mb-8">
            Join DropLink and start earning by sharing products you love.
          </p>
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-[var(--accent-cyan)]/50 flex items-center justify-center text-3xl font-bold text-[var(--accent-cyan)] mx-auto mb-6">
            {referrer.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl glass border border-white/10 p-3">
              <DollarSign className="w-5 h-5 text-[var(--accent-mint)] mx-auto mb-1" />
              <div className="text-lg font-bold text-white">${Math.round(referrer.earningsEstimate)}/mo</div>
              <div className="text-xs text-white/50">earning on DropLink</div>
            </div>
            <div className="rounded-xl glass border border-white/10 p-3">
              <Package className="w-5 h-5 text-[var(--accent-cyan)] mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{referrer.linksCount}</div>
              <div className="text-xs text-white/50">products promoted</div>
            </div>
            <div className="rounded-xl glass border border-white/10 p-3">
              <Users className="w-5 h-5 text-[var(--accent-rose)] mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{referrer.referralsCount}</div>
              <div className="text-xs text-white/50">referrals</div>
            </div>
          </div>
          <p className="text-white/50 text-sm mb-6">
            Join {creatorCount.toLocaleString()}+ creators already earning on DropLink
          </p>
          <NeonButton href={registerUrl} variant="neon" className="w-full py-4 text-lg">
            Join DropLink Free with {referrer.name}&apos;s Link
          </NeonButton>
        </GlassCard>
      </motion.div>
    </div>
  );
}
