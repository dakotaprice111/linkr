"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";

const TRAFFIC_DATA = [
  { date: "Mon", clicks: 120 },
  { date: "Tue", clicks: 180 },
  { date: "Wed", clicks: 150 },
  { date: "Thu", clicks: 220 },
  { date: "Fri", clicks: 190 },
  { date: "Sat", clicks: 280 },
  { date: "Sun", clicks: 240 },
];

const SALES_BY_PRODUCT = [
  { name: "Glow Serum", sales: 12 },
  { name: "Earbuds X", sales: 8 },
  { name: "Yoga Mat", sales: 15 },
  { name: "Smart Strip", sales: 6 },
];

const SOURCES = [
  { name: "Instagram", value: 45, color: "#E1306C" },
  { name: "TikTok", value: 30, color: "#00D4FF" },
  { name: "Direct", value: 15, color: "#8B5CF6" },
  { name: "Other", value: 10, color: "#10B981" },
];

export default function DashboardAnalyticsPage() {
  const [range, setRange] = useState("7d");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-xl glass border border-white/10 px-4 py-2 text-white bg-transparent"
        >
          <option value="7d" className="bg-[#0f0f12]">Last 7 days</option>
          <option value="30d" className="bg-[#0f0f12]">Last 30 days</option>
          <option value="90d" className="bg-[#0f0f12]">Last 90 days</option>
        </select>
      </div>

      <div className="space-y-8">
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-white mb-6">Traffic Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TRAFFIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "rgba(2,2,8,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="clicks" stroke="var(--accent-cyan)" strokeWidth={2} dot={{ fill: "var(--accent-cyan)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard hover={false}>
            <h2 className="font-display font-semibold text-white mb-6">Sales by Product</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_BY_PRODUCT} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} width={70} />
                  <Tooltip
                    contentStyle={{ background: "rgba(2,2,8,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                  />
                  <Bar dataKey="sales" fill="var(--accent-cyan)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <h2 className="font-display font-semibold text-white mb-6">Traffic Sources</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SOURCES}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {SOURCES.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "rgba(2,2,8,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                    formatter={(value: number) => [`${value}%`, "Traffic"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-white mb-6">Top Countries</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { country: "United States", share: "42%" },
              { country: "United Kingdom", share: "18%" },
              { country: "Canada", share: "12%" },
              { country: "Australia", share: "8%" },
            ].map((row) => (
              <div key={row.country} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-medium text-white">{row.country}</div>
                <div className="text-[var(--accent-cyan)] font-semibold">{row.share}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
