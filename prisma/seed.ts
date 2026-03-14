import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@droplink.com" },
    update: {},
    create: {
      email: "admin@droplink.com",
      name: "Admin",
      passwordHash: adminHash,
      role: "ADMIN",
      niches: [],
    },
  });
  console.log("Admin user:", admin.email);

  const products = [
    { name: "Glow Serum Pro", description: "Vitamin C serum for radiant skin.", price: 29.99, niche: "beauty-skincare", commissionPct: 18 },
    { name: "Wireless Earbuds X", description: "Noise-cancelling, 24hr battery.", price: 79.99, niche: "tech-gadgets", commissionPct: 12 },
    { name: "Yoga Mat Elite", description: "Eco-friendly non-slip mat.", price: 34.99, niche: "fitness-wellness", commissionPct: 15 },
    { name: "Minimalist Watch", description: "Slim design, stainless steel.", price: 59.99, niche: "fashion", commissionPct: 20 },
  ];
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        imageUrls: [],
        niche: p.niche,
        commissionPct: p.commissionPct,
        isActive: true,
      },
    });
  }
  console.log("Seeded products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
