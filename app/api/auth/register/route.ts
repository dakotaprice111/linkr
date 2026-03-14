import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  role: z.enum(["INFLUENCER", "SELLER", "COMPANY"]),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  // Influencer
  niches: z.array(z.string()).optional().default([]),
  instagramHandle: z.string().optional(),
  tiktokHandle: z.string().optional(),
  youtubeHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  followerRange: z.string().optional(),
  // Seller
  brandName: z.string().optional(),
  businessUrl: z.string().optional(),
  sellingType: z.string().optional(),
  // Company
  companyName: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  marketingBudget: z.string().optional(),
  companyNeeds: z.array(z.string()).optional().default([]),
  country: z.string().optional(),
  ref: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    let referralCode = nanoid(8).toUpperCase();
    while (await prisma.user.findUnique({ where: { referralCode } })) {
      referralCode = nanoid(8).toUpperCase();
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
        referralCode,
        niches: data.role === "INFLUENCER" ? data.niches : [],
        instagramHandle: data.instagramHandle ?? null,
        tiktokHandle: data.tiktokHandle ?? null,
        youtubeHandle: data.youtubeHandle ?? null,
        twitterHandle: data.twitterHandle ?? null,
        followerRange: data.followerRange ?? null,
        brandName: data.role === "SELLER" ? (data.brandName ?? null) : null,
        businessUrl: data.role === "SELLER" ? (data.businessUrl ?? null) : null,
        sellingType: data.role === "SELLER" ? (data.sellingType ?? null) : null,
        companyName: data.role === "COMPANY" ? (data.companyName ?? null) : null,
        industry: data.role === "COMPANY" ? (data.industry ?? null) : null,
        companySize: data.role === "COMPANY" ? (data.companySize ?? null) : null,
        marketingBudget: data.role === "COMPANY" ? (data.marketingBudget ?? null) : null,
        companyNeeds: data.role === "COMPANY" ? (data.companyNeeds ?? []) : [],
        country: data.country ?? null,
      },
    });

    await prisma.notificationPreference.create({
      data: { userId: user.id },
    });

    if (data.ref) {
      const referrer = await prisma.user.findUnique({ where: { referralCode: data.ref } });
      if (referrer && referrer.id !== user.id) {
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            referredId: user.id,
            code: data.ref,
            level: 1,
            status: "ACTIVE",
          },
        });
      }
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
