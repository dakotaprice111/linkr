"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { NICHE_LABELS, NICHE_SLUGS } from "@/lib/constants";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [niches, setNiches] = useState<string[]>([]);
  const [isInfluencer, setIsInfluencer] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleNiche = (slug: string) => {
    setNiches((prev) =>
      prev.includes(slug) ? prev.filter((n) => n !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!terms) {
      toast.error("Please accept the terms");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          niches,
          instagramHandle: isInfluencer ? instagram || undefined : undefined,
          tiktokHandle: isInfluencer ? tiktok || undefined : undefined,
          youtubeHandle: isInfluencer ? youtube || undefined : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Registration failed");
        setLoading(false);
        return;
      }
      setSuccess(true);
      toast.success("Account created!");
      const signInRes = await signIn("credentials", { email, password, redirect: false });
      if (!signInRes?.error) {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        className="w-full max-w-md glass glass-strong rounded-2xl border border-white/10 p-10 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-6 text-3xl">
          ✓
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">You&apos;re in!</h2>
        <p className="text-white/70 mb-6">Redirecting to your dashboard...</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-lg glass glass-strong rounded-2xl border border-white/10 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="font-display text-2xl font-bold text-white text-center mb-6">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white"
            placeholder="Min 8 characters"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Niches (optional)</label>
          <div className="flex flex-wrap gap-2">
            {NICHE_SLUGS.slice(0, 8).map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => toggleNiche(slug)}
                className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                  niches.includes(slug)
                    ? "bg-[var(--accent-cyan)] text-white"
                    : "glass border border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {NICHE_LABELS[slug]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="influencer"
            checked={isInfluencer}
            onChange={(e) => setIsInfluencer(e.target.checked)}
            className="rounded border-white/30"
          />
          <label htmlFor="influencer" className="text-sm text-white/80">I am an Influencer</label>
        </div>
        {isInfluencer && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="rounded-xl glass border border-white/10 px-4 py-2 text-white text-sm"
            />
            <input
              type="text"
              placeholder="TikTok"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              className="rounded-xl glass border border-white/10 px-4 py-2 text-white text-sm"
            />
            <input
              type="text"
              placeholder="YouTube"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="rounded-xl glass border border-white/10 px-4 py-2 text-white text-sm"
            />
          </div>
        )}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="rounded border-white/30 mt-1"
          />
          <label htmlFor="terms" className="text-sm text-white/70">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </div>
        <NeonButton type="submit" variant="neon" className="w-full py-3" disabled={loading || !terms}>
          {loading ? "Creating account..." : "Create Account"}
        </NeonButton>
      </form>
      <p className="mt-6 text-center text-white/60 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-[var(--accent-cyan)] hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
