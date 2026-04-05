import { ProductSkeleton } from '@/components/product-skeleton';

export default function ProductsLoading() {
  return (
    <div className="min-h-screen pb-20">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="h-7 w-32 animate-pulse rounded-full bg-muted" />
            <div className="h-14 w-full max-w-2xl animate-pulse rounded-3xl bg-muted" />
            <div className="h-6 w-full max-w-xl animate-pulse rounded-3xl bg-muted" />
          </div>
        </div>
      </section>

      <div className="container px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] border border-border/60 bg-card/80 p-5 shadow-sm">
          <div className="h-28 animate-pulse rounded-[1.5rem] bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      </div>
    </div>
  );
}
