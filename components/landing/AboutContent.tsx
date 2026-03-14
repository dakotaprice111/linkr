"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Heart, Shield } from "lucide-react";

const team = [
  { name: "Alex Morgan", role: "CEO", color: "var(--accent-cyan)" },
  { name: "Jordan Kim", role: "Head of Product", color: "var(--accent-purple)" },
  { name: "Sam Rivera", role: "Head of Creator Success", color: "var(--accent-rose)" },
  { name: "Casey Lee", role: "CTO", color: "var(--accent-mint)" },
];

const values = [
  { icon: Shield, title: "Transparency", desc: "Clear commission structures and real-time analytics. No hidden fees." },
  { icon: Heart, title: "Creator-First", desc: "We exist to empower creators. Your success is our success." },
  { icon: Target, title: "Quality Products", desc: "Every product is vetted. Your audience gets the best." },
];

export function AboutContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.section
        className="glass rounded-2xl border border-white/10 p-12 text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
          We&apos;re Building the Creator Economy of Tomorrow
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          DropLink connects micro-influencers with quality products across every niche.
        </p>
      </motion.section>

      <section className="grid md:grid-cols-2 gap-12 mb-20">
        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            We started DropLink because we saw a gap: brands had products, creators had audiences, but the tools to connect them were clunky and unfair. We built a platform where any creator—whether you have 1K or 1M followers—can earn by sharing products they love, across beauty, tech, fashion, fitness, and dozens more niches.
          </p>
          <p className="text-white/70 leading-relaxed">
            Today we work with thousands of creators and hundreds of brands. Our mission is simple: make influencer commerce transparent, accessible, and rewarding for everyone.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: "12,847", label: "Active Creators" },
            { value: "94", label: "Niches" },
            { value: "$2.3M+", label: "Paid Out" },
            { value: "125+", label: "Countries" },
          ].map((stat) => (
            <GlassCard key={stat.label} hover={false}>
              <div className="p-4 text-center">
                <div className="font-display text-2xl font-bold text-[var(--accent-cyan)]">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      <section className="mb-20">
        <motion.h2
          className="font-display text-3xl font-bold text-white text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet the Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard>
                <div className="p-6 text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white border-2"
                    style={{ borderColor: person.color, backgroundColor: person.color + "33" }}
                  >
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="font-display font-semibold text-white">{person.name}</div>
                  <span
                    className="inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.role}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <motion.h2
          className="font-display text-3xl font-bold text-white text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard>
                <div className="p-8 text-center">
                  <div className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center mx-auto mb-4 text-[var(--accent-cyan)]">
                    <v.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-xl mb-2">{v.title}</h3>
                  <p className="text-white/60 text-sm">{v.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        className="glass rounded-2xl border-2 border-[var(--accent-cyan)]/50 p-12 text-center"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-display text-2xl md:text-3xl italic text-white/90 max-w-3xl mx-auto">
          &ldquo;Our mission is to make every creator able to earn from what they love—with transparency, quality products, and a platform that puts them first.&rdquo;
        </p>
      </motion.section>
    </div>
  );
}
