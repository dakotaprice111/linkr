import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NICHE_SLUGS, NICHE_LABELS } from "@/lib/constants";
import { NicheStorefront } from "@/components/products/NicheStorefront";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ niche: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const label = NICHE_LABELS[niche] ?? niche;
  return { title: `${label} — LINKR`, description: `Explore ${label} offers and start earning.` };
}

export async function generateStaticParams() {
  return NICHE_SLUGS.map((slug) => ({ niche: slug }));
}

export default async function NichePage({ params }: Props) {
  const { niche } = await params;
  if (!NICHE_SLUGS.includes(niche as (typeof NICHE_SLUGS)[number])) notFound();

  const offers = await prisma.offer.findMany({
    where: { category: niche, isActive: true, isApproved: true },
    take: 24,
  });

  const products = offers.map((o) => ({
    id: o.id,
    name: o.name,
    description: o.description,
    price: o.price ?? 0,
    imageUrls: o.imageUrls,
    niche: o.category,
    commissionPct: o.commissionPct,
  }));

  return (
    <NicheStorefront
      niche={niche}
      products={JSON.parse(JSON.stringify(products))}
    />
  );
}
