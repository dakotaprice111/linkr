"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import toast from "react-hot-toast";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }
      toast.success("Welcome back!");
      window.location.href = from;
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md glass glass-strong rounded-2xl border border-white/10 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <h1 className="font-display text-2xl font-bold text-white text-center mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all"
            placeholder="••••••••"
          />
          <Link href="#" className="block text-sm text-[var(--accent-cyan)] mt-2 hover:underline">
            Forgot Password?
          </Link>
        </div>
        {error && (
          <p className="text-sm text-red-400 rounded-lg px-3 py-2 bg-red-500/10 border border-red-500/30">
            {error}
          </p>
        )}
        <NeonButton type="submit" variant="neon" className="w-full py-3" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </NeonButton>
      </form>
      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: from })}
            className="w-full rounded-xl btn-glass border border-white/10 px-4 py-3 text-white flex items-center justify-center gap-2"
          >
            Continue with Google
          </button>
        </div>
      )}
      <p className="mt-6 text-center text-white/60 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[var(--accent-cyan)] hover:underline">
          Create one
        </Link>
      </p>
    </motion.div>
  );
}
