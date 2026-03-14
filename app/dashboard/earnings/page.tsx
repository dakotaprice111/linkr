"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function DashboardEarningsPage() {
  const [stats, setStats] = useState<{ totalEarnings: number; totalSales: number } | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Earnings</h1>
      <GlassCard hover={false} className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-mint)]">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <div className="text-white/60 text-sm">Total Earnings</div>
            <div className="font-display text-3xl font-bold text-white">
              ${(stats?.totalEarnings ?? 0).toFixed(2)}
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm">
          From {stats?.totalSales ?? 0} sales. Payouts are available from the Payout tab once you reach the minimum.
        </p>
      </GlassCard>
    </div>
  );
}
