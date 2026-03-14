"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { NICHE_LABELS, NICHE_COLORS } from "@/lib/constants";
import { SAMPLE_PRODUCTS } from "@/lib/sampleProducts";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  niche: string;
  commissionPct: number;
};

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=6")
      .then((r) => r.json())
      .then((d) => {
        if (d.products?.length) setProducts(d.products);
        else setProducts(SAMPLE_PRODUCTS as Product[]);
      })
      .catch(() => setProducts(SAMPLE_PRODUCTS as Product[]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-4" id="trending">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Trending Products
      </motion.h2>
      <motion.div
        className="w-24 h-1 rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] mb-12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "left" }}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="aspect-square skeleton" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 skeleton" />
                <div className="h-4 w-1/2 skeleton" />
                <div className="h-8 w-1/4 skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {products.slice(0, 6).map((product, i) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <GlassCard>
                <Link href={`/products/${product.id}`} className="block group">
                  <div className="aspect-square relative overflow-hidden rounded-t-2xl bg-white/5">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500"
                      style={{
                        backgroundImage: product.imageUrls?.[0]
                          ? `url(${product.imageUrls[0]})`
                          : "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(139,92,246,0.1))",
                      }}
                    />
                    <div
                      className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--accent-cyan)] rounded-t-2xl transition-all duration-300"
                      style={{
                        boxShadow: "inset 0 0 30px rgba(0,212,255,0)",
                      }}
                    />
                    <span
                      className="absolute top-3 left-3 rounded-lg px-2 py-1 text-xs font-medium text-white"
                      style={{
                        backgroundColor: (NICHE_COLORS[product.niche] ?? "#06B6D4") + "cc",
                      }}
                    >
                      {NICHE_LABELS[product.niche] ?? product.niche}
                    </span>
                    <span className="absolute top-3 right-3 rounded-lg bg-emerald-500/90 px-2 py-1 text-xs font-semibold text-white">
                      Earn {product.commissionPct}%
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-white group-hover:text-[var(--accent-cyan)] transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-white/60 text-sm mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                      <NeonButton href={`/products/${product.id}`} variant="glass" className="text-sm py-2">
                        Get Link
                      </NeonButton>
                    </div>
                  </div>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}
      <div className="text-center mt-10">
        <NeonButton href="/products" variant="neon">
          View All Products
        </NeonButton>
      </div>
    </section>
  );
}
