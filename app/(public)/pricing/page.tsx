import type { Metadata } from "next";
import { PricingContent } from "@/components/landing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing — DropLink",
  description: "Simple, transparent pricing for creators and brands.",
};

export default function PricingPage() {
  return <PricingContent />;
}
