import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { ProductsFilter } from '@/components/products-filter';
import { Suspense } from 'react';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const category = searchParams.category || undefined;

  const { products } = await getProducts(page, 12, category);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="text-xl text-muted-foreground">
            Discover our collection of premium products
          </p>
        </div>
        
        <Suspense fallback={<div>Loading filters...</div>}>
          <ProductsFilter />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">No products found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
