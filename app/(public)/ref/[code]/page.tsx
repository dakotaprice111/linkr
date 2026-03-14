import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RefLandingClient } from "@/components/referral/RefLandingClient";

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const referrer = await prisma.user.findUnique({
    where: { referralCode: code.toUpperCase(), isActive: true },
    select: { name: true },
  });
  if (!referrer) return { title: "Join DropLink" };
  return {
    title: `You're invited by ${referrer.name} — DropLink`,
    description: `Join DropLink with ${referrer.name}'s referral link and start earning.`,
  };
}

export default async function RefPage({ params }: Props) {
  const { code } = await params;
  const referrer = await prisma.user.findUnique({
    where: { referralCode: code.toUpperCase(), isActive: true },
    select: {
      id: true,
      name: true,
      image: true,
      referralCode: true,
      _count: { select: { trackingLinks: true } },
    },
  });

  if (!referrer) notFound();

  const activeReferrals = await prisma.referral.count({
    where: { referrerId: referrer.id, status: "ACTIVE" },
  });
  const referralEarningsThisMonth = await prisma.referralEarning.aggregate({
    where: {
      referral: { referrerId: referrer.id },
      createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    },
    _sum: { amount: true },
  });
  const creatorCount = await prisma.user.count({ where: { role: "INFLUENCER" } });

  return (
    <RefLandingClient
      referrer={{
        name: referrer.name,
        image: referrer.image,
        code: referrer.referralCode ?? code.toUpperCase(),
        linksCount: referrer._count.trackingLinks,
        referralsCount: activeReferrals,
        earningsEstimate: referralEarningsThisMonth._sum.amount ?? 0,
      }}
      creatorCount={creatorCount}
    />
  );
}
