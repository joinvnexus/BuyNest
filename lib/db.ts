import { prisma } from '@/lib/prisma';
import { Product } from '@/types';

export async function getProducts(page = 1, limit = 12, category?: string) {
  const skip = (page - 1) * limit;
  const where = category ? { category } : {};
  
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    pages: Math.ceil(total / limit),
  };
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
}
