import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) return { title: "Offer — LINKR" };
  return {
    title: `${offer.name} — LINKR`,
    description: offer.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) notFound();
  redirect(`/browse/${id}`);
}
