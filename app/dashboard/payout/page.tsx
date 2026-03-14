"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import toast from "react-hot-toast";

const MIN_PAYOUT = 20;

export default function DashboardPayoutPage() {
  const [balance, setBalance] = useState(0);
  const [payouts, setPayouts] = useState<{ id: string; amount: number; status: string; method: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/stats").then((r) => r.json()),
      fetch("/api/dashboard/links").then((r) => r.json()),
    ]).then(([stats, links]) => {
      const total = (links as { earnings: number }[]).reduce((a, l) => a + l.earnings, 0);
      setBalance(total);
      setPayouts([]);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const progress = Math.min(100, (balance / MIN_PAYOUT) * 100);

  const requestPayout = () => {
    if (balance < MIN_PAYOUT) {
      toast.error(`Minimum payout is $${MIN_PAYOUT}`);
      return;
    }
    toast.success("Payout request submitted. We'll process it within 3-5 business days.");
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Payout</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <GlassCard hover={false}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-mint)]">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <div className="text-white/60 text-sm">Current Balance</div>
              <div className="font-display text-3xl font-bold text-white">
                ${loading ? "—" : balance.toFixed(2)}
              </div>
            </div>
          </div>
          <NeonButton onClick={requestPayout} variant="neon" className="w-full py-3" disabled={balance < MIN_PAYOUT}>
            Request Payout
          </NeonButton>
          <p className="text-white/50 text-xs mt-3">Minimum payout: ${MIN_PAYOUT}</p>
        </GlassCard>

        <GlassCard hover={false}>
          <h3 className="font-display font-semibold text-white mb-4">Connect Payout Method</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl glass border border-white/10 flex items-center justify-between">
              <span className="text-white">PayPal</span>
              <button type="button" className="text-sm text-[var(--accent-cyan)] hover:underline">Connect</button>
            </div>
            <div className="p-4 rounded-xl glass border border-white/10 flex items-center justify-between">
              <span className="text-white">Stripe</span>
              <button type="button" className="text-sm text-[var(--accent-cyan)] hover:underline">Connect</button>
            </div>
            <div className="p-4 rounded-xl glass border border-white/10 flex items-center justify-between">
              <span className="text-white">Bank Transfer</span>
              <button type="button" className="text-sm text-[var(--accent-cyan)] hover:underline">Add account</button>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard hover={false} className="mb-6">
        <h3 className="font-display font-semibold text-white mb-2">Minimum Payout Progress</h3>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-mint)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-white/50 text-sm mt-2">
          ${balance.toFixed(2)} / ${MIN_PAYOUT} — {balance >= MIN_PAYOUT ? "Ready to request!" : "Keep sharing to unlock payout."}
        </p>
      </GlassCard>

      <GlassCard hover={false}>
        <h3 className="font-display font-semibold text-white mb-4">Payout History</h3>
        {payouts.length === 0 ? (
          <p className="text-white/50 text-sm">No payouts yet. Request your first payout when you reach ${MIN_PAYOUT}.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/60 text-sm border-b border-white/10">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Method</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/80">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 pr-4 text-white font-medium">${p.amount.toFixed(2)}</td>
                    <td className="py-3 pr-4 text-white/70">{p.method}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          p.status === "PAID"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : p.status === "PENDING"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-white/10 text-white/70"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
