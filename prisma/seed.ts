import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('admin123', 12);

  const adminUser = await prisma.user.upsert({
    where: {
      email: 'admin@example.com',
    },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const sampleProducts = [
    {
      name: 'Aero Wireless Headphones',
      description: 'Premium over-ear headphones with adaptive noise cancellation and 40-hour battery life.',
      price: 199.99,
      images: ['/placeholder.jpg'],
      category: 'electronics',
      stock: 24,
    },
    {
      name: 'Lumen Desk Lamp',
      description: 'Minimal LED desk lamp with adjustable warmth and wireless charging base.',
      price: 89.0,
      images: ['/placeholder.jpg'],
      category: 'home',
      stock: 18,
    },
    {
      name: 'Transit Everyday Backpack',
      description: 'Water-resistant commuter backpack with laptop sleeve and modular storage.',
      price: 129.5,
      images: ['/placeholder.jpg'],
      category: 'clothing',
      stock: 32,
    },
    {
      name: 'Foundations of Product Design',
      description: 'A practical guide to digital product thinking, interface systems, and UX decision-making.',
      price: 34.99,
      images: ['/placeholder.jpg'],
      category: 'books',
      stock: 40,
    },
    {
      name: 'Stoneware Pour-Over Set',
      description: 'Hand-finished ceramic dripper set designed for daily coffee rituals.',
      price: 64.0,
      images: ['/placeholder.jpg'],
      category: 'home',
      stock: 14,
    },
    {
      name: 'Pulse Smartwatch',
      description: 'Fitness-focused smartwatch with AMOLED display, GPS, and 7-day battery.',
      price: 249.0,
      images: ['/placeholder.jpg'],
      category: 'electronics',
      stock: 21,
    },
  ];

  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: sampleProducts,
  });

  console.log({ adminUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

