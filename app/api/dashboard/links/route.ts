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
      include: { offer: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(links);
  } catch (e) {
    console.error("Dashboard links error:", e);
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
  }
}
