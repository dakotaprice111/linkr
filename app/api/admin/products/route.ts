import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive().optional(),
  imageUrls: z.array(z.string()).default([]),
  niche: z.string().min(1),
  category: z.string().min(1).optional(),
  commissionPct: z.number().min(0).max(100),
  tags: z.array(z.string()).optional().default([]),
  sellerId: z.string().min(1),
  url: z.string().url().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const offer = await prisma.offer.create({
      data: {
        sellerId: data.sellerId,
        name: data.name,
        description: data.description,
        type: "PRODUCT",
        url: data.url ?? "https://example.com",
        imageUrls: data.imageUrls,
        category: data.category ?? data.niche,
        commissionPct: data.commissionPct,
        price: data.price ?? null,
        tags: data.tags,
      },
    });
    return NextResponse.json(offer);
  } catch (e) {
    console.error("Admin create offer error:", e);
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
  }
}
