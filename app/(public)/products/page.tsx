import type { Metadata } from "next";
import { ProductsContent } from "@/components/products/ProductsContent";

export const metadata: Metadata = {
  title: "Products — DropLink",
  description: "Browse trending products across every niche. Get your tracking link and start earning.",
};

export default function ProductsPage() {
  return <ProductsContent />;
}
