"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Store, Building2 } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { NICHE_LABELS, NICHE_SLUGS } from "@/lib/constants";
import toast from "react-hot-toast";

const ROLES = [
  {
    id: "INFLUENCER" as const,
    icon: Video,
    title: "I'm a Creator",
    desc: "Promote products, apps, websites and services to your audience. Earn commission on every sale. 100% free forever.",
    badge: "FREE FOREVER",
    accent: "var(--accent-cyan)",
  },
  {
    id: "SELLER" as const,
    icon: Store,
    title: "I'm a Seller / Brand",
    desc: "List your product, app, website or service. Get promoted by thousands of creators. Pay only for results.",
    badge: "PAY PER RESULT",
    accent: "var(--accent-purple)",
  },
  {
    id: "COMPANY" as const,
    icon: Building2,
    title: "I Need Promo Help",
    desc: "You run a business and need influencer marketing done for you. Build your own promo team from LINKR's creator network.",
    badge: "MANAGED CAMPAIGNS",
    accent: "var(--accent-rose)",
  },
];

const FOLLOWER_RANGES = ["<1K", "1K–10K", "10K–100K", "100K–1M", "1M+"];
const SELLING_TYPES = ["Physical Product", "Digital Product", "Website/App", "SaaS Tool", "Course", "Service"];
const COMPANY_SIZES = ["1–10", "11–50", "51–200", "200+"];
const BUDGETS = ["<$500", "$500–$2K", "$2K–$10K", "$10K+"];

