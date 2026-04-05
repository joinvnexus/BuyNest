import Link from 'next/link';
import type { Route } from 'next';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { ProductsFilter } from '@/components/products-filter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const PAGE_SIZE = 12;
const sortLabels: Record<string, string> = {
  newest: 'Newest first',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name: A to Z',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; q?: string; sort?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1');
  const category = resolvedSearchParams.category || undefined;
  const query = resolvedSearchParams.q?.trim() || undefined;
  const sort = resolvedSearchParams.sort || 'newest';

  const { products, total, pages } = await getProducts(page, PAGE_SIZE, {
    category,
    query,
    sort: sort as 'newest' | 'price-asc' | 'price-desc' | 'name',
  });

  const activeFilters = [
    category ? { label: `Category: ${category}` } : null,
    query ? { label: `Search: ${query}` } : null,
    sort !== 'newest' ? { label: `Sort: ${sortLabels[sort] || sort}` } : null,
  ].filter(Boolean) as { label: string }[];

  const buildPageHref = (nextPage: number): Route => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (query) params.set('q', query);
    if (sort && sort !== 'newest') params.set('sort', sort);
    if (nextPage > 1) params.set('page', String(nextPage));
    const queryString = params.toString();
    return (queryString ? `/products?${queryString}` : '/products') as Route;
  };

  return (
    <div className="min-h-screen pb-20">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-4 py-1 text-sm font-medium text-muted-foreground">
              Curated catalog
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Shop all products with clearer filters and faster browsing.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Explore a tighter catalog experience with category shortcuts, search, sorting,
              and responsive browsing built for both desktop and mobile.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Filters
            </p>
            <p className="text-lg font-semibold">Refine this catalog</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-full">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md rounded-[2rem] border-border/60 p-0">
              <div className="p-6">
                <ProductsFilter />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-8 hidden lg:block">
          <ProductsFilter />
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-card/70 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Showing {products.length} of {total} product{total === 1 ? '' : 's'}
            </p>
            <p className="text-lg font-semibold">
              {query ? `Results for "${query}"` : 'All available products'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.length > 0 ? (
              activeFilters.map((filter) => (
                <span
                  key={filter.label}
                  className="rounded-full border border-border/60 bg-background px-3 py-1 text-sm text-muted-foreground"
                >
                  {filter.label}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-sm text-muted-foreground">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Default view
              </span>
            )}
          </div>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {pages > 1 ? (
              <div className="mt-12 flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Page {page} of {pages}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Browse the full catalog without losing your active filters.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" className="rounded-full" disabled={page <= 1}>
                    <Link href={buildPageHref(Math.max(1, page - 1))}>Previous</Link>
                  </Button>
                  {Array.from({ length: pages }, (_, index) => index + 1)
                    .slice(Math.max(0, page - 2), Math.min(pages, page + 1))
                    .map((pageNumber) => (
                      <Button
                        key={pageNumber}
                        asChild
                        variant={pageNumber === page ? 'default' : 'outline'}
                        className="rounded-full"
                      >
                        <Link href={buildPageHref(pageNumber)}>{pageNumber}</Link>
                      </Button>
                    ))}
                  <Button asChild variant="outline" className="rounded-full" disabled={page >= pages}>
                    <Link href={buildPageHref(Math.min(pages, page + 1))}>Next</Link>
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border/80 bg-card/70 px-6 py-16 text-center shadow-sm">
            <div className="mx-auto max-w-xl space-y-4">
              <span className="inline-flex rounded-full border border-border/60 bg-background px-4 py-1 text-sm text-muted-foreground">
                No matching products
              </span>
              <h2 className="text-3xl font-semibold">Nothing matches the current filters.</h2>
              <p className="text-muted-foreground">
                Try a broader search, switch categories, or reset the catalog back to the default view.
              </p>
              <Button asChild className="rounded-full bg-custom-accent hover:bg-blue-600">
                <Link href={"/products" as Route}>Reset catalog</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
