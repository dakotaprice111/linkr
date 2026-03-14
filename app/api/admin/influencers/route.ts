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
  const influencers = await prisma.user.findMany({
    where: { role: "INFLUENCER" },
    include: {
      _count: { select: { trackingLinks: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(influencers);
}
