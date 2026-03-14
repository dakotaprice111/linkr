import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const proofs = await prisma.productVideoProof.findMany({
      where: { productId: id },
      orderBy: { viewCount: "desc" },
      take: 12,
    });
    const byPlatform = {
      TIKTOK: { totalViews: 0, count: 0 },
      INSTAGRAM: { totalViews: 0, count: 0 },
      YOUTUBE: { totalViews: 0, count: 0 },
    };
    proofs.forEach((p) => {
      byPlatform[p.platform].totalViews += p.viewCount;
      byPlatform[p.platform].count += 1;
    });
    return NextResponse.json({ proofs, byPlatform });
  } catch (e) {
    console.error("Social proof error:", e);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
