"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Grid3X3, Link2, Rocket } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

const steps = [
  { icon: User, title: "Create Account", desc: "Sign up in seconds. No credit card required." },
  { icon: Grid3X3, title: "Choose Your Niche", desc: "Pick from 94+ product categories." },
  { icon: Link2, title: "Grab Your Tracking Link", desc: "One click to generate your unique /go link." },
  { icon: Rocket, title: "Share & Earn", desc: "Post anywhere. Get paid when you sell." },
];

export function HowItWorksContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.h1
        className="font-display text-4xl font-bold text-white text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How It <span className="gradient-text">Works</span>
      </motion.h1>
      <p className="text-white/70 text-center mb-12">
        Four steps to start earning. Zero inventory. Zero risk.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard>
              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--accent-cyan)] flex-shrink-0">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-semibold text-white text-lg mb-1">Step {i + 1}: {step.title}</div>
                  <p className="text-white/60 text-sm">{step.desc}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <NeonButton href="/register" variant="neon">
          Get Started Free
        </NeonButton>
      </div>
    </div>
  );
}
