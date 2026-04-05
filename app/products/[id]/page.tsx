import Link from 'next/link';
import { Check, ChevronLeft, ShieldCheck, Truck } from 'lucide-react';
import { getProduct, getRelatedProducts } from '@/lib/db';
import ImageGallery from '@/components/image-gallery';
import AddToCart from '@/components/add-to-cart';
import RelatedProducts from '@/components/related-products';
import { Button } from '@/components/ui/button';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-[2rem] border border-border/60 bg-card p-10 text-center shadow-sm">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Product unavailable
          </p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">Product not found</h1>
          <p className="mb-8 text-muted-foreground">
            This item may have been removed or is no longer available in the catalog.
          </p>
          <Button asChild className="rounded-full bg-custom-accent hover:bg-blue-600">
            <Link href="/products">Back to catalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const related = product.category
    ? await getRelatedProducts(product.category, product.id)
    : [];

  const formattedCategory = product.category
    ? product.category.replace(/^\w/, (letter) => letter.toUpperCase())
    : 'General';

  return (
    <div className="min-h-screen pb-20">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Link href="/products" className="inline-flex items-center gap-2 hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              Back to catalog
            </Link>
            <span>/</span>
            <Link href={`/products?category=${product.category ?? ''}`} className="hover:text-foreground">
              {formattedCategory}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      <div className="container px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,460px)]">
          <div className="space-y-8">
            <ImageGallery product={product} />

            <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-border/60 bg-background px-4 py-1 text-sm text-muted-foreground">
                  {formattedCategory}
                </span>
                <span className="rounded-full border border-border/60 bg-background px-4 py-1 text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} ready to ship` : 'Currently unavailable'}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {product.description || 'A well-considered product designed to fit cleanly into a modern setup.'}
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-background p-4">
                  <Truck className="mb-3 h-5 w-5 text-custom-accent" />
                  <p className="font-medium">Fast dispatch</p>
                  <p className="text-sm text-muted-foreground">Ships in 1-2 business days.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-4">
                  <ShieldCheck className="mb-3 h-5 w-5 text-custom-accent" />
                  <p className="font-medium">30-day returns</p>
                  <p className="text-sm text-muted-foreground">Hassle-free returns on eligible orders.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-4">
                  <Check className="mb-3 h-5 w-5 text-custom-accent" />
                  <p className="font-medium">Curated quality</p>
                  <p className="text-sm text-muted-foreground">Selected for durability and daily use.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm sm:p-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-custom-accent/10 px-3 py-1 text-sm font-medium text-custom-accent">
                    Premium selection
                  </span>
                  {product.stock > 0 ? (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      In stock
                    </span>
                  ) : (
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                      Out of stock
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    Price
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="text-4xl font-semibold tracking-tight text-custom-primary">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Taxes calculated at checkout
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
                  Designed for shoppers who want fewer decisions, clearer information,
                  and a faster path from discovery to checkout.
                </div>

                <AddToCart product={product} />

                <div className="space-y-4 border-t border-border/60 pt-6">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-4 w-4 text-custom-accent" />
                    <div>
                      <p className="font-medium text-foreground">Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        Free shipping on qualifying orders and tracked delivery worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-custom-accent" />
                    <div>
                      <p className="font-medium text-foreground">Purchase protection</p>
                      <p className="text-sm text-muted-foreground">
                        Secure checkout, transparent returns, and support after delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 ? <RelatedProducts products={related} className="mt-20" /> : null}
      </div>
    </div>
  );
}
