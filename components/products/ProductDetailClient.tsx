"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, ChevronRight, Play } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { NICHE_LABELS, NICHE_COLORS } from "@/lib/constants";
import toast from "react-hot-toast";

type VideoProof = {
  id: string;
  platform: string;
  creatorName: string;
  videoUrl: string;
  viewCount: number;
  likeCount: number;
  isVerified: boolean;
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

type Props = {
  product: Product;
  related: Product[];
};

const tabs = ["Description", "Specifications", "Reviews"];

export function ProductDetailClient({ product, related }: Props) {
  const { data: session } = useSession();
  const [tab, setTab] = useState(0);
  const [copying, setCopying] = useState(false);
  const [socialProof, setSocialProof] = useState<{ proofs: VideoProof[] } | null>(null);

  useEffect(() => {
    fetch(`/api/products/${product.id}/social-proof`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setSocialProof)
      .catch(() => setSocialProof(null));
  }, [product.id]);

  const copyTrackingLink = async () => {
    if (!session) {
      toast.error("Sign in to get your tracking link");
      window.location.href = "/login?from=/products/" + product.id;
      return;
    }
    setCopying(true);
    try {
      const res = await fetch("/api/links/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      const url = data.link.fullUrl || `${window.location.origin}/go/${data.link.slug}`;
      await navigator.clipboard.writeText(url);
      toast.success("Tracking link copied!");
    } catch {
      toast.error("Could not generate link");
    } finally {
      setCopying(false);
    }
  };

  const breadcrumb = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: `/products?niche=${product.niche}`, label: NICHE_LABELS[product.niche] ?? product.niche },
    { label: product.name },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-white/60 mb-8 flex-wrap">
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="w-4 h-4" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--accent-cyan)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <motion.div
          className="rounded-2xl overflow-hidden glass border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="aspect-square relative bg-white/5 group">
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: product.imageUrls?.[0]
                  ? `url(${product.imageUrls[0]})`
                  : "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(139,92,246,0.1))",
              }}
            />
          </div>
          {product.imageUrls.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {product.imageUrls.map((url, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg bg-white/5 bg-cover bg-center flex-shrink-0 border border-white/10"
                  style={{ backgroundImage: `url(${url})` }}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span
            className="inline-block rounded-lg px-3 py-1 text-sm font-medium text-white mb-4"
            style={{ backgroundColor: (NICHE_COLORS[product.niche] ?? "#06B6D4") + "cc" }}
          >
            {NICHE_LABELS[product.niche] ?? product.niche}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {product.name}
          </h1>
          <p className="text-white/70 mb-6">{product.description}</p>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
            <span className="rounded-lg bg-emerald-500/90 px-3 py-1 text-lg font-semibold text-white">
              Earn {product.commissionPct}%
            </span>
          </div>
          <p className="text-white/50 text-sm mb-6">Free shipping on orders over $50. 30-day returns.</p>
          <NeonButton
            onClick={copyTrackingLink}
            disabled={copying}
            variant="neon"
            className="w-full py-4 text-lg flex items-center justify-center gap-2"
          >
            <Copy className="w-5 h-5" />
            {session ? (copying ? "Copying..." : "Copy Your Tracking Link") : "Sign In to Get Your Link"}
          </NeonButton>
        </motion.div>
      </div>

      {socialProof?.proofs && socialProof.proofs.length > 0 && (
        <GlassCard hover={false} className="mb-10">
          <h2 className="font-display font-semibold text-white mb-4">Creators promoting this product</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {socialProof.proofs.slice(0, 8).map((p) => (
              <a
                key={p.id}
                href={p.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-44 snap-center rounded-xl glass border border-white/10 overflow-hidden group"
              >
                <div className="aspect-[9/16] bg-white/5 relative flex items-center justify-center">
                  <Play className="w-10 h-10 text-white/80 group-hover:text-[var(--accent-cyan)]" />
                </div>
                <div className="p-3">
                  <div className="text-white font-medium text-sm truncate">{p.creatorName}</div>
                  <div className="text-white/50 text-xs">
                    {(p.viewCount / 1e6).toFixed(1)}M views · {(p.likeCount / 1000).toFixed(0)}k likes
                  </div>
                  <span className={`text-xs ${p.platform === "TIKTOK" ? "text-rose-400" : p.platform === "INSTAGRAM" ? "text-purple-400" : "text-red-400"}`}>
                    {p.platform}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard hover={false} className="mb-16">
        <div className="flex border-b border-white/10">
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(i)}
              className={`px-6 py-4 font-medium transition-colors ${
                tab === i
                  ? "text-[var(--accent-cyan)] border-b-2 border-[var(--accent-cyan)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="p-6 text-white/70">
          {tab === 0 && <p>{product.description}</p>}
          {tab === 1 && <p>Material, dimensions, and care instructions vary by product. Check the product page at checkout.</p>}
          {tab === 2 && <p>Reviews coming soon. Share your link and earn when your audience buys!</p>}
        </div>
      </GlassCard>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold text-white mb-6">Related Products</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="flex-shrink-0 w-48">
                <GlassCard>
                  <div className="aspect-square rounded-t-2xl bg-white/5 bg-cover bg-center" style={{ backgroundImage: p.imageUrls?.[0] ? `url(${p.imageUrls[0]})` : undefined }} />
                  <div className="p-3">
                    <div className="font-medium text-white truncate">{p.name}</div>
                    <div className="text-[var(--accent-cyan)] font-semibold">${p.price.toFixed(2)} · Earn {p.commissionPct}%</div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
