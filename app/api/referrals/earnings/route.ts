import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20", 10) || 20);

  const earnings = await prisma.referralEarning.findMany({
    where: { referral: { referrerId: session.user.id } },
    include: { referral: { include: { referred: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json(earnings);
}
