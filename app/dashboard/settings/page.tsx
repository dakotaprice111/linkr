"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export default function DashboardSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Settings</h1>
      <GlassCard hover={false} className="p-8">
        <h2 className="font-display font-semibold text-white mb-4">Profile</h2>
        <p className="text-white/60 text-sm mb-6">
          Update your profile and notification preferences here. (Full settings form can be wired to /api/user/profile.)
        </p>
        <div className="rounded-xl glass border border-white/10 px-4 py-3 text-white/50 text-sm">
          Coming soon: profile edit, notification toggles, connected accounts.
        </div>
      </GlassCard>
    </div>
  );
}
