"use client";

import Link from "next/link";
import { NeonButton } from "@/components/ui/NeonButton";

export default function DashboardProductsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Products</h1>
      <div className="glass rounded-2xl border border-white/10 p-12 text-center">
        <p className="text-white/70 mb-6">Browse products and generate tracking links from the main catalog.</p>
        <NeonButton href="/products" variant="neon">
          Browse Products
        </NeonButton>
      </div>
    </div>
  );
}
