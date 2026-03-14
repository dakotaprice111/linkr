import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { title: "Product — DropLink" };
  return {
    title: `${product.name} — DropLink`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { niche: product.niche, id: { not: id }, isActive: true },
    take: 6,
  });

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
      related={JSON.parse(JSON.stringify(related))}
    />
  );
}