function RegisterForm() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") ?? "";
  const [step, setStep] = useState<"role" | "form" | "success">("role");
  const [role, setRole] = useState<"INFLUENCER" | "SELLER" | "COMPANY">("INFLUENCER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [niches, setNiches] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [followerRange, setFollowerRange] = useState("");
  const [brandName, setBrandName] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [sellingType, setSellingType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [marketingBudget, setMarketingBudget] = useState("");
  const [country, setCountry] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNiche = (slug: string) => {
    setNiches((p) => (p.includes(slug) ? p.filter((n) => n !== slug) : [...p, slug]));
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
          role,
          name,
          email,
          password,
          ref: refCode || undefined,
          country: country || undefined,
          ...(role === "INFLUENCER" && {
            niches,
            instagramHandle: instagram || undefined,
            tiktokHandle: tiktok || undefined,
            youtubeHandle: youtube || undefined,
            twitterHandle: twitter || undefined,
            followerRange: followerRange || undefined,
          }),
          ...(role === "SELLER" && {
            brandName: brandName || undefined,
            businessUrl: businessUrl || undefined,
            sellingType: sellingType || undefined,
          }),
          ...(role === "COMPANY" && {
            companyName: companyName || undefined,
            industry: industry || undefined,
            companySize: companySize || undefined,
            marketingBudget: marketingBudget || undefined,
          }),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Registration failed");
        setLoading(false);
        return;
      }
      setStep("success");
      toast.success("Account created!");
      const signInRes = await signIn("credentials", { email, password, redirect: false });
      if (!signInRes?.error) {
        const redirect =
          data.role === "SELLER" ? "/seller/dashboard"
          : data.role === "COMPANY" ? "/company/dashboard"
          : "/dashboard";
        setTimeout(() => {
          window.location.href = redirect;
        }, 2000);
      }
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <motion.div
        className="w-full max-w-md glass glass-strong rounded-2xl border border-white/10 p-10 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">
          {role === "INFLUENCER" && "Welcome to LINKR! Your dashboard is ready. Start earning today."}
          {role === "SELLER" && "Your seller account is live! List your first offer."}
          {role === "COMPANY" && "Your company account is ready. Build your promo team."}
        </h2>
        <p className="text-white/70 mb-6">Redirecting in 2 seconds...</p>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
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

  if (step === "role") {
    return (
      <motion.div
        className="w-full max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="font-display text-3xl font-bold text-white text-center mb-4">Choose Your Role</h1>
        <p className="text-white/60 text-center mb-10">Select how you want to use LINKR</p>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {ROLES.map((r) => (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`text-left rounded-2xl glass border-2 p-6 transition-all ${
                role === r.id ? "border-opacity-100 scale-[1.02]" : "border-white/10 border-opacity-50 opacity-80 hover:opacity-100"
              }`}
              style={{ borderColor: role === r.id ? r.accent : undefined }}
              whileHover={{ scale: role === r.id ? 1.02 : 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4" style={{ color: r.accent }}>
                <r.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold rounded-full px-2 py-1 glass" style={{ color: r.accent }}>{r.badge}</span>
              <h2 className="font-display text-xl font-semibold text-white mt-3 mb-2">{r.title}</h2>
              <p className="text-white/60 text-sm">{r.desc}</p>
            </motion.button>
          ))}
        </div>
        <div className="text-center">
          <NeonButton onClick={() => setStep("form")} variant="neon">
            Continue →
          </NeonButton>
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
      {refCode && (
        <div className="mb-6 rounded-xl glass border border-[var(--accent-cyan)]/30 px-4 py-3 text-sm text-[var(--accent-cyan)]">
          🎉 You were invited! Your referral code is saved.
        </div>
      )}
      <h1 className="font-display text-2xl font-bold text-white text-center mb-6">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
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

        {role === "INFLUENCER" && (
          <>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Niches (optional)</label>
              <div className="flex flex-wrap gap-2">
                {NICHE_SLUGS.slice(0, 10).map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => toggleNiche(slug)}
                    className={`rounded-full px-3 py-1.5 text-sm ${niches.includes(slug) ? "bg-[var(--accent-cyan)] text-white" : "glass border border-white/10 text-white/70"}`}
                  >
                    {NICHE_LABELS[slug]}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="rounded-xl glass border border-white/10 px-4 py-2 text-white text-sm" />
              <input type="text" placeholder="TikTok" value={tiktok} onChange={(e) => setTiktok(e.target.value)} className="rounded-xl glass border border-white/10 px-4 py-2 text-white text-sm" />
              <input type="text" placeholder="YouTube" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="rounded-xl glass border border-white/10 px-4 py-2 text-white text-sm" />
              <input type="text" placeholder="Twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="rounded-xl glass border border-white/10 px-4 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Follower range</label>
              <select value={followerRange} onChange={(e) => setFollowerRange(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white bg-transparent">
                <option value="">Select</option>
                {FOLLOWER_RANGES.map((r) => (
                  <option key={r} value={r} className="bg-[#0f0f12]">{r}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {role === "SELLER" && (
          <>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Business / Brand Name</label>
              <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white" placeholder="Your brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">What are you selling?</label>
              <div className="flex flex-wrap gap-2">
                {SELLING_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSellingType(t)}
                    className={`rounded-full px-3 py-1.5 text-sm ${sellingType === t ? "bg-[var(--accent-purple)] text-white" : "glass border border-white/10 text-white/70"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Business website URL</label>
              <input type="url" value={businessUrl} onChange={(e) => setBusinessUrl(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white" placeholder="https://..." />
            </div>
          </>
        )}

        {role === "COMPANY" && (
          <>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Company Name</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Industry</label>
              <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white" placeholder="e.g. Fashion" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Company size</label>
              <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white bg-transparent">
                <option value="">Select</option>
                {COMPANY_SIZES.map((s) => (
                  <option key={s} value={s} className="bg-[#0f0f12]">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Monthly marketing budget</label>
              <select value={marketingBudget} onChange={(e) => setMarketingBudget(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white bg-transparent">
                <option value="">Select</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b} className="bg-[#0f0f12]">{b}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-white" placeholder="Country" />
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="rounded border-white/30 mt-1" />
          <label htmlFor="terms" className="text-sm text-white/70">I agree to the Terms of Service and Privacy Policy</label>
        </div>
        <NeonButton type="submit" variant="neon" className="w-full py-3" disabled={loading || !terms}>
          {loading ? "Creating account..." : "Create Account"}
        </NeonButton>
      </form>
      <p className="mt-6 text-center text-white/60 text-sm">
        Already have an account? <Link href="/login" className="text-[var(--accent-cyan)] hover:underline">Sign in</Link>
      </p>
    </motion.div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-lg glass rounded-2xl p-8 h-96 animate-pulse" />}>
      <RegisterForm />
    </Suspense>
  );
}
