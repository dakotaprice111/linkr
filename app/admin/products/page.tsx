"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

type Product = {
  id: string;
  name: string;
  price: number;
  niche: string;
  commissionPct: number;
  isActive: boolean;
  imageUrls: string[];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/products/list")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Products</h1>
        <NeonButton variant="neon" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </NeonButton>
      </div>
      <GlassCard hover={false}>
        {loading ? (
          <div className="p-8 text-center text-white/50">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-white/50">No products yet. Add your first product.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/60 text-sm border-b border-white/10">
                  <th className="pb-4 pr-4">Product</th>
                  <th className="pb-4 pr-4">Niche</th>
                  <th className="pb-4 pr-4">Price</th>
                  <th className="pb-4 pr-4">Commission</th>
                  <th className="pb-4 pr-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg bg-white/10 bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: p.imageUrls?.[0] ? `url(${p.imageUrls[0]})` : undefined }}
                        />
                        <span className="text-white font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-white/80">{p.niche}</td>
                    <td className="py-4 pr-4 text-white">${p.price.toFixed(2)}</td>
                    <td className="py-4 pr-4 text-[var(--accent-mint)]">{p.commissionPct}%</td>
                    <td className="py-4 pr-4">
                      <span className={`rounded-full px-2 py-1 text-xs ${p.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/60"}`}>
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button type="button" className="p-2 rounded-lg glass text-white/80 hover:text-[var(--accent-cyan)]">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-2 rounded-lg glass text-white/80 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
