import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface RelatedProductsProps {
  products: Product[];
  className?: string;
}

export function RelatedProducts({ products, className }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("space-y-8", className)}>
      <div className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-muted/30 p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Keep exploring
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Related products</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Similar picks from the same part of the catalog, selected to keep the buying journey moving.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-custom-accent"
        >
          View full catalog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
