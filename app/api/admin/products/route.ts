import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  imageUrls: z.array(z.string()).default([]),
  niche: z.string().min(1),
  commissionPct: z.number().min(0).max(100),
  tags: z.array(z.string()).optional().default([]),
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

    const product = await prisma.product.create({
      data: parsed.data,
    });
    return NextResponse.json(product);
  } catch (e) {
    console.error("Admin create product error:", e);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
