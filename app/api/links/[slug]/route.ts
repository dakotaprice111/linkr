import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const link = await prisma.trackingLink.findUnique({
      where: { slug },
      include: { product: true },
    });
    if (!link) {
      return NextResponse.redirect(new URL("/products", req.url));
    }

    const url = new URL(req.url);
    const source = url.searchParams.get("utm_source") ?? "direct";
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? null;

    await prisma.clickEvent.create({
      data: {
        trackingLinkId: link.id,
        ipAddress: ip,
        source,
      },
    });

    await prisma.trackingLink.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });

    const productUrl = `${process.env.NEXTAUTH_URL ?? req.url}/products/${link.productId}`;
    return NextResponse.redirect(productUrl);
  } catch (e) {
    console.error("Link redirect error:", e);
    return NextResponse.redirect(new URL("/products", req.url));
  }
}
