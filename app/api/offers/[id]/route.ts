import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const offer = await prisma.offer.findUnique({
      where: { id },
      include: { seller: { select: { name: true, brandName: true } } },
    });
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }
    return NextResponse.json(offer);
  } catch (e) {
    console.error("Offer get error:", e);
    return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
  }
}
