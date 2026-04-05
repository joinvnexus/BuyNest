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
    <article className="group overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/4.3] bg-muted">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
            <span className="rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {(product.category || 'general').replace(/^\w/, (letter) => letter.toUpperCase())}
            </span>
            {product.stock === 0 ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-destructive">
                Sold out
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
                In stock
              </span>
            )}
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
            <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
              {product.description || 'Thoughtfully selected for a clean, modern everyday setup.'}
            </p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Price
              </p>
              <p className="text-2xl font-semibold text-custom-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {product.stock} available
            </p>
          </div>
        </div>
      </Link>
      <div className="border-t border-border/60 px-6 py-4">
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={product.stock === 0}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </Button>
      </div>
    </article>
  );
}
