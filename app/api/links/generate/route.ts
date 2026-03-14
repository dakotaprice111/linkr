import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ offerId: z.string().min(1) });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { offerId } = schema.parse(body);

    const offer = await prisma.offer.findUnique({ where: { id: offerId } });
    if (!offer?.isActive) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    const existing = await prisma.trackingLink.findFirst({
      where: { userId: session.user.id, offerId },
    });
    if (existing) {
      return NextResponse.json({ link: existing, existing: true });
    }

    const slug = nanoid(10);
    const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const fullUrl = `${base.replace(/\/$/, "")}/go/${slug}`;
    const link = await prisma.trackingLink.create({
      data: {
        userId: session.user.id,
        offerId,
        slug,
        fullUrl,
      },
      include: { offer: true },
    });

    return NextResponse.json({ link, existing: false });
  } catch (e) {
    console.error("Generate link error:", e);
    return NextResponse.json({ error: "Failed to generate link" }, { status: 500 });
  }
}
