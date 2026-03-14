"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MousePointer, ShoppingBag, DollarSign, TrendingUp, Search, Copy } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import toast from "react-hot-toast";

const icons = {
  clicks: MousePointer,
  sales: ShoppingBag,
  earnings: DollarSign,
  conversion: TrendingUp,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<{
    totalClicks: number;
    totalSales: number;
    totalEarnings: number;
    conversionRate: number;
  } | null>(null);
  const [activity, setActivity] = useState<{ productName: string; type: string; date: string }[]>([]);
  const [quickSearch, setQuickSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((d) => {
        setStats({
          totalClicks: d.totalClicks ?? 0,
          totalSales: d.totalSales ?? 0,
          totalEarnings: d.totalEarnings ?? 0,
          conversionRate: d.conversionRate ?? 0,
        });
      })
      .catch(() => setStats({ totalClicks: 0, totalSales: 0, totalEarnings: 0, conversionRate: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const kpis = stats
    ? [
        { key: "clicks", label: "Total Clicks", value: stats.totalClicks, icon: icons.clicks },
        { key: "sales", label: "Total Sales", value: stats.totalSales, icon: icons.sales },
        { key: "earnings", label: "Total Earnings", value: `$${stats.totalEarnings.toFixed(2)}`, icon: icons.earnings },
        { key: "conversion", label: "Conversion Rate", value: `${stats.conversionRate}%`, icon: icons.conversion },
      ]
    : [];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Overview</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl skeleton" />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
        >
          {kpis.map((kpi) => (
            <motion.div
              key={kpi.key}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <GlassCard hover={false}>
                <div className="p-5 flex items-start justify-between">
                  <div>
                    <div className="text-white/60 text-sm">{kpi.label}</div>
                    <div className="font-display text-2xl font-bold text-white mt-1">
                      {typeof kpi.value === "number" ? kpi.value.toLocaleString() : kpi.value}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-cyan)]">
                    <kpi.icon className="w-5 h-5" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      <GlassCard hover={false} className="mb-10">
        <h2 className="font-display font-semibold text-white mb-4">Quick Share</h2>
        <p className="text-white/60 text-sm mb-4">Search for a product and copy your tracking link.</p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="search"
              placeholder="Search products..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full rounded-xl glass border border-white/10 pl-10 pr-4 py-2.5 text-white"
            />
          </div>
          <NeonButton variant="neon" className="py-2.5">
            Get Link
          </NeonButton>
        </div>
      </GlassCard>

      <GlassCard hover={false}>
        <h2 className="font-display font-semibold text-white mb-4">Recent Activity</h2>
        {activity.length === 0 ? (
          <p className="text-white/50 text-sm">No recent clicks or sales. Start sharing your links!</p>
        ) : (
          <ul className="space-y-3">
            {activity.map((a, i) => (
              <li key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-white/80">{a.productName} — {a.type}</span>
                <span className="text-white/50 text-sm">{a.date}</span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/dashboard/links" className="inline-block mt-4 text-[var(--accent-cyan)] text-sm font-medium hover:underline">
          View all links →
        </Link>
      </GlassCard>
    </div>
  );
}
