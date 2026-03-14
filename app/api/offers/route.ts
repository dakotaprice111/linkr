import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const category = searchParams.get("category") ?? "";
    const type = searchParams.get("type") ?? "";
    const sort = searchParams.get("sort") ?? "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(24, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      isApproved: true,
      ...(category ? { category } : {}),
      ...(type ? { type: type as "PRODUCT" | "WEBSITE" | "APP" | "SAAS" | "COURSE" | "SERVICE" | "DIGITAL" } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { description: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const orderBy =
      sort === "commission"
        ? { commissionPct: "desc" as const }
        : sort === "price-asc"
          ? { price: "asc" as const }
          : sort === "price-desc"
            ? { price: "desc" as const }
            : sort === "trending"
              ? { popularityScore: "desc" as const }
              : { createdAt: "desc" as const };

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.offer.count({ where }),
    ]);

    return NextResponse.json({
      offers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    console.error("Offers list error:", e);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}
