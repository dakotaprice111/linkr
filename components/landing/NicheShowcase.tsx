"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { TOP_NICHES, NICHE_LABELS, NICHE_EMOJI } from "@/lib/constants";

const nicheThemes: Record<string, string> = {
  "beauty-skincare": "from-rose-500/20 to-pink-500/20",
  fashion: "from-amber-500/20 to-yellow-500/20",
  "fitness-wellness": "from-emerald-500/20 to-cyan-500/20",
  "tech-gadgets": "from-violet-500/20 to-blue-500/20",
};

export function NicheShowcase() {
  return (
    <section className="py-20 px-4">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Built for Every Creator
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {TOP_NICHES.map((slug, i) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/${slug}`}>
              <div
                className={`glass rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${nicheThemes[slug] ?? ""} p-6 h-full flex flex-col`}
              >
                <div className="text-4xl mb-4">{NICHE_EMOJI[slug] ?? "✨"}</div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {NICHE_LABELS[slug] ?? slug}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    @creator
                  </div>
                  <span>12.5k followers · $2.1k earned</span>
                </div>
                <span className="mt-auto inline-flex items-center justify-center rounded-xl btn-glass px-4 py-2.5 w-full text-sm font-semibold">
                  Explore Niche
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
