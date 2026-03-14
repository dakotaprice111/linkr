import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const links = await prisma.trackingLink.findMany({
      where: { userId: session.user.id },
      include: { product: true },
    });

    const totalClicks = links.reduce((a, l) => a + l.clicks, 0);
    const totalSales = links.reduce((a, l) => a + l.sales, 0);
    const totalEarnings = links.reduce((a, l) => a + l.earnings, 0);
    const conversionRate = totalClicks > 0 ? (totalSales / totalClicks) * 100 : 0;

    return NextResponse.json({
      totalClicks,
      totalSales,
      totalEarnings,
      conversionRate: Math.round(conversionRate * 100) / 100,
      linkCount: links.length,
    });
  } catch (e) {
    console.error("Dashboard stats error:", e);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
