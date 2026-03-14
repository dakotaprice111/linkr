"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Grid3X3, Link2, Rocket } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  { icon: User, title: "Create Account", desc: "Sign up in seconds. No fees." },
  { icon: Grid3X3, title: "Choose Your Niche", desc: "Pick from 94+ product categories." },
  { icon: Link2, title: "Grab Your Tracking Link", desc: "One click to generate your unique link." },
  { icon: Rocket, title: "Share & Earn", desc: "Post anywhere. Get paid when you sell." },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<number>(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = steps.findIndex((_, i) => {
              const child = el.querySelector(`[data-step="${i}"]`);
              return child && entry.boundingClientRect.top < (child.getBoundingClientRect?.()?.top ?? 0) + 100;
            });
            setVisible((v) => Math.max(v, 0));
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 px-4" ref={ref}>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>
      <div className="max-w-5xl mx-auto relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 border-t border-dashed border-white/20 -translate-y-1/2" style={{ left: "12.5%", right: "12.5%" }} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              data-step={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard hover={false}>
                <div className="p-6 text-center relative">
                  <motion.div
                    className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center mx-auto mb-4 text-[var(--accent-cyan)]"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}
                  >
                    <step.icon className="w-7 h-7" />
                  </motion.div>
                  <div className="font-display font-semibold text-white text-lg mb-2">
                    Step {i + 1}: {step.title}
                  </div>
                  <p className="text-white/60 text-sm">{step.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
