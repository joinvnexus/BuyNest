"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const formattedCategory = (product.category || 'general').replace(/^\w/, (letter) =>
    letter.toUpperCase()
  );
  const stockLabel =
    product.stock === 0 ? 'Sold out' : product.stock <= 5 ? `Only ${product.stock} left` : `${product.stock} in stock`;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.jpg',
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent" />
          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            <span className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur">
              {formattedCategory}
            </span>
            {product.stock === 0 ? (
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-destructive">
                Sold out
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                In stock
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight sm:text-lg">
              {product.name}
            </h3>
            <p className="line-clamp-2 min-h-11 text-sm leading-6 text-muted-foreground">
              {product.description || 'Thoughtfully selected for a clean, modern everyday setup.'}
            </p>
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 rounded-2xl border border-border/50 bg-muted/35 px-3 py-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Price
              </p>
              <p className="text-xl font-semibold text-custom-primary sm:text-2xl">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Stock
              </p>
              <p className="text-sm font-medium text-foreground">{stockLabel}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="border-t border-border/60 px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="mt-4 h-10 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={product.stock === 0}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </Button>
      </div>
    </article>
  );
}
