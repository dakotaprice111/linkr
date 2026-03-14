import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { FloatingOrbs } from "@/components/layout/FloatingOrbs";
import { CursorOrb } from "@/components/layout/CursorOrb";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { AuthProvider } from "@/components/providers/AuthProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DropLink — The Future of Influencer Commerce",
  description:
    "Connect. Share. Earn. Multi-niche dropshipping powered by real creators.",
  openGraph: {
    title: "DropLink — The Future of Influencer Commerce",
    description: "Connect. Share. Earn. Multi-niche dropshipping powered by real creators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--void-black)] text-[var(--foreground)] font-sans">
        <AuthProvider>
          <FloatingOrbs />
          <CursorOrb />
          <ScrollProgress />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              className: "glass glass-strong rounded-xl border border-white/10 shadow-lg",
              style: {
                borderLeft: "4px solid var(--accent-cyan)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
