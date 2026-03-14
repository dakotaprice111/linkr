"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

type Influencer = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  _count: { trackingLinks: number };
};

export default function AdminInfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/influencers")
      .then((r) => r.json())
      .then(setInfluencers)
      .catch(() => setInfluencers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Influencers</h1>
      <GlassCard hover={false}>
        {loading ? (
          <div className="p-8 text-center text-white/50">Loading...</div>
        ) : influencers.length === 0 ? (
          <div className="p-12 text-center text-white/50">No influencers registered yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/60 text-sm border-b border-white/10">
                  <th className="pb-4 pr-4">Name</th>
                  <th className="pb-4 pr-4">Email</th>
                  <th className="pb-4 pr-4">Links</th>
                  <th className="pb-4 pr-4">Joined</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {influencers.map((u) => (
                  <tr key={u.id} className="border-b border-white/5">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--accent-cyan)] font-semibold">
                          {u.name[0]}
                        </div>
                        <span className="text-white font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-white/70">{u.email}</td>
                    <td className="py-4 pr-4 text-white">{u._count.trackingLinks}</td>
                    <td className="py-4 pr-4 text-white/60 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${u.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                        {u.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {u.isActive ? "Active" : "Suspended"}
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
