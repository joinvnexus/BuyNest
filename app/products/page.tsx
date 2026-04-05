import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { ProductsFilter } from '@/components/products-filter';
import { ProductSkeleton } from '@/components/product-skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Suspense } from 'react';
import { Filter } from 'lucide-react';

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
        
        <div className="flex lg:hidden mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
              <Suspense fallback={<div>Loading...</div>}>
                <ProductsFilter />
              </Suspense>
            </DialogContent>
          </Dialog>
        </div>
        <div className="hidden lg:block mb-8">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductsFilter />
          </Suspense>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Suspense>

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
