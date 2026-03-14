"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  Package,
  CreditCard,
  Radio,
  LogOut,
  Gift,
  DollarSign,
  Settings,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/links", label: "My Links", icon: Link2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
  { href: "/dashboard/referrals", label: "Referrals", icon: Gift },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/payout", label: "Payout", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-cyan)] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.replace("/login?from=/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 flex-shrink-0 glass border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-[var(--accent-cyan)] border-2 border-[var(--accent-cyan)]/50">
            {(session.user?.name ?? "U")[0]}
          </div>
          <div className="mt-3 font-display font-semibold text-white truncate">
            {session.user?.name ?? "User"}
          </div>
          <div className="flex gap-1 mt-1">
            <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)]">
              Creator
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-[var(--accent-cyan)]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
            <Radio className="w-4 h-4" />
            <span>Go Live</span>
          </div>
          <button
            type="button"
            onClick={() => router.push("/api/auth/signout")}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
