"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Gift, DollarSign, Users, TrendingUp } from "lucide-react";
import QRCode from "qrcode";
import { GlassCard } from "@/components/ui/GlassCard";
import toast from "react-hot-toast";

type MyStats = {
  referralCode: string;
  referralLink: string;
  referralBalance: number;
  totalReferrals: number;
  thisMonthEarnings: number;
  allTimeEarnings: number;
};

type TreeNode = {
  id: string;
  referred: { id: string; name: string; referralCode: string; createdAt: string };
  totalEarned: number;
  status: string;
  level: number;
  thisMonthEarned?: number;
};

export default function DashboardReferralsPage() {
  const [stats, setStats] = useState<MyStats | null>(null);
  const [tree, setTree] = useState<{ level1: TreeNode[]; level2: TreeNode[] } | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/referrals/my").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/referrals/tree").then((r) => (r.ok ? r.json() : null)),
    ]).then(([myData, treeData]) => {
      setStats(myData?.referralLink ? myData : null);
      setTree(treeData?.level1 ? treeData : null);
      if (myData?.referralLink) {
        QRCode.toDataURL(myData.referralLink, { width: 160, margin: 1 }).then(setQrDataUrl);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const copyLink = () => {
    if (!stats?.referralLink) return;
    navigator.clipboard.writeText(stats.referralLink);
    toast.success("Copied!");
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-8">Referrals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-2xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Referrals</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <GlassCard hover={false}>
          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-cyan)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/60 text-sm">Total Referrals</div>
              <div className="font-display text-2xl font-bold text-white">{stats?.totalReferrals ?? 0}</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-mint)]">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/60 text-sm">This Month</div>
              <div className="font-display text-2xl font-bold text-white">${(stats?.thisMonthEarnings ?? 0).toFixed(2)}</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-rose)]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/60 text-sm">All-Time Earnings</div>
              <div className="font-display text-2xl font-bold text-white">${(stats?.allTimeEarnings ?? 0).toFixed(2)}</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-purple)]">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/60 text-sm">Pending Balance</div>
              <div className="font-display text-2xl font-bold text-white">${(stats?.referralBalance ?? 0).toFixed(2)}</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard hover={false} className="mb-8">
        <h2 className="font-display font-semibold text-white mb-4">Your Referral Link</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1 min-w-0">
            <code className="block rounded-xl glass border border-white/10 px-4 py-3 text-sm text-white/80 truncate">
              {stats?.referralLink ?? ""}
            </code>
            <div className="flex gap-3 mt-3">
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-xl btn-neon px-4 py-2 text-sm font-medium"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </div>
          {qrDataUrl && (
            <div className="rounded-xl glass border border-white/10 p-3 flex-shrink-0">
              <img src={qrDataUrl} alt="QR code" className="w-32 h-32" />
            </div>
          )}
        </div>
        <p className="text-white/50 text-sm mt-4">
          Earn 10% of everything your Level 1 referrals earn. Earn 3% from Level 2 (referrals of your referrals). No cap.
        </p>
      </GlassCard>

      {(tree?.level1?.length ?? 0) > 0 && (
        <GlassCard hover={false} className="mb-8">
          <h2 className="font-display font-semibold text-white mb-4">Referral Tree</h2>
          <div className="space-y-4">
            <div className="text-white/60 text-sm">Level 1 — Direct referrals</div>
            <div className="flex flex-wrap gap-3">
              {tree!.level1.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl glass border border-white/10 px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--accent-cyan)] font-semibold">
                    {r.referred.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-white">{r.referred.name}</div>
                    <div className="text-xs text-white/50">
                      Your cut: ${(r.thisMonthEarned ?? 0).toFixed(2)}/mo · Total: ${r.totalEarned.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {tree!.level2.length > 0 && (
              <>
                <div className="text-white/60 text-sm mt-6">Level 2 — Referrals of referrals</div>
                <div className="flex flex-wrap gap-3">
                  {tree!.level2.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-xl glass border border-white/10 px-4 py-3 flex items-center gap-3 opacity-80"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-sm font-semibold">
                        {r.referred.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="font-medium text-white/80 text-sm">{r.referred.name}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </GlassCard>
      )}

      <GlassCard hover={false}>
        <h2 className="font-display font-semibold text-white mb-2">How It Works</h2>
        <p className="text-white/70 text-sm">
          <strong>Level 1:</strong> You earn 10% of all commissions your referred friends make. <strong>Level 2:</strong> You earn 3% of what their referrals make. There&apos;s no limit — the more they earn, the more you earn.
        </p>
      </GlassCard>
    </div>
  );
}
