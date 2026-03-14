"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NICHE_LABELS, NICHE_COLORS } from "@/lib/constants";

const testimonials = [
  {
    quote: "DropLink changed how I monetize my audience. I just share one link and earn from 12 different niches.",
    name: "Alex Rivera",
    niche: "fashion",
    rating: 5,
    handle: "@alexstyle",
  },
  {
    quote: "Finally a platform that gets micro-influencers. The commission rates are fair and payouts are on time.",
    name: "Jordan Lee",
    niche: "beauty-skincare",
    rating: 5,
    handle: "@jordanbeauty",
  },
  {
    quote: "I use it for tech reviews. My followers love the curated products and I love the passive income.",
    name: "Sam Chen",
    niche: "tech-gadgets",
    rating: 5,
    handle: "@techwithsam",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  return (
    <section className="py-20 px-4">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        What Creators Say
      </motion.h2>
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard hover={false}>
                <div className="p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[var(--accent-cyan)] text-[var(--accent-cyan)]"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 text-lg italic mb-6">
                    &ldquo;{testimonials[index].quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-[var(--accent-cyan)]">
                      {testimonials[index].name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonials[index].name}</div>
                      <div className="text-sm text-white/60">{testimonials[index].handle}</div>
                      <span
                        className="inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                        style={{
                          backgroundColor: (NICHE_COLORS[testimonials[index].niche] ?? "#06B6D4") + "99",
                        }}
                      >
                        {NICHE_LABELS[testimonials[index].niche]}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-white hover:border-[var(--accent-cyan)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-white hover:border-[var(--accent-cyan)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
