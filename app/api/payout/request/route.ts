import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const MIN_PAYOUT = 20;

const schema = z.object({
  amount: z.number().min(MIN_PAYOUT),
  method: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { amount, method } = parsed.data;

    const links = await prisma.trackingLink.findMany({
      where: { userId: session.user.id },
    });
    const totalEarnings = links.reduce((a, l) => a + l.earnings, 0);
    if (amount > totalEarnings) {
      return NextResponse.json(
        { error: "Amount exceeds available balance" },
        { status: 400 }
      );
    }

    const payout = await prisma.payout.create({
      data: {
        userId: session.user.id,
        amount,
        method,
        status: "PENDING",
      },
    });

    return NextResponse.json(payout);
  } catch (e) {
    console.error("Payout request error:", e);
    return NextResponse.json({ error: "Failed to request payout" }, { status: 500 });
  }
}
