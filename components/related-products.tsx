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
    <div className={cn("mt-24", className)}>
      <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
