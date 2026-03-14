import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      referralCode: true,
      referralBalance: true,
      name: true,
      _count: { select: { referralsGiven: true } },
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (!user.referralCode) {
    const base = (user.name || "USER").replace(/\W/g, "").toUpperCase().slice(0, 4) || "USER";
    let code = base + Math.random().toString(36).slice(2, 6).toUpperCase();
    while (await prisma.user.findUnique({ where: { referralCode: code } })) {
      code = base + Math.random().toString(36).slice(2, 6).toUpperCase();
    }
    await prisma.user.update({ where: { id: session.user.id }, data: { referralCode: code } });
    user = { ...user, referralCode: code };
  }

  const activeReferrals = await prisma.referral.count({
    where: { referrerId: session.user.id, status: "ACTIVE" },
  });

  const thisMonthEarnings = await prisma.referralEarning.aggregate({
    where: {
      referral: { referrerId: session.user.id },
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    _sum: { amount: true },
  });

  const allTimeEarnings = await prisma.referralEarning.aggregate({
    where: { referral: { referrerId: session.user.id } },
    _sum: { amount: true },
  });

  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const referralLink = `${base.replace(/\/$/, "")}/ref/${user.referralCode!}`;

  return NextResponse.json({
    referralCode: user.referralCode,
    referralLink,
    referralBalance: user.referralBalance,
    totalReferrals: activeReferrals,
    thisMonthEarnings: thisMonthEarnings._sum.amount ?? 0,
    allTimeEarnings: allTimeEarnings._sum.amount ?? 0,
  });
}
