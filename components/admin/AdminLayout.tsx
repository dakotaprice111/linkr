"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Package, Users } from "lucide-react";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/influencers", label: "Influencers", icon: Users },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
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
    router.replace("/login?from=/admin");
    return null;
  }
  if ((session.user as { role?: string })?.role !== "ADMIN") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 flex-shrink-0 glass border-r border-white/10 p-4">
        <Link href="/" className="font-display font-bold text-lg gradient-text block mb-8">
          DropLink Admin
        </Link>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                pathname === item.href ? "bg-white/10 text-[var(--accent-cyan)]" : "text-white/70 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
