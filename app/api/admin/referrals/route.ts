import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const referrals = await prisma.referral.findMany({
    include: {
      referrer: { select: { id: true, name: true, email: true, referralCode: true } },
      referred: { select: { id: true, name: true, email: true, createdAt: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const totals = await prisma.referralEarning.aggregate({
    _sum: { amount: true },
    _count: true,
  });

  return NextResponse.json({
    referrals,
    totalEarningsProcessed: totals._sum.amount ?? 0,
    totalEarningRecords: totals._count,
  });
}
