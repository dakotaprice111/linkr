import type { Metadata } from "next";
import { BrowseContent } from "@/components/browse/BrowseContent";

export const metadata: Metadata = {
  title: "Browse Offers — LINKR",
  description: "Promote products, websites, apps, SaaS, courses and services. Get your link and start earning.",
};

export default function BrowsePage() {
  return <BrowseContent />;
}
