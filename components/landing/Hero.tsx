"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";

const words = "The Future of Influencer Commerce".split(" ");

const stats = [
  { value: "12,847", label: "Active Influencers" },
  { value: "$2.3M", label: "Commissions Paid" },
  { value: "94", label: "Niches" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {i === 2 || i === 3 ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Connect. Share. Earn. — Multi-niche dropshipping powered by real creators.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <NeonButton href="/register">Start Earning</NeonButton>
          <NeonButton href="/products" variant="glass">
            Explore Products
          </NeonButton>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="animate-[float-card_6s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <GlassCard hover={false}>
              <div className="p-5 text-center">
                <div className="font-display text-2xl font-bold text-[var(--accent-cyan)]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
