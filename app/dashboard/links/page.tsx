"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import toast from "react-hot-toast";

type LinkRow = {
  id: string;
  slug: string;
  fullUrl: string;
  clicks: number;
  sales: number;
  earnings: number;
  createdAt: string;
  offer: { name: string; imageUrls: string[] };
};

export default function DashboardLinksPage() {
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/links")
      .then((r) => r.json())
      .then(setLinks)
      .catch(() => setLinks([]))
      .finally(() => setLoading(false));
  }, []);

  const copyLink = (fullUrl: string, slug: string) => {
    const url = fullUrl || `${window.location.origin}/go/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Copied!");
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-8">My Links</h1>
        <div className="rounded-2xl overflow-hidden glass">
          <div className="h-12 skeleton" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 border-t border-white/5 skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">My Links</h1>
      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white/60 text-sm border-b border-white/10">
                <th className="pb-4 pr-4">Offer</th>
                <th className="pb-4 pr-4">Tracking URL</th>
                <th className="pb-4 pr-4">Clicks</th>
                <th className="pb-4 pr-4">Sales</th>
                <th className="pb-4 pr-4">Earnings</th>
                <th className="pb-4 pr-4">Created</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-white/50">
                    No tracking links yet. Go to Browse and click &quot;Get My Link&quot; to create one.
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr key={link.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg bg-white/10 bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: link.offer?.imageUrls?.[0] ? `url(${link.offer.imageUrls[0]})` : undefined }}
                        />
                        <span className="text-white font-medium">{link.offer?.name ?? "—"}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <code className="text-xs text-white/70 truncate max-w-[220px] block" title={link.fullUrl || `${typeof window !== "undefined" ? window.location.origin : ""}/go/${link.slug}`}>
                        {link.fullUrl || `/go/${link.slug}`}
                      </code>
                    </td>
                    <td className="py-4 pr-4 text-white">{link.clicks}</td>
                    <td className="py-4 pr-4 text-white">{link.sales}</td>
                    <td className="py-4 pr-4 text-[var(--accent-mint)] font-semibold">${link.earnings.toFixed(2)}</td>
                    <td className="py-4 pr-4 text-white/60 text-sm">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => copyLink(link.fullUrl, link.slug)}
                          className="p-2 rounded-lg glass border border-white/10 text-white/80 hover:text-[var(--accent-cyan)]"
                          title="Copy link"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            copyLink(link.fullUrl, link.slug);
                            toast.success("Copied! Paste in your bio.");
                          }}
                          className="p-2 rounded-lg glass border border-white/10 text-white/80 hover:text-[var(--accent-cyan)]"
                          title="Copy with UTM for bio"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
