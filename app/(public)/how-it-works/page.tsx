import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/landing/HowItWorksContent";

export const metadata: Metadata = {
  title: "How It Works — DropLink",
  description: "Start earning in four simple steps.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
