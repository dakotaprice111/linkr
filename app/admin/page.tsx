"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, MousePointer, ShoppingBag } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminPage() {
  const [stats, setStats] = useState({
    revenue: 0,
    influencers: 0,
    clicks: 0,
    orders: 0,
  });

  useEffect(() => {
    // Mock; in production aggregate from DB
    setStats({
      revenue: 125000,
      influencers: 2847,
      clicks: 450000,
      orders: 12500,
    });
  }, []);

  const kpis = [
    { label: "Total Revenue", value: `$${(stats.revenue / 1000).toFixed(0)}k`, icon: DollarSign },
    { label: "Total Influencers", value: stats.influencers.toLocaleString(), icon: Users },
    { label: "Total Clicks", value: stats.clicks.toLocaleString(), icon: MousePointer },
    { label: "Total Orders", value: stats.orders.toLocaleString(), icon: ShoppingBag },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <GlassCard key={kpi.label} hover={false}>
            <div className="p-5 flex items-start justify-between">
              <div>
                <div className="text-white/60 text-sm">{kpi.label}</div>
                <div className="font-display text-2xl font-bold text-white mt-1">{kpi.value}</div>
              </div>
              <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-cyan)]">
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
