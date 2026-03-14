import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NICHE_SLUGS, NICHE_LABELS } from "@/lib/constants";
import { NicheStorefront } from "@/components/products/NicheStorefront";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ niche: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const label = NICHE_LABELS[niche] ?? niche;
  return { title: `${label} — DropLink`, description: `Explore ${label} products and start earning.` };
}

export async function generateStaticParams() {
  return NICHE_SLUGS.map((slug) => ({ niche: slug }));
}

export default async function NichePage({ params }: Props) {
  const { niche } = await params;
  if (!NICHE_SLUGS.includes(niche as (typeof NICHE_SLUGS)[number])) notFound();

  const products = await prisma.product.findMany({
    where: { niche, isActive: true },
    take: 24,
  });

  return (
    <NicheStorefront
      niche={niche}
      products={JSON.parse(JSON.stringify(products))}
    />
  );
}
