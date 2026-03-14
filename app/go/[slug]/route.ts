import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const link = await prisma.trackingLink.findUnique({
      where: { slug, isActive: true },
      include: { product: true },
    });
    if (!link) {
      return NextResponse.redirect(new URL("/products", req.url));
    }

    const url = new URL(req.url);
    const source = url.searchParams.get("utm_source") ?? url.searchParams.get("ref") ?? "direct";
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;
    const referer = req.headers.get("referer") ?? null;

    await prisma.clickEvent.create({
      data: {
        trackingLinkId: link.id,
        ipAddress: ip,
        userAgent,
        source,
        referer,
      },
    });

    await prisma.trackingLink.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });

    const base = process.env.NEXTAUTH_URL ?? (req.url.split("/go/")[0] || "http://localhost:3000");
    const productUrl = `${base}/products/${link.productId}`;
    return NextResponse.redirect(productUrl);
  } catch (e) {
    console.error("Go link redirect error:", e);
    return NextResponse.redirect(new URL("/products", req.url));
  }
}
