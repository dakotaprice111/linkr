"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Search, Copy, LogIn } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NICHE_LABELS, NICHE_EMOJI, NICHE_SLUGS, NICHE_COLORS, SORT_OPTIONS, OFFER_TYPES } from "@/lib/constants";
import toast from "react-hot-toast";

type Offer = {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  commissionPct: number;
  price: number | null;
  imageUrls: string[];
  popularityScore: number;
  totalCreators: number;
};

export function BrowseContent() {
  const { data: session } = useSession();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category) params.set("category", category);
    if (type) params.set("type", type);
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", "12");
    fetch(`/api/offers?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setOffers(d.offers ?? []);
        setTotalPages(d.totalPages ?? 1);
      })
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, [search, category, type, sort, page]);

  const copyOrPromptLogin = async (offerId: string) => {
    if (!session) {
      toast.error("Please sign in to get your tracking link");
      window.location.href = "/login?callbackUrl=/browse";
      return;
    }
    try {
      const res = await fetch("/api/links/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: offerId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      const url = data.link.fullUrl || `${window.location.origin}/go/${data.link.slug}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch {
      toast.error("Could not generate link");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">Browse Offers</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="search"
            placeholder="Search offers..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl glass border border-white/10 pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)]"
          />
        </div>
        <select
          value={type}
          onChange={(e) => { setType(e.target.value); setPage(1); }}
          className="rounded-xl glass border border-white/10 px-4 py-3 text-white bg-transparent"
        >
          <option value="">All types</option>
          {OFFER_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="bg-[#0f0f12]">{t.label}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="rounded-xl glass border border-white/10 px-4 py-3 text-white bg-transparent"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#0f0f12]">{o.label}</option>
          ))}
        </select>
      </div>
      <div id="categories" className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => { setCategory(""); setPage(1); }}
          className={`rounded-full px-4 py-2 text-sm font-medium ${!category ? "glass border-[var(--accent-cyan)] text-[var(--accent-cyan)]" : "glass border-white/10 text-white/70"}`}
        >
          All
        </button>
        {NICHE_SLUGS.map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => { setCategory(slug); setPage(1); }}
            className={`rounded-full px-4 py-2 text-sm font-medium flex items-center gap-1 ${category === slug ? "border text-white" : "glass border-white/10 text-white/70"}`}
            style={category === slug ? { borderColor: NICHE_COLORS[slug], backgroundColor: NICHE_COLORS[slug] + "22" } : {}}
          >
            <span>{NICHE_EMOJI[slug]}</span>
            {NICHE_LABELS[slug]}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="aspect-square skeleton" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 skeleton" />
                <div className="h-4 w-full skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : offers.length === 0 ? (
        <GlassCard hover={false}>
          <div className="p-12 text-center text-white/60">No offers found. Try different filters.</div>
        </GlassCard>
      ) : (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" layout>
          {offers.map((offer) => (
            <motion.div key={offer.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard>
                <div className="overflow-hidden rounded-t-2xl aspect-square bg-white/5 relative group">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: offer.imageUrls?.[0] ? `url(${offer.imageUrls[0]})` : "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(139,92,246,0.1))",
                    }}
                  />
                  <span className="absolute top-2 left-2 rounded-lg px-2 py-1 text-xs font-medium text-white" style={{ backgroundColor: (NICHE_COLORS[offer.category] ?? "#06B6D4") + "cc" }}>
                    {NICHE_LABELS[offer.category] ?? offer.category}
                  </span>
                  <span className="absolute top-2 right-2 rounded-lg bg-emerald-500/90 px-2 py-1 text-xs font-semibold text-white">
                    Earn {offer.commissionPct}%
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-white/50 uppercase">{offer.type}</span>
                  <h2 className="font-display font-semibold text-white truncate">{offer.name}</h2>
                  <p className="text-white/60 text-sm line-clamp-2 mt-1">{offer.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    {offer.price != null && <span className="text-lg font-bold text-white">${offer.price.toFixed(2)}</span>}
                    <span className="text-white/50 text-sm">{offer.totalCreators} promoters</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/browse/${offer.id}`} className="flex-1 rounded-xl btn-glass border border-white/10 px-4 py-2 text-sm font-medium text-center text-white/90">
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => copyOrPromptLogin(offer.id)}
                      className="rounded-xl btn-glass border border-white/10 px-4 py-2 text-sm font-medium text-white/90 flex items-center justify-center gap-1"
                    >
                      {session ? <Copy className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                      {session ? "Get Link" : "Login"}
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-xl glass border border-white/10 px-4 py-2 text-white disabled:opacity-50">Previous</button>
          <span className="rounded-xl glass border border-white/10 px-4 py-2 text-white">{page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-xl glass border border-white/10 px-4 py-2 text-white disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
}
