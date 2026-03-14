import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(3).max(20).regex(/^[A-Z0-9]+$/i),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  });
  if (user?.plan === "FREE") {
    return NextResponse.json(
      { error: "Custom referral codes are available on Pro and Elite plans" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid code format. Use 3–20 letters/numbers." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { referralCode: parsed.data.code.toUpperCase() },
  });
  if (existing) {
    return NextResponse.json({ error: "This code is already taken" }, { status: 409 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { referralCode: parsed.data.code.toUpperCase() },
  });

  return NextResponse.json({ success: true, code: parsed.data.code.toUpperCase() });
}
