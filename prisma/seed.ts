import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const base = process.env.NEXTAUTH_URL || "http://localhost:3000";

async function main() {
  const adminHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@droplink.com" },
    update: { referralCode: "ADMIN01" },
    create: {
      email: "admin@droplink.com",
      name: "Admin",
      passwordHash: adminHash,
      role: "ADMIN",
      niches: [],
      referralCode: "ADMIN01",
    },
  });
  console.log("Admin user:", admin.email);

  const sellerHash = await bcrypt.hash("seller123", 12);
  const seller = await prisma.user.upsert({
    where: { email: "seller@linkr.io" },
    update: {},
    create: {
      email: "seller@linkr.io",
      name: "Demo Seller",
      passwordHash: sellerHash,
      role: "SELLER",
      niches: [],
      brandName: "Demo Brand",
      referralCode: "SELLER01",
    },
  });
  console.log("Seller:", seller.email);

  const usersWithoutCode = await prisma.user.findMany({ where: { referralCode: null }, select: { id: true, name: true } });
  for (const u of usersWithoutCode) {
    const baseName = (u.name || "USER").replace(/\W/g, "").toUpperCase().slice(0, 4) || "USER";
    let code = baseName + Math.random().toString(36).slice(2, 6).toUpperCase();
    while (await prisma.user.findUnique({ where: { referralCode: code } })) {
      code = baseName + Math.random().toString(36).slice(2, 6).toUpperCase();
    }
    await prisma.user.update({ where: { id: u.id }, data: { referralCode: code } });
  }
  if (usersWithoutCode.length) console.log("Backfilled referral codes for", usersWithoutCode.length, "users");

  const links = await prisma.trackingLink.findMany({ where: { fullUrl: "" } });
  for (const link of links) {
    await prisma.trackingLink.update({
      where: { id: link.id },
      data: { fullUrl: `${base.replace(/\/$/, "")}/go/${link.slug}` },
    });
  }

  const offerCount = await prisma.offer.count();
  if (offerCount === 0) {
    const offersData = [
      { name: "Glow Serum Pro", description: "Vitamin C serum for radiant skin.", price: 29.99, category: "beauty-skincare", commissionPct: 18 },
      { name: "Wireless Earbuds X", description: "Noise-cancelling, 24hr battery.", price: 79.99, category: "tech-gadgets", commissionPct: 12 },
      { name: "Yoga Mat Elite", description: "Eco-friendly non-slip mat.", price: 34.99, category: "fitness-wellness", commissionPct: 15 },
      { name: "Minimalist Watch", description: "Slim design, stainless steel.", price: 59.99, category: "fashion", commissionPct: 20 },
    ];
    for (const p of offersData) {
      await prisma.offer.create({
        data: {
          sellerId: seller.id,
          name: p.name,
          description: p.description,
          type: "PRODUCT",
          url: "https://example.com",
          imageUrls: [],
          tags: [],
          category: p.category,
          commissionPct: p.commissionPct,
          price: p.price,
          isActive: true,
          isApproved: true,
        },
      });
    }
    console.log("Seeded offers");
  }

  const offersWithVideo = await prisma.offer.findMany({ take: 4 });
  for (const offer of offersWithVideo) {
    const proofCount = await prisma.productVideoProof.count({ where: { offerId: offer.id } });
    if (proofCount > 0) continue;
    const platforms = ["TIKTOK", "INSTAGRAM", "YOUTUBE"] as const;
    const creators = ["@glowwithsarah", "@fitnessmike", "@techreview", "@stylebyjane", "@beautyguru"];
    for (let i = 0; i < 4; i++) {
      await prisma.productVideoProof.create({
        data: {
          offerId: offer.id,
          platform: platforms[i % 3],
          creatorName: creators[i % creators.length],
          videoUrl: "https://example.com/video",
          viewCount: Math.floor(15000 + Math.random() * 2e6),
          likeCount: Math.floor(1000 + Math.random() * 100000),
          postedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          isVerified: i === 0,
        },
      });
    }
  }
  console.log("Seeded video proofs");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
