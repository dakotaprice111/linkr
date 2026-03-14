import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const level1 = await prisma.referral.findMany({
    where: { referrerId: session.user.id },
    include: {
      referred: {
        select: {
          id: true,
          name: true,
          referralCode: true,
          createdAt: true,
        },
      },
      earnings: { take: 1, orderBy: { createdAt: "desc" } },
    },
  });

  const level2: Array<{
    referral: { referred: { id: string; name: string; referralCode: string; createdAt: Date } };
    earnings: { amount: number }[];
  }> = [];
  for (const r of level1) {
    const l2 = await prisma.referral.findMany({
      where: { referrerId: r.referredId },
      include: {
        referred: {
          select: { id: true, name: true, referralCode: true, createdAt: true },
        },
        earnings: { take: 1, orderBy: { createdAt: "desc" } },
      },
    });
    level2.push(...l2);
  }

  const monthlyEarnedByReferred = await Promise.all(
    level1.map(async (r) => {
      const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const sum = await prisma.referralEarning.aggregate({
        where: { referralId: r.id, createdAt: { gte: start } },
        _sum: { amount: true },
      });
      return { referredId: r.referredId, amount: sum._sum.amount ?? 0 };
    })
  );

  return NextResponse.json({
    level1: level1.map((r) => ({
      id: r.id,
      referred: r.referred,
      totalEarned: r.totalEarned,
      status: r.status,
      level: 1,
      thisMonthEarned: monthlyEarnedByReferred.find((x) => x.referredId === r.referredId)?.amount ?? 0,
    })),
    level2: level2.map((r) => ({
      id: r.id,
      referred: r.referred,
      totalEarned: r.totalEarned,
      status: r.status,
      level: 2,
    })),
  });
}
