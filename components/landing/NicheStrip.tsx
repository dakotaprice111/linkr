"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { NICHE_LABELS, NICHE_EMOJI, NICHE_SLUGS, NICHE_COLORS } from "@/lib/constants";

export function NicheStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8 border-y border-white/5">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-500/50" ref={scrollRef}>
        <div className="flex gap-3 px-4 min-w-max max-w-7xl mx-auto">
          {NICHE_SLUGS.map((slug) => {
            const color = NICHE_COLORS[slug] ?? "#06B6D4";
            return (
              <motion.div
                key={slug}
                whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${color}40` }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/${slug}`}
                  className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:border-white/20 transition-all whitespace-nowrap"
                  style={{ ["--hover-glow" as string]: color } as React.CSSProperties}
                >
                  <span>{NICHE_EMOJI[slug] ?? "✨"}</span>
                  {NICHE_LABELS[slug] ?? slug}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
