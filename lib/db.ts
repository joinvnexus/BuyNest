import { prisma } from '@/lib/prisma';

interface GetProductsOptions {
  category?: string;
  query?: string;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'name';
}

export async function getProducts(
  page = 1,
  limit = 12,
  options: GetProductsOptions = {}
) {
  const skip = (page - 1) * limit;
  const { category, query, sort = 'newest' } = options;
  const where = {
    ...(category ? { category } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const orderBy =
    sort === 'price-asc'
      ? { price: 'asc' as const }
      : sort === 'price-desc'
        ? { price: 'desc' as const }
        : sort === 'name'
          ? { name: 'asc' as const }
          : { createdAt: 'desc' as const };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
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

export async function getRelatedProducts(category: string, excludeId: string, limit = 4) {
  return prisma.product.findMany({
    where: {
      category,
      id: { not: excludeId },
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}

export async function updateUserPassword(userId: string, hashedPassword: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}

export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  });
}
