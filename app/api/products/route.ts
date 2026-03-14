import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const niche = searchParams.get("niche") ?? "";
    const sort = searchParams.get("sort") ?? "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(24, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
    const skip = (page - 1) * limit;

    const where: { isActive: boolean; niche?: string; OR?: { name?: { contains: string; mode: "insensitive" }; description?: { contains: string; mode: "insensitive" } } } = {
      isActive: true,
    };
    if (niche) where.niche = niche;
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    const orderBy: { [key: string]: string } =
      sort === "trending"
        ? { createdAt: "desc" }
        : sort === "commission"
          ? { commissionPct: "desc" }
          : sort === "price-asc"
            ? { price: "asc" }
            : sort === "price-desc"
              ? { price: "desc" }
              : { createdAt: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    console.error("Products list error:", e);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
