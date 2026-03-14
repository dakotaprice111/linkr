import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ productId: z.string().min(1) });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { productId } = schema.parse(body);

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product?.isActive) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existing = await prisma.trackingLink.findFirst({
      where: { userId: session.user.id, productId },
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
        productId,
        slug,
        fullUrl,
      },
      include: { product: true },
    });

    return NextResponse.json({ link, existing: false });
  } catch (e) {
    console.error("Generate link error:", e);
    return NextResponse.json({ error: "Failed to generate link" }, { status: 500 });
  }
}
