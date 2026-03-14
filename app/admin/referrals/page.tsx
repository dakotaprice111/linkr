"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

type ReferralRow = {
  id: string;
  code: string;
  level: number;
  status: string;
  totalEarned: number;
  createdAt: string;
  referrer: { name: string; email: string; referralCode: string };
  referred: { name: string; email: string; createdAt: string };
};

export default function AdminReferralsPage() {
  const [data, setData] = useState<{ referrals: ReferralRow[]; totalEarningsProcessed: number } | null>(null);

  useEffect(() => {
    fetch("/api/admin/referrals")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Referrals</h1>
      {data && (
        <GlassCard hover={false} className="mb-6 p-4">
          <div className="text-white/70 text-sm">
            Total referral earnings processed: <span className="text-[var(--accent-mint)] font-semibold">${data.totalEarningsProcessed?.toFixed(2) ?? "0"}</span>
          </div>
        </GlassCard>
      )}
      <GlassCard hover={false}>
        {!data ? (
          <div className="p-8 text-center text-white/50">Loading...</div>
        ) : data.referrals?.length === 0 ? (
          <div className="p-12 text-center text-white/50">No referral activity yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/60 text-sm border-b border-white/10">
                  <th className="pb-4 pr-4">Referrer</th>
                  <th className="pb-4 pr-4">Referred</th>
                  <th className="pb-4 pr-4">Code</th>
                  <th className="pb-4 pr-4">Level</th>
                  <th className="pb-4 pr-4">Total Earned</th>
                  <th className="pb-4 pr-4">Status</th>
                  <th className="pb-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.referrals.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="py-4 pr-4">
                      <div className="text-white font-medium">{r.referrer?.name}</div>
                      <div className="text-white/50 text-xs">{r.referrer?.email}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="text-white/80">{r.referred?.name}</div>
                      <div className="text-white/50 text-xs">{r.referred?.email}</div>
                    </td>
                    <td className="py-4 pr-4 text-white/80">{r.code}</td>
                    <td className="py-4 pr-4 text-white">L{r.level}</td>
                    <td className="py-4 pr-4 text-[var(--accent-mint)]">${r.totalEarned?.toFixed(2) ?? "0"}</td>
                    <td className="py-4 pr-4">
                      <span className={`rounded-full px-2 py-1 text-xs ${r.status === "ACTIVE" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/60"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4 text-white/50 text-sm">{new Date(r.createdAt).toLocaleDateString()}</td>
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
