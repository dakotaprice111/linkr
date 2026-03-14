"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { NICHE_LABELS, NICHE_EMOJI, NICHE_COLORS, TOP_NICHES } from "@/lib/constants";

const nicheCopy: Record<string, string> = {
  "beauty-skincare": "Made for the Beauty Creator. Skincare, makeup, and self-care products your audience will love.",
  fashion: "Style that converts. Curated fashion picks for every aesthetic.",
  "fitness-wellness": "High energy. Equipment, supplements, and gear for fitness creators.",
  "tech-gadgets": "Sharp, sleek, and smart. Tech that performs.",
};

const themeClass: Record<string, string> = {
  "beauty-skincare": "from-rose-500/30 to-pink-500/20",
  fashion: "from-amber-500/30 to-yellow-500/20",
  "fitness-wellness": "from-emerald-500/30 to-cyan-500/20",
  "tech-gadgets": "from-violet-500/30 to-blue-500/20",
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  niche: string;
  commissionPct: number;
};

type Props = { niche: string; products: Product[] };

export function NicheStorefront({ niche, products }: Props) {
  const [followers, setFollowers] = useState(10000);
  const color = NICHE_COLORS[niche] ?? "#06B6D4";
  const estimatedEarnings = Math.round((followers / 1000) * 1.5 * 12); // mock formula

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className={`glass rounded-2xl border border-white/10 p-10 md:p-14 mb-12 bg-gradient-to-br ${themeClass[niche] ?? ""}`}>
        <div className="text-5xl mb-4">{NICHE_EMOJI[niche] ?? "✨"}</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {NICHE_LABELS[niche] ?? niche}
        </h1>
        <p className="text-white/80 text-lg max-w-2xl">
          {nicheCopy[niche] ?? `Explore top products in ${NICHE_LABELS[niche] ?? niche}. Get your link and start earning.`}
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Products</h2>
          {products.length === 0 ? (
            <GlassCard hover={false}>
              <div className="p-12 text-center text-white/60">
                No products in this niche yet. Check back soon!
              </div>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <GlassCard>
                    <div className="aspect-square rounded-t-2xl bg-white/5 bg-cover bg-center" style={{ backgroundImage: p.imageUrls?.[0] ? `url(${p.imageUrls[0]})` : undefined }} />
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-white truncate">{p.name}</h3>
                      <p className="text-white/60 text-sm line-clamp-1">{p.description}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-lg font-bold text-white">${p.price.toFixed(2)}</span>
                        <span className="text-sm font-medium text-emerald-400">Earn {p.commissionPct}%</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <GlassCard hover={false}>
            <h3 className="font-display font-semibold text-white mb-4">Earnings Calculator</h3>
            <p className="text-white/60 text-sm mb-4">Estimate monthly earnings by follower count.</p>
            <input
              type="number"
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value) || 0)}
              className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white mb-4"
            />
            <div className="text-2xl font-bold text-[var(--accent-cyan)]">
              ~${estimatedEarnings}/mo
            </div>
            <p className="text-white/50 text-xs mt-2">Estimate only. Results vary by engagement and niche.</p>
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="font-display font-semibold text-white mb-4">Featured Creators</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                    @{i}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Creator {i}</div>
                    <div className="text-white/50 text-xs">{(i * 5).toFixed(1)}k followers</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
